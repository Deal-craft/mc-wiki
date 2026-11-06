---
layout: page
sidebar: false
title: "در حال انتقال به صفحه اصلی پلی‌پدیا..."
isRedirect: true
redirectTo: "/"
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.replace('/')
  }
})
</script>

<div class="mc-portal" style="text-align: center; padding-top: 80px;">
  <div class="mc-box" style="max-width: 520px; margin: 0 auto;">
    <h2 style="margin-top: 0 !important;">در حال انتقال به صفحه اصلی پلی‌پدیا...</h2>
    <p style="margin: 12px 0 20px;">این آدرس مربوط به نسخه آزمایشی اولیه سایت بوده و به صفحه اصلی منتقل شده است.</p>
    <a href="/" class="mc-btn mc-btn-primary">ورود به صفحه اصلی پلی‌پدیا ←</a>
  </div>
</div>
