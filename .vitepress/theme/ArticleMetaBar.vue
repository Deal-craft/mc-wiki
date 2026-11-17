<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from './posts.data.mjs'
import { normalizeIsoDate, formatPersianDate } from './dateUtils.js'

const { frontmatter, page } = useData()
const route = useRoute()

const CATEGORY_META = {
  servers: { label: 'هاب سرورهای ماینکرفت', link: '/servers-hub', icon: '🌐' },
  farms: { label: 'بانک جامع فارم‌ها و بقا', link: '/farms-hub', icon: '🌾' },
  mods: { label: 'مرکز دانلود ماد و شیدرپک', link: '/mods-hub', icon: '📦' },
  errors: { label: 'مرجع رفع ارور و لانچر', link: '/errors-fix', icon: '⚡' }
}

const HUB_TITLES = {
  '/servers-hub': 'هاب سرورهای ماینکرفت',
  '/farms-hub': 'بانک جامع فارم‌های ۱.۲۱',
  '/mods-hub': 'مرکز دانلود ماد و شیدرپک',
  '/errors-fix': 'مرجع رفع ارور و بهینه‌سازی'
}

const cleanPath = computed(() => route.path.replace(/\.html$/, '') || '/')

const isShowable = computed(() => {
  if (frontmatter.value.layout === 'page' || frontmatter.value.isRedirect) return false
  if (cleanPath.value === '/' || cleanPath.value === '/404') return false
  return true
})

const isHubPage = computed(() => {
  return Boolean(frontmatter.value.isHub || HUB_TITLES[cleanPath.value])
})

const currentCategory = computed(() => {
  const cat = frontmatter.value.category
  return CATEGORY_META[cat] || null
})

const isoDate = computed(() => {
  return normalizeIsoDate(frontmatter.value.date || '2026-11-04')
})

const persianDate = computed(() => {
  return formatPersianDate(isoDate.value)
})

const readingTime = computed(() => {
  const matched = posts.find(p => p.url.replace(/\.html$/, '') === cleanPath.value)
  return matched?.frontmatter?.readingTimeLabel || '۵ دقیقه مطالعه'
})

const shortTitle = computed(() => {
  const t = frontmatter.value.title || page.value.title || ''
  return t.split('؛')[0].split('(')[0].trim() || t
})
</script>

<template>
  <div v-if="isShowable" class="mc-article-top-bar">
    <nav aria-label="مسیر راهنما" class="mc-breadcrumb">
      <ol class="mc-breadcrumb-list">
        <li>
          <a href="/">🏠 صفحه اصلی</a>
        </li>
        <li v-if="!isHubPage && currentCategory">
          <span class="mc-breadcrumb-sep" aria-hidden="true">/</span>
          <a :href="currentCategory.link">{{ currentCategory.icon }} {{ currentCategory.label }}</a>
        </li>
        <li aria-current="page" class="mc-breadcrumb-current">
          <span class="mc-breadcrumb-sep" aria-hidden="true">/</span>
          <span>{{ shortTitle }}</span>
        </li>
      </ol>
    </nav>

    <div class="mc-article-meta">
      <a
        v-if="!isHubPage && currentCategory"
        :href="currentCategory.link"
        class="mc-tag mc-tag-green"
        style="text-decoration: none !important;"
      >
        {{ currentCategory.icon }} {{ currentCategory.label }}
      </a>
      <span v-else-if="isHubPage" class="mc-tag mc-tag-green">
        📌 صفحه مرجع (Hub Page)
      </span>

      <span class="mc-tag mc-tag-purple">
        📅 آخرین بروزرسانی:
        <time :datetime="isoDate" itemprop="dateModified">{{ persianDate }}</time>
      </span>

      <span v-if="!isHubPage" class="mc-tag mc-tag-gray">
        ⏱️ {{ readingTime }}
      </span>

      <span v-if="frontmatter.badge" class="mc-tag mc-tag-blue">
        🏷️ {{ frontmatter.badge }}
      </span>
    </div>
  </div>
</template>
