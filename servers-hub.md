---
title: "هاب جامع سرورهای ماینکرفت (لیست سرورهای ایرانی، کرکی و آمار زنده پلیرها)"
description: "لیست شلوغ‌ترین سرورهای ماینکرفت ایرانی و جهانی با نمایش لحظه‌ای و زنده تعداد پلیرهای آنلاین، فیلتر کرکی، جاوا و بدراک و آموزش ساخت سرور."
date: "2026-11-04"
isHub: true
---

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.mjs'
import { fetchServerLiveStatus, toPersianDigits } from './.vitepress/theme/liveServerStatus.js'

const platformFilter = ref('all')
const regionFilter = ref('all')
const crackedOnly = ref(false)
const sortBy = ref('players')
const searchQuery = ref('')
const copiedIp = ref('')
const isCheckingLive = ref(false)
const lastUpdatedTime = ref('')

const servers = ref([
  {
    name: 'هایپیکسل (Hypixel - جهانی)',
    ip: 'mc.hypixel.net',
    port: '25565',
    platform: 'java',
    region: 'global',
    cracked: false,
    modes: 'SkyBlock, BedWars, SkyWars, Murder Mystery, Duels',
    playerCount: 45000,
    playersLabel: '+۴۵,۰۰۰ پلیر آنلاین',
    online: true,
    isLive: false,
    popularity: 100,
    url: '/hypixel'
  },
  {
    name: 'دونات اس‌ام‌پی (DonutSMP - جهانی)',
    ip: 'donutsmp.net',
    port: '19132',
    platform: 'both',
    region: 'global',
    cracked: false,
    modes: 'Hardcore SMP, Economy, Lifesteal, PvP',
    playerCount: 4500,
    playersLabel: '+۴,۵۰۰ پلیر آنلاین',
    online: true,
    isLive: false,
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
    playersLabel: '+۱,۵۰۰ پلیر آنلاین',
    online: true,
    isLive: false,
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
    playersLabel: '+۶۵۰ پلیر آنلاین',
    online: true,
    isLive: false,
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
    playersLabel: '+۴۵۰ پلیر آنلاین',
    online: true,
    isLive: false,
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
    playersLabel: '+۳۲۰ پلیر آنلاین',
    online: true,
    isLive: false,
    popularity: 86
  }
])

const refreshAllServers = async () => {
  if (isCheckingLive.value) return
  isCheckingLive.value = true
  await Promise.all(
    servers.value.map(async (srv) => {
      const res = await fetchServerLiveStatus(srv.ip, srv.platform === 'bedrock')
      if (res && res.online) {
        srv.playerCount = res.players
        srv.playersLabel = res.label
        srv.online = true
        srv.isLive = true
      }
    })
  )
  const now = new Date()
  lastUpdatedTime.value = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  isCheckingLive.value = false
}

let intervalId = null
onMounted(() => {
  refreshAllServers()
  intervalId = setInterval(refreshAllServers, 60000)
})
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const totalOnlinePlayers = computed(() => {
  const sum = servers.value.reduce((acc, s) => acc + (s.playerCount || 0), 0)
  return toPersianDigits(sum)
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
    const matchCracked = !crackedOnly.value || s.cracked

    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch = !q ||
      s.name.toLowerCase().includes(q) ||
      s.ip.toLowerCase().includes(q) ||
      s.modes.toLowerCase().includes(q)

    return matchPlatform && matchRegion && matchCracked && matchSearch
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

# 🌐 هاب جامع سرورهای ماینکرفت (آمار زنده پلیرها + آموزش ساخت سرور)

در این بخش می‌توانید شلوغ‌ترین سرورهای ماینکرفت را بر اساس **تعداد لحظه‌ای پلیرهای آنلاین، ایرانی یا جهانی بودن، کرکی بودن و نسخه بازی (جاوا/بدراک)** فیلتر کنید و با یک کلیک آی‌پی آن‌ها را کپی کنید:

<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 24px; background: rgba(27, 217, 106, 0.08); border: 1px solid rgba(27, 217, 106, 0.3); padding: 14px 18px; border-radius: 16px;">
  <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
    <span class="mc-live-dot"></span>
    <span style="font-weight: 800; color: #fff; font-size: 15px;">مجموع پلیرهای آنلاین در سرورهای لیست‌شده: <b style="color: #1bd96a;">{{ totalOnlinePlayers }} نفر</b></span>
    <span v-if="lastUpdatedTime" style="font-size: 12px; color: #94a3b8;">(آخرین استعلام زنده: {{ lastUpdatedTime }})</span>
  </div>
  <button @click="refreshAllServers" class="mc-btn mc-btn-glass" style="padding: 6px 14px; font-size: 12.5px; cursor: pointer;">
    {{ isCheckingLive ? '⏳ در حال استعلام زنده...' : '🔄 بروزرسانی لحظه‌ای پلیرها' }}
  </button>
</div>

<h2 id="سرورهای-ایرانی" style="margin-top: 24px;">🎮 لیست سرورهای فعال ماینکرفت (ایرانی و جهانی)</h2>

<div class="mc-box" style="margin: 20px 0;">
<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
<div style="display: flex; gap: 8px; flex-wrap: wrap;">
<button @click="platformFilter = 'all'" :class="['mc-btn', platformFilter === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 14px; font-size: 13px; cursor: pointer;">🌐 همه پلتفرم‌ها</button>
<button @click="platformFilter = 'java'" :class="['mc-btn', platformFilter === 'java' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 14px; font-size: 13px; cursor: pointer;">💻 جاوا (PC)</button>
<button @click="platformFilter = 'bedrock'" :class="['mc-btn', platformFilter === 'bedrock' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 14px; font-size: 13px; cursor: pointer;">📱 بدراک (موبایل)</button>
</div>

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
<button @click="regionFilter = regionFilter === 'iran' ? 'all' : 'iran'" :class="['mc-btn', regionFilter === 'iran' ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 14px; font-size: 13px; cursor: pointer;">🇮🇷 فقط سرورهای ایرانی</button>
<button @click="crackedOnly = !crackedOnly" :class="['mc-btn', crackedOnly ? 'mc-btn-primary' : 'mc-btn-glass']" style="padding: 8px 14px; font-size: 13px; cursor: pointer;">🔓 فقط کرکی (Cracked)</button>
<select v-model="sortBy" style="background: #080b12; color: #1bd96a; border: 1px solid #1bd96a; border-radius: 10px; padding: 8px 12px; font-family: inherit; font-size: 13px; cursor: pointer;">
<option value="players">🔥 مرتب‌سازی: بیشترین پلیر آنلاین</option>
<option value="popularity">⭐ مرتب‌سازی: معروف‌ترین</option>
</select>
</div>
</div>

<input v-model="searchQuery" type="text" placeholder="🔍 جستجوی نام سرور، آی‌پی یا گیم‌مود (مثلاً: هایپیکسل، تیرکس، BedWars، SkyBlock)..." style="width: 100%; padding: 12px 16px; border-radius: 12px; background: #080b12; border: 1.5px solid #1bd96a; color: #fff; font-size: 14.5px; font-family: inherit;" />
</div>

<div class="mc-item-list">
<div v-for="(srv, i) in filteredServers" :key="srv.ip" class="mc-list-item" style="flex-wrap: wrap; gap: 12px;">
<div class="mc-item-info">
<span class="mc-item-icon">🟢</span>
<div>
<h4 style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
{{ srv.name }}
<span class="mc-tag mc-tag-green" style="display: inline-flex; align-items: center;">
  <span class="mc-live-dot"></span>
  {{ srv.playersLabel }}
  <small v-if="srv.isLive" style="margin-right: 4px; opacity: 0.85;">(زنده)</small>
</span>
<span v-if="srv.cracked" class="mc-tag mc-tag-amber">کرکی (Cracked)</span>
<span v-else class="mc-tag mc-tag-purple">پرمیوم (Original)</span>
</h4>
<p>
  <b>IP:</b> <code>{{ srv.ip }}</code>
  <template v-if="srv.platform !== 'java'"> | <b>پورت بدراک/موبایل:</b> <code>{{ srv.port }}</code></template>
  | <b>گیم‌مودها:</b> {{ srv.modes }}
</p>
</div>
</div>
<div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
<span class="mc-tag mc-tag-blue">{{ srv.platform === 'both' ? 'Java & Bedrock' : (srv.platform === 'java' ? 'فقط Java' : 'فقط Bedrock') }}</span>
<button @click="copyIp(srv.ip)" class="mc-btn mc-btn-primary" style="padding: 6px 14px; font-size: 12.5px; cursor: pointer; border: none;">
{{ copiedIp === srv.ip ? '✅ کپی شد!' : '📋 کپی IP' }}
</button>
<a v-if="srv.url" :href="srv.url" class="mc-btn mc-btn-glass" style="padding: 6px 14px; font-size: 12.5px;">
  📖 راهنما و بررسی سرور
</a>
</div>
</div>
</div>

---

## 📚 مقالات بررسی سرورها، ساخت سرور و رفع لگ

<div class="mc-item-list" style="margin-top: 16px;">
<a v-for="post in serverArticles" :key="post.url" :href="post.url" class="mc-list-item">
<div class="mc-item-info">
<span class="mc-item-icon">📄</span>
<div>
<h4>{{ post.frontmatter.title }}</h4>
<p>{{ post.frontmatter.description }}</p>
</div>
</div>
<div style="display: flex; gap: 8px; align-items: center;">
<span v-if="post.frontmatter.badge" class="mc-tag mc-tag-blue">{{ post.frontmatter.badge }}</span>
<span class="mc-tag mc-tag-purple">{{ post.frontmatter.date }}</span>
</div>
</a>
</div>

---

<h2 id="ثبت-سرور">➕ ثبت رایگان سرور ماینکرفت شما در پلی‌پدیا</h2>

اگر مدیر یک سرور ماینکرفت ایرانی هستید و می‌خواهید سرورتان در لیست بالا قرار بگیرد و تعداد پلیرهای آن به صورت لحظه‌ای نمایش داده شود، کافی است در **بخش دیدگاه‌های پایین همین صفحه** گزینه **«🌐 معرفی و ثبت سرور»** را انتخاب کرده و **نام سرور، آی‌پی (IP)، پورت بدراک، گیم‌مودها و لینک دیسکورد/تلگرام** خود را ارسال کنید تا پس از تست پینگ و پایداری، به رایگان در لیست قرار گیرد.
