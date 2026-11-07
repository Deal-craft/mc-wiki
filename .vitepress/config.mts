import { defineConfig } from 'vitepress'

const SITE_URL = 'https://playpedia.ir'
const SITE_NAME = 'پلی‌پدیا | مرجع تخصصی ماینکرفت'

const CATEGORY_INFO: Record<string, { name: string; url: string }> = {
  servers: { name: 'هاب سرورهای ماینکرفت', url: `${SITE_URL}/servers-hub` },
  farms: { name: 'بانک جامع فارم‌های ماینکرفت', url: `${SITE_URL}/farms-hub` },
  mods: { name: 'مرکز دانلود ماد و شیدرپک', url: `${SITE_URL}/mods-hub` },
  errors: { name: 'مرجع رفع ارور و بهینه‌سازی', url: `${SITE_URL}/errors-fix` }
}

function normalizeDateStr(input: unknown): string {
  if (!input) return '2026-11-04'
  if (input instanceof Date && !isNaN(input.getTime())) {
    return input.toISOString().slice(0, 10)
  }
  const s = String(input).trim()
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[1]}-${m[2]}-${m[3]}` : '2026-11-04'
}

export default defineConfig({
  lang: 'fa-IR',
  dir: 'rtl',
  title: 'پلی‌پدیا',
  titleTemplate: ':title | پلی‌پدیا',
  description: 'مرجع تخصصی سرورهای ماینکرفت با تعداد دقیق پلیر آنلاین، دانلود مادهای Fabric و Forge، بانک فارم‌های ۱.۲۱ و رفع ارورهای بازی',
  appearance: 'dark',

  ignoreDeadLinks: false,
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      return items
        .filter(item => {
          const u = item.url.replace(/\/$/, '')
          return !['404', 'api-examples', 'markdown-examples'].some(ex => u.endsWith(ex))
        })
        .map(item => ({
          ...item,
          changefreq: item.url === '' ? 'daily' : 'weekly',
          priority: item.url === '' ? 1.0 : item.url.includes('-hub') ? 0.9 : 0.8
        }))
    }
  },

  transformPageData(pageData) {
    // جلوگیری از تکرار "| پلی‌پدیا" در تگ <title> صفحاتی که خودشان نام برند را دارند
    const rawTitle = pageData.frontmatter.title || pageData.title || ''
    if (rawTitle.includes('پلی‌پدیا')) {
      pageData.frontmatter.titleTemplate = ':title'
    }
  },

  transformHead({ pageData }) {
    const cleanPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : `${SITE_URL}/`
    const pageTitle = pageData.frontmatter.title || pageData.title || SITE_NAME
    const pageDesc =
      pageData.frontmatter.description ||
      pageData.description ||
      'مرجع تخصصی سرورها، دانلود ماد، بانک فارم‌ها و رفع ارورهای ماینکرفت'
    const isoDate = normalizeDateStr(pageData.frontmatter.date)
    const isHome = cleanPath === ''
    const isHub = Boolean(pageData.frontmatter.isHub)
    const is404 = cleanPath === '404'
    const isArticle = !isHome && !isHub && !is404
    const catKey = String(pageData.frontmatter.category || '')
    const catMeta = CATEGORY_INFO[catKey]

    const headTags: Array<[string, Record<string, string>, string?]> = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: `${SITE_URL}/og-cover.png` }],
      ['meta', { property: 'og:image:alt', content: pageTitle }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: `${SITE_URL}/og-cover.png` }]
    ]

    if (is404) {
      headTags.push(['meta', { name: 'robots', content: 'noindex, follow' }])
      return headTags
    }

    if (isArticle) {
      headTags.push(
        ['meta', { property: 'article:published_time', content: `${isoDate}T08:00:00+03:30` }],
        ['meta', { property: 'article:modified_time', content: `${isoDate}T12:00:00+03:30` }]
      )
      if (catMeta) {
        headTags.push(['meta', { property: 'article:section', content: catMeta.name }])
      }
    }

    // ۱. اسکیمای مسیر راهنما (BreadcrumbList JSON-LD) برای تمام صفحات داخلی
    if (!isHome) {
      const breadcrumbItems: Array<Record<string, unknown>> = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'پلی‌پدیا',
          item: `${SITE_URL}/`
        }
      ]
      if (isArticle && catMeta) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: catMeta.name,
          item: catMeta.url
        })
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: pageTitle,
          item: canonicalUrl
        })
      } else {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: pageTitle,
          item: canonicalUrl
        })
      }

      headTags.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems
        })
      ])
    }

    // ۲. اسکیمای TechArticle برای صفحات مقاله و CollectionPage برای صفحات هاب
    if (isArticle) {
      headTags.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: pageTitle,
          description: pageDesc,
          image: [`${SITE_URL}/og-cover.png`],
          datePublished: `${isoDate}T08:00:00+03:30`,
          dateModified: `${isoDate}T12:00:00+03:30`,
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'تحریریه پلی‌پدیا (PlayPedia)',
            url: SITE_URL
          },
          publisher: {
            '@type': 'Organization',
            name: 'پلی‌پدیا (PlayPedia)',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/android-chrome-512x512.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
          }
        })
      ])
    } else if (isHub) {
      headTags.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: pageTitle,
          description: pageDesc,
          url: canonicalUrl,
          inLanguage: 'fa-IR',
          isPartOf: {
            '@type': 'WebSite',
            name: 'پلی‌پدیا (PlayPedia)',
            url: SITE_URL
          }
        })
      ])
    }

    return headTags
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
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
        alternateName: 'PlayPedia Minecraft Wiki',
        url: SITE_URL,
        inLanguage: 'fa-IR',
        description: 'مرجع تخصصی سرورهای ماینکرفت، دانلود ماد و شیدرپک، بانک فارم‌ها و رفع ارورهای بازی',
        publisher: {
          '@type': 'Organization',
          name: 'پلی‌پدیا (PlayPedia)',
          url: SITE_URL,
          logo: `${SITE_URL}/logo.svg`
        }
      })
    ]
  ],

  themeConfig: {
    logo: { src: '/logo.svg', alt: 'لوگوی پلی‌پدیا' },

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            processTerm: (term: string) =>
              term
                .toLowerCase()
                .replace(/[\u200B-\u200D\uFEFF]/g, '')
                .replace(/ي/g, 'ی')
                .replace(/ك/g, 'ک')
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        translations: {
          button: { buttonText: 'جستجو در ویکی...', buttonAriaLabel: 'جستجو در پلی‌پدیا' },
          modal: {
            displayDetails: 'نمایش جزئیات',
            noResultsText: 'نتیجه‌ای یافت نشد',
            resetButtonTitle: 'پاک کردن',
            backButtonTitle: 'بازگشت',
            footer: { selectText: 'انتخاب', navigateText: 'جابجایی', closeText: 'بستن' }
          }
        }
      }
    },

    nav: [
      { text: 'صفحه اصلی', link: '/', activeMatch: '^/$' },
      {
        text: 'سرورها',
        activeMatch: '^/(servers-hub|hypixel|donut-smp|aternos|paid-servers)',
        items: [
          { text: '🌐 ورود به هاب سرورها (ایرانی و جهانی)', link: '/servers-hub' },
          { text: 'سرور هایپیکسل (Hypixel)', link: '/hypixel' },
          { text: 'سرور دونات (DonutSMP)', link: '/donut-smp' },
          { text: 'ساخت سرور رایگان (Aternos)', link: '/aternos' },
          { text: 'راهنمای خرید سرور پولی (VPS)', link: '/paid-servers' }
        ]
      },
      {
        text: 'ماد و شیدر',
        activeMatch: '^/(mods-hub|launchers-guide)',
        items: [
          { text: '📦 ورود به مرکز دانلود ماد و شیدرپک', link: '/mods-hub' },
          { text: 'مقایسه بهترین لانچرها (Prism و Legacy)', link: '/launchers-guide' }
        ]
      },
      {
        text: 'بانک فارم‌ها',
        activeMatch: '^/(farms-hub|iron-farm|gold-xp-farm|enderman-xp-farm|creeper-farm|survival-guide)',
        items: [
          { text: '🌾 ورود به بانک جامع فارم‌های ۱.۲۱', link: '/farms-hub' },
          { text: 'فارم آهن ۱.۲۱ (جاوا و بدراک)', link: '/iron-farm' },
          { text: 'مگافارم طلا و XP سقف ندر', link: '/gold-xp-farm' },
          { text: 'فارم XP اندرمن (۴۵ ثانیه)', link: '/enderman-xp-farm' },
          { text: 'فارم باروت و کریپر بدون گربه', link: '/creeper-farm' },
          { text: 'راهنمای ماینینگ ۱.۲۱ (دایموند و ندرایت)', link: '/survival-guide' }
        ]
      },
      {
        text: 'آموزش و رفع ارور',
        activeMatch: '^/(errors-fix|launchers-guide|survival-guide)',
        items: [
          { text: '⚡ ورود به مرجع رفع ارورها و افزایش FPS', link: '/errors-fix' },
          { text: 'مقایسه بهترین لانچرهای ماینکرفت', link: '/launchers-guide' },
          { text: 'بهترین ارتفاع دایموند و ندرایت ۱.۲۱', link: '/survival-guide' }
        ]
      }
    ],

    sidebar: [
      {
        text: '🌐 سرورهای ماینکرفت',
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
        text: '🌾 فارم‌ها و آموزش بقا ۱.۲۱',
        collapsed: false,
        items: [
          { text: 'بانک جامع فارم‌های ۱.۲۱', link: '/farms-hub' },
          { text: 'آموزش ساخت فارم آهن ۱.۲۱', link: '/iron-farm' },
          { text: 'مگا فارم طلا و XP سقف ندر', link: '/gold-xp-farm' },
          { text: 'فارم XP اندرمن در End', link: '/enderman-xp-farm' },
          { text: 'فارم باروت و کریپر بدون گربه', link: '/creeper-farm' },
          { text: 'بهترین ارتفاع دایموند و ندرایت', link: '/survival-guide' }
        ]
      },
      {
        text: '📦 ماد، شیدر و رفع ارور',
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
      text: 'آخرین بازبینی فنی',
      formatOptions: {
        dateStyle: 'long',
        calendar: 'persian'
      }
    },

    docFooter: {
      prev: 'صفحه قبلی',
      next: 'صفحه بعدی'
    }
  }
})
