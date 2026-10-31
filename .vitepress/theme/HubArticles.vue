<script setup>
import { ref, computed } from 'vue'
import { data as posts } from './posts.data.mjs'

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
    const q = searchQuery.value.toLowerCase()
    list = list.filter(post =>
      (post.frontmatter.title && post.frontmatter.title.toLowerCase().includes(q)) ||
      (post.frontmatter.description && post.frontmatter.description.toLowerCase().includes(q))
    )
  }

  return [...list].sort((a, b) => {
    const dateA = +new Date(a.frontmatter.date)
    const dateB = +new Date(b.frontmatter.date)
    return sortBy.value === 'newest' ? dateB - dateA : dateA - dateB
  })
})
</script>

<template>
  <div class="mc-box" style="margin-top: 32px;">
    <div class="mc-section-header" style="flex-wrap: wrap; gap: 12px;">
      <h2 style="margin: 0 !important;">{{ title }}</h2>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 13px; color: #94a3b8;">مرتب‌سازی:</span>
        <select
          v-model="sortBy"
          style="background: #080b12; color: #1bd96a; border: 1px solid rgba(27, 217, 106, 0.4); border-radius: 8px; padding: 4px 10px; font-family: inherit; font-size: 13px; cursor: pointer;"
        >
          <option value="newest">جدیدترین</option>
          <option value="oldest">قدیمی‌ترین</option>
        </select>
      </div>
    </div>

    <!-- کادر جستجوی زنده مقالات هاب -->
    <div style="margin: 16px 0 20px;">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        style="width: 100%; padding: 12px 16px; border-radius: 12px; background: #080b12; border: 1.5px solid rgba(27, 217, 106, 0.4); color: #fff; font-size: 14.5px; font-family: inherit;"
      />
    </div>

    <!-- لیست مقالات -->
    <div v-if="categoryPosts.length > 0" class="mc-item-list">
      <a
        v-for="post in categoryPosts"
        :key="post.url"
        :href="post.url"
        class="mc-list-item"
      >
        <div class="mc-item-info">
          <span class="mc-item-icon">📄</span>
          <div>
            <h4>{{ post.frontmatter.title }}</h4>
            <p>{{ post.frontmatter.description }}</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span v-if="post.frontmatter.badge" class="mc-tag mc-tag-blue">
            {{ post.frontmatter.badge }}
          </span>
          <span class="mc-tag mc-tag-purple">
            {{ post.frontmatter.date }}
          </span>
        </div>
      </a>
    </div>

    <!-- پیام در صورت نبود مقاله -->
    <div
      v-else
      style="text-align: center; padding: 28px; color: #94a3b8; background: rgba(8, 11, 18, 0.5); border-radius: 12px;"
    >
      مقاله‌ای با این عبارت در این هاب پیدا نشد.
    </div>
  </div>
</template>
