---
title: "بانک جامع فارم‌های ماینکرفت ۱.۲۱ (جستجو، فیلتر و آموزش گام‌به‌گام)"
description: "جستجو و فیلتر بهترین فارم‌های ماینکرفت ۱.۲۱ (آهن، طلا، XP اندرمن و باروت کریپر) از ساده‌ترین فارم‌های روز اول تا خفن‌ترین مگافارم‌ها به همراه آموزش کامل ساخت."
date: "2026-11-04"
isHub: true
---

<script setup>
import { ref, computed } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.mjs'

const selectedEdition = ref('all')
const selectedVersion = ref('all')
const selectedTier = ref('all')
const selectedItem = ref('all')
const searchQuery = ref('')

// لیست فارم‌های تخصصی با لینک مستقیم به مقالات کامل آموزشی
const curatedFarms = [
  {
    url: '/iron-farm#quad',
    frontmatter: {
      title: 'فارم آهن ۴ هسته‌ای با پیلجر (Quad Iron Farm)',
      description: 'استفاده از ترس پیلجر به جای زامبی برای اسپاون هم‌زمان ۴ آیرون گولم؛ مناسب کسانی که آهن بی‌نهایت می‌خواهند.',
      date: '2026-11-03',
      category: 'farms',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'best',
      itemType: 'iron',
      output: '+1600 شمش آهن در ساعت',
      difficultyLabel: '🔥 خفن و پیشرفته',
      hasVideo: true,
      hasSchematic: true
    }
  },
  {
    url: '/iron-farm#day1',
    frontmatter: {
      title: 'فارم آهن ساده روز اول بدون رداستون (Ianxofour)',
      description: 'ساخت در ۱۰ دقیقه زیر زمین فقط با ۳ ویلجر و ۱ زامبی داخل قایق بدون نیاز به نیم‌تگ یا رداستون.',
      date: '2026-11-03',
      category: 'farms',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'easiest',
      itemType: 'iron',
      output: '350 شمش آهن در ساعت',
      difficultyLabel: '🌱 بسیار آسان (روز اول)',
      hasVideo: true,
      hasSchematic: true
    }
  },
  {
    url: '/iron-farm#bedrock',
    frontmatter: {
      title: 'فارم آهن استاندارد بدراک و موبایل (Bedrock Iron Farm)',
      description: 'طراحی مخصوص نسخه موبایل، ویندوز و کنسول با ۲۰ تخت و ۲۰ میز کار Fletching Table بدون نیاز به زامبی.',
      date: '2026-11-03',
      category: 'farms',
      edition: 'bedrock',
      mcVersion: '1.21',
      tier: 'easiest',
      itemType: 'iron',
      output: '400 شمش آهن در ساعت',
      difficultyLabel: '📱 مخصوص بدراک (متوسط)',
      hasVideo: true,
      hasSchematic: false
    }
  },
  {
    url: '/gold-xp-farm',
    frontmatter: {
      title: 'مگا فارم طلا و XP روی سقف ندر (Gold & XP Roof Farm)',
      description: 'آموزش رفتن به بالای سقف ندر و ساخت پربازده‌ترین فارم بازی برای گرفتن شمش طلا و رسیدن به لول ۳۰ در ۱ دقیقه.',
      date: '2026-11-02',
      category: 'farms',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'biggest',
      itemType: 'gold',
      output: '+1200 شمش طلا در ساعت',
      difficultyLabel: '⚡ مگا فارم (سقف ندر)',
      hasVideo: true,
      hasSchematic: true
    }
  },
  {
    url: '/enderman-xp-farm',
    frontmatter: {
      title: 'فارم XP اندرمن در End (سریع‌ترین فارم تجربه)',
      description: 'رسیدن از لول ۰ به ۳۰ در ۴۵ ثانیه تنها با یک Endermite، ماین‌کارت و فرش در ارتفاع Y=1 جزیره اِند.',
      date: '2026-11-01',
      category: 'farms',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'easiest',
      itemType: 'xp',
      output: 'لول ۳۰ در ۴۵ ثانیه',
      difficultyLabel: '🌱 آسان و پربازده',
      hasVideo: true,
      hasSchematic: true
    }
  },
  {
    url: '/creeper-farm',
    frontmatter: {
      title: 'فارم باروت و کریپر بدون گربه (Creeper Gunpowder Farm)',
      description: 'تولید انبوه باروت برای ساخت فایروورک الایترا و TNT با سیستم جریان آب زمان‌بندی‌شده و ترپ‌دور.',
      date: '2026-10-30',
      category: 'farms',
      edition: 'both',
      mcVersion: '1.21',
      tier: 'best',
      itemType: 'gunpowder',
      output: '+1000 باروت در ساعت',
      difficultyLabel: '🔥 متوسط و ضروری',
      hasVideo: true,
      hasSchematic: true
    }
  }
]

// اگر کاربر در آینده مقاله فارم جدیدی اضافه کند، به صورت خودکار بدون تکرار به لیست اضافه می‌شود
const existingBaseUrls = new Set(['/iron-farm', '/gold-xp-farm', '/enderman-xp-farm', '/creeper-farm', '/survival-guide'])
const allFarmArticles = computed(() => {
  const customNewFarms = posts.filter(p => p.frontmatter.category === 'farms' && !existingBaseUrls.has(p.url.replace(/\.html$/, '')))
  return [...customNewFarms, ...curatedFarms]
})

const filteredFarms = computed(() => {
  return allFarmArticles.value.filter(item => {
    const fm = item.frontmatter
    const matchEdition = selectedEdition.value === 'all' || fm.edition === 'both' || fm.edition === selectedEdition.value
    const matchVersion = selectedVersion.value === 'all' || (fm.mcVersion && fm.mcVersion.includes(selectedVersion.value))
    const matchTier = selectedTier.value === 'all' || fm.tier === selectedTier.value
    const matchItem = selectedItem.value === 'all' || fm.itemType === selectedItem.value

    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch = !q ||
      fm.title.toLowerCase().includes(q) ||
      fm.description.toLowerCase().includes(q) ||
      (fm.itemType && fm.itemType.toLowerCase().includes(q))

    return matchEdition && matchVersion && matchTier && matchItem && matchSearch
  })
})
</script>

# 🌾 بانک جامع فارم‌های ماینکرفت ۱.۲۱ (جستجو، فیلتر و آموزش کامل ساخت)

فرقی نمی‌کند دنبال یک **فارم ساده برای روز اول** باشید یا یک **مگافارم خفن روی سقف ندر**؛ از فیلترهای زیر نوع فارم را انتخاب کنید و روی هر کارت کلیک کنید تا وارد صفحه **لیست آیتم‌ها، آموزش گام‌به‌گام ساخت و عیب‌یابی** آن شوید:

<div class="mc-box" style="margin: 24px 0;">
<div style="margin-bottom: 18px;">
<div style="font-weight: 700; margin-bottom: 8px; color: #e2e8f0;">۱. نسخه بازی (Edition):</div>
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
<button @click="selectedEdition = 'all'" :class="['mc-btn', selectedEdition === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 16px; font-size: 13.5px; cursor: pointer;">🌍 همه نسخه‌ها</button>
<button @click="selectedEdition = 'java'" :class="['mc-btn', selectedEdition === 'java' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 16px; font-size: 13.5px; cursor: pointer;">💻 جاوا (Java - PC)</button>
<button @click="selectedEdition = 'bedrock'" :class="['mc-btn', selectedEdition === 'bedrock' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 16px; font-size: 13.5px; cursor: pointer;">📱 بدراک (موبایل / کنسول / ویندوز)</button>
</div>
</div>

<div style="margin-bottom: 18px;">
<div style="font-weight: 700; margin-bottom: 8px; color: #e2e8f0;">۲. ورژن ماینکرفت (Version):</div>
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
<button @click="selectedVersion = 'all'" :class="['mc-btn', selectedVersion === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">همه</button>
<button @click="selectedVersion = '1.21'" :class="['mc-btn', selectedVersion === '1.21' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">✨ 1.21</button>
<button @click="selectedVersion = '1.20'" :class="['mc-btn', selectedVersion === '1.20' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">1.20</button>
<button @click="selectedVersion = '1.19'" :class="['mc-btn', selectedVersion === '1.19' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">1.19</button>
</div>
</div>

<div style="margin-bottom: 18px;">
<div style="font-weight: 700; margin-bottom: 8px; color: #e2e8f0;">۳. چه مدل فارمی می‌خواهید؟</div>
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
<button @click="selectedTier = 'all'" :class="['mc-btn', selectedTier === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 16px; font-size: 13.5px; cursor: pointer;">🎯 همه مدل‌ها</button>
<button @click="selectedTier = 'easiest'" :class="['mc-btn', selectedTier === 'easiest' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 16px; font-size: 13.5px; cursor: pointer;">🌱 آسان و سریع (مناسب شروع)</button>
<button @click="selectedTier = 'best'" :class="['mc-btn', selectedTier === 'best' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 16px; font-size: 13.5px; cursor: pointer;">🔥 خفن و پربازده (بهترین انتخاب)</button>
<button @click="selectedTier = 'biggest'" :class="['mc-btn', selectedTier === 'biggest' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 16px; font-size: 13.5px; cursor: pointer;">⚡ مگا فارم (حرفه‌ای و سنگین)</button>
</div>
</div>

<div>
<div style="font-weight: 700; margin-bottom: 8px; color: #e2e8f0;">۴. انتخاب نوع آیتم یا جستجوی مستقیم:</div>
<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
<button @click="selectedItem = 'all'" :class="['mc-btn', selectedItem === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">🧭 همه آیتم‌ها</button>
<button @click="selectedItem = 'iron'" :class="['mc-btn', selectedItem === 'iron' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">🔩 آهن (Iron)</button>
<button @click="selectedItem = 'gold'" :class="['mc-btn', selectedItem === 'gold' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">🪙 طلا و XP</button>
<button @click="selectedItem = 'xp'" :class="['mc-btn', selectedItem === 'xp' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">✨ تجربه (XP)</button>
<button @click="selectedItem = 'gunpowder'" :class="['mc-btn', selectedItem === 'gunpowder' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 6px 14px; font-size: 13px; cursor: pointer;">🧨 باروت (Gunpowder)</button>
</div>
<input v-model="searchQuery" type="text" placeholder="🔍 نام فارم را بنویسید (مثلاً: آهن، Iron، اندرمن، طلا، کریپر)..." style="width: 100%; padding: 12px 16px; border-radius: 12px; background: #080b12; border: 1.5px solid #1bd96a; color: #fff; font-size: 14.5px; font-family: inherit;" />
</div>
</div>

<div class="mc-item-list">
<a v-for="(farm, idx) in filteredFarms" :key="idx" :href="farm.url" class="mc-list-item" style="flex-direction: column; align-items: stretch; gap: 10px; cursor: pointer;">
<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
<h4 style="margin: 0; font-size: 17px; color: #1bd96a;">{{ farm.frontmatter.title }}</h4>
<div style="display: flex; gap: 6px; flex-wrap: wrap;">
<span class="mc-tag mc-tag-purple">📖 آموزش کامل ساخت</span>
<span class="mc-tag mc-tag-green">📋 لیست دقیق آیتم‌ها</span>
<span class="mc-tag mc-tag-blue">{{ farm.frontmatter.edition === 'both' ? 'Java & Bedrock' : (farm.frontmatter.edition === 'java' ? 'Java' : 'Bedrock') }} {{ farm.frontmatter.mcVersion }}</span>
</div>
</div>
<p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.7;">{{ farm.frontmatter.description }}</p>
<div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; flex-wrap: wrap; gap: 12px;">
<div style="display: flex; gap: 18px; flex-wrap: wrap;">
<span v-if="farm.frontmatter.output">⚡ <b>بازدهی:</b> {{ farm.frontmatter.output }}</span>
<span>🛠️ <b>مدل و سختی:</b> {{ farm.frontmatter.difficultyLabel }}</span>
</div>
<span style="color: #1bd96a; font-weight: 700;">ورود به صفحه آموزش ساخت فارم ←</span>
</div>
</a>
</div>
