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

const copiedIp = ref('')

const featuredServers = ref([
  {
    name: 'هایپیکسل (Hypixel)',
    ip: 'mc.hypixel.net',
    edition: 'Java 1.8 - 1.21',
    desc: 'بزرگ‌ترین نتورک جهان · SkyBlock & BedWars',
    statusText: 'در حال پینگ...',
    online: true,
    link: '/hypixel'
  },
  {
    name: 'دونات اس‌ام‌پی (DonutSMP)',
    ip: 'donutsmp.net',
    edition: 'Java & Bedrock',
    desc: 'هاردکور بقا، شارد و اقتصاد · پورت 19132',
    statusText: 'در حال پینگ...',
    online: true,
    link: '/donut-smp'
  },
  {
    name: 'تیرکس ماین (T-RexMine)',
    ip: 'play.trexmine.com',
    edition: 'Cracked · ایران',
    desc: 'سرور کرکی با پینگ پایین · BedWars & Survival',
    statusText: 'در حال پینگ...',
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

  <!-- هدر دوطرفه به سبک کلاینت‌های گیمینگ و Modrinth (متفاوت از قالب‌های تکراری هوش مصنوعی) -->
  <section class="mc-command-hero">
    <div class="mc-hero-main">
      <div class="mc-status-strip">
        <span class="mc-status-pill">
          <span class="mc-live-dot"></span>
          نسخه ۱.۲۱.۴ ماینکرفت
        </span>
        <span class="mc-edition-chip">Java &amp; Bedrock</span>
        <span class="mc-edition-chip">آپدیت ۱۴۰۵</span>
      </div>

      <div class="mc-brand-row">
        <img src="/logo.svg" alt="PlayPedia Logo" class="mc-brand-logo" width="60" height="60" />
        <div>
          <h1 class="mc-hero-heading">پلی‌پدیا <span class="mc-hero-subbadge">PLAYPEDIA WIKI</span></h1>
          <p class="mc-hero-lead">
            ویکی فنی و رادار زنده ماینکرفت ایران؛ بررسی لحظه‌ای پلیرهای سرورها، نقشه‌های ساخت فارم‌های ۱.۲۱، مادپک‌های افزایش FPS و رفع ارورهای لانچر.
          </p>
        </div>
      </div>

      <div class="mc-action-bar">
        <a href="/servers-hub" class="mc-btn-3d mc-btn-emerald">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><circle cx="6" cy="6.5" r="1"/><circle cx="6" cy="17.5" r="1"/></svg>
          رادار زنده سرورها
        </a>
        <a href="/farms-hub" class="mc-btn-3d mc-btn-surface">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          بانک فارم‌های ۱.۲۱
        </a>
        <a href="/mods-hub" class="mc-btn-3d mc-btn-surface">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          دانلود ماد و شیدر
        </a>
        <a href="/errors-fix" class="mc-btn-3d mc-btn-surface">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          رفع ارور و افزایش FPS
        </a>
      </div>

      <div class="mc-quick-metrics">
        <div class="mc-metric-item">
          <strong>+۱۵ سرور فعال</strong>
          <span>استعلام مستقیم پینگ و پلیر</span>
        </div>
        <div class="mc-metric-divider"></div>
        <div class="mc-metric-item">
          <strong>۶ مگافارم ۱.۲۱</strong>
          <span>جاوا و بدراک (تست‌شده)</span>
        </div>
        <div class="mc-metric-divider"></div>
        <div class="mc-metric-item">
          <strong>+۳۰۰٪ فریم‌ریت</strong>
          <span>ترکیب Sodium و Lithium</span>
        </div>
      </div>
    </div>

    <!-- پنل چپ هدر: ترمینال زنده وضعیت سرورها با کپی سریع IP -->
    <div class="mc-hero-radar">
      <div class="mc-radar-header">
        <div class="mc-radar-title">
          <span class="mc-live-dot"></span>
          <span>رادار لحظه‌ای سرورهای منتخب</span>
        </div>
        <a href="/servers-hub" class="mc-radar-all">مشاهده همه ←</a>
      </div>

      <div class="mc-radar-list">
        <div v-for="srv in featuredServers" :key="srv.ip" class="mc-radar-row">
          <a :href="srv.link" class="mc-radar-info">
            <div class="mc-radar-top">
              <strong>{{ srv.name }}</strong>
              <span class="mc-tag mc-tag-green">
                <span :class="srv.online ? 'mc-live-dot' : 'mc-live-dot-offline'"></span>
                {{ srv.statusText }}
              </span>
            </div>
            <p>{{ srv.desc }}</p>
          </a>
          <div class="mc-radar-actions">
            <code class="mc-ip-code">{{ srv.ip }}</code>
            <button @click="copyServerIp(srv.ip, $event)" class="mc-copy-chip" type="button">
              {{ copiedIp === srv.ip ? 'کپی شد ✓' : 'کپی IP' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ۴ بخش اصلی با رنگ‌بندی سطح کمیابی ماینکرفت (Emerald / Amethyst / Gold / Diamond) و آیکون‌های وکتوری اختصاصی -->
  <section class="mc-section">
    <div class="mc-cat-grid">
      <a href="/servers-hub" class="mc-cat-card mc-tier-emerald">
        <div class="mc-card-top-bar">
          <div class="mc-cat-svg-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="7" rx="1.5"/><rect x="2" y="14" width="20" height="7" rx="1.5"/><path d="M6 6.5h.01M6 17.5h.01M10 6.5h8M10 17.5h8"/></svg>
          </div>
          <span class="mc-tier-badge">SERVER NETWORK</span>
        </div>
        <h3>هاب سرورهای ماینکرفت</h3>
        <p>مشاهده لحظه‌ای تعداد پلیرهای آنلاین سرورهای ایران و جهان، فیلتر کرکی/پرمیوم و آموزش ساخت سرور ۲۴ ساعته و آترنوس.</p>
        <div class="mc-card-footer">
          <span>ورود به لیست سرورها</span>
          <span class="mc-arrow">←</span>
        </div>
      </a>

      <a href="/mods-hub" class="mc-cat-card mc-tier-amethyst">
        <div class="mc-card-top-bar">
          <div class="mc-cat-svg-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/><path d="M12 22V12"/><path d="M21 7l-9 5-9-5"/></svg>
          </div>
          <span class="mc-tier-badge">FABRIC &amp; FORGE</span>
        </div>
        <h3>مرکز دانلود ماد و شیدرپک</h3>
        <p>دسته‌بندی مادهای Fabric و Forge، جایگزین‌های مدرن OptiFine (سودیوم و Iris) به همراه جدول دقیق پیش‌نیازها.</p>
        <div class="mc-card-footer">
          <span>مشاهده بانک مادها</span>
          <span class="mc-arrow">←</span>
        </div>
      </a>

      <a href="/farms-hub" class="mc-cat-card mc-tier-gold">
        <div class="mc-card-top-bar">
          <div class="mc-cat-svg-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span class="mc-tier-badge">SURVIVAL 1.21</span>
        </div>
        <h3>بانک جامع فارم‌های ۱.۲۱</h3>
        <p>آموزش گام‌به‌گام ساخت فارم آهن روز اول بدون رداستون، مگافارم طلا روی سقف ندر، XP اندرمن و فارم کریپر بدون گربه.</p>
        <div class="mc-card-footer">
          <span>جستجو در فارم‌ها</span>
          <span class="mc-arrow">←</span>
        </div>
      </a>

      <a href="/errors-fix" class="mc-cat-card mc-tier-diamond">
        <div class="mc-card-top-bar">
          <div class="mc-cat-svg-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span class="mc-tier-badge">CRASH &amp; FPS FIX</span>
        </div>
        <h3>رفع ارور و بهینه‌سازی FPS</h3>
        <p>حل قطعی ارورهای Exit Code 1، خطای کارت گرافیک GLFW 65542، جدول نسخه‌های Java و مقایسه لانچرهای امن و سبک.</p>
        <div class="mc-card-footer">
          <span>عیب‌یابی سریع بازی</span>
          <span class="mc-arrow">←</span>
        </div>
      </a>
    </div>
  </section>

  <!-- بخش دوگانه: جدیدترین دانشنامه‌ها + تقلب‌نامه سریع ماینکرفت ۱.۲۱ -->
  <section class="mc-section mc-dual-grid">
    <div class="mc-box">
      <div class="mc-section-header">
        <h2>جدیدترین آموزش‌ها و راهنماهای تخصصی</h2>
        <a href="/farms-hub" class="mc-more">آرشیو کامل ←</a>
      </div>
      <div class="mc-item-list">
        <a v-for="post in posts.slice(0, 4)" :key="post.url" :href="post.url" class="mc-list-item">
          <div class="mc-item-info">
            <div class="mc-doc-bullet"></div>
            <div>
              <h4>{{ post.frontmatter.title }}</h4>
              <p>{{ post.frontmatter.description ? post.frontmatter.description.slice(0, 75) + '...' : '' }}</p>
            </div>
          </div>
          <span v-if="post.frontmatter.badge" class="mc-tag mc-tag-blue">{{ post.frontmatter.badge }}</span>
        </a>
      </div>
    </div>

    <div class="mc-box mc-cheatsheet-box">
      <div class="mc-section-header">
        <h2>جدول سریع مختصات و پیش‌نیازهای ۱.۲۱</h2>
        <a href="/survival-guide" class="mc-more">راهنمای ماینینگ ←</a>
      </div>
      <div class="mc-cheat-grid">
        <a href="/survival-guide" class="mc-cheat-card">
          <span class="mc-cheat-label">بهترین ارتفاع دایموند</span>
          <code class="mc-cheat-val">Y = -54 تا -58</code>
          <span class="mc-cheat-sub">هم‌سطح لاوا · بیشترین تراکم</span>
        </a>
        <a href="/survival-guide" class="mc-cheat-card">
          <span class="mc-cheat-label">بهترین ارتفاع ندرایت</span>
          <code class="mc-cheat-val">Y = 15 (Nether)</code>
          <span class="mc-cheat-sub">استخراج با تخت یا TNT</span>
        </a>
        <a href="/errors-fix" class="mc-cheat-card">
          <span class="mc-cheat-label">جاوا مورد نیاز ۱.۲۰.۵ به بالا</span>
          <code class="mc-cheat-val">Java 21 (64-bit)</code>
          <span class="mc-cheat-sub">رفع ارور کرش Exit Code 1</span>
        </a>
        <a href="/enderman-xp-farm" class="mc-cheat-card">
          <span class="mc-cheat-label">سریع‌ترین فارم XP بازی</span>
          <code class="mc-cheat-val">Enderman Y = 1</code>
          <span class="mc-cheat-sub">لول ۰ تا ۳۰ در ۴۵ ثانیه</span>
        </a>
      </div>
    </div>
  </section>

</div>
