<template>
  <div v-if="frontmatter.layout !== 'page'" class="mc-comments-wrapper">
    <div class="mc-comments-header">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <h3 style="margin: 0 !important;">💬 دیدگاه‌ها، تجربیات و پرسش و پاسخ پلیرها ({{ comments.length }})</h3>
        <span class="mc-tag mc-tag-green">⚡ ثبت فوری در ویکی</span>
      </div>
      <p style="margin-top: 8px !important;">سوال، تجربه، آی‌پی سرور یا ترفند جدیدی برای این بخش دارید؟ اینجا بنویسید تا سایر پلیرها استفاده کنند.</p>
    </div>

    <!-- فرم ارسال سریع نظر / لینک فایل -->
    <div class="mc-comment-form">
      <div class="mc-form-row">
        <input v-model="name" type="text" placeholder="نام یا آیدی ماینکرفت شما (مثلاً Amir_MC)..." class="mc-input" />
        <select v-model="type" class="mc-input mc-select">
          <option value="نظر یا سوال">💭 نظر یا سوال</option>
          <option value="تجربه و ترفند بازی">🔥 تجربه و ترفند بازی</option>
          <option value="پیشنهاد آپدیت مقاله">🔄 پیشنهاد آپدیت مقاله</option>
          <option value="معرفی ماد یا فایل">📦 معرفی ماد یا لینک فایل</option>
          <option value="ثبت سرور جدید">🌐 معرفی و ثبت سرور</option>
        </select>
      </div>
      <textarea v-model="text" rows="3" placeholder="متن نظر، سوال، مشخصات سرور یا ترفند خود را اینجا بنویسید..." class="mc-input mc-textarea"></textarea>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
        <button @click="addComment" class="mc-btn mc-btn-primary" style="border:none; cursor:pointer;">ارسال دیدگاه در ویکی 🚀</button>
        <span v-if="submittedMsg" style="color: #1bd96a; font-size: 13.5px; font-weight: 700;">{{ submittedMsg }}</span>
      </div>
    </div>

    <!-- لیست نظرات ثبت‌شده -->
    <div class="mc-comments-list">
      <div v-for="(c, idx) in comments" :key="c.id || idx" class="mc-comment-item">
        <div class="mc-comment-top">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <b>👤 {{ c.name }}</b>
            <span v-if="c.date" style="font-size: 11.5px; color: #64748b;">{{ c.date }}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="mc-tag mc-tag-green">{{ c.type }}</span>
            <button
              @click="toggleLike(idx)"
              :style="{
                background: c.liked ? 'rgba(27, 217, 106, 0.2)' : 'var(--mc-btn-glass-bg)',
                border: c.liked ? '1px solid #1bd96a' : '1px solid var(--mc-border-strong)',
                color: c.liked ? 'var(--mc-accent)' : 'var(--mc-text-muted)',
                padding: '3px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }"
            >
              👍 {{ c.likes || 0 }}
            </button>
          </div>
        </div>
        <p>{{ c.text }}</p>
      </div>
    </div>

    <!-- بخش اختیاری Giscus (در صورت فعال‌سازی در تنظیمات پایین فایل) -->
    <div v-if="GISCUS_CONFIG.enabled" ref="giscusContainer" style="margin-top: 28px;"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useData } from 'vitepress'

// راهنمای اتصال به GitHub Discussions (Giscus):
// اگر در آینده خواستید نظرات روی سرور گیت‌هاب هم ذخیره شوند، کافی است در ریپازیتوری خود قابلیت Discussions را روشن کنید،
// از سایت giscus.app مقادیر repo و repoId را بگیرید و enabled را روی true بگذارید:
const GISCUS_CONFIG = {
  enabled: false,
  repo: 'USERNAME/REPO_NAME',
  repoId: '',
  category: 'General',
  categoryId: ''
}

const route = useRoute()
const { frontmatter } = useData()
const name = ref('')
const type = ref('نظر یا سوال')
const text = ref('')
const submittedMsg = ref('')
const giscusContainer = ref(null)

const defaultCommentsByPath = {
  '/aternos': [
    { id: 'at1', name: 'Amir_MC', type: 'تجربه و ترفند بازی', date: '۲ روز پیش', likes: 14, text: 'دمت گرم بابت آموزش! برای آترنوس حتماً هسته رو روی PaperMC بذارید و پلاگین ClearLag رو هم نصب کنید، لگ سرور کامل صفر میشه.' },
    { id: 'at2', name: 'Sina_Craft', type: 'نظر یا سوال', date: '۵ روز پیش', likes: 8, text: 'من با روش GeyserMC که توضیح دادید با گوشی به سرور کامپیوتر دوستم وصل شدم، عالی کار می‌کنه!' }
  ],
  '/mods-hub': [
    { id: 'md1', name: 'ParsaCraft', type: 'معرفی ماد یا فایل', date: '۳ روز پیش', likes: 19, text: 'ماد FerriteCore رو هم حتماً کنار Sodium بریزید، مصرف رم ماینکرفت رو روی لپ‌تاپ من نصف کرد و FPS از ۴۵ رفت روی ۱۴۰!' }
  ],
  '/hypixel': [
    { id: 'hy1', name: 'Mahdi_BW', type: 'تجربه و ترفند بازی', date: '۱ روز پیش', likes: 27, text: 'برای بدوارز هایپیکسل حتماً با نسخه 1.8.9 و Lunar Client برید، رجیستر شدن ضربه‌ها و Speedbridge زدن زمین تا آسمون فرق می‌کنه!' },
    { id: 'hy2', name: 'Aria_SkyBlock', type: 'پیشنهاد آپدیت مقاله', date: '۳ روز پیش', likes: 15, text: 'توی اسکای‌بلاک هایپیکسل برای شروع حتماً اول برسید به لول ۷ و Bazaar Flipping انجام بدید، خیلی سریع‌تر از مینیون‌های اولیه پول میده.' }
  ],
  '/donut-smp': [
    { id: 'dn1', name: 'Reza_PvP', type: 'تجربه و ترفند بازی', date: '۲ روز پیش', likes: 21, text: 'توی DonutSMP اصلاً به هیچ‌کس tpa ندید! بیس من رو توی ارتفاع -50 زیر اقیانوس ساختم و با فارم بامبو و شارد روزانه ۵۰ میلیون درمیارم.' }
  ],
  '/servers-hub': [
    { id: 'sh1', name: 'Kian_Gamer', type: 'نظر یا سوال', date: '۱ روز پیش', likes: 18, text: 'قابلیت نمایش زنده تعداد پلیرهای سرورها فوق‌العاده شده! پینگ تیرکس و مدکرفت برای اینترنت ایران عالیه.' }
  ],
  '/iron-farm': [
    { id: 'if1', name: 'Nima_Builder', type: 'تجربه و ترفند بازی', date: '۲ روز پیش', likes: 16, text: 'فارم آهن روز اول Ianxofour رو توی ۱۰ دقیقه ساختم، بدون حتی یه دونه رداستون الان ۳ تا دبل چست پر از آهن دارم!' }
  ]
}

const fallbackComments = [
  { id: 'fb1', name: 'Amir_MC', type: 'تجربه و ترفند بازی', date: 'هفته پیش', likes: 11, text: 'آموزش خیلی کامل و دقیق بود، تمام نکات به زبان ساده توضیح داده شده. دمتون گرم!' }
]

const comments = ref([])

const getStorageKey = (path) => {
  const clean = path.replace(/\.html$/, '') || '/'
  return `playpedia_v2_comments_${clean}`
}

const saveToStorage = () => {
  if (typeof window === 'undefined') return
  const clean = route.path.replace(/\.html$/, '') || '/'
  localStorage.setItem(getStorageKey(clean), JSON.stringify(comments.value))
}

const loadComments = () => {
  if (typeof window === 'undefined') return
  const clean = route.path.replace(/\.html$/, '') || '/'
  const saved = localStorage.getItem(getStorageKey(clean))
  if (saved) {
    try {
      comments.value = JSON.parse(saved)
      return
    } catch (e) {
      // ignore corrupted storage
    }
  }
  comments.value = JSON.parse(JSON.stringify(defaultCommentsByPath[clean] || fallbackComments))
}

const toggleLike = (idx) => {
  const item = comments.value[idx]
  if (!item) return
  if (item.liked) {
    item.likes = Math.max(0, (item.likes || 1) - 1)
    item.liked = false
  } else {
    item.likes = (item.likes || 0) + 1
    item.liked = true
  }
  saveToStorage()
}

const addComment = () => {
  if (!name.value.trim() || !text.value.trim()) {
    submittedMsg.value = '⚠️ لطفاً نام و متن دیدگاه خود را وارد کنید.'
    setTimeout(() => { submittedMsg.value = '' }, 3000)
    return
  }
  comments.value.unshift({
    id: Date.now().toString(),
    name: name.value.trim(),
    type: type.value,
    date: 'همین الان',
    likes: 1,
    liked: true,
    text: text.value.trim()
  })
  saveToStorage()
  name.value = ''
  text.value = ''
  submittedMsg.value = '✅ دیدگاه شما با موفقیت در این صفحه ثبت شد!'
  setTimeout(() => { submittedMsg.value = '' }, 3500)
}

onMounted(() => {
  loadComments()
  if (GISCUS_CONFIG.enabled && giscusContainer.value && GISCUS_CONFIG.repoId) {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', GISCUS_CONFIG.repo)
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId)
    script.setAttribute('data-category', GISCUS_CONFIG.category)
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'dark_dimmed')
    script.setAttribute('data-lang', 'fa')
    script.crossOrigin = 'anonymous'
    script.async = true
    giscusContainer.value.appendChild(script)
  }
})

watch(() => route.path, loadComments)
</script>

<style scoped>
.mc-comments-wrapper {
  margin-top: 48px;
  padding: 24px;
  background: var(--mc-bg-card);
  backdrop-filter: blur(14px);
  border: 1px solid var(--mc-border-strong);
  box-shadow: var(--mc-shadow);
  border-radius: 16px;
  direction: rtl;
  text-align: right;
}
.mc-comments-header {
  margin-bottom: 18px;
}
.mc-comments-header h3 {
  color: var(--mc-text-strong) !important;
  font-size: 18px !important;
  font-weight: 800 !important;
}
.mc-comments-header p {
  color: var(--mc-text-muted) !important;
  font-size: 13.5px;
}
.mc-comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}
.mc-form-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.mc-input {
  background: var(--mc-bg-input);
  border: 1px solid var(--mc-border-strong);
  color: var(--mc-text-strong);
  padding: 10px 14px;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  flex: 1;
}
.mc-input::placeholder {
  color: var(--mc-text-muted);
}
.mc-input:focus {
  outline: none;
  border-color: #1bd96a;
}
.mc-textarea {
  width: 100%;
  resize: vertical;
}
.mc-comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mc-comment-item {
  background: var(--mc-bg-subtle);
  border: 1px solid var(--mc-border);
  padding: 14px 18px;
  border-radius: 14px;
}
.mc-comment-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}
.mc-comment-top b {
  color: var(--mc-accent);
  font-size: 14.5px;
}
.mc-comment-item p {
  margin: 0 !important;
  font-size: 14px;
  color: var(--mc-text-body);
  line-height: 1.8;
}
</style>
