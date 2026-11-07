---
title: "لیست سرورهای ماینکرفت (ایرانی و جهانی با تعداد دقیق پلیر آنلاین)"
description: "لیست شلوغ‌ترین سرورهای ماینکرفت ایرانی و جهانی با بررسی لحظه‌ای تعداد دقیق پلیرهای آنلاین هر سرور، فیلتر کرکی، جاوا و بدراک و آموزش ساخت سرور."
date: "2026-11-04"
isHub: true
---

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { fetchServerLiveStatus } from './.vitepress/theme/liveServerStatus.js'
import { matchesPersianQuery } from './.vitepress/theme/dateUtils.js'

const platformFilter = ref('all')
const regionFilter = ref('all')
const accessFilter = ref('all')
const sortBy = ref('players')
const searchQuery = ref('')
const copiedIp = ref('')

const servers = ref([
  {
    name: 'هایپیکسل (Hypixel)',
    ip: 'mc.hypixel.net',
    port: '25565',
    platform: 'java',
    region: 'global',
    cracked: false,
    modes: 'SkyBlock, BedWars, SkyWars, Duels',
    keywords: 'هایپیکسل اسکای بلاک بدوارز اسکای وارز پرمیوم جهانی',
    playerCount: 44800,
    statusText: '۴۴,۸۰۰ پلیر آنلاین',
    online: true,
    checked: false,
    popularity: 100,
    url: '/hypixel'
  },
  {
    name: 'دونات اس‌ام‌پی (DonutSMP)',
    ip: 'donutsmp.net',
    port: '19132',
    platform: 'both',
    region: 'global',
    cracked: false,
    modes: 'Hardcore SMP, Economy, PvP',
    keywords: 'دونات اس ام پی هاردکور شارد اقتصاد موبایل بدراک جاوا',
    playerCount: 14600,
    statusText: '۱۴,۶۰۰ پلیر آنلاین',
    online: true,
    checked: false,
    popularity: 98,
    url: '/donut-smp'
  },
  {
    name: 'تیرکس ماین (T-RexMine)',
    ip: 'play.trexmine.com',
    port: '19132',
    platform: 'both',
    region: 'iran',
    cracked: true,
    modes: 'BedWars, Survival, SkyBlock, BoxPvP',
    keywords: 'تیرکس ماین تی رکس ماین سرور ایرانی کرکی بدوارز باکس پی وی پی',
    playerCount: 1480,
    statusText: '۱,۴۸۰ پلیر آنلاین',
    online: true,
    checked: false,
    popularity: 99
  },
  {
    name: 'مدکرفت (MadCraft)',
    ip: 'play.madcraft.ir',
    port: '25565',
    platform: 'java',
    region: 'iran',
    cracked: true,
    modes: 'Survival, Factions, PvP, BedWars',
    keywords: 'مدکرفت مد کرفت سرور ایرانی کرکی فکشن بقا بدوارز',
    playerCount: 640,
    statusText: '۶۴۰ پلیر آنلاین',
    online: true,
    checked: false,
    popularity: 95
  },
  {
    name: 'آرین کرفت (ArianCraft)',
    ip: 'play.ariancraft.ir',
    port: '19132',
    platform: 'both',
    region: 'iran',
    cracked: true,
    modes: 'LifeSteal, BoxPvP, BedWars',
    keywords: 'آرین کرفت ارین کرفت لایف استیل سرور ایرانی کرکی موبایل',
    playerCount: 440,
    statusText: '۴۴۰ پلیر آنلاین',
    online: true,
    checked: false,
    popularity: 90
  },
  {
    name: 'پرشین کرفت (PersianCraft)',
    ip: 'mc.persiancraft.ir',
    port: '19132',
    platform: 'bedrock',
    region: 'iran',
    cracked: true,
    modes: 'SMP, Survival, MiniGames',
    keywords: 'پرشین کرفت سرور موبایل پاکت ادیشن بدراک ایرانی کرکی',
    playerCount: 315,
    statusText: '۳۱۵ پلیر آنلاین',
    online: true,
    checked: false,
    popularity: 86
  }
])

const checkEachServerPlayers = async () => {
  await Promise.all(
    servers.value.map(async (srv) => {
      const res = await fetchServerLiveStatus(srv.ip, srv.platform === 'bedrock')
      if (res) {
        srv.online = res.online
        srv.checked = true
        if (res.online) {
          srv.playerCount = res.players
          srv.statusText = res.label
        } else {
          srv.playerCount = 0
          srv.statusText = 'آفلاین'
        }
      } else {
        srv.checked = true
        srv.statusText = 'آنلاین'
      }
    })
  )
}

const syncHashFilter = () => {
  if (typeof window === 'undefined') return
  const hash = decodeURIComponent(window.location.hash || '')
  if (hash === '#سرورهای-ایرانی') {
    regionFilter.value = 'iran'
  }
}

let timer = null
onMounted(() => {
  syncHashFilter()
  window.addEventListener('hashchange', syncHashFilter)
  checkEachServerPlayers()
  timer = setInterval(checkEachServerPlayers, 45000)
})
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('hashchange', syncHashFilter)
  }
  if (timer) clearInterval(timer)
})

const copyIp = (ip) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(ip)
    copiedIp.value = ip
    setTimeout(() => { copiedIp.value = '' }, 2000)
  }
}

const resetFilters = () => {
  platformFilter.value = 'all'
  regionFilter.value = 'all'
  accessFilter.value = 'all'
  searchQuery.value = ''
}

const filteredServers = computed(() => {
  let list = servers.value.filter(s => {
    const matchPlatform = platformFilter.value === 'all' || s.platform === 'both' || s.platform === platformFilter.value
    const matchRegion = regionFilter.value === 'all' || s.region === regionFilter.value
    const matchAccess = accessFilter.value === 'all' || (accessFilter.value === 'cracked' ? s.cracked : !s.cracked)

    const haystack = `${s.name} ${s.ip} ${s.modes} ${s.keywords || ''}`
    const matchSearch = matchesPersianQuery(haystack, searchQuery.value)

    return matchPlatform && matchRegion && matchAccess && matchSearch
  })

  return [...list].sort((a, b) => {
    if (sortBy.value === 'players') return b.playerCount - a.playerCount
    return b.popularity - a.popularity
  })
})
</script>

# لیست سرورهای ماینکرفت (ایرانی و جهانی)

در جدول رادار زیر، تعداد دقیق پلیرهای آنلاین هر سرور به صورت لحظه‌ای استعلام می‌شود. با استفاده از فیلترها و کادر جستجوی زیر می‌توانید سرور مناسب نسخه بازی خود (جاوا یا بدراک، کرکی یا پرمیوم) را پیدا کنید:

<h2 id="سرورهای-ایرانی">رادار زنده سرورهای فعال ماینکرفت</h2>

<!-- نوار فیلتر تک‌ردیفه و منظم -->
<div class="mc-filter-bar">
<input
v-model="searchQuery"
type="search"
class="mc-search-input"
placeholder="🔍 جستجوی نام سرور، IP یا گیم‌مود (مثلاً تیرکس، هایپیکسل، BedWars)..."
aria-label="جستجوی نام سرور یا گیم‌مود"
/>
<select v-model="regionFilter" class="mc-filter-select" aria-label="فیلتر منطقه سرور">
<option value="all">همه منطقه‌ها (ایران و جهان)</option>
<option value="iran">🇮🇷 فقط سرورهای ایرانی</option>
<option value="global">🌍 فقط سرورهای جهانی</option>
</select>
<select v-model="platformFilter" class="mc-filter-select" aria-label="فیلتر پلتفرم بازی">
<option value="all">همه پلتفرم‌ها (Java &amp; Bedrock)</option>
<option value="java">💻 کامپیوتر (Java)</option>
<option value="bedrock">📱 موبایل (Bedrock)</option>
</select>
<select v-model="accessFilter" class="mc-filter-select" aria-label="فیلتر وضعیت اکانت">
<option value="all">همه اکانت‌ها (کرکی و پرمیوم)</option>
<option value="cracked">🔓 فقط کرکی (Cracked)</option>
<option value="premium">💎 فقط پرمیوم (Original)</option>
</select>
<select v-model="sortBy" class="mc-filter-select" aria-label="مرتب‌سازی سرورها">
<option value="players">مرتب‌سازی: بیشترین پلیر آنلاین</option>
<option value="popularity">مرتب‌سازی: محبوب‌ترین</option>
</select>
</div>

<!-- لیست تمیز و خلوت سرورها -->
<div v-if="filteredServers.length > 0" class="mc-item-list">
<div v-for="srv in filteredServers" :key="srv.ip" class="mc-list-item">
<div class="mc-item-info">
<div>
<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
<h3 style="margin: 0 !important;">{{ srv.name }}</h3>
<span :class="['mc-tag', srv.online ? 'mc-tag-green' : 'mc-tag-red']">
<span :class="srv.online ? 'mc-live-dot' : 'mc-live-dot-offline'"></span>
{{ srv.statusText }}
</span>
<span class="mc-tag mc-tag-gray">
{{ srv.cracked ? 'کرکی' : 'پرمیوم' }} · {{ srv.platform === 'both' ? 'Java & Bedrock' : (srv.platform === 'java' ? 'Java' : 'Bedrock') }}
</span>
</div>
<p>
<span>گیم‌مودها: {{ srv.modes }}</span>
<template v-if="srv.platform !== 'java'"> · پورت موبایل: <code>{{ srv.port }}</code></template>
</p>
</div>
</div>
<div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
<code class="mc-ip-code">{{ srv.ip }}</code>
<button @click="copyIp(srv.ip)" type="button" class="mc-btn mc-btn-primary" style="cursor: pointer;">
{{ copiedIp === srv.ip ? 'کپی شد ✓' : 'کپی IP' }}
</button>
<a v-if="srv.url" :href="srv.url" class="mc-btn mc-btn-glass">
بررسی و آموزش
</a>
</div>
</div>
</div>

<div v-else class="mc-empty-state">
<p style="margin: 0 0 12px !important;">سروری با فیلترهای انتخابی یا عبارت «{{ searchQuery }}» پیدا نشد.</p>
<button @click="resetFilters" type="button" class="mc-btn mc-btn-primary" style="cursor: pointer;">نمایش همه سرورها</button>
</div>

<HubArticles
  category="servers"
  title="📚 راهنماهای جامع سرورها و ساخت سرور اختصاصی"
  placeholder="🔍 جستجو در مقالات سرور (هایپیکسل، دونات، آترنوس، سرور پولی VPS)..."
/>

<h2 id="ثبت-سرور">ثبت رایگان سرور در پلی‌پدیا</h2>

برای افزودن سرور خود به این لیست، در بخش دیدگاه‌های پایین صفحه گزینه **«معرفی و ثبت سرور»** را انتخاب کرده و نام سرور، آی‌پی (`IP`)، پورت بدراک و گیم‌مودهای آن را بنویسید.
