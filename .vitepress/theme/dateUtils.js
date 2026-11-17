// ماژول تبدیل و نرمال‌سازی تاریخ میلادی به شمسی (جلالی) + محاسبه پویا و روزشمار تاریخ دیدگاه‌ها + نرمال‌ساز جستجوی فارسی
// کاملاً سازگار با SSR (Node.js) و مرورگر بدون وابستگی خارجی

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(val) {
  if (val === null || val === undefined) return ''
  return String(val).replace(/\d/g, d => PERSIAN_DIGITS[Number(d)])
}

export function normalizeIsoDate(dateInput) {
  if (!dateInput) return '2026-11-04'
  if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
    return dateInput.toISOString().slice(0, 10)
  }
  const str = String(dateInput).trim()
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (match) return `${match[1]}-${match[2]}-${match[3]}`
  const parsed = new Date(str)
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10)
  }
  return '2026-11-04'
}

function gregorianToJalali(gy, gm, gd) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  let gy2 = gm > 2 ? gy + 1 : gy
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1]
  let jy = -1595 + 33 * Math.floor(days / 12053)
  days %= 12053
  jy += 4 * Math.floor(days / 1461)
  days %= 1461
  if (days > 365) {
    jy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30)
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30)
  return [jy, jm, jd]
}

const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
]

export function formatPersianDate(dateInput) {
  const iso = normalizeIsoDate(dateInput)
  const parts = iso.split('-').map(Number)
  if (parts.length === 3 && !parts.some(isNaN)) {
    const [jy, jm, jd] = gregorianToJalali(parts[0], parts[1], parts[2])
    const monthName = JALALI_MONTHS[jm - 1] || ''
    return `${toPersianDigits(jd)} ${monthName} ${toPersianDigits(jy)}`
  }
  try {
    const d = new Date(iso)
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
  } catch (e) {
    return toPersianDigits(iso)
  }
}

export function getTodayPersianDate() {
  const now = new Date()
  return formatPersianDate(now.toISOString().slice(0, 10))
}

// محاسبه دقیق زمان نسبی دیدگاه‌ها (با گذشت هر روز به صورت خودکار از ۲ روز پیش به ۳ روز پیش و ۴ روز پیش تبدیل می‌شود)
export function formatRelativeTime(createdAt, nowMs = Date.now()) {
  if (!createdAt || isNaN(Number(createdAt))) return 'همین الان'
  const diffMs = Math.max(0, nowMs - Number(createdAt))
  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return 'همین الان'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${toPersianDigits(diffMin)} دقیقه پیش`

  // محاسبه اختلاف روز تقویمی (بر اساس نیمه‌شب محلی) یا ۲۴ ساعت کامل
  const startOfNow = new Date(nowMs)
  startOfNow.setHours(0, 0, 0, 0)
  const startOfCreated = new Date(Number(createdAt))
  startOfCreated.setHours(0, 0, 0, 0)
  const calendarDays = Math.round((startOfNow.getTime() - startOfCreated.getTime()) / 86400000)
  const elapsedDays = Math.floor(diffMs / 86400000)
  const days = Math.max(calendarDays, elapsedDays)

  if (days === 0) {
    const diffHours = Math.max(1, Math.floor(diffMin / 60))
    return `${toPersianDigits(diffHours)} ساعت پیش`
  }
  if (days < 365) {
    return `${toPersianDigits(days)} روز پیش`
  }
  const years = Math.floor(days / 365)
  return `${toPersianDigits(years)} سال پیش`
}

export function normalizeSearchText(text) {
  if (!text) return ''
  return String(text)
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, ' ')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[آأإ]/g, 'ا')
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchesPersianQuery(targetText, rawQuery) {
  if (!rawQuery || !rawQuery.trim()) return true
  const normTarget = normalizeSearchText(targetText)
  const normTargetCompact = normTarget.replace(/\s+/g, '')
  const normQuery = normalizeSearchText(rawQuery)
  const tokens = normQuery.split(' ').filter(Boolean)

  return tokens.every(token => {
    return normTarget.includes(token) || normTargetCompact.includes(token)
  })
}
