---
title: "لیست سرورهای ماینکرفت (ایرانی و جهانی با تعداد دقیق پلیر آنلاین)"
description: "لیست شلوغ‌ترین سرورهای ماینکرفت ایرانی و جهانی با بررسی لحظه‌ای تعداد دقیق پلیرهای آنلاین هر سرور، فیلتر کرکی، جاوا و بدراک و آموزش ساخت سرور."
date: "2026-11-04"
isHub: true
---

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.mjs'
import { fetchServerLiveStatus } from './.vitepress/theme/liveServerStatus.js'

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
    playerCount: 45000,
    statusText: 'در حال بررسی پلیرها...',
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
    playerCount: 4500,
    statusText: 'در حال بررسی پلیرها...',
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
    playerCount: 1500,
    statusText: 'در حال بررسی پلیرها...',
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
    playerCount: 650,
    statusText: 'در حال بررسی پلیرها...',
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
    playerCount: 450,
    statusText: 'در حال بررسی پلیرها...',
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
    playerCount: 320,
    statusText: 'در حال بررسی پلیرها...',
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

let timer = null
onMounted(() => {
  checkEachServerPlayers()
  timer = setInterval(checkEachServerPlayers, 45000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const copyIp = (ip) => {
  navigator.clipboard.writeText(ip)
  copiedIp.value = ip
  setTimeout(() => { copiedIp.value = '' }, 2000)
}

const filteredServers = computed(() => {
  let list = servers.value.filter(s => {
    const matchPlatform = platformFilter.value === 'all' || s.platform === 'both' || s.platform === platformFilter.value
    const matchRegion = regionFilter.value === 'all' || s.region === regionFilter.value
    const matchAccess = accessFilter.value === 'all' || (accessFilter.value === 'cracked' ? s.cracked : !s.cracked)

    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch = !q ||
      s.name.toLowerCase().includes(q) ||
      s.ip.toLowerCase().includes(q) ||
      s.modes.toLowerCase().includes(q)

    return matchPlatform && matchRegion && matchAccess && matchSearch
  })

  return [...list].sort((a, b) => {
    if (sortBy.value === 'players') return b.playerCount - a.playerCount
    return b.popularity - a.popularity
  })
})

const serverArticles = computed(() => {
  return posts.filter(p => p.frontmatter.category === 'servers')
})
</script>

# لیست سرورهای ماینکرفت (ایرانی و جهانی)

در لیست زیر، تعداد دقیق پلیرهای آنلاین هر سرور به صورت لحظه‌ای استعلام می‌شود. با استفاده از فیلترهای زیر می‌توانید سرور مناسب نسخه بازی خود را پیدا کنید:

<!-- نوار فیلتر تک‌ردیفه و منظم -->
<div class="mc-filter-bar" id="سرورهای-ایرانی">
<input
v-model="searchQuery"
type="text"
class="mc-search-input"
placeholder="جستجوی نام سرور، IP یا گیم‌مود (مثلاً BedWars)..."
/>
<select v-model="regionFilter" class="mc-filter-select">
<option value="all">همه منطقه‌ها (ایران و جهان)</option>
<option value="iran">فقط سرورهای ایرانی</option>
<option value="global">فقط سرورهای جهانی</option>
</select>
<select v-model="platformFilter" class="mc-filter-select">
<option value="all">همه پلتفرم‌ها (Java & Bedrock)</option>
<option value="java">کامپیوتر (Java)</option>
<option value="bedrock">موبایل (Bedrock)</option>
</select>
<select v-model="accessFilter" class="mc-filter-select">
<option value="all">همه اکانت‌ها (کرکی و پرمیوم)</option>
<option value="cracked">فقط کرکی (Cracked)</option>
<option value="premium">فقط پرمیوم (Original)</option>
</select>
<select v-model="sortBy" class="mc-filter-select">
<option value="players">مرتب‌سازی: بیشترین پلیر آنلاین</option>
<option value="popularity">مرتب‌سازی: محبوب‌ترین</option>
</select>
</div>

<!-- لیست تمیز و خلوت سرورها -->
<div class="mc-item-list">
<div v-for="srv in filteredServers" :key="srv.ip" class="mc-list-item">
<div class="mc-item-info">
<div>
<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
<h4 style="margin: 0 !important;">{{ srv.name }}</h4>
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
<code style="background: #0b0f17; padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); color: #34d399; font-size: 13.5px; font-weight: 700;">{{ srv.ip }}</code>
<button @click="copyIp(srv.ip)" class="mc-btn mc-btn-primary" style="cursor: pointer;">
{{ copiedIp === srv.ip ? 'کپی شد ✓' : 'کپی IP' }}
</button>
<a v-if="srv.url" :href="srv.url" class="mc-btn mc-btn-glass">
بررسی و آموزش
</a>
</div>
</div>
</div>

## راهنماهای سرور و ساخت سرور اختصاصی

<div class="mc-item-list" style="margin-top: 14px;">
<a v-for="post in serverArticles" :key="post.url" :href="post.url" class="mc-list-item">
<div class="mc-item-info">
<div>
<h4>{{ post.frontmatter.title }}</h4>
<p>{{ post.frontmatter.description }}</p>
</div>
</div>
<span v-if="post.frontmatter.badge" class="mc-tag mc-tag-blue">{{ post.frontmatter.badge }}</span>
</a>
</div>

<h2 id="ثبت-سرور">ثبت رایگان سرور در پلی‌پدیا</h2>

برای افزودن سرور خود به این لیست، در بخش دیدگاه‌های پایین صفحه گزینه **«معرفی و ثبت سرور»** را انتخاب کرده و نام سرور، آی‌پی (`IP`)، پورت بدراک و گیم‌مودهای آن را بنویسید.
