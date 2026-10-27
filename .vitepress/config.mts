import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'fa-IR',
  dir: 'rtl',
  title: "پاتوق گیم و ماینکرفت",
  description: "مرجع تخصصی سرورها، دانلود ماد، بانک فارم‌ها و رفع ارورهای بازی",
  appearance: 'force-dark', // قفل کردن روی تم تیره گیمینگ برای ثبات طراحی و سرعت بهتر

  // فعال‌سازی خودکار نقشه سایت برای گوگل سرچ کنسول
  sitemap: {
    hostname: 'https://playpedia.ir'
  },
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    // لود بهینه و غیرمسدودکننده فونت وزیرمتن برای افزایش سرعت بارگذاری موبایل (FCP و LCP)
    [
      'link',
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap',
        onload: "this.onload=null;this.rel='stylesheet'"
      }
    ]
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
          { text: '🌐 لیست سرورهای ایرانی و رایگان (هاب اصلی)', link: '/servers-hub' },
          { text: '🟢 آموزش کامل آترنوس (Aternos)', link: '/aternos' },
          { text: '💎 راهنمای خرید سرور پولی (VPS)', link: '/paid-servers' }
        ]
      },
      { text: '📦 مرکز دانلود ماد و شیدر', link: '/mods-hub' },
      { text: '🌾 بانک فارم‌ها', link: '/farms-hub' },
      {
        text: '🛠️ رفع ارور و آموزش',
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
          { text: '🌐 هاب سرورها (ایرانی + رتبه‌بندی رایگان)', link: '/servers-hub' },
          { text: '🟢 دانشنامه جامع آترنوس (Aternos)', link: '/aternos' },
          { text: '💎 راهنمای خرید سرور و هاست پولی', link: '/paid-servers' }
        ]
      },
      {
        text: '📦 مرکز دانلود (Fabric & Forge)',
        collapsed: false,
        items: [
          { text: 'مادهای FPS، شیدرپک و پیش‌نیازها', link: '/mods-hub' }
        ]
      },
      {
        text: '🌾 بانک فارم‌ها و آموزش بقا',
        collapsed: false,
        items: [
          { text: 'جستجو و رتبه‌بندی فارم‌ها', link: '/farms-hub' },
          { text: 'بهترین ارتفاع دایموند و ندرایت', link: '/survival-guide' }
        ]
      },
      {
        text: '⚡ بهینه‌سازی، لانچر و رفع ارور',
        collapsed: false,
        items: [
          { text: 'مرجع رفع ارورهای ماینکرفت و جاوا', link: '/errors-fix' },
          { text: 'مقایسه بهترین لانچرها (امنیت و FPS)', link: '/launchers-guide' }
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
