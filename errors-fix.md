---
title: "مرجع رفع ارورهای ماینکرفت، جاوا و بهینه‌سازی FPS برای سیستم‌های ضعیف"
description: "حل قطعی رایج‌ترین ارورهای ماینکرفت (Exit Code 1، ارور جاوا، GLFW Error 65542، کرش مادها و...) به همراه ترفندهای افزایش FPS و کاهش پینگ در سرورها."
date: "2026-10-21"
category: "errors"
badge: "رفع ارور و FPS"
isHub: true
---

<script setup>
import { ref, computed } from 'vue'
import { matchesPersianQuery } from './.vitepress/theme/dateUtils.js'

const errorSearch = ref('')

const errorList = [
  {
    code: 'Exit Code: 1 یا -1',
    cause: 'ناسازگاری یکی از مادها یا قدیمی بودن نسخه Java روی ویندوز',
    solution: 'پوشه mods را موقتاً خالی کنید یا مطمئن شوید پیش‌نیازهایی مثل Fabric API نصب هستند و برای نسخه ۱.۲۰.۵ به بالا حتماً Java 21 نصب باشد.',
    link: '/mods-hub',
    linkText: 'دانلود پیش‌نیازهای ماد'
  },
  {
    code: 'GLFW Error 65542 (WGL: The driver does not appear to support OpenGL)',
    cause: 'عدم شناسایی کارت گرافیک (OpenGL) توسط ماینکرفت یا قدیمی بودن درایور',
    solution: 'درایور کارت گرافیک (Intel / Nvidia / AMD) را آپدیت کنید یا فایل opengl32.dll مخصوص سیستم‌های قدیمی را در پوشه bin جاوا قرار دهید.',
    link: '/launchers-guide',
    linkText: 'راهنمای تنظیمات لانچر'
  },
  {
    code: 'Failed to verify username / Not authenticated with Mojang',
    cause: 'تلاش برای ورود با اکانت کرکی (آفلاین) به یک سرور پرمیوم',
    solution: 'اگر سرور شخصی (مثل آترنوس) دارید، در بخش Options تیک گزینه Cracked را فعال کنید. برای سرورهای عمومی از لیست سرورهای کرکی استفاده کنید.',
    link: '/servers-hub#سرورهای-ایرانی',
    linkText: 'لیست سرورهای کرکی'
  },
  {
    code: 'io.netty.channel.AbstractChannel$AnnotatedConnectException: Connection timed out',
    cause: 'اختلال اینترنت، فیلترینگ آی‌پی سرور یا بسته بودن پورت در فایروال',
    solution: 'از دی‌ان‌اس‌های گیمینگ استفاده کنید یا در آترنوس به جای آی‌پی معمولی، با آدرس DynIP (آی‌پی پویا همراه با پورت) وارد شوید.',
    link: '/aternos',
    linkText: 'آموزش DynIP آترنوس'
  },
  {
    code: 'java.lang.OutOfMemoryError: Java heap space',
    cause: 'کم بودن مقدار رم (RAM) اختصاص داده‌شده به بازی در تنظیمات لانچر',
    solution: 'در تنظیمات لانچر، مقدار Maximum Memory Allocation را به ۳ الی ۴ گیگابایت (4096MB) افزایش دهید و ماد FerriteCore را نصب کنید.',
    link: '/mods-hub',
    linkText: 'دانلود ماد FerriteCore'
  },
  {
    code: 'Incompatible FML modded server / Mismatched mod channel list',
    cause: 'عدم تطابق نسخه دقیق مادهای کلاینت شما با مادهای نصب‌شده روی سرور',
    solution: 'لیست و ورژن دقیق تمام فایل‌های داخل پوشه mods سیستم شما باید مو به مو با مادهای سرور یکسان باشد.',
    link: '/aternos',
    linkText: 'راهنمای ماد در سرور'
  }
]

const filteredErrors = computed(() => {
  if (!errorSearch.value.trim()) return errorList
  return errorList.filter(item => {
    const haystack = `${item.code} ${item.cause} ${item.solution}`
    return matchesPersianQuery(haystack, errorSearch.value)
  })
})
</script>

# ⚡ مرکز رفع ارورهای ماینکرفت و بهینه‌سازی سیستم (حل قطعی کرش‌ها)

آیا هنگام اجرای ماینکرفت با ارورهای عجیب **Exit Code 1**، خطای **GLFW** یا کرش کردن ناگهانی بازی روبه‌رو می‌شوید؟ یا هنگام اتصال به سرورها پینگ بالایی دارید؟ در این مرجع تخصصی، راه‌حل قطعی تمام ارورهای رایج بازی و لانچرها را به زبان ساده آماده کرده‌ایم.

::: tip 💡 قبل از هر چیز: لانچر خود را بررسی کنید!
بسیاری از کرش‌های بی‌دلیل بازی به خاطر باگ‌های داخلی لانچرهای قدیمی است. پیشنهاد می‌کنیم حتماً راهنمای **[مقایسه بهترین لانچرهای ماینکرفت و جایگزین‌های امن](/launchers-guide)** را مطالعه کنید.
:::

---

## ۱. عیب‌یاب هوشمند و جدول حل سریع ارورهای ماینکرفت

کد خطا یا متن ارور خود را در کادر زیر جستجو کنید تا علت و راه‌حل فوری آن نمایش داده شود:

<div class="mc-filter-bar">
  <input
    v-model="errorSearch"
    type="search"
    class="mc-search-input"
    placeholder="🔍 کد خطا یا مشکل را تایپ کنید (مثلاً: Exit Code 1، GLFW، Timed Out، رم، جاوا، کرکی)..."
    aria-label="جستجوی کد خطا یا ارور ماینکرفت"
  />
  <button v-if="errorSearch" @click="errorSearch = ''" type="button" class="mc-btn mc-btn-glass" style="cursor: pointer;">پاک کردن</button>
</div>

<div v-if="filteredErrors.length > 0" class="mc-item-list" style="margin-bottom: 28px;">
  <div v-for="(err, idx) in filteredErrors" :key="idx" class="mc-list-item" style="align-items: flex-start;">
    <div class="mc-item-info" style="align-items: flex-start;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px;">
          <code class="mc-ip-code" style="direction: ltr;">{{ err.code }}</code>
          <span class="mc-tag mc-tag-red">علت: {{ err.cause }}</span>
        </div>
        <p style="color: var(--mc-text-body) !important; font-size: 13.5px !important;">
          <strong>راه‌حل قطعی:</strong> {{ err.solution }}
        </p>
      </div>
    </div>
    <a :href="err.link" class="mc-btn mc-btn-glass" style="white-space: nowrap; flex-shrink: 0;">{{ err.linkText }} ←</a>
  </div>
</div>
<div v-else class="mc-empty-state" style="margin-bottom: 28px;">
  اروری با عبارت «{{ errorSearch }}» در جدول پیدا نشد. می‌توانید متن ارور خود را در بخش دیدگاه‌های پایین صفحه ارسال کنید.
</div>

---

## ۲. کدام نسخه جاوا (Java) برای کدام نسخه ماینکرفت لازم است؟

یکی از دلایل اصلی باز نشدن بازی، نصب نبودن نسخه صحیح جاوا روی ویندوز است:
* **ماینکرفت 1.20.5 تا 1.21+ (جدیدترین نسخه‌ها):** نیازمند **Java 21** (نسخه ۶۴ بیتی).
* **ماینکرفت 1.18 تا 1.20.4:** نیازمند **Java 17**.
* **ماینکرفت 1.17:** نیازمند **Java 16**.
* **ماینکرفت 1.16.5 و قدیمی‌تر (مثل 1.8.9 و 1.12.2):** نیازمند **Java 8**.

---

## ۳. ترفندهای طلایی افزایش FPS برای سیستم‌های بسیار ضعیف

اگر سیستم یا لپ‌تاپ ضعیفی دارید و فریم‌ریت شما زیر ۳۰ است، این تنظیمات را به ترتیب انجام دهید:

1. **خداحافظی با OptiFine در نسخه‌های جدید:** به جای اپتی‌فاین، موتور **Fabric** را نصب کرده و سه ماد **Sodium**، **Lithium** و **FerriteCore** را از **[مرکز دانلود ماد و شیدرپک](/mods-hub)** دریافت و نصب کنید.
2. **تنظیمات گرافیکی داخل بازی (Video Settings):**
   * مقدار **Render Distance** را روی `6` یا `8` چانک بگذارید.
   * مقدار **Simulation Distance** را روی `5` قرار دهید.
   * گزینه **VSync** را خاموش (`OFF`) کنید و **Max Framerate** را روی `Unlimited` بگذارید.
   * گزینه **Biome Blend** را روی کمترین مقدار ممکن قرار دهید.

---

## ۴. راهنماهای مرتبط با بهینه‌سازی و لانچر

<div class="mc-item-list" style="margin: 16px 0 28px;">
  <a href="/launchers-guide" class="mc-list-item">
    <div class="mc-item-info">
      <div class="mc-doc-bullet"></div>
      <div>
        <h3>مقایسه بهترین لانچرهای ماینکرفت (۲۰۲۶)؛ بررسی امنیت TLauncher و معرفی جایگزین‌ها</h3>
        <p>معرفی Prism Launcher، Legacy Launcher و Lunar Client برای بالاترین امنیت و بیشترین FPS.</p>
      </div>
    </div>
    <span class="mc-tag mc-tag-blue">امنیت و FPS</span>
  </a>
  <a href="/mods-hub" class="mc-list-item">
    <div class="mc-item-info">
      <div class="mc-doc-bullet"></div>
      <div>
        <h3>مرکز دانلود مادهای بهینه‌ساز (Sodium، Lithium و FerriteCore)</h3>
        <p>افزایش ۳۰۰ درصدی فریم‌ریت و کاهش ۴۵ درصدی مصرف رم روی سیستم‌های ضعیف.</p>
      </div>
    </div>
    <span class="mc-tag mc-tag-green">افزایش FPS</span>
  </a>
</div>

## 💬 ارور شما در این صفحه نیست؟

متن دقیق ارور یا لاگ کرش (Crash Report) خود را در **جعبه نظرات پایین همین صفحه** بنویسید تا در سریع‌ترین زمان ممکن راه‌حل آن را به شما بگوییم!
