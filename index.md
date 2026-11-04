---
layout: page
sidebar: false
title: "پلی‌پدیا (PlayPedia) | مرجع تخصصی ماینکرفت"
description: "مرجع تخصصی ماینکرفت: لیست سرورها با تعداد دقیق پلیر آنلاین، دانلود مادهای Fabric و Forge، بانک فارم‌ها و رفع ارورهای بازی."
---

<script setup>
import { ref, onMounted } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.mjs'
import { fetchServerLiveStatus } from './.vitepress/theme/liveServerStatus.js'

const featuredServers = ref([
  {
    name: 'هایپیکسل (Hypixel)',
    ip: 'mc.hypixel.net',
    desc: 'اسکای‌بلاک، بدوارز و اسکای‌وارز (Java)',
    statusText: 'در حال بررسی...',
    online: true,
    link: '/hypixel'
  },
  {
    name: 'دونات اس‌ام‌پی (DonutSMP)',
    ip: 'donutsmp.net',
    desc: 'هاردکور بقا، اقتصاد و PvP (Java & Bedrock)',
    statusText: 'در حال بررسی...',
    online: true,
    link: '/donut-smp'
  },
  {
    name: 'تیرکس ماین (T-RexMine)',
    ip: 'play.trexmine.com',
    desc: 'بدوارز، بقا و اسکای‌بلاک (کرکی - ایران)',
    statusText: 'در حال بررسی...',
    online: true,
    link: '/servers-hub#سرورهای-ایرانی'
  }
])

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
  <section class="mc-hero">
    <div class="mc-floating-logo">
      <img src="/logo.svg" alt="PlayPedia Logo" width="72" height="72" />
    </div>
    <div class="mc-badge">مرجع تخصصی سرور، ماد و فارم ماینکرفت</div>
    <h1 class="mc-title"><span class="mc-gradient">پلی‌پدیا</span></h1>
    <p class="mc-subtitle">معرفی سرورهای ایرانی و جهانی با نمایش لحظه‌ای تعداد پلیرها، دانلود مادهای Fabric و Forge، بانک فارم‌های ۱.۲۱ و رفع قطعی ارورهای بازی.</p>
    <div class="mc-hero-btns">
      <a href="/servers-hub" class="mc-btn mc-btn-primary">لیست سرورهای ماینکرفت</a>
      <a href="/farms-hub" class="mc-btn mc-btn-glass">بانک فارم‌های ۱.۲۱</a>
      <a href="/mods-hub" class="mc-btn mc-btn-glass">دانلود ماد و شیدر</a>
    </div>
  </section>

  <section class="mc-section">
    <div class="mc-cat-grid">
      <a href="/servers-hub" class="mc-cat-card">
        <div class="mc-cat-icon">🖥️</div>
        <h3>هاب سرورها</h3>
        <p>مشاهده لحظه‌ای تعداد پلیرهای آنلاین سرورهای ایران و جهان به همراه آموزش ساخت سرور رایگان در آترنوس.</p>
        <span class="mc-card-link">مشاهده سرورها ←</span>
      </a>
      <a href="/mods-hub" class="mc-cat-card">
        <div class="mc-cat-icon">📦</div>
        <h3>ماد و شیدرپک</h3>
        <p>دسته‌بندی مادهای Fabric و Forge، مقایسه Sodium و OptiFine به همراه لینک دانلود مستقیم پیش‌نیازها.</p>
        <span class="mc-card-link">مرکز دانلود ←</span>
      </a>
      <a href="/farms-hub" class="mc-cat-card">
        <div class="mc-cat-icon">🌾</div>
        <h3>بانک فارم‌ها</h3>
        <p>آموزش گام‌به‌گام ساخت فارم‌های ماینکرفت ۱.۲۱ (آهن، طلا، XP اندرمن و باروت) برای جاوا و بدراک.</p>
        <span class="mc-card-link">بانک فارم‌ها ←</span>
      </a>
      <a href="/errors-fix" class="mc-cat-card">
        <div class="mc-cat-icon">⚡</div>
        <h3>رفع ارور و افزایش FPS</h3>
        <p>حل قطعی ارورهای جاوا و کرش بازی، معرفی لانچرهای امن و ترفندهای افزایش فریم‌ریت سیستم‌های ضعیف.</p>
        <span class="mc-card-link">عیب‌یابی سیستم ←</span>
      </a>
    </div>
  </section>

  <section class="mc-section mc-dual-grid">
    <div class="mc-box">
      <div class="mc-section-header">
        <h2>وضعیت لحظه‌ای سرورهای منتخب</h2>
        <a href="/servers-hub" class="mc-more">همه سرورها ←</a>
      </div>
      <div class="mc-item-list">
        <a v-for="srv in featuredServers" :key="srv.ip" :href="srv.link" class="mc-list-item">
          <div class="mc-item-info">
            <div>
              <h4>{{ srv.name }}</h4>
              <p>{{ srv.desc }}</p>
            </div>
          </div>
          <span :class="['mc-tag', srv.online ? 'mc-tag-green' : 'mc-tag-red']">
            <span :class="srv.online ? 'mc-live-dot' : 'mc-live-dot-offline'"></span>
            {{ srv.statusText }}
          </span>
        </a>
      </div>
    </div>

    <div class="mc-box">
      <div class="mc-section-header">
        <h2>جدیدترین آموزش‌ها و مقالات</h2>
      </div>
      <div class="mc-item-list">
        <a v-for="post in posts.slice(0, 3)" :key="post.url" :href="post.url" class="mc-list-item">
          <div class="mc-item-info">
            <div>
              <h4>{{ post.frontmatter.title }}</h4>
              <p>{{ post.frontmatter.description ? post.frontmatter.description.slice(0, 60) + '...' : '' }}</p>
            </div>
          </div>
          <span v-if="post.frontmatter.badge" class="mc-tag mc-tag-gray">{{ post.frontmatter.badge }}</span>
        </a>
      </div>
    </div>
  </section>
</div>
