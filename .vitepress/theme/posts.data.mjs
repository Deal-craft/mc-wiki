import { createContentLoader } from 'vitepress'

const HUB_PAGES = [
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
          !HUB_PAGES.includes(cleanUrl) &&
          !page.frontmatter.isHub &&
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
          // فیلدهای اختصاصی برای فیلتر هاب فارم و ماد
          edition: page.frontmatter.edition || 'both',       // java | bedrock | both
          mcVersion: page.frontmatter.mcVersion || '1.21',   // 1.21 | 1.20 | 1.19
          tier: page.frontmatter.tier || 'easiest',          // best | easiest | biggest
          itemType: page.frontmatter.itemType || 'other',    // iron | gold | xp | gunpowder | villager
          output: page.frontmatter.output || '',             // مثلاً: +1500 آهن در ساعت
          difficultyLabel: page.frontmatter.difficultyLabel || 'متوسط',
          hasVideo: Boolean(page.frontmatter.videoUrl),
          hasSchematic: Boolean(page.frontmatter.schematicUrl),
          loader: page.frontmatter.loader || 'fabric',       // fabric | forge | both
          badge: page.frontmatter.badge || ''
        }
      }))
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
  }
})
