import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'fa-IR',
  dir: 'rtl',
  title: 'پلی‌پدیا',
  description: 'مرجع تخصصی سرورها، دانلود ماد، بانک فارم‌ها و رفع ارورهای بازی',
  appearance: 'dark',

  // فعال‌سازی برای جلوگیری از توقف بیلد در صورت وجود لینک‌های خراب یا صفحاتی که بعداً اضافه می‌شوند
  ignoreDeadLinks: false,
  cleanUrls: true,

  // ساخت خودکار نقشه سایت برای گوگل
  sitemap: {
    hostname: 'https://playpedia.ir'
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#1bd96a' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'fa_IR' }],
    ['meta', { property: 'og:site_name', content: 'پلی‌پدیا | مرجع ماینکرفت' }],
    // افزودن استایل فونت وزیرمتن جهت بارگذاری صحیح در همه مرورگرها
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css' }]
  ],

  themeConfig: {
    logo: '/logo.svg',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'جستجو در سایت...', buttonAriaLabel: 'جستجو' },
          modal: {
            noResultsText: 'نتیجه‌ای یافت نشد',
            resetButtonTitle: 'پاک کردن',
            footer: { selectText: 'انتخاب', navigateText: 'جابجایی', closeText: 'بستن' }
          }
        }
      }
    },

    nav: [
      { text: '🏠 صفحه اصلی', link: '/' },
      {
        text: '🖥️ سرورها',
        items: [
          { text: '🌐 لیست سرورهای ایرانی و جهانی', link: '/servers-hub' },
          { text: '💎 راهنمای خرید سرور پولی (VPS)', link: '/paid-servers' },
          { text: '🍩 سرور DonutSMP', link: '/donut-smp' }
        ]
      },
      { text: '📦 مرکز دانلود ماد و شیدر', link: '/mods-hub' },
      { text: '🌾 بانک فارم‌ها', link: '/farms-hub' },
      {
        text: '🛠️ آموزش و راهنما',
        items: [
          { text: '⚠️ مرجع رفع ارورهای بازی و جاوا', link: '/errors-fix' },
          { text: '🚀 مقایسه بهترین لانچرها', link: '/launchers-guide' },
          { text: '💎 راهنمای ماینینگ و بقا ۱.۲۱', link: '/survival-guide' }
        ]
      }
    ],

    sidebar: [
      {
        text: '🖥️ بخش سرورهای ماینکرفت',
        collapsed: false,
        items: [
          { text: '🌐 هاب سرورها (ایرانی و جهانی)', link: '/servers-hub' },
          { text: '💎 راهنمای خرید سرور و هاست پولی', link: '/paid-servers' },
          { text: '🍩 سرور دونات اس‌ام‌پی (DonutSMP)', link: '/donut-smp' }
        ]
      },
      {
        text: '📦 ماد، شیدر و لانچر',
        collapsed: false,
        items: [
          { text: 'مرکز دانلود مادهای Fabric و Forge', link: '/mods-hub' },
          { text: 'مقایسه بهترین لانچرها (امنیت و FPS)', link: '/launchers-guide' }
        ]
      },
      {
        text: '🌾 فارم‌ها و آموزش بقا',
        collapsed: false,
        items: [
          { text: 'بانک جامع فارم‌ها', link: '/farms-hub' },
          { text: 'بهترین ارتفاع دایموند و ندرایت ۱.۲۱', link: '/survival-guide' }
        ]
      },
      {
        text: '⚡ عیب‌یابی و سیستم',
        collapsed: false,
        items: [
          { text: 'مرجع رفع ارورهای ماینکرفت و جاوا', link: '/errors-fix' }
        ]
      }
    ],

    outline: {
      label: 'فهرست مطالب این صفحه',
      level: [2, 3]
    },

    docFooter: {
      prev: 'صفحه قبلی',
      next: 'صفحه بعدی'
    }
  }
})
