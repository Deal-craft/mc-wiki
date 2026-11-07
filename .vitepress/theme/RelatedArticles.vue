<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from './posts.data.mjs'

const { frontmatter } = useData()
const route = useRoute()

const CATEGORY_HUBS = {
  servers: { label: 'مشاهده همه سرورها در هاب سرورها', link: '/servers-hub' },
  farms: { label: 'مشاهده همه فارم‌ها در بانک فارم‌ها', link: '/farms-hub' },
  mods: { label: 'مشاهده همه مادها در مرکز دانلود ماد', link: '/mods-hub' },
  errors: { label: 'مشاهده مرجع کامل رفع ارورهای ماینکرفت', link: '/errors-fix' }
}

const cleanPath = computed(() => route.path.replace(/\.html$/, '') || '/')

const isArticlePage = computed(() => {
  if (frontmatter.value.layout === 'page' || frontmatter.value.isHub || frontmatter.value.isRedirect) {
    return false
  }
  const hubPaths = ['/', '/servers-hub', '/farms-hub', '/mods-hub', '/errors-fix', '/404']
  return !hubPaths.includes(cleanPath.value)
})

const relatedPosts = computed(() => {
  if (!isArticlePage.value) return []
  const cat = frontmatter.value.category
  const sameCategory = posts.filter(
    p => p.url.replace(/\.html$/, '') !== cleanPath.value && p.frontmatter.category === cat
  )
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3)
  }
  const others = posts.filter(
    p => p.url.replace(/\.html$/, '') !== cleanPath.value && p.frontmatter.category !== cat
  )
  return [...sameCategory, ...others].slice(0, 3)
})

const currentHub = computed(() => {
  return CATEGORY_HUBS[frontmatter.value.category] || CATEGORY_HUBS.servers
})
</script>

<template>
  <aside v-if="isArticlePage && relatedPosts.length > 0" class="mc-box mc-related-box" aria-label="مقالات مرتبط">
    <div class="mc-section-header" style="flex-wrap: wrap; gap: 10px;">
      <h2 style="margin: 0 !important;">🔗 آموزش‌ها و مقالات مرتبط پیشنهادی</h2>
      <a :href="currentHub.link" class="mc-more">{{ currentHub.label }} ←</a>
    </div>
    <div class="mc-item-list">
      <a
        v-for="post in relatedPosts"
        :key="post.url"
        :href="post.url"
        class="mc-list-item"
      >
        <div class="mc-item-info">
          <div class="mc-doc-bullet"></div>
          <div>
            <h3>{{ post.frontmatter.title }}</h3>
            <p>{{ post.frontmatter.description }}</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; flex-shrink: 0;">
          <span v-if="post.frontmatter.badge" class="mc-tag mc-tag-blue">{{ post.frontmatter.badge }}</span>
          <time :datetime="post.frontmatter.date" class="mc-tag mc-tag-purple">
            {{ post.frontmatter.persianDate }}
          </time>
        </div>
      </a>
    </div>
  </aside>
</template>
