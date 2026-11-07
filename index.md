---
layout: page
sidebar: false
title: "پلی‌پدیا (PlayPedia) | مرجع تخصصی سرورها، فارم‌ها و مادهای ماینکرفت"
description: "مرجع تخصصی ماینکرفت ایران: لیست سرورها با تعداد دقیق پلیر آنلاین، دانلود مادهای Fabric و Forge، بانک فارم‌های ۱.۲۱ و رفع ارورهای بازی."
date: "2026-11-04"
---

<script setup>
import { ref, onMounted } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.mjs'
import { fetchServerLiveStatus } from './.vitepress/theme/liveServerStatus.js'

const copiedIp = ref('')

const featuredServers = ref([
  {
    name: 'هایپیکسل (Hypixel)',
    ip: 'mc.hypixel.net',
    desc: 'بزرگ‌ترین نتورک جهان · SkyBlock & BedWars',
    statusText: '۴۴,۸۰۰ پلیر آنلاین',
    online: true,
    link: '/hypixel'
  },
  {
    name: 'دونات اس‌ام‌پی (DonutSMP)',
    ip: 'donutsmp.net',
    desc: 'هاردکور بقا، شارد و اقتصاد · پورت 19132',
    statusText: '۱۴,۶۰۰ پلیر آنلاین',
    online: true,
    link: '/donut-smp'
  },
  {
    name: 'تیرکس ماین (T-RexMine)',
    ip: 'play.trexmine.com',
    desc: 'سرور کرکی با پینگ پایین · BedWars & Survival',
    statusText: '۱,۴۸۰ پلیر آنلاین',
    online: true,
    link: '/servers-hub#سرورهای-ایرانی'
  }
])

const copyServerIp = (ip, e) => {
  if (e) e.preventDefault()
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(ip)
    copiedIp.value = ip
    setTimeout(() => { copiedIp.value = '' }, 2000)
  }
}

onMounted(async () => {
  await Promise.all(
    featuredServers.value.map(async (srv) => {
      const res = await fetchServerLiveStatus(srv.ip, false)
      if (res) {
        srv.online = res.online
        srv.statusText = res.online ? res.label : 'آفلاین'
      } else {
        srv.statusText = 'آنلاین'
      }
    })
  )
})
</script>

<div class="mc-portal">
<section class="mc-command-hero">
<div class="mc-hero-main">
<div class="mc-status-strip">
<span class="mc-status-pill"><span class="mc-live-dot"></span>نسخه ۱.۲۱.۴ ماینکرفت</span>
<span class="mc-edition-chip">Java &amp; Bedrock</span>
<span class="mc-edition-chip">بروزرسانی آبان ۱۴۰۵</span>
</div>
<div class="mc-brand-row">
<img src="/logo.svg" alt="لوگوی پلی‌پدیا - مرجع ماینکرفت" class="mc-brand-logo" width="60" height="60" />
<div>
<h1 class="mc-hero-heading">پلی‌پدیا <span class="mc-hero-subbadge">PLAYPEDIA WIKI</span></h1>
<p class="mc-hero-lead">ویکی فنی و رادار زنده ماینکرفت ایران؛ بررسی لحظه‌ای پلیرهای سرورها، نقشه‌های ساخت فارم‌های ۱.۲۱، مادپک‌های افزایش FPS و رفع ارورهای لانچر.</p>
</div>
</div>
<div class="mc-action-bar">
<a href="/servers-hub" class="mc-btn-3d mc-btn-emerald">🌐 رادار زنده سرورها</a>
<a href="/farms-hub" class="mc-btn-3d mc-btn-surface">🌾 بانک فارم‌های ۱.۲۱</a>
<a href="/mods-hub" class="mc-btn-3d mc-btn-surface">📦 دانلود ماد و شیدر</a>
<a href="/errors-fix" class="mc-btn-3d mc-btn-surface">⚡ رفع ارور و افزایش FPS</a>
</div>
<div class="mc-quick-metrics">
<div class="mc-metric-item"><strong>+۱۵ سرور فعال</strong><span>استعلام مستقیم پینگ و پلیر</span></div>
<div class="mc-metric-divider"></div>
<div class="mc-metric-item"><strong>۷ مرجع فارم و ماینینگ</strong><span>جاوا و بدراک ۱.۲۱ (تست‌شده)</span></div>
<div class="mc-metric-divider"></div>
<div class="mc-metric-item"><strong>+۳۰۰٪ فریم‌ریت</strong><span>ترکیب Sodium و Lithium</span></div>
</div>
</div>
<div class="mc-hero-radar">
<div class="mc-radar-header">
<div class="mc-radar-title"><span class="mc-live-dot"></span><span>رادار لحظه‌ای سرورهای منتخب</span></div>
<a href="/servers-hub" class="mc-radar-all">مشاهده همه ←</a>
</div>
<div class="mc-radar-list">
<div v-for="srv in featuredServers" :key="srv.ip" class="mc-radar-row">
<a :href="srv.link" class="mc-radar-info">
<div class="mc-radar-top">
<strong>{{ srv.name }}</strong>
<span :class="['mc-tag', srv.online ? 'mc-tag-green' : 'mc-tag-red']"><span :class="srv.online ? 'mc-live-dot' : 'mc-live-dot-offline'"></span>{{ srv.statusText }}</span>
</div>
<p>{{ srv.desc }}</p>
</a>
<div class="mc-radar-actions">
<code class="mc-ip-code">{{ srv.ip }}</code>
<button @click="copyServerIp(srv.ip, $event)" class="mc-copy-chip" type="button">{{ copiedIp === srv.ip ? 'کپی شد ✓' : 'کپی IP' }}</button>
</div>
</div>
</div>
</div>
</section>

<!-- کادر جستجوی هوشمند زنده در کل سایت -->
<SmartSearch :inlineMode="true" />

<section class="mc-section" aria-label="بخش‌های اصلی پلی‌پدیا">
<div class="mc-cat-grid">
<a href="/servers-hub" class="mc-cat-card mc-tier-emerald">
<div class="mc-card-top-bar"><div class="mc-cat-svg-icon" aria-hidden="true">◈</div><span class="mc-tier-badge">SERVER NETWORK</span></div>
<h2>هاب سرورهای ماینکرفت</h2>
<p>مشاهده لحظه‌ای تعداد پلیرهای آنلاین سرورهای ایران و جهان، فیلتر کرکی/پرمیوم و آموزش ساخت سرور ۲۴ ساعته و آترنوس.</p>
<div class="mc-card-footer"><span>ورود به لیست سرورها</span><span class="mc-arrow">←</span></div>
</a>
<a href="/mods-hub" class="mc-cat-card mc-tier-amethyst">
<div class="mc-card-top-bar"><div class="mc-cat-svg-icon" aria-hidden="true">❖</div><span class="mc-tier-badge">FABRIC &amp; FORGE</span></div>
<h2>مرکز دانلود ماد و شیدرپک</h2>
<p>دسته‌بندی مادهای Fabric و Forge، جایگزین‌های مدرن OptiFine (سودیوم و Iris) به همراه جدول دقیق پیش‌نیازها.</p>
<div class="mc-card-footer"><span>مشاهده بانک مادها</span><span class="mc-arrow">←</span></div>
</a>
<a href="/farms-hub" class="mc-cat-card mc-tier-gold">
<div class="mc-card-top-bar"><div class="mc-cat-svg-icon" aria-hidden="true">✦</div><span class="mc-tier-badge">SURVIVAL 1.21</span></div>
<h2>بانک جامع فارم‌های ۱.۲۱</h2>
<p>آموزش گام‌به‌گام ساخت فارم آهن روز اول بدون رداستون، مگافارم طلا روی سقف ندر، XP اندرمن و فارم کریپر بدون گربه.</p>
<div class="mc-card-footer"><span>جستجو در فارم‌ها</span><span class="mc-arrow">←</span></div>
</a>
<a href="/errors-fix" class="mc-cat-card mc-tier-diamond">
<div class="mc-card-top-bar"><div class="mc-cat-svg-icon" aria-hidden="true">⚡</div><span class="mc-tier-badge">CRASH &amp; FPS FIX</span></div>
<h2>رفع ارور و بهینه‌سازی FPS</h2>
<p>حل قطعی ارورهای Exit Code 1، خطای کارت گرافیک GLFW 65542، جدول نسخه‌های Java و مقایسه لانچرهای امن و سبک.</p>
<div class="mc-card-footer"><span>عیب‌یابی سریع بازی</span><span class="mc-arrow">←</span></div>
</a>
</div>
</section>
<section class="mc-section mc-dual-grid">
<div class="mc-box">
<div class="mc-section-header"><h2>جدیدترین آموزش‌ها و راهنماهای تخصصی</h2><a href="/farms-hub" class="mc-more">آرشیو کامل ←</a></div>
<div class="mc-item-list">
<a v-for="post in posts.slice(0, 5)" :key="post.url" :href="post.url" class="mc-list-item">
<div class="mc-item-info"><div class="mc-doc-bullet"></div><div><h3>{{ post.frontmatter.title }}</h3><p>{{ post.frontmatter.description ? post.frontmatter.description.slice(0, 80) + '...' : '' }}</p></div></div>
<div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap; flex-shrink: 0;">
<span v-if="post.frontmatter.badge" class="mc-tag mc-tag-blue">{{ post.frontmatter.badge }}</span>
<time :datetime="post.frontmatter.date" class="mc-tag mc-tag-purple">{{ post.frontmatter.persianDate }}</time>
</div>
</a>
</div>
</div>
<div class="mc-box mc-cheatsheet-box">
<div class="mc-section-header"><h2>جدول سریع مختصات و پیش‌نیازهای ۱.۲۱</h2><a href="/survival-guide" class="mc-more">راهنمای ماینینگ ←</a></div>
<div class="mc-cheat-grid">
<a href="/survival-guide" class="mc-cheat-card"><span class="mc-cheat-label">بهترین ارتفاع دایموند</span><code class="mc-cheat-val">Y = -54 تا -58</code><span class="mc-cheat-sub">هم‌سطح لاوا · بیشترین تراکم</span></a>
<a href="/survival-guide" class="mc-cheat-card"><span class="mc-cheat-label">بهترین ارتفاع ندرایت</span><code class="mc-cheat-val">Y = 15 (Nether)</code><span class="mc-cheat-sub">استخراج با تخت یا TNT</span></a>
<a href="/errors-fix" class="mc-cheat-card"><span class="mc-cheat-label">جاوا مورد نیاز ۱.۲۰.۵ به بالا</span><code class="mc-cheat-val">Java 21 (64-bit)</code><span class="mc-cheat-sub">رفع ارور کرش Exit Code 1</span></a>
<a href="/enderman-xp-farm" class="mc-cheat-card"><span class="mc-cheat-label">سریع‌ترین فارم XP بازی</span><code class="mc-cheat-val">Enderman Y = 1</code><span class="mc-cheat-sub">لول ۰ تا ۳۰ در ۴۵ ثانیه</span></a>
<a href="/iron-farm" class="mc-cheat-card"><span class="mc-cheat-label">فارم آهن روز اول (جاوا)</span><code class="mc-cheat-val">+350 Iron / Hour</code><span class="mc-cheat-sub">بدون رداستون و نیم‌تگ</span></a>
<a href="/gold-xp-farm" class="mc-cheat-card"><span class="mc-cheat-label">سقف ندر (Nether Roof)</span><code class="mc-cheat-val">Y = 127 -> 128</code><span class="mc-cheat-sub">مگافارم طلا و XP بی‌نهایت</span></a>
</div>
</div>
</section>
</div>
