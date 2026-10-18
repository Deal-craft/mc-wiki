<template>
  <div class="mc-comments-wrapper">
    <div class="mc-comments-header">
      <h3>💬 دیدگاه‌ها، تجربیات و ارسال آپدیت کاربران</h3>
      <p>سوال، تجربه یا فایل و ترفند جدیدی برای این بخش دارید؟ اینجا بنویسید تا بررسی و به مقاله اضافه شود.</p>
    </div>

    <!-- فرم ارسال سریع نظر / لینک فایل -->
    <div class="mc-comment-form">
      <div class="mc-form-row">
        <input v-model="name" type="text" placeholder="نام یا آیدی ماینکرفت شما..." class="mc-input" />
        <select v-model="type" class="mc-input mc-select">
          <option value="نظر یا سوال">💭 نظر یا سوال</option>
          <option value="پیشنهاد آپدیت مقاله">🔄 پیشنهاد آپدیت مقاله</option>
          <option value="معرفی ماد یا فایل">📦 معرفی ماد یا لینک فایل</option>
        </select>
      </div>
      <textarea v-model="text" rows="3" placeholder="متن نظر، ترفند یا لینک فایل خود را اینجا بنویسید..." class="mc-input mc-textarea"></textarea>
      <button @click="addComment" class="mc-btn mc-btn-primary" style="border:none; cursor:pointer;">ارسال دیدگاه در ویکی 🚀</button>
    </div>

    <!-- لیست نظرات ثبت‌شده -->
    <div class="mc-comments-list">
      <div v-for="(c, idx) in comments" :key="idx" class="mc-comment-item">
        <div class="mc-comment-top">
          <b>👤 {{ c.name }}</b>
          <span class="mc-tag mc-tag-green">{{ c.type }}</span>
        </div>
        <p>{{ c.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const type = ref('نظر یا سوال')
const text = ref('')

const comments = ref([
  { name: 'Amir_MC', type: 'پیشنهاد آپدیت مقاله', text: 'دمت گرم بابت آموزش! برای آترنوس اگه پلاگین ClearLag رو هم نصب کنید خیلی لگ سرور کمتر میشه.' },
  { name: 'ParsaCraft', type: 'معرفی ماد یا فایل', text: 'ماد FerriteCore رو هم به لیست اضافه کن، مصرف رم ماینکرفت رو نصف می‌کنه!' }
])

const addComment = () => {
  if (!name.value.trim() || !text.value.trim()) return
  comments.value.unshift({
    name: name.value,
    type: type.value,
    text: text.value
  })
  name.value = ''
  text.value = ''
}
</script>

<style scoped>
.mc-comments-wrapper {
  margin-top: 60px;
  padding: 28px;
  background: #0f1523;
  border: 1px solid rgba(27, 217, 106, 0.25);
  border-radius: 20px;
  direction: rtl;
  text-align: right;
}
.mc-comments-header h3 {
  margin: 0 0 8px !important;
  color: #fff;
  font-size: 20px;
}
.mc-comments-header p {
  margin: 0 0 20px !important;
  color: #94a3b8;
  font-size: 14px;
}
.mc-comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}
.mc-form-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.mc-input {
  background: #080b12;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  flex: 1;
}
.mc-input:focus {
  outline: none;
  border-color: #1bd96a;
}
.mc-textarea {
  width: 100%;
  resize: vertical;
}
.mc-comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mc-comment-item {
  background: rgba(8, 11, 18, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px 18px;
  border-radius: 14px;
}
.mc-comment-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.mc-comment-top b {
  color: #1bd96a;
  font-size: 14.5px;
}
.mc-comment-item p {
  margin: 0 !important;
  font-size: 14px;
  color: #e2e8f0;
}
</style>