// ماژول دریافت لحظه‌ای تعداد پلیرهای آنلاین سرورهای ماینکرفت (کاملاً سمت مرورگر و بدون مصرف منابع گیت‌هاب)
export function toPersianDigits(num) {
  if (num === null || num === undefined) return ''
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}

export async function fetchServerLiveStatus(ip, isBedrockOnly = false) {
  const endpointPrimary = isBedrockOnly
    ? `https://api.mcsrvstat.us/bedrock/3/${ip}`
    : `https://api.mcsrvstat.us/3/${ip}`

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6500)
    const res = await fetch(endpointPrimary, { signal: controller.signal })
    clearTimeout(timer)

    if (res.ok) {
      const data = await res.json()
      if (data && data.online === true && data.players && typeof data.players.online === 'number') {
        return {
          online: true,
          players: data.players.online,
          max: data.players.max || 0,
          label: `${toPersianDigits(data.players.online)} پلیر آنلاین`,
          live: true
        }
      }
      if (data && data.online === false) {
        // تلاش دوم با API جایگزین mcstatus.io
        return await fetchFallbackMcStatus(ip, isBedrockOnly)
      }
    }
  } catch (e) {
    // در صورت خطای شبکه، از API دوم استفاده می‌کنیم
  }
  return await fetchFallbackMcStatus(ip, isBedrockOnly)
}

async function fetchFallbackMcStatus(ip, isBedrockOnly = false) {
  const endpointFallback = isBedrockOnly
    ? `https://api.mcstatus.io/v2/status/bedrock/${ip}`
    : `https://api.mcstatus.io/v2/status/java/${ip}`
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6500)
    const res = await fetch(endpointFallback, { signal: controller.signal })
    clearTimeout(timer)
    if (res.ok) {
      const data = await res.json()
      if (data && data.online === true && data.players && typeof data.players.online === 'number') {
        return {
          online: true,
          players: data.players.online,
          max: data.players.max || 0,
          label: `${toPersianDigits(data.players.online)} پلیر آنلاین`,
          live: true
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return null
}
