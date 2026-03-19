<script setup>
import { reactive, ref } from 'vue'

const appsScriptUrl = (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ?? '').trim()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const submitState = ref('idle')
const submitMessage = ref('')

const clearStatus = () => {
  if (submitState.value !== 'idle') {
    submitState.value = 'idle'
    submitMessage.value = ''
  }
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.message = ''
}
const formatVNTime = (date) =>
  new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
  
const submitPreorderForm = async () => {
  clearStatus()

  if (!appsScriptUrl) {
    submitState.value = 'error'
    submitMessage.value = 'Thiếu cấu hình URL Google Apps Script. Vui lòng thêm VITE_GOOGLE_APPS_SCRIPT_URL vào .env.local.'
    return
  }

  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  const payload = new URLSearchParams({
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    message: formData.message.trim(),
    source: 'mindora-preorder-form',
    submittedAt: formatVNTime(new Date())
  }).toString()

  try {
    await fetch(appsScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: payload
    })

    submitState.value = 'success'
    submitMessage.value = 'Đăng ký thành công. Mindora sẽ liên hệ với bạn sớm nhất.'
    resetForm()
  } catch (error) {
    console.warn('Preorder submit error:', error)
    submitState.value = 'error'
    submitMessage.value = 'Không thể gửi biểu mẫu lúc này. Vui lòng thử lại sau.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="section-beige preorder">
    <div class="container centered-block">
      <h2><span>Đăng ký</span> PreOrder Sản phẩm</h2>
      <!-- <button class="btn btn-orange" type="button">ĐI TỚI CHECKING</button> -->
      <p>Hoặc điền vào mẫu thông tin dưới đây của chúng tôi</p>

      <form class="preorder-form" @submit.prevent="submitPreorderForm">
        <input
          v-model="formData.name"
          type="text"
          name="name"
          placeholder="Họ và tên"
          required
          @input="clearStatus"
        />
        <input
          v-model="formData.email"
          type="email"
          name="email"
          placeholder="Email"
          required
          @input="clearStatus"
        />
        <input
          v-model="formData.phone"
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          required
          @input="clearStatus"
        />
        <textarea
          v-model="formData.message"
          name="message"
          placeholder="Lời nhắn"
          rows="5"
          @input="clearStatus"
        ></textarea>
        <button class="btn btn-orange" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'ĐANG GỬI...' : 'ĐĂNG KÝ NGAY' }}
        </button>
        <p v-if="submitState === 'success'" class="preorder-notice preorder-notice-success">{{ submitMessage }}</p>
        <p v-if="submitState === 'error'" class="preorder-notice preorder-notice-error">{{ submitMessage }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.preorder-notice {
  margin: 6px 0 0;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.preorder-notice-success {
  color: #0f7a31;
}

.preorder-notice-error {
  color: #b42318;
}

.preorder-form button:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}
</style>
