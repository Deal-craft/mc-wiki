import { createContentLoader } from 'vitepress'

// لیست صفحاتی که نباید به عنوان مقاله عادی در لیست مقالات بیایند
const EXCLUDED_URLS = [
  '/',
  '/servers-hub',
  '/mods-hub',
  '/farms-hub',
  '/errors-fix'
]

export default createContentLoader('*.md', {
  transform(rawData) {
    return rawData
      .filter(page => {
        const cleanUrl = page.url.replace(/\.html$/, '')
        return (
          !EXCLUDED_URLS.includes(cleanUrl) &&
          !page.frontmatter.isHub &&
          page.frontmatter.title
        )
      })
      .map(page => ({
        url: page.url,
        frontmatter: {
          title: page.frontmatter.title,
          description: page.frontmatter.description || '',
          date: page.frontmatter.date || '2026-10-01',
          category: page.frontmatter.category || 'general',
          badge: page.frontmatter.badge || ''
        }
      }))
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
  }
})
