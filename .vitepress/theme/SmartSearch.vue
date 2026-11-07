<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vitepress'
import { data as posts } from './posts.data.mjs'
import { matchesPersianQuery } from './dateUtils.js'

const props = defineProps({
  inlineMode: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '🔍 جستجوی سریع سرور، فارم، ماد، آی‌پی یا کد ارور (مثلاً: هایپیکسل، تیرکس، فارم آهن، Sodium، Exit Code 1)...'
  }
})

const router = useRouter()
const route = useRoute()

const isOpen = ref(false)
const query = ref('')
const selectedCategory = ref('all')
const inputRef = ref(null)

const STATIC_INDEX = [
  {
    title: 'هاب سرورهای ماینکرفت (لیست سرورهای ایرانی و جهانی)',
    desc: 'مشاهده زنده تعداد پلیرهای آنلاین، آی‌پی سرورهای کرکی و پرمیوم جاوا و بدراک.',
    url: '/servers-hub',
    cat: 'servers',
    badge: 'صفحه مرجع سرورها',
    dateLabel: '۱۳ آبان ۱۴۰۵',
    keywords: 'سرور ایرانی سرور کرکی سرور بدراک موبایل پینگ پایین لیست سرورها'
  },
  {
    title: 'سرور تیرکس ماین (T-RexMine) — آی‌پی: play.trexmine.com',
    desc: 'شلوغ‌ترین سرور کرکی ایرانی ماینکرفت جاوا و بدراک (پورت 19132) با گیم‌مودهای BedWars، Survival، SkyBlock و BoxPvP.',
    url: '/servers-hub#سرورهای-ایرانی',
    cat: 'servers',
    badge: 'سرور کرکی ایرانی',
    dateLabel: '۱۳ آبان ۱۴۰۵',
    keywords: 'trexmine play.trexmine.com تیرکس ماین تی رکس ماین بدوارز ایرانی کرکی'
  },
  {
    title: 'سرور مدکرفت (MadCraft) — آی‌پی: play.madcraft.ir',
    desc: 'سرور قدیمی و پرطرفدار کرکی ایران مخصوص جاوا با گیم‌مودهای Survival، Factions، PvP و BedWars.',
    url: '/servers-hub#سرورهای-ایرانی',
    cat: 'servers',
    badge: 'سرور کرکی ایرانی',
    dateLabel: '۱۳ آبان ۱۴۰۵',
    keywords: 'madcraft play.madcraft.ir مدکرفت مد کرفت فکشن بقا'
  },
  {
    title: 'سرور آرین کرفت (ArianCraft) — آی‌پی: play.ariancraft.ir',
    desc: 'سرور ایرانی جاوا و بدراک (پورت 19132) با گیم‌مودهای LifeSteal، BoxPvP و BedWars.',
    url: '/servers-hub#سرورهای-ایرانی',
    cat: 'servers',
    badge: 'Java & Bedrock',
    dateLabel: '۱۳ آبان ۱۴۰۵',
    keywords: 'ariancraft play.ariancraft.ir آرین کرفت ارین کرفت لایف استیل'
  },
  {
    title: 'سرور پرشین کرفت (PersianCraft) — آی‌پی: mc.persiancraft.ir',
    desc: 'سرور ماینکرفت موبایل (Bedrock - پورت 19132) با گیم‌مودهای SMP، Survival و MiniGames.',
    url: '/servers-hub#سرورهای-ایرانی',
    cat: 'servers',
    badge: 'مخصوص موبایل (Bedrock)',
    dateLabel: '۱۳ آبان ۱۴۰۵',
    keywords: 'persiancraft mc.persiancraft.ir پرشین کرفت سرور موبایل پاکت ادیشن'
  },
  {
    title: 'بانک جامع فارم‌های ماینکرفت ۱.۲۱ (جاوا و بدراک)',
    desc: 'فیلتر و جستجوی سریع فارم‌های آهن، طلا، XP اندرمن، باروت کریپر و راهنمای ماینینگ.',
    url: '/farms-hub',
    cat: 'farms',
    badge: 'صفحه مرجع فارم‌ها',
    dateLabel: '۱۳ آبان ۱۴۰۵',
    keywords: 'بانک فارم ها فارم اهن طلا اندرمن باروت کریپر'
  },
  {
    title: 'مرکز دانلود ماد و شیدرپک (Fabric، Forge و OptiFine)',
    desc: 'دانلود مستقیم Sodium، Iris Shaders، Lithium، FerriteCore، OptiFine، Embeddium، Xaero Minimap و JEI.',
    url: '/mods-hub',
    cat: 'mods',
    badge: 'صفحه مرجع ماد و شیدر',
    dateLabel: '۲۶ مهر ۱۴۰۵',
    keywords: 'دانلود ماد شیدرپک سودیوم sodium iris lithium ferritecore optifine embeddium oculus jei minimap'
  },
  {
    title: 'رفع ارور Exit Code 1، GLFW Error 65542 و مشکلات جاوا',
    desc: 'جدول کامل حل کرش‌های ماینکرفت، انتخاب نسخه Java 21 / Java 17 و افزایش ۳ برابری FPS سیستم‌های ضعیف.',
    url: '/errors-fix',
    cat: 'errors',
    badge: 'مرجع رفع ارور',
    dateLabel: '۲۹ مهر ۱۴۰۵',
    keywords: 'exit code 1 glfw error 65542 failed to verify username connection timed out out of memory java 21 java 17'
  }
]

const allSearchableItems = computed(() => {
  const articleItems = posts.map(p => ({
    title: p.frontmatter.title,
    desc: p.frontmatter.description,
    url: p.url,
    cat: p.frontmatter.category || 'general',
    badge: p.frontmatter.badge || 'مقاله آموزشی',
    dateLabel: p.frontmatter.persianDate || '',
    keywords: `${p.frontmatter.keywords || ''} ${p.frontmatter.itemType || ''} ${p.frontmatter.output || ''}`
  }))
  return [...articleItems, ...STATIC_INDEX]
})

const filteredResults = computed(() => {
  let list = allSearchableItems.value
  if (selectedCategory.value !== 'all') {
    list = list.filter(item => item.cat === selectedCategory.value)
  }
  if (!query.value.trim()) {
    return list.slice(0, 8)
  }
  return list.filter(item => {
    const haystack = `${item.title} ${item.desc} ${item.badge} ${item.keywords}`
    return matchesPersianQuery(haystack, query.value)
  })
})

const openModal = () => {
  isOpen.value = true
  nextTick(() => {
    if (inputRef.value) inputRef.value.focus()
  })
}

const closeModal = () => {
  isOpen.value = false
}

const goToResult = (url) => {
  isOpen.value = false
  if (props.inlineMode) {
    query.value = ''
  }
  router.go(url)
}

let clickInterceptor = null
let keydownHandler = null

onMounted(() => {
  if (props.inlineMode || typeof window === 'undefined') return

  clickInterceptor = (e) => {
    const searchBtn = e.target.closest('.VPNavBarSearch button, .DocSearch-Button, #local-search button')
    if (searchBtn) {
      e.preventDefault()
      e.stopPropagation()
      openModal()
    }
  }

  keydownHandler = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      isOpen.value ? closeModal() : openModal()
    } else if (e.key === 'Escape' && isOpen.value) {
      closeModal()
    }
  }

  document.addEventListener('click', clickInterceptor, true)
  window.addEventListener('keydown', keydownHandler)
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  if (clickInterceptor) document.removeEventListener('click', clickInterceptor, true)
  if (keydownHandler) window.removeEventListener('keydown', keydownHandler)
})

watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <div v-if="inlineMode" class="mc-inline-search-box">
    <div class="mc-inline-search-bar">
      <input
        v-model="query"
        type="search"
        :placeholder="placeholder"
        class="mc-search-input mc-hero-search-input"
        aria-label="جستجو در کل سایت پلی‌پدیا"
      />
      <select v-model="selectedCategory" class="mc-filter-select" aria-label="فیلتر دسته‌بندی جستجو">
        <option value="all">همه بخش‌ها</option>
        <option value="servers">🌐 سرورها</option>
        <option value="farms">🌾 فارم‌ها و بقا</option>
        <option value="mods">📦 ماد و شیدر</option>
        <option value="errors">⚡ رفع ارور و لانچر</option>
      </select>
    </div>

    <div v-if="query.trim().length > 0" class="mc-inline-search-results">
      <div class="mc-inline-results-header">
        <span>نتایج یافت‌شده ({{ filteredResults.length }} مورد):</span>
        <button @click="query = ''" type="button" class="mc-reset-btn">پاک کردن ✕</button>
      </div>
      <div v-if="filteredResults.length > 0" class="mc-item-list">
        <a
          v-for="(item, i) in filteredResults"
          :key="i"
          :href="item.url"
          @click.prevent="goToResult(item.url)"
          class="mc-list-item"
        >
          <div class="mc-item-info">
            <div class="mc-doc-bullet"></div>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap; flex-shrink: 0;">
            <span class="mc-tag mc-tag-green">{{ item.badge }}</span>
            <span v-if="item.dateLabel" class="mc-tag mc-tag-purple">{{ item.dateLabel }}</span>
          </div>
        </a>
      </div>
      <div v-else class="mc-empty-state" style="padding: 18px;">
        موردی با عبارت «{{ query }}» یافت نشد. کلمات کلیدی مثل «هایپیکسل»، «آهن»، «سودیوم» یا «آترنوس» را امتحان کنید.
      </div>
    </div>
  </div>

  <Teleport v-else to="body">
    <div v-if="isOpen" class="mc-search-modal-backdrop" @click.self="closeModal" role="dialog" aria-modal="true" aria-label="جستجوی سراسری پلی‌پدیا">
      <div class="mc-search-modal">
        <div class="mc-search-modal-top">
          <input
            ref="inputRef"
            v-model="query"
            type="search"
            placeholder="🔍 نام سرور، آی‌پی، فارم، ماد یا ارور را تایپ کنید..."
            class="mc-search-input"
            style="width: 100%; font-size: 15px; padding: 12px 16px;"
          />
          <button @click="closeModal" type="button" class="mc-btn mc-btn-glass" style="cursor: pointer; flex-shrink: 0;">
            بستن (ESC)
          </button>
        </div>

        <div class="mc-search-modal-filters">
          <button
            v-for="cat in [
              { id: 'all', label: 'همه بخش‌ها' },
              { id: 'servers', label: '🌐 سرورها' },
              { id: 'farms', label: '🌾 فارم‌ها' },
              { id: 'mods', label: '📦 ماد و شیدر' },
              { id: 'errors', label: '⚡ رفع ارور' }
            ]"
            :key="cat.id"
            type="button"
            @click="selectedCategory = cat.id"
            :class="['mc-tag', selectedCategory === cat.id ? 'mc-tag-green' : 'mc-tag-gray']"
            style="cursor: pointer; border: none; padding: 6px 12px; font-family: inherit;"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="mc-search-modal-body">
          <div v-if="filteredResults.length > 0" class="mc-item-list">
            <a
              v-for="(item, idx) in filteredResults"
              :key="idx"
              :href="item.url"
              @click.prevent="goToResult(item.url)"
              class="mc-list-item"
            >
              <div class="mc-item-info">
                <div class="mc-doc-bullet"></div>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.desc }}</p>
                </div>
              </div>
              <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap; flex-shrink: 0;">
                <span class="mc-tag mc-tag-blue">{{ item.badge }}</span>
                <span v-if="item.dateLabel" class="mc-tag mc-tag-purple">{{ item.dateLabel }}</span>
              </div>
            </a>
          </div>
          <div v-else class="mc-empty-state">
            نتیجه‌ای برای «{{ query }}» پیدا نشد.
          </div>
        </div>

        <div class="mc-search-modal-footer">
          <span>💡 پشتیبانی از جستجوی فارسی و انگلیسی (با یا بدون نیم‌فاصله)</span>
          <span>میانبر کیبورد: <code>Ctrl + K</code></span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
