// دریافت دقیق و لحظه‌ای تعداد پلیرهای آنلاین هر سرور (سمت مرورگر کاربر با ۳ سرویس پشتیبان)
export function toPersianDigits(num) {
  if (num === null || num === undefined || isNaN(num)) return '۰'
  return Number(num).toLocaleString('en-US').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}

async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' })
    clearTimeout(timer)
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    clearTimeout(timer)
    return null
  }
}

export async function fetchServerLiveStatus(ip, isBedrockOnly = false) {
  // ۱. سرویس اول: mcstatus.io (بسیار سریع و دقیق برای آی‌پی‌های ایران و جهان)
  const url1 = isBedrockOnly
    ? `https://api.mcstatus.io/v2/status/bedrock/${ip}`
    : `https://api.mcstatus.io/v2/status/java/${ip}`

  const data1 = await fetchWithTimeout(url1, 4500)
  if (data1 && typeof data1.online === 'boolean') {
    if (data1.online && data1.players && typeof data1.players.online === 'number') {
      return {
        online: true,
        players: data1.players.online,
        max: data1.players.max || 0,
        label: `${toPersianDigits(data1.players.online)} پلیر آنلاین`
      }
    }
  }

  // ۲. سرویس دوم: mcsrvstat.us
  const url2 = isBedrockOnly
    ? `https://api.mcsrvstat.us/bedrock/3/${ip}`
    : `https://api.mcsrvstat.us/3/${ip}`

  const data2 = await fetchWithTimeout(url2, 4500)
  if (data2 && typeof data2.online === 'boolean') {
    if (data2.online && data2.players && typeof data2.players.online === 'number') {
      return {
        online: true,
        players: data2.players.online,
        max: data2.players.max || 0,
        label: `${toPersianDigits(data2.players.online)} پلیر آنلاین`
      }
    }
    if (data2.online === false && data1 && data1.online === false) {
      return {
        online: false,
        players: 0,
        max: 0,
        label: 'آفلاین'
      }
    }
  }

  // ۳. سرویس سوم (پشتیبان جاوا): mc-api.net
  if (!isBedrockOnly) {
    const data3 = await fetchWithTimeout(`https://eu.mc-api.net/v3/server/ping/${ip}`, 4500)
    if (data3 && data3.online && data3.players && typeof data3.players.online === 'number') {
      return {
        online: true,
        players: data3.players.online,
        max: data3.players.max || 0,
        label: `${toPersianDigits(data3.players.online)} پلیر آنلاین`
      }
    }
  }

  return null
}
