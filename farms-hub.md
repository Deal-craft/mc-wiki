---
title: "بانک جامع فارم‌های ماینکرفت ۱.۲۱ (آموزش گام‌به‌گام ساخت)"
description: "جستجو و فیلتر بهترین فارم‌های ماینکرفت ۱.۲۱ (آهن، طلا، XP اندرمن و باروت کریپر) از ساده‌ترین فارم‌های روز اول تا مگافارم‌ها به همراه لیست آیتم‌ها."
date: "2026-11-04"
isHub: true
---

<script setup>
import { ref, computed } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.mjs'

const selectedEdition = ref('all')
const selectedTier = ref('all')
const selectedItem = ref('all')
const searchQuery = ref('')

const curatedFarms = [
  {
    url: '/iron-farm#day1',
    frontmatter: {
      title: 'فارم آهن ساده روز اول بدون رداستون (Ianxofour)',
      description: 'ساخت در ۱۰ دقیقه زیر زمین فقط با ۳ ویلجر و ۱ زامبی داخل قایق بدون نیاز به نیم‌تگ یا رداستون.',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'easiest',
      itemType: 'iron',
      output: '۳۵۰ شمش آهن در ساعت',
      difficultyLabel: 'بسیار آسان (روز اول)'
    }
  },
  {
    url: '/iron-farm#bedrock',
    frontmatter: {
      title: 'فارم آهن استاندارد بدراک و موبایل (Bedrock Iron Farm)',
      description: 'طراحی مخصوص نسخه موبایل، ویندوز و کنسول با ۲۰ تخت و ۲۰ میز کار Fletching Table بدون نیاز به زامبی.',
      edition: 'bedrock',
      mcVersion: '1.21',
      tier: 'easiest',
      itemType: 'iron',
      output: '۴۰۰ شمش آهن در ساعت',
      difficultyLabel: 'مخصوص بدراک (متوسط)'
    }
  },
  {
    url: '/iron-farm#quad',
    frontmatter: {
      title: 'مگا فارم آهن ۴ هسته‌ای با پیلجر (Quad Iron Farm)',
      description: 'استفاده از ترس پیلجر به جای زامبی برای اسپاون هم‌زمان ۴ آیرون گولم؛ مناسب تامین آهن نامحدود.',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'best',
      itemType: 'iron',
      output: '۱,۶۰۰ شمش آهن در ساعت',
      difficultyLabel: 'پیشرفته و پربازده'
    }
  },
  {
    url: '/gold-xp-farm',
    frontmatter: {
      title: 'مگا فارم طلا و XP روی سقف ندر (Gold & XP Roof Farm)',
      description: 'آموزش رفتن به بالای سقف ندر و ساخت پربازده‌ترین فارم برای گرفتن شمش طلا و رسیدن به لول ۳۰ در ۱ دقیقه.',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'biggest',
      itemType: 'gold',
      output: '۱,۲۰۰ شمش طلا در ساعت',
      difficultyLabel: 'مگا فارم (سقف ندر)'
    }
  },
  {
    url: '/enderman-xp-farm',
    frontmatter: {
      title: 'فارم XP اندرمن در End (سریع‌ترین فارم تجربه)',
      description: 'رسیدن از لول ۰ به ۳۰ در ۴۵ ثانیه تنها با یک Endermite، ماین‌کارت و فرش در ارتفاع Y=1 جزیره اِند.',
      edition: 'java',
      mcVersion: '1.21',
      tier: 'easiest',
      itemType: 'xp',
      output: 'لول ۳۰ در ۴۵ ثانیه',
      difficultyLabel: 'آسان و ضروری'
    }
  },
  {
    url: '/creeper-farm',
    frontmatter: {
      title: 'فارم باروت و کریپر بدون گربه (Creeper Gunpowder Farm)',
      description: 'تولید انبوه باروت برای ساخت فایروورک الایترا و TNT با سیستم جریان آب زمان‌بندی‌شده و ترپ‌دور.',
      edition: 'both',
      mcVersion: '1.21',
      tier: 'best',
      itemType: 'gunpowder',
      output: '۱,۰۰۰ باروت در ساعت',
      difficultyLabel: 'متوسط (Java & Bedrock)'
    }
  }
]

const existingBaseUrls = new Set(['/iron-farm', '/gold-xp-farm', '/enderman-xp-farm', '/creeper-farm', '/survival-guide'])
const allFarmArticles = computed(() => {
  const customNewFarms = posts.filter(p => p.frontmatter.category === 'farms' && !existingBaseUrls.has(p.url.replace(/\.html$/, '')))
  return [...customNewFarms, ...curatedFarms]
})

const filteredFarms = computed(() => {
  return allFarmArticles.value.filter(item => {
    const fm = item.frontmatter
    const matchEdition = selectedEdition.value === 'all' || fm.edition === 'both' || fm.edition === selectedEdition.value
    const matchTier = selectedTier.value === 'all' || fm.tier === selectedTier.value
    const matchItem = selectedItem.value === 'all' || fm.itemType === selectedItem.value

    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch = !q ||
      fm.title.toLowerCase().includes(q) ||
      fm.description.toLowerCase().includes(q) ||
      (fm.itemType && fm.itemType.toLowerCase().includes(q))

    return matchEdition && matchTier && matchItem && matchSearch
  })
})
</script>

# بانک جامع فارم‌های ماینکرفت ۱.۲۱

از نوار فیلتر زیر نوع آیتم یا نسخه بازی خود را انتخاب کنید و روی هر فارم کلیک کنید تا وارد صفحه **لیست آیتم‌ها و آموزش گام‌به‌گام ساخت** آن شوید:

<!-- نوار فیلتر تک‌ردیفه و خلوت -->
<div class="mc-filter-bar">
<input
v-model="searchQuery"
type="text"
class="mc-search-input"
placeholder="جستجوی نام فارم (مثلاً آهن، طلا، اندرمن، باروت)..."
/>
<select v-model="selectedItem" class="mc-filter-select">
<option value="all">همه آیتم‌ها</option>
<option value="iron">آهن (Iron)</option>
<option value="gold">طلا (Gold)</option>
<option value="xp">تجربه (XP)</option>
<option value="gunpowder">باروت (Gunpowder)</option>
</select>
<select v-model="selectedEdition" class="mc-filter-select">
<option value="all">همه نسخه‌ها (Java & Bedrock)</option>
<option value="java">مخصوص جاوا (PC)</option>
<option value="bedrock">مخصوص بدراک (موبایل/کنسول)</option>
</select>
<select v-model="selectedTier" class="mc-filter-select">
<option value="all">همه سطوح سختی</option>
<option value="easiest">آسان و سریع (روز اول)</option>
<option value="best">پربازده و استاندارد</option>
<option value="biggest">مگافارم حرفه‌ای</option>
</select>
</div>

<!-- لیست خلوت و منظم فارم‌ها -->
<div class="mc-item-list">
<a v-for="(farm, idx) in filteredFarms" :key="idx" :href="farm.url" class="mc-list-item">
<div class="mc-item-info">
<div>
<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
<h4 style="margin: 0 !important;">{{ farm.frontmatter.title }}</h4>
<span v-if="farm.frontmatter.output" class="mc-tag mc-tag-green">{{ farm.frontmatter.output }}</span>
<span class="mc-tag mc-tag-gray">
{{ farm.frontmatter.edition === 'both' ? 'Java & Bedrock' : (farm.frontmatter.edition === 'java' ? 'Java' : 'Bedrock') }} {{ farm.frontmatter.mcVersion }}
</span>
</div>
<p>{{ farm.frontmatter.description }}</p>
</div>
</div>
<span class="mc-btn mc-btn-glass" style="white-space: nowrap;">آموزش ساخت ←</span>
</a>
</div>
