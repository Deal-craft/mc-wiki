import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "MC Wiki",
  
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    logo: 'https://minecraft.wiki/images/Grass_Block_JE7_BE6.png',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: 'جستجو در مقالات و مادها...', buttonAriaLabel: 'جستجو' },
              modal: {
                noResultsText: 'نتیجه‌ای یافت نشد برای',
                resetButtonTitle: 'پاک کردن',
                footer: { selectText: 'انتخاب', navigateText: 'جابجایی', closeText: 'بستن' }
              }
            }
          }
        }
      }
    }
  },

  // تنظیمات دوزبانه (فارسی به عنوان زبان اصلی + انگلیسی)
  locales: {
    root: {
      label: 'فارسی',
      lang: 'fa-IR',
      dir: 'rtl',
      title: 'ویکی ماینکرفت',
      description: 'مرجع تخصصی آموزش، مادپک، اکانت و ترفندهای ماینکرفت',
      themeConfig: {
        nav: [
          { text: 'صفحه اصلی', link: '/' },
          { text: 'آموزش‌ها و ترفندها', link: '/markdown-examples' },
          { text: 'دانلود ماد و شیدر', link: '/api-examples' }
        ],
        sidebar: [
          {
            text: 'راهنمای جامع ماینکرفت',
            items: [
              { text: 'رفع ارورهای لانچر و بن', link: '/markdown-examples' },
              { text: 'مرکز دانلود ماد و شیدرپک', link: '/api-examples' }
            ]
          }
        ],
        outline: { label: 'در این صفحه می‌خوانید:' },
        docFooter: { prev: 'مطلب قبلی', next: 'مطلب بعدی' },
        darkModeSwitchLabel: 'تم شب/روز',
        sidebarMenuLabel: 'منو',
        returnToTopLabel: 'بازگشت به بالا'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      dir: 'ltr',
      title: 'Minecraft Wiki',
      description: 'Ultimate guide for Minecraft mods, errors, and mechanics',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guides & Fixes', link: '/en/guides' }
        ]
      }
    }
  }
})