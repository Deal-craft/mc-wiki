import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'fa-IR',
  dir: 'rtl',
  title: "ویکی ماینکرفت ایران",
  description: "مرجع تخصصی آموزش، دانلود ماد، شیدرپک و سرورهای ماینکرفت",
  
  head: [
    ['link', { rel: 'icon', href: 'https://minecraft.wiki/images/Grass_Block_JE7_BE6.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    // لوگوی بالای سایت (کنار عنوان)
    logo: 'https://minecraft.wiki/images/Grass_Block_JE7_BE6.png',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'جستجو در ویکی...', buttonAriaLabel: 'جستجو' },
          modal: {
            noResultsText: 'نتیجه‌ای یافت نشد',
            resetButtonTitle: 'پاک کردن',
            footer: { selectText: 'انتخاب', navigateText: 'جابجایی', closeText: 'بستن' }
          }
        }
      }
    },

    // منوی بالای سایت (با قابلیت زیرمنو برای سرورهای رایگان و پولی)
    nav: [
      { text: '🏠 صفحه اصلی', link: '/' },
      {
        text: '🖥️ سرورهای ماینکرفت',
        items: [
          { text: '🟢 سرورهای رایگان (آترنوس و...)', link: '/markdown-examples' },
          { text: '💎 سرورها و هاست‌های پولی (VPS)', link: '/paid-servers' }
        ]
      },
      { text: '📦 دانلود ماد و شیدر', link: '/api-examples' },
      { text: '🚀 لانچرها و رفع ارور', link: '/launchers-guide' }
    ],

    // منوی دسته‌بندی سمت راست (کتگوری‌های کامل سایت)
    sidebar: [
      {
        text: '🖥️ بخش سرورهای ماینکرفت',
        collapsed: false,
        items: [
          { text: '🟢 ساخت سرور رایگان (نقد آترنوس)', link: '/markdown-examples' },
          { text: '💎 راهنمای خرید سرور و هاست پولی', link: '/paid-servers' }
        ]
      },
      {
        text: '🚀 لانچر، اکانت و رفع ارور',
        collapsed: false,
        items: [
          { text: 'مقایسه بهترین لانچرها (امنیت و FPS)', link: '/launchers-guide' }
        ]
      },
      {
        text: '📦 مرکز دانلود (ماد و شیدر)',
        collapsed: false,
        items: [
          { text: 'بهترین مادهای FPS و شیدرپک‌ها', link: '/api-examples' }
        ]
      }
    ],

    outline: {
      label: 'فهرست مطالب این مقاله',
      level: [2, 3]
    },

    docFooter: {
      prev: 'مقاله قبلی',
      next: 'مقاله بعدی'
    }
  }
})
