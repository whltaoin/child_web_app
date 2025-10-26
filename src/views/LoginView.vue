<script setup lang="ts">
import { ref } from 'vue'
import { Button, Field, Form } from 'vant'
import { showToast } from 'vant/es/toast'

const username = ref('')
const password = ref('')
const loading = ref(false)
const showPassword = ref(false)

const emit = defineEmits<{
  'login-success': []
  'close': []
}>()

// 模拟用户数据
const userAccounts = {
  teacher: {
    password: '123456',
    role: 'teacher'
  },
  user: {
    password: '123456',
    role: 'user'
  },
  school: {
    password: '123456',
    role: 'school'
  }
}

const onSubmit = () => {
  if (!username.value || !password.value) {
    showToast('请输入账号和密码')
    return
  }

  loading.value = true

  // 模拟登录验证
  setTimeout(() => {
    const userInfo = userAccounts[username.value as keyof typeof userAccounts]
    
    if (userInfo && userInfo.password === password.value) {
      // 登录成功，保存用户角色信息
      localStorage.setItem('userRole', userInfo.role)
      localStorage.setItem('username', username.value)
      showToast('登录成功')
      // 触发登录成功事件，不跳转页面
      emit('login-success')
    } else {
      showToast('账号或密码错误')
    }
    
    loading.value = false
  }, 500)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="login-modal-overlay" @click="handleClose">
    <div class="login-form-wrapper child-border" @click.stop>
      <!-- 关闭按钮 -->
      <button class="close-button" @click="handleClose">✕</button>
      
      <div class="form-content">
        <div class="title-container">
          <h1 class="app-title">🌈 阳光幼儿园</h1>
          <div class="subtitle">欢迎回来</div>
        </div>
        
        <Form class="login-form">
          <div class="form-group">
            <Field
              v-model="username"
              name="username"
              label="账号"
              placeholder="请输入账号"
              :rules="[{ required: true, message: '请输入账号' }]"
              class="child-input"
            />
          </div>
          
          <div class="form-group">
            <Field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请输入密码' }]"
              class="child-input"
              :right-icon="showPassword ? 'eye-o' : 'eye-off-o'"
              @click-right-icon="togglePasswordVisibility"
            />
          </div>
          
          <div class="account-tips child-border">
            <p class="tips-title">💡 测试账号：</p>
            <p>教师账号：teacher / 123456</p>
            <p>家长账号：user / 123456</p>
            <p>验收小组账号：school / 123456</p>
          </div>
          
          <Button 
            type="primary" 
            class="login-button child-button" 
            @click="onSubmit"
            :loading="loading"
          >
            登录
          </Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 童真感主题样式 - 模态框 */
.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.login-form-wrapper {
  width: 100%;
  max-width: 400px;
  padding: 0;
  background-color: white;
  overflow: hidden;
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: var(--background-light);
  color: var(--text-primary);
}

/* 模态框动画 */
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.form-content {
  padding: 30px 25px;
  position: relative;
}

.form-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  border-radius: 2px 2px 0 0;
}

.title-container {
  text-align: center;
  margin-bottom: 25px;
}

.app-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--primary-color);
}

.subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

/* 适配Vant Field组件样式 */
.child-input .van-field__label {
  color: var(--text-primary) !important;
  font-size: 14px;
}

.child-input .van-field__control {
  background-color: white !important;
  border: 2px solid var(--border-color) !important;
  color: var(--text-primary) !important;
  border-radius: 12px;
  font-size: 16px;
}

.child-input .van-field__control:focus {
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 3px rgba(255, 158, 125, 0.2) !important;
}

.child-input .van-field__placeholder {
  color: var(--text-secondary) !important;
  opacity: 0.7;
}

/* 调整Vant Field组件的整体样式 */
.child-input .van-field {
  padding: 8px 0;
}

.child-input .van-cell {
  background-color: transparent !important;
}

.child-input .van-cell__value {
  padding: 8px 0;
}

.account-tips {
  margin: 15px 0;
  padding: 15px;
  background-color: var(--background-light);
  border-radius: 12px;
  font-size: 13px;
  color: var(--text-secondary);
  border: 2px solid var(--border-color);
}

.tips-title {
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 10px !important;
  font-size: 14px;
}

.account-tips p {
  margin: 6px 0;
  line-height: 1.4;
}

.login-button {
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  height: 44px;
  border-radius: 25px;
  font-weight: 600;
}

/* 童真风格按钮效果 */
.child-button {
  background-color: var(--accent-color) !important;
  color: var(--text-primary) !important;
  border: none !important;
  box-shadow: 0 2px 5px rgba(248, 233, 161, 0.4) !important;
}

.child-button:hover {
  background-color: #f7dc6f !important;
  box-shadow: 0 4px 10px rgba(248, 233, 161, 0.6) !important;
}

/* 浮动动画 - 保留给内容元素 */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* 修改Vant图标的颜色 */
:deep(.van-icon) {
  color: var(--text-secondary) !important;
}
:deep(.van-field__right-icon) {
  font-size: 18px;
  padding: 0 10px;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .login-form-wrapper {
    margin: 0;
    max-width: 100%;
  }
  
  .form-content {
    padding: 25px 20px;
  }
  
  .app-title {
    font-size: 22px;
  }
}

/* 装饰元素 - 彩色圆点 */
.decoration-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 0.7;
}

.dot-1 {
  top: 10%;
  left: 8%;
  background-color: var(--primary-color);
}

.dot-2 {
  top: 20%;
  right: 10%;
  background-color: var(--secondary-color);
}

.dot-3 {
  bottom: 15%;
  left: 15%;
  background-color: var(--accent-color);
}

.dot-4 {
  bottom: 25%;
  right: 20%;
  background-color: var(--success-color);
}
</style>