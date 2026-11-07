<script setup>
import { ref, computed } from 'vue'
import { data as posts } from './posts.data.mjs'
import { formatPersianDate, matchesPersianQuery } from './dateUtils.js'

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: '📚 جدیدترین مقالات و آموزش‌های این بخش'
  },
  placeholder: {
    type: String,
    default: '🔍 جستجو در مقالات این هاب...'
  }
})

const searchQuery = ref('')
const sortBy = ref('newest')

const categoryPosts = computed(() => {
  let list = posts.filter(post => {
    const cat = post.frontmatter.category
    if (Array.isArray(cat)) return cat.includes(props.category)
    return cat === props.category
  })

  if (searchQuery.value.trim()) {
    list = list.filter(post => {
      const haystack = `${post.frontmatter.title} ${post.frontmatter.description} ${post.frontmatter.badge} ${post.frontmatter.keywords || ''}`
      return matchesPersianQuery(haystack, searchQuery.value)
    })
  }

  return [...list].sort((a, b) => {
    const dateA = +new Date(a.frontmatter.date)
    const dateB = +new Date(b.frontmatter.date)
    return sortBy.value === 'newest' ? dateB - dateA : dateA - dateB
  })
})
</script>

<template>
  <section class="mc-box" style="margin-top: 32px;" aria-label="لیست مقالات بخش">
    <div class="mc-section-header" style="flex-wrap: wrap; gap: 12px;">
      <h2 style="margin: 0 !important;">{{ title }}</h2>
      <div style="display: flex; align-items: center; gap: 8px;">
        <label style="font-size: 13px; color: #94a3b8;">مرتب‌سازی بر اساس تاریخ:</label>
        <select
          v-model="sortBy"
          class="mc-filter-select"
          aria-label="مرتب‌سازی مقالات بر اساس تاریخ"
        >
          <option value="newest">جدیدترین (بروزرسانی)</option>
          <option value="oldest">قدیمی‌ترین</option>
        </select>
      </div>
    </div>

    <div style="margin: 16px 0 20px;">
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="placeholder"
        class="mc-search-input"
        style="width: 100%;"
      />
    </div>

    <div v-if="categoryPosts.length > 0" class="mc-item-list">
      <a
        v-for="post in categoryPosts"
        :key="post.url"
        :href="post.url"
        class="mc-list-item"
      >
        <div class="mc-item-info">
          <span class="mc-item-icon" aria-hidden="true">📄</span>
          <div>
            <h3>{{ post.frontmatter.title }}</h3>
            <p>{{ post.frontmatter.description }}</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; flex-shrink: 0;">
          <span v-if="post.frontmatter.badge" class="mc-tag mc-tag-blue">
            {{ post.frontmatter.badge }}
          </span>
          <time :datetime="post.frontmatter.date" class="mc-tag mc-tag-purple" title="تاریخ انتشار و بروزرسانی">
            📅 {{ post.frontmatter.persianDate || formatPersianDate(post.frontmatter.date) }}
          </time>
        </div>
      </a>
    </div>

    <div v-else class="mc-empty-state">
      <p style="margin: 0 0 10px !important;">مقاله‌ای با عبارت «{{ searchQuery }}» در این بخش پیدا نشد.</p>
      <button v-if="searchQuery" @click="searchQuery = ''" type="button" class="mc-btn mc-btn-glass" style="cursor: pointer;">
        پاک کردن فیلتر جستجو
      </button>
    </div>
  </section>
</template>
