---
title: "مرکز دانلود ماد و شیدرپک ماینکرفت (دسته‌بندی Fabric، Forge و OptiFine)"
description: "دانلود مستقیم بهترین مادهای ماینکرفت به تفکیک Fabric و Forge: مادهای افزایش FPS (مقایسه Sodium و OptiFine)، شیدرپک‌ها و مادهای پیش‌نیاز ضروری."
date: "2026-10-18"
isHub: true
---

<script setup>
import { ref, computed } from 'vue'
import { matchesPersianQuery } from './.vitepress/theme/dateUtils.js'

const activeLoader = ref('all')
const modSearch = ref('')

const allMods = [
  {
    name: 'Fabric API',
    loader: 'fabric',
    loaderLabel: 'Fabric',
    desc: 'کتابخانه اصلی که ۹۹٪ مادهای فابریک بدون آن کار نمی‌کنند.',
    dep: 'ندارد (خودش پیش‌نیاز بقیه است)',
    link: 'https://modrinth.com/mod/fabric-api',
    keywords: 'فابریک ای پی آی پیش نیاز fabric api'
  },
  {
    name: 'Sodium (سودیوم)',
    loader: 'fabric',
    loaderLabel: 'Fabric',
    desc: 'بازنویسی کامل موتور گرافیکی بازی و افزایش ۳۰۰ درصدی FPS.',
    dep: 'نیاز به Fabric API دارد',
    link: 'https://modrinth.com/mod/sodium',
    keywords: 'سودیوم افزایش اف پی اس فریم ریت رفع لگ sodium fps'
  },
  {
    name: 'Iris Shaders (آیریس شیدر)',
    loader: 'fabric',
    loaderLabel: 'Fabric',
    desc: 'اضافه کردن منوی Shader Packs برای اجرای شیدرها روی سودیوم.',
    dep: 'حتمی: باید ماد Sodium کنارش در پوشه mods باشد!',
    link: 'https://modrinth.com/mod/iris',
    keywords: 'آیریس شیدرپک شیدر فابریک iris shaders'
  },
  {
    name: 'Lithium (لیتیوم)',
    loader: 'fabric',
    loaderLabel: 'Fabric',
    desc: 'بهینه‌سازی فیزیک بازی، هوش مصنوعی ماب‌ها و کاهش لگ چانک‌ها و سرور.',
    dep: 'نیاز به پیش‌نیاز ندارد',
    link: 'https://modrinth.com/mod/lithium',
    keywords: 'لیتیوم بهینه سازی چانک سرور تیک ریت lithium'
  },
  {
    name: 'Indium (ایندیوم)',
    loader: 'fabric',
    loaderLabel: 'Fabric',
    desc: 'رفع باگ نمایش بلوک‌ها هنگام استفاده هم‌زمان از Sodium و مادهای گرافیکی دیگر.',
    dep: 'نیاز به Sodium و Fabric API دارد',
    link: 'https://modrinth.com/mod/indium',
    keywords: 'ایندیوم مکمل سودیوم indium'
  },
  {
    name: 'OptiFine HD (اپتی‌فاین)',
    loader: 'forge',
    loaderLabel: 'Forge / مستقل',
    desc: 'اضافه کردن تنظیمات گرافیکی پیشرفته، شیدرپک و زوم کردن با کلید C به بازی.',
    dep: 'مستقل یا داخل پوشه mods در Forge (با Sodium ناسازگار است!)',
    link: 'https://optifine.net/downloads',
    keywords: 'اپتی فاین اپتیفاین زوم شیدر optifine hd'
  },
  {
    name: 'Embeddium (امبدیوم)',
    loader: 'forge',
    loaderLabel: 'Forge',
    desc: 'نسخه پورت‌شده و فوق‌العاده قوی ماد سودیوم مخصوص بازیکنان Forge!',
    dep: 'جایگزین عالی OptiFine در Forge (بدون کرش کردن مادپک‌ها)',
    link: 'https://modrinth.com/mod/embeddium',
    keywords: 'امبدیوم سودیوم فورج افزایش اف پی اس embeddium forge'
  },
  {
    name: 'Oculus (آکیولوس)',
    loader: 'forge',
    loaderLabel: 'Forge',
    desc: 'اجرای تمام شیدرپک‌ها در Forge (در کنار ماد Embeddium).',
    dep: 'حتمی: باید ماد Embeddium کنارش نصب باشد!',
    link: 'https://modrinth.com/mod/oculus',
    keywords: 'آکیولوس شیدر فورج oculus shaders forge'
  },
  {
    name: 'FerriteCore (فرایت‌کور)',
    loader: 'both',
    loaderLabel: 'Fabric & Forge',
    desc: 'کاهش ۴۵ درصدی مصرف رم (RAM)؛ ضروری برای سیستم‌های ۴ و ۸ گیگابایت رم.',
    dep: 'بدون پیش‌نیاز',
    link: 'https://modrinth.com/mod/ferrite-core',
    keywords: 'فرایت کور کاهش مصرف رم سیستم ضعیف ferritecore ram'
  },
  {
    name: "Xaero's Minimap & World Map",
    loader: 'both',
    loaderLabel: 'Fabric & Forge',
    desc: 'نمایش مینی‌مپ زنده بالای صفحه، ماب‌ها و قابلیت ثبت مختصات خانه (Waypoint).',
    dep: 'پیشنهادی: نصب هم‌زمان Minimap و World Map',
    link: 'https://modrinth.com/mod/xaeros-minimap',
    keywords: 'مینی مپ نقشه وی پوینت xaero minimap world map'
  },
  {
    name: 'Just Enough Items (JEI / REI)',
    loader: 'both',
    loaderLabel: 'Fabric & Forge',
    desc: 'نمایش طرز ساخت (Crafting Recipe) تمام آیتم‌های بازی و مادها در کنار اینونتوری.',
    dep: 'بدون پیش‌نیاز در Forge / نسخه REI در Fabric',
    link: 'https://modrinth.com/mod/jei',
    keywords: 'طرز ساخت آیتم ها کرفتینگ jei rei just enough items'
  }
]

const filteredMods = computed(() => {
  return allMods.filter(m => {
    const matchLoader =
      activeLoader.value === 'all' ||
      m.loader === 'both' ||
      m.loader === activeLoader.value
    const haystack = `${m.name} ${m.loaderLabel} ${m.desc} ${m.dep} ${m.keywords}`
    return matchLoader && matchesPersianQuery(haystack, modSearch.value)
  })
})
</script>

# 📦 مرکز جامع دانلود ماد و شیدرپک (به تفکیک لودر و کاربرد)

در این مرکز، تمام مادهای ضروری ماینکرفت بر اساس **موتور اجرا (Fabric، Forge یا OptiFine)** و **کاربرد آن‌ها** دسته‌بندی شده‌اند. همچنین در مقابل هر ماد، **مادهای پیش‌نیاز (Dependencies)** که باید در کنار آن نصب کنید را دقیق مشخص کرده‌ایم تا بازی شما هرگز کرش نکند!

## جستجو و فیلتر سریع در بانک مادها

<div class="mc-filter-bar">
<input
  v-model="modSearch"
  type="search"
  class="mc-search-input"
  placeholder="🔍 جستجوی نام ماد یا کاربرد (مثلاً: سودیوم، Sodium، شیدر، کاهش رم، مینی‌مپ، OptiFine)..."
  aria-label="جستجو در بانک مادها"
/>
<button @click="activeLoader = 'all'" type="button" :class="['mc-btn', activeLoader === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">📦 همه لودرها</button>
<button @click="activeLoader = 'fabric'" type="button" :class="['mc-btn', activeLoader === 'fabric' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">🧵 مخصوص Fabric</button>
<button @click="activeLoader = 'forge'" type="button" :class="['mc-btn', activeLoader === 'forge' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">🔨 مخصوص Forge / OptiFine</button>
</div>

<!-- نتایج جستجوی سریع در مادها -->
<div v-if="modSearch.trim().length > 0" style="margin-bottom: 28px;">
  <div v-if="filteredMods.length > 0" class="mc-item-list">
    <div v-for="mod in filteredMods" :key="mod.name" class="mc-list-item">
      <div class="mc-item-info">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
            <h3 style="margin: 0 !important;">{{ mod.name }}</h3>
            <span class="mc-tag mc-tag-green">{{ mod.loaderLabel }}</span>
            <span class="mc-tag mc-tag-amber">پیش‌نیاز: {{ mod.dep }}</span>
          </div>
          <p>{{ mod.desc }}</p>
        </div>
      </div>
      <a :href="mod.link" target="_blank" rel="noopener noreferrer" class="mc-btn mc-btn-primary" style="white-space: nowrap;">
        دانلود از سایت مرجع ↗
      </a>
    </div>
  </div>
  <div v-else class="mc-empty-state">
    مادی با عبارت «{{ modSearch }}» در این بخش پیدا نشد.
  </div>
</div>

---

<div v-if="activeLoader === 'all' || activeLoader === 'fabric'">

## ۱. بخش مادهای افزایش FPS و شیدر (مخصوص Fabric) ⚡

اگر می‌خواهید در نسخه‌های جدید ماینکرفت (1.16 تا 1.21) بالاترین فریم‌ریت ممکن را بگیرید، ترکیب زیر **جایگزین مدرن و بسیار قوی‌تر OptiFine** است:

| نام ماد | کاربرد و توضیح دقیق | ⚠️ ماد پیش‌نیاز (حتماً کنارش نصب شود!) | لینک دانلود و سایت مرجع |
| :--- | :--- | :--- | :--- |
| **Fabric API** | کتابخانه اصلی که ۹۹٪ مادهای فابریک بدون آن کار نمی‌کنند. | ندارد (خودش پیش‌نیاز بقیه است) | [دانلود از Modrinth](https://modrinth.com/mod/fabric-api) |
| **Sodium (سودیوم)** | بازنویسی کامل موتور گرافیکی بازی و **افزایش ۳۰۰ درصدی FPS**. | نیاز به **Fabric API** دارد | [دانلود از Modrinth](https://modrinth.com/mod/sodium) |
| **Iris Shaders** | اضافه کردن منوی **Shader Packs** برای اجرای شیدرها روی سودیوم. | **حتمی:** باید ماد **Sodium** کنارش در پوشه mods باشد! | [دانلود از Modrinth](https://modrinth.com/mod/iris) |
| **Lithium (لیتیوم)** | بهینه‌سازی فیزیک بازی، هوش مصنوعی ماب‌ها و کاهش لگ چانک‌ها. | نیاز به پیش‌نیاز ندارد | [دانلود از Modrinth](https://modrinth.com/mod/lithium) |
| **Indium** | رفع باگ نمایش بلوک‌ها هنگام استفاده هم‌زمان از Sodium و مادهای دیگر. | نیاز به **Sodium** و **Fabric API** دارد | [دانلود از Modrinth](https://modrinth.com/mod/indium) |

</div>

---

<div v-if="activeLoader === 'all' || activeLoader === 'forge'">

## ۲. بخش افزایش FPS و گرافیک با OptiFine و Forge 🔨

اگر مادپک‌های سنگین **Forge** بازی می‌کنید یا به منوی کلاسیک **OptiFine** (مثل زوم کردن با کلید C و نور داینامیک مشعل در دست) عادت دارید، از این جدول استفاده کنید:

| نام ماد | کاربرد و توضیح دقیق | ⚠️ پیش‌نیاز و نکات سازگاری | لینک دانلود و سایت مرجع |
| :--- | :--- | :--- | :--- |
| **OptiFine HD** | اضافه کردن تنظیمات گرافیکی پیشرفته، شیدرپک و زوم کردن به بازی. | به صورت مستقل یا داخل پوشه `mods` در Forge نصب می‌شود (**با Sodium ناسازگار است!**) | [سایت رسمی OptiFine](https://optifine.net/downloads) |
| **Embeddium** | نسخه پورت‌شده و فوق‌العاده قویِ ماد سودیوم مخصوص بازیکنان **Forge**! | جایگزین عالی OptiFine در Forge (بدون کرش کردن مادپک‌ها) | [دانلود از Modrinth](https://modrinth.com/mod/embeddium) |
| **Oculus** | اجرای تمام شیدرپک‌ها در Forge (در کنار ماد Embeddium). | **حتمی:** باید ماد **Embeddium** کنارش نصب باشد! | [دانلود از Modrinth](https://modrinth.com/mod/oculus) |
| **FerriteCore** | کاهش ۴۵ درصدی مصرف رم (RAM)؛ موجود برای هر دو نسخه **Forge و Fabric**. | بدون پیش‌نیاز | [دانلود از Modrinth](https://modrinth.com/mod/ferrite-core) |

</div>

---

## ۳. مادهای کاربردی بقا، نقشه و رابط کاربری (HUD & Minimap) 🗺️

این مادها برای هر دو لودر **Fabric** و **Forge** منتشر شده‌اند (هنگام دانلود، نسخه مطابق با لودر خود را انتخاب کنید):

* **ماد Xaero's Minimap (مینی‌مپ بالای صفحه):** نمایش نقشه زنده اطراف شما، ماب‌ها و قابلیت ثبت مختصات خانه (Waypoint).
  * *ماد مکمل پیشنهادی:* حتماً کنارش ماد **Xaero's World Map** را هم نصب کنید تا با زدن کلید `M` نقشه کل جهان بازی باز شود! -> [صفحه دانلود در Modrinth](https://modrinth.com/mod/xaeros-minimap)
* **ماد Just Enough Items (JEI / REI):** نمایش طرز ساخت (Crafting Recipe) تمام آیتم‌های بازی و مادها در کنار اینونتوری. -> [صفحه دانلود در Modrinth](https://modrinth.com/mod/jei)

<HubArticles category="mods" title="📦 جدیدترین مقالات ماد، شیدرپک و لانچر" placeholder="🔍 جستجو در مقالات ماد، شیدر و لانچر..." />
