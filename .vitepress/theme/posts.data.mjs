import { createContentLoader } from 'vitepress'
import { normalizeIsoDate, formatPersianDate, toPersianDigits } from './dateUtils.js'

const HUB_PAGES = [
  '/',
  '/servers-hub',
  '/mods-hub',
  '/farms-hub',
  '/errors-fix',
  '/404',
  '/api-examples',
  '/markdown-examples'
]

function estimateReadingMinutes(src) {
  if (!src) return 4
  const clean = src
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
  const words = clean.trim().split(/\s+/).filter(Boolean).length
  return Math.max(3, Math.ceil(words / 180))
}

function extractHeadingsAndKeywords(src) {
  if (!src) return ''
  const headings = []
  const regex = /^#{1,3}\s+(.+)$/gm
  let m
  while ((m = regex.exec(src)) !== null) {
    headings.push(m[1].replace(/[*_`~[\]()]/g, '').trim())
  }
  return headings.join(' · ')
}

export default createContentLoader('*.md', {
  includeSrc: true,
  transform(rawData) {
    return rawData
      .filter(page => {
        const cleanUrl = page.url.replace(/\.html$/, '')
        return (
          !HUB_PAGES.includes(cleanUrl) &&
          !page.frontmatter.isHub &&
          !page.frontmatter.isRedirect &&
          page.frontmatter.title
        )
      })
      .map(page => {
        const isoDate = normalizeIsoDate(page.frontmatter.date || '2026-10-20')
        const persianDate = formatPersianDate(isoDate)
        const readingMinutes = estimateReadingMinutes(page.src)
        const keywords = extractHeadingsAndKeywords(page.src)

        return {
          url: page.url,
          frontmatter: {
            title: page.frontmatter.title,
            description: page.frontmatter.description || '',
            date: isoDate,
            persianDate,
            readingTimeLabel: `${toPersianDigits(readingMinutes)} دقیقه مطالعه`,
            keywords,
            category: page.frontmatter.category || 'general',
            edition: page.frontmatter.edition || 'both',
            mcVersion: page.frontmatter.mcVersion || '1.21',
            tier: page.frontmatter.tier || 'easiest',
            itemType: page.frontmatter.itemType || 'other',
            output: page.frontmatter.output || '',
            difficultyLabel: page.frontmatter.difficultyLabel || 'متوسط',
            hasVideo: Boolean(page.frontmatter.videoUrl),
            hasSchematic: Boolean(page.frontmatter.schematicUrl),
            loader: page.frontmatter.loader || 'fabric',
            badge: page.frontmatter.badge || ''
          }
        }
      })
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
  }
})
