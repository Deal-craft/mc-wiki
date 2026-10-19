import { createContentLoader } from 'vitepress'

export default createContentLoader('*.md', {
  transform(rawData) {
    return rawData
      .filter(page => page.url !== '/' && page.frontmatter.title)
      .sort((a, b) => {
        return +new Date(b.frontmatter.date || '2026-01-01') - +new Date(a.frontmatter.date || '2026-01-01')
      })
  }
})
