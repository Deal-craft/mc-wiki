---
layout: page
sidebar: false
title: "پلی‌پدیا (PlayPedia) | مرجع تخصصی ماینکرفت"
description: "مرجع تخصصی ماینکرفت: لیست سرورها با آمار زنده پلیرها، دانلود مادهای Fabric و Forge، بانک فارم‌ها و رفع ارورهای بازی."
---

<script setup>
import { ref, onMounted } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.mjs'
import { fetchServerLiveStatus } from './.vitepress/theme/liveServerStatus.js'

const featuredServers = ref([
  {
    name: 'سرور جهانی هایپیکسل (Hypixel)',
    icon: '⚡',
    ip: 'mc.hypixel.net',
    desc: 'IP: mc.hypixel.net | اسکای‌بلاک، بدوارز و اسکای‌وارز',
    badge: '+۴۵,۰۰۰ پلیر آنلاین',
    link: '/hypixel'
  },
  {
    name: 'سرور تیرکس ماین (T-RexMine)',
    icon: '🦖',
    ip: 'play.trexmine.com',
    desc: 'IP: play.trexmine.com | بدوارز، بقا و اسکای‌بلاک (کرکی)',
    badge: '+۱,۵۰۰ پلیر آنلاین',
    link: '/servers-hub#سرورهای-ایرانی'
  },
  {
    name: 'سرور دونات اس‌ام‌پی (DonutSMP)',
    icon: '🍩',
    ip: 'donutsmp.net',
    desc: 'IP: donutsmp.net | هاردکور بقا، اقتصاد و PvP',
    badge: '+۴,۵۰۰ پلیر آنلاین',
    link: '/donut-smp'
  }
])

onMounted(async () => {
  await Promise.all(
    featuredServers.value.map(async (srv) => {
      const res = await fetchServerLiveStatus(srv.ip, false)
      if (res && res.online) {
        srv.badge = `${res.label} (زنده)`
      }
    })
  )
})
</script>

<div class="mc-portal">
<section class="mc-hero">
<div class="mc-hero-glow"></div>

<!-- لوگوی اختصاصی PlayPedia -->
<div class="mc-floating-logo" style="display: inline-flex; justify-content: center; margin-bottom: 12px;">
  <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gamerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10B981" />
        <stop offset="50%" stop-color="#06B6D4" />
        <stop offset="100%" stop-color="#3B82F6" />
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#34D399" />
        <stop offset="100%" stop-color="#22D3EE" />
      </linearGradient>
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect x="6" y="6" width="88" height="88" rx="22" fill="#1E293B" stroke="url(#gamerGrad)" stroke-width="2.5"/>
    <path d="M 26 84 L 26 34 C 26 20, 38 14, 52 14 C 68 14, 78 24, 78 38 C 78 52, 68 60, 50 60 L 38 60 L 38 84 C 38 87, 26 87, 26 84 Z" fill="url(#gamerGrad)" />
    <path d="M 38 36 C 38 30, 44 27, 50 27 C 58 27, 63 32, 63 39 C 63 46, 57 49, 48 49 L 38 49 Z" fill="#1E293B" />
    <path d="M 32 28 C 32 18, 46 16, 52 20" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
    <rect x="29" y="25" width="7" height="11" rx="3.5" transform="rotate(-12 29 25)" fill="#0F172A" stroke="#34D399" stroke-width="2"/>
    <path d="M 50 28 L 58 31 L 55 36 L 48 33 Z" fill="#38BDF8" filter="url(#neonGlow)"/>
    <g transform="translate(60, 38) rotate(15)">
      <rect x="0" y="0" width="18" height="11" rx="5.5" fill="#0F172A" stroke="#34D399" stroke-width="2"/>
      <circle cx="13" cy="4" r="1.5" fill="#10B981"/>
      <circle cx="15" cy="7" r="1.5" fill="#38BDF8"/>
      <path d="M 4 5.5 L 8 5.5 M 6 3.5 L 6 7.5" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
    </g>
    <path d="M 22 76 L 22 36 C 22 25, 28 18, 35 15" stroke="url(#glowGrad)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  </svg>
</div>

<div class="mc-badge">🔥 مرجع تخصصی حل مشکلات پلیرها، سرور و ماد</div>
<h1 class="mc-title"><span class="mc-gradient">پلی‌پدیا</span></h1>
<p class="mc-subtitle">از معرفی بهترین سرورهای ایرانی و جهانی با آمار لحظه‌ای پلیرها تا دانلود مادهای دسته‌بندی‌شده، بانک فارم‌ها و رفع قطعی ارورهای بازی و سیستم.</p>
<div class="mc-hero-btns">
<a href="/servers-hub" class="mc-btn mc-btn-primary">🌐 لیست سرورهای ماینکرفت (آمار زنده پلیرها)</a>
<a href="/mods-hub" class="mc-btn mc-btn-glass">📦 مرکز دانلود ماد و شیدر (دسته‌بندی‌شده)</a>
</div>
<div class="mc-stats-bar">
<div class="mc-stat"><b>+۱۵</b><span>سرور فعال با استعلام زنده</span></div>
<div class="mc-stat-divider"></div>
<div class="mc-stat"><b>+۱۲۰</b><span>مادهای Fabric و Forge</span></div>
<div class="mc-stat-divider"></div>
<div class="mc-stat"><b>۱۰۰٪</b><span>تست‌شده توسط پلیرها</span></div>
</div>
</section>

<section class="mc-section">
<div class="mc-section-header">
<h2>🎯 دنبال چه چیزی می‌گردید؟</h2>
</div>
<div class="mc-cat-grid">
<a href="/servers-hub" class="mc-cat-card">
<div class="mc-cat-icon">🖥️</div>
<h3>هاب سرورها (ایرانی، جهانی و ساخت سرور)</h3>
<p>مشاهده لحظه‌ای تعداد پلیرهای آنلاین سرورهای ایران و جهان (هایپیکسل، تیرکس، دونات اس‌ام‌پی) + آموزش ساخت سرور رایگان در آترنوس.</p>
<span class="mc-card-link">ورود به بخش سرورها ←</span>
</a>
<a href="/mods-hub" class="mc-cat-card">
<div class="mc-cat-icon">📦</div>
<h3>مرکز دانلود ماد و شیدرپک</h3>
<p>دسته‌بندی کامل مادهای Fabric و Forge، مقایسه Sodium و OptiFine به همراه لینک دانلود مستقیم و مادهای پیش‌نیاز.</p>
<span class="mc-card-link">ورود به مرکز دانلود ←</span>
</a>
<a href="/farms-hub" class="mc-cat-card">
<div class="mc-cat-icon">🌾</div>
<h3>بانک فارم‌ها (با آموزش گام‌به‌گام)</h3>
<p>جستجوی زنده بین تمام فارم‌های ماینکرفت ۱.۲۱ (آهن، طلا، اندرمن XP، باروت و...) به همراه لیست آیتم‌ها و آموزش کامل ساخت.</p>
<span class="mc-card-link">جستجو در بانک فارم‌ها ←</span>
</a>
<a href="/errors-fix" class="mc-cat-card">
<div class="mc-cat-icon">⚡</div>
<h3>رفع ارورها و بهینه‌سازی سیستم</h3>
<p>حل قطعی ارورهای لانچر و جاوا، معرفی لانچرهای امن و ترفندهای افزایش FPS و کاهش پینگ برای سیستم‌های ضعیف.</p>
<span class="mc-card-link">رفع مشکلات فنی ←</span>
</a>
</div>
</section>

<section class="mc-section mc-dual-grid">
<div class="mc-box">
<div class="mc-section-header">
<h2>🟢 وضعیت لحظه‌ای محبوب‌ترین سرورها</h2>
<a href="/servers-hub#ثبت-سرور" class="mc-more">+ ثبت سرور شما</a>
</div>
<div class="mc-item-list">
<a v-for="srv in featuredServers" :key="srv.ip" :href="srv.link" class="mc-list-item">
<div class="mc-item-info">
<span class="mc-item-icon">{{ srv.icon }}</span>
<div>
<h4>{{ srv.name }}</h4>
<p>{{ srv.desc }}</p>
</div>
</div>
<span class="mc-tag mc-tag-green" style="display: inline-flex; align-items: center;">
  <span class="mc-live-dot"></span>
  {{ srv.badge }}
</span>
</a>
<a href="/servers-hub#ثبت-سرور" class="mc-list-item">
<div class="mc-item-info">
<span class="mc-item-icon">➕</span>
<div>
<h4>سرور خودتان را رایگان اینجا ثبت کنید!</h4>
<p>آی‌پی و مشخصات سرورتان را بگذارید تا بقیه پلیرها جوین شوند</p>
</div>
</div>
<span class="mc-tag mc-tag-blue">ثبت رایگان</span>
</a>
</div>
</div>

<div class="mc-box">
<div class="mc-section-header">
<h2>🕒 جدیدترین مقالات و آموزش‌ها</h2>
<span class="mc-more">به‌روزرسانی خودکار</span>
</div>
<div class="mc-item-list">
<a v-for="post in posts.slice(0, 4)" :key="post.url" :href="post.url" class="mc-list-item">
<div class="mc-item-info">
<span class="mc-item-icon">📄</span>
<div>
<h4>{{ post.frontmatter.title }}</h4>
<p>{{ post.frontmatter.description ? post.frontmatter.description.slice(0, 65) + '...' : '' }}</p>
</div>
</div>
<span class="mc-tag mc-tag-purple">{{ post.frontmatter.date || 'جدید' }}</span>
</a>
</div>
</div>
</section>
</div>
