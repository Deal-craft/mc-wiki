import { createContentLoader } from 'vitepress'

const HUB_PAGES = [
  '/',
  '/servers-hub',
  '/mods-hub',
  '/farms-hub',
  '/errors-fix',
  '/markdown-examples',
  '/api-examples',
  '/404'
]

export default createContentLoader('*.md', {
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
      .map(page => ({
        url: page.url,
        frontmatter: {
          title: page.frontmatter.title,
          description: page.frontmatter.description || '',
          date: page.frontmatter.date || '2026-10-20',
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
      }))
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
  }
})
