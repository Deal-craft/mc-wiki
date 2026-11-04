import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'fa-IR',
  dir: 'rtl',
  title: 'پلی‌پدیا',
  description: 'مرجع تخصصی سرورها، دانلود ماد، بانک فارم‌ها و رفع ارورهای ماینکرفت',
  appearance: 'dark',

  ignoreDeadLinks: false,
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://playpedia.ir'
  },

  transformHead({ pageData }) {
    const cleanPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = `https://playpedia.ir/${cleanPath}`
    const pageTitle = pageData.frontmatter.title || pageData.title || 'پلی‌پدیا | مرجع تخصصی ماینکرفت'
    const pageDesc = pageData.frontmatter.description || pageData.description || 'مرجع تخصصی سرورها، دانلود ماد، بانک فارم‌ها و رفع ارورهای بازی'

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: 'https://playpedia.ir/og-cover.png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: 'https://playpedia.ir/og-cover.png' }]
    ]
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'fa_IR' }],
    ['meta', { property: 'og:site_name', content: 'پلی‌پدیا | مرجع ماینکرفت' }],
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'پلی‌پدیا (PlayPedia)',
        url: 'https://playpedia.ir',
        description: 'مرجع تخصصی سرورهای ماینکرفت، دانلود ماد و شیدرپک، بانک فارم‌ها و رفع ارورهای بازی'
      })
    ]
  ],

  themeConfig: {
    logo: '/logo.svg',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'جستجو...', buttonAriaLabel: 'جستجو' },
          modal: {
            noResultsText: 'نتیجه‌ای یافت نشد',
            resetButtonTitle: 'پاک کردن',
            footer: { selectText: 'انتخاب', navigateText: 'جابجایی', closeText: 'بستن' }
          }
        }
      }
    },

    nav: [
      { text: 'صفحه اصلی', link: '/' },
      {
        text: 'سرورها',
        items: [
          { text: 'لیست سرورها (ایرانی و جهانی)', link: '/servers-hub' },
          { text: 'سرور هایپیکسل (Hypixel)', link: '/hypixel' },
          { text: 'سرور دونات (DonutSMP)', link: '/donut-smp' },
          { text: 'ساخت سرور رایگان (Aternos)', link: '/aternos' },
          { text: 'راهنمای خرید سرور VPS', link: '/paid-servers' }
        ]
      },
      { text: 'دانلود ماد و شیدر', link: '/mods-hub' },
      {
        text: 'بانک فارم‌ها',
        items: [
          { text: 'جستجو در بانک فارم‌ها', link: '/farms-hub' },
          { text: 'فارم آهن ۱.۲۱ (جاوا و بدراک)', link: '/iron-farm' },
          { text: 'فارم طلا و XP سقف ندر', link: '/gold-xp-farm' },
          { text: 'فارم XP اندرمن (۴۵ ثانیه)', link: '/enderman-xp-farm' },
          { text: 'فارم باروت و کریپر', link: '/creeper-farm' }
        ]
      },
      {
        text: 'آموزش و رفع ارور',
        items: [
          { text: 'مرجع رفع ارورهای بازی و جاوا', link: '/errors-fix' },
          { text: 'مقایسه بهترین لانچرها', link: '/launchers-guide' },
          { text: 'راهنمای ماینینگ ۱.۲۱', link: '/survival-guide' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'سرورهای ماینکرفت',
        collapsed: false,
        items: [
          { text: 'لیست سرورها (ایرانی و جهانی)', link: '/servers-hub' },
          { text: 'سرور هایپیکسل (Hypixel)', link: '/hypixel' },
          { text: 'سرور دونات (DonutSMP)', link: '/donut-smp' },
          { text: 'ساخت سرور رایگان آترنوس', link: '/aternos' },
          { text: 'راهنمای خرید سرور پولی (VPS)', link: '/paid-servers' }
        ]
      },
      {
        text: 'فارم‌ها و آموزش بقا',
        collapsed: false,
        items: [
          { text: 'بانک جامع فارم‌ها', link: '/farms-hub' },
          { text: 'آموزش ساخت فارم آهن ۱.۲۱', link: '/iron-farm' },
          { text: 'مگا فارم طلا و XP سقف ندر', link: '/gold-xp-farm' },
          { text: 'فارم XP اندرمن در End', link: '/enderman-xp-farm' },
          { text: 'فارم باروت و کریپر', link: '/creeper-farm' },
          { text: 'بهترین ارتفاع دایموند و ندرایت', link: '/survival-guide' }
        ]
      },
      {
        text: 'ماد، شیدر و لانچر',
        collapsed: false,
        items: [
          { text: 'دانلود مادهای Fabric و Forge', link: '/mods-hub' },
          { text: 'مقایسه بهترین لانچرها', link: '/launchers-guide' },
          { text: 'رفع ارورهای ماینکرفت و جاوا', link: '/errors-fix' }
        ]
      }
    ],

    outline: {
      label: 'در این صفحه',
      level: [2, 3]
    },

    lastUpdated: {
      text: 'بروزرسانی'
    },

    docFooter: {
      prev: 'صفحه قبلی',
      next: 'صفحه بعدی'
    }
  }
})
