---
title: "لیست بهترین سرورهای ماینکرفت (ایرانی با فیلتر جاوا و بدراک + ساخت سرور رایگان)"
description: "معرفی شلوغ‌ترین سرورهای ایرانی ماینکرفت (تیرکس، مدکرفت و...) با فیلتر Java و Bedrock + مقایسه و رتبه‌بندی بهترین سایت‌های ساخت سرور رایگان بر اساس تجربه کاربران."
date: "2026-10-19"
---

<script setup>
import { ref, computed } from 'vue'

const filter = ref('all')

const iranianServers = ref([
  { name: 'تیرکس ماین (T-RexMine)', ip: 'play.trexmine.com', port: '19132 (موبایل)', platform: 'both', modes: 'BedWars, Survival, SkyBlock', players: '+1500 نفر آنلاین', status: 'آنلاین' },
  { name: 'مدکرفت (MadCraft)', ip: 'play.madcraft.ir', port: '25565', platform: 'java', modes: 'Survival, Factions, PvP', players: '+600 نفر آنلاین', status: 'آنلاین' },
  { name: 'پرشین کرفت (PersianCraft)', ip: 'mc.persiancraft.ir', port: '19132', platform: 'bedrock', modes: 'SMP, Survival, MiniGames', players: '+300 نفر آنلاین', status: 'آنلاین' },
  { name: 'آرین کرفت (ArianCraft)', ip: 'play.ariancraft.ir', port: '19132', platform: 'both', modes: 'LifeSteal, BoxPvP, BedWars', players: '+450 نفر آنلاین', status: 'آنلاین' }
])

const filteredServers = computed(() => {
  if (filter.value === 'all') return iranianServers.value
  return iranianServers.value.filter(s => s.platform === filter.value || s.platform === 'both')
})
</script>

# 🌐 هاب جامع سرورهای ماینکرفت ایران (معرفی، فیلتر و ساخت سرور)

در این بخش می‌توانید بین **بهترین سرورهای عمومی ایران** (بر اساس نسخه بازی خودتان: کامپیوتر یا موبایل) جستجو کنید، سرور شخصی خودتان را به بقیه معرفی کنید، یا با استفاده از **رتبه‌بندی بهترین سایت‌های هاست رایگان**، سرور اختصاصی خودتان را بسازید.

---

## ۱. لیست سرورهای فعال ایرانی (با فیلتر Java و Bedrock) {#سرورهای-ایرانی}

نسخه بازی خود را انتخاب کنید تا فقط سرورهای سازگار با شما نمایش داده شوند:

<div style="display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap;">
  <button @click="filter = 'all'" :class="['mc-btn', filter === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">🌐 همه سرورها</button>
  <button @click="filter = 'java'" :class="['mc-btn', filter === 'java' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">💻 مخصوص جاوا (PC)</button>
  <button @click="filter = 'bedrock'" :class="['mc-btn', filter === 'bedrock' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">📱 مخصوص بدراک (موبایل)</button>
</div>

<div class="mc-item-list">
  <div v-for="(srv, i) in filteredServers" :key="i" class="mc-list-item">
    <div class="mc-item-info">
      <span class="mc-item-icon">🟢</span>
      <div>
        <h4>{{ srv.name }} <span style="font-size:12px; color:#1bd96a;">({{ srv.players }})</span></h4>
        <p><b>آی‌پی:</b> <code>{{ srv.ip }}</code> | <b>پورت بدراک:</b> {{ srv.port }} | <b>گیم‌مودها:</b> {{ srv.modes }}</p>
      </div>
    </div>
    <span class="mc-tag mc-tag-green">{{ srv.platform === 'both' ? 'Java & Bedrock' : (srv.platform === 'java' ? 'فقط Java' : 'فقط Bedrock') }}</span>
  </div>
</div>

---

## ۲. رتبه‌بندی سایت‌های ساخت سرور رایگان (از بهترین تا ضعیف‌ترین)

اگر می‌خواهید خودتان برای بازی با دوستانتان سرور بسازید، در جدول زیر تمام سرویس‌های رایگان دنیا را **بر اساس تجربه واقعی پلیرهای ایرانی، میزان لگ و امکانات** از رتبه ۱ به پایین لیست کرده‌ایم (برای خواندن آموزش کامل هرکدام روی لینک آن کلیک کنید):

| رتبه | نام سرویس | رم رایگان | قابلیت آپلود فایل دلخواه (FTP) | تجربه کاربری در ایران | آموزش و بررسی اختصاصی |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **🥇 رتبه ۱** | **FalixNodes** | تا ۴ گیگابایت | دارد (کامل) | عالی؛ لگ بسیار کمتر از رقبا و پنل پیشرفته | [بررسی در بخش سرورها](/paid-servers) |
| **🥈 رتبه ۲** | **Aternos (آترنوس)** | ۲ تا ۲.۶ گیگابایت | ندارد (فقط لیست داخلی) | بسیار ساده برای شروع، اما در ساعات شلوغی صف انتظار دارد | **[مقاله جامع آموزش آترنوس](/aternos)** |
| **🥉 رتبه ۳** | **Minehut** | ۱.۵ گیگابایت | محدود | دارای لابی داخلی شلوغ، اما بیشتر مناسب اکانت‌های پرمیوم | [مشاهده راهنما](/aternos) |
| **رتبه ۴** | **Server.pro** | ۱ گیگابایت | محدود | کیفیت بالا اما نیاز به تمدید ساعتی و کپچا | [مشاهده راهنما](/paid-servers) |

::: tip 💎 سرور ۲۴ ساعته بدون خاموشی می‌خواهید؟
اگر از خاموش شدن سرورهای رایگان خسته شده‌اید، حتماً مقاله **[راهنمای خرید سرور و هاست پولی ماینکرفت (VPS)](/paid-servers)** را بخوانید.
:::

---

## ۳. ثبت سرور شما در سایت (رایگان برای همه پلیرها!) {#ثبت-سرور}

آیا سرور SMP، بدوارز یا حتی سرور آترنوس ساخته‌اید و دنبال پلیر می‌گردید؟ **در جعبه نظرات پایین همین صفحه**، گزینه **«معرفی ماد یا لینک فایل»** را انتخاب کنید و **نام سرور، IP، نسخه بازی (جاوا/بدراک) و توضیح سرورتان** را بنویسید تا پس از بررسی، به لیست سرورهای فعال بالا اضافه شود!

## ۳. ثبت سرور شما در سایت (رایگان برای همه پلیرها!) {#ثبت-سرور}

آیا سرور SMP، بدوارز یا حتی سرور آترنوس ساخته‌اید و دنبال پلیر می‌گردید؟ **در جعبه نظرات پایین همین صفحه**، گزینه **«معرفی ماد یا لینک فایل»** را انتخاب کنید و **نام سرور، IP، نسخه بازی (جاوا/بدراک) و توضیح سرورتان** را بنویسید تا در لیست بالای صفحه ثبت شود!
