<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import LoginView from './LoginView.vue'
import { showToast } from 'vant'

const router = useRouter()
const showLoginModal = ref(false)
const showMenu = ref(false)
const isLoggedIn = ref(false)
const currentUser = ref<string>('')
const userRole = ref<string>('')

// 菜单项定义
const menuItems = [
  { name: '首页', route: '/', icon: '🏠', guest: true },
  { name: '幼儿园介绍', route: '/', icon: '🏫', guest: true },
  { name: '教师工作台', route: '/teacher/dashboard', icon: '📋', role: 'teacher' },
  { name: '入离园日志', route: '/teacher/attendance-log', icon: '⏰', role: 'teacher' },
  { name: '学生管理', route: '/teacher/students', icon: '👶', role: 'teacher' },
  { name: '课程管理', route: '/teacher/classes', icon: '📅', role: 'teacher' },
  { name: '家长中心', route: '/user/profile', icon: '👨‍👩‍👧‍👦', role: 'parent' },
  { name: '子女管理', route: '/user/children', icon: '👶', role: 'parent' },
  { name: '报表管理', route: '/school/reports', icon: '📊', role: 'school' },
  { name: '验收检查', route: '/school/inspections', icon: '🔍', role: 'inspector' },
]

// 计算当前用户可访问的菜单项
const accessibleMenuItems = computed(() => {
  if (!isLoggedIn.value) {
    return menuItems.filter(item => item.guest)
  }
  return menuItems.filter(item => 
    item.guest || !item.role || item.role === userRole.value
  )
})

// 检查登录状态
const checkLoginStatus = () => {
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('userRole') || localStorage.getItem('role')
  if (username) {
    isLoggedIn.value = true
    currentUser.value = username
    if (role) {
      userRole.value = role
    }
    // 登录成功提示
    showToast({
      message: '✅ 登录成功',
      position: 'top',
      duration: 2000
    })
  }
}

// 打开登录模态框
const openLoginModal = () => {
  showLoginModal.value = true
}

// 关闭登录模态框
const closeLoginModal = () => {
  showLoginModal.value = false
}

// 处理登录成功
const handleLoginSuccess = () => {
  checkLoginStatus()
  closeLoginModal()
  showMenu.value = false
}

// 打开/关闭菜单
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// 导航到功能页面
const navigateTo = (path: string) => {
  if (isLoggedIn.value) {
    router.push(path)
    showMenu.value = false
  } else {
    showLoginModal.value = true
  }
}

// 登出
const handleLogout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('userRole')
  localStorage.removeItem('role')
  isLoggedIn.value = false
  currentUser.value = ''
  userRole.value = ''
  showMenu.value = false
  showToast({
    message: '已退出登录',
    position: 'top',
    duration: 2000
  })
}

// 初始化时检查登录状态
checkLoginStatus()
</script>

<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-left">
        <button class="menu-button" @click="toggleMenu">
          ☰
        </button>
        <h1 class="app-title">🌈 阳光幼儿园</h1>
      </div>
      <div class="header-right">
        <button class="login-button child-button" @click="openLoginModal" v-if="!isLoggedIn">
          登录
        </button>
        <div class="user-info" v-else>
          <div class="user-name">👋 {{ currentUser }}</div>
          <div class="login-status-badge">✅ 已登录</div>
        </div>
      </div>
    </header>

    <!-- 侧边菜单 -->
    <div class="side-menu" :class="{ 'menu-open': showMenu }">
      <div class="menu-header">
        <h3>🌟 功能菜单</h3>
        <button class="close-menu" @click="toggleMenu">×</button>
      </div>
      <div class="menu-content">
        <!-- 动态生成可访问的菜单项 -->
        <div 
          v-for="item in accessibleMenuItems" 
          :key="item.name"
          class="menu-item"
          @click="navigateTo(item.route)"
        >
          <span class="menu-icon">{{ item.icon }}</span>
          <span class="menu-text">{{ item.name }}</span>
        </div>
        
        <!-- 退出登录按钮 -->
        <div class="menu-item logout" @click="handleLogout" v-if="isLoggedIn">
          <span class="menu-icon">🚪</span>
          <span class="menu-text">退出登录</span>
        </div>
        
        <!-- 未登录时显示登录提示 -->
        <div class="menu-item login-prompt" @click="openLoginModal" v-if="!isLoggedIn">
          <span class="menu-icon">🔒</span>
          <span class="menu-text">登录以使用更多功能</span>
        </div>
      </div>
    </div>

    <!-- 菜单遮罩 -->
    <div class="menu-overlay" v-if="showMenu" @click="toggleMenu"></div>

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 幼儿园介绍部分 -->
      <section class="intro-section">
        <div class="banner">
          <img src="https://picsum.photos/800/300" alt="幼儿园环境" class="banner-image">
          <div class="banner-text">
            <h2>欢迎来到阳光幼儿园</h2>
            <p>用爱心呵护成长，用智慧点亮未来</p>
          </div>
        </div>

        <div class="features">
          <div class="feature-item">
            <div class="feature-icon">🏠</div>
            <h3>温馨环境</h3>
            <p>安全舒适的学习生活环境，让孩子快乐成长</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">👩‍🏫</div>
            <h3>专业师资</h3>
            <p>经验丰富的教师团队，提供优质教育服务</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🎨</div>
            <h3>多元课程</h3>
            <p>丰富多彩的课程设置，培养孩子综合能力</p>
          </div>
        </div>
      </section>

      <!-- 教育理念 -->
      <section class="philosophy-section">
        <h2>教育理念</h2>
        <div class="philosophy-content">
          <p>阳光幼儿园秉持"以儿童为中心"的教育理念，尊重每个孩子的个性差异，注重培养孩子的创新思维和实践能力。</p>
          <p>我们致力于为孩子创造一个充满爱与关怀的环境，让每个孩子都能在快乐中学习，在成长中收获。</p>
        </div>
      </section>

      <!-- 环境展示 -->
      <section class="environment-section">
        <h2>环境展示</h2>
        <div class="gallery">
          <div class="gallery-item" v-for="i in 6" :key="i">
            <img :src="`https://picsum.photos/400/300?random=${i}`" :alt="`幼儿园环境${i}`" class="gallery-image">
          </div>
        </div>
      </section>

      <!-- 联系我们 -->
      <section class="contact-section">
        <h2>联系我们</h2>
        <div class="contact-info">
          <p><strong>地址：</strong>北京市朝阳区阳光路123号</p>
          <p><strong>电话：</strong>010-12345678</p>
          <p><strong>邮箱：</strong>contact@yangguang.com</p>
        </div>
      </section>
    </main>

    <!-- 登录模态框 -->
    <div class="modal-overlay" v-if="showLoginModal" @click.self="closeLoginModal">
      <div class="login-modal">
        <div class="modal-header">
          <h3>用户登录</h3>
          <button class="close-modal" @click="closeLoginModal">×</button>
        </div>
        <div class="modal-body">
          <LoginView @login-success="handleLoginSuccess" @close="closeLoginModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 淡色系、童真感主题 */
.home-container {
  min-height: 100vh;
  background-color: #f9f7f2;
  color: #5a4b3f;
  position: relative;
}

/* 顶部导航栏 */
.header {
  background-color: #fffdfa;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  /* 添加童真元素装饰 */
  position: relative;
}

/* 装饰元素 */
.header::before,
.header::after {
  content: '•';
  position: absolute;
  font-size: 30px;
  color: #ff9e7d;
  opacity: 0.2;
  animation: float 3s ease-in-out infinite;
}

.header::before {
  top: 10px;
  left: 20px;
}

.header::after {
  bottom: 10px;
  right: 20px;
  animation-delay: 1s;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #5a4b3f;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.menu-button:hover {
  background-color: #f0e6d8;
  transform: scale(1.1);
}

.app-title {
  font-size: 20px;
  font-weight: 600;
  color: #ff9e7d;
  margin: 0;
  /* 添加弹跳动画 */
  animation: bounce 2s infinite;
}

.header-right {
  display: flex;
  align-items: center;
}

.login-button {
  background-color: #ff9e7d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 6px rgba(255, 158, 125, 0.2);
}

.login-button:hover {
  background-color: #ff8a65;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(255, 158, 125, 0.3);
}

/* 应用child-button样式 */
.child-button {
  background-color: #ff9e7d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(255, 158, 125, 0.2);
  transition: all 0.3s ease;
}

.child-button:hover {
  background-color: #ff8a65;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255, 158, 125, 0.3);
  animation: pulse 1s ease-in-out infinite;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.user-name {
  font-size: 14px;
  color: #ff9e7d;
  font-weight: 500;
}

.login-status-badge {
  font-size: 12px;
  color: #4caf50;
  font-weight: 600;
  animation: glow 2s ease-in-out infinite alternate;
}

/* 动画效果定义 */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 4px 8px rgba(255, 158, 125, 0.2);
  }
  50% {
    box-shadow: 0 6px 12px rgba(255, 158, 125, 0.4);
  }
  100% {
    box-shadow: 0 4px 8px rgba(255, 158, 125, 0.2);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 2px rgba(76, 175, 80, 0.6);
  }
  to {
    text-shadow: 0 0 10px rgba(76, 175, 80, 0.9);
  }
}

/* 侧边菜单 */
.side-menu {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background-color: #fffdfa;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 200;
  display: flex;
  flex-direction: column;
  /* 侧边菜单装饰 */
  position: relative;
  overflow: hidden;
}

/* 侧边菜单装饰元素 */
.side-menu::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background-color: rgba(255, 158, 125, 0.1);
  border-radius: 50%;
  z-index: 0;
}

.side-menu::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -30px;
  width: 200px;
  height: 200px;
  background-color: rgba(179, 199, 255, 0.1);
  border-radius: 50%;
  z-index: 0;
}

.side-menu.menu-open {
  left: 0;
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.menu-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0e6d8;
  background-color: #fffdfa;
  position: relative;
  z-index: 1;
}

.menu-header h3 {
  margin: 0;
  color: #ff9e7d;
  font-weight: 600;
  font-size: 18px;
}

.close-menu {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #5a4b3f;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-menu:hover {
  background-color: #f0e6d8;
  transform: scale(1.1);
}

.menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  position: relative;
  z-index: 1;
}

.menu-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 0 15px 15px 0;
  margin: 0 5px;
  background-color: transparent;
}

.menu-item:hover {
  background-color: #f0e6d8;
  transform: translateX(5px);
}

.menu-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.menu-text {
  flex: 1;
}

.menu-item.logout {
  color: #ff7d7d;
  margin-top: 20px;
  border-top: 1px solid #f0e6d8;
}

.menu-item.login-prompt {
  color: #6a93cb;
  font-weight: 500;
  font-style: italic;
}

.menu-item.login-prompt:hover {
  background-color: rgba(179, 199, 255, 0.2);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 150;
}

/* 主要内容 */
.main-content {
  padding-bottom: 40px;
}

/* 介绍部分 */
.intro-section {
  background-color: #fffdfa;
  padding-bottom: 40px;
}

.banner {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: white;
  padding: 20px;
}

.banner-text h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
}

.banner-text p {
  margin: 0;
  font-size: 14px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 20px 0;
}

.feature-item {
  flex: 1;
  min-width: 200px;
  background-color: #f9f7f2;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #f0e6d8;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.feature-item h3 {
  color: #ff9e7d;
  margin-bottom: 10px;
}

.feature-item p {
  font-size: 14px;
  color: #7a695b;
}

/* 教育理念 */
.philosophy-section {
  padding: 40px 20px;
  background-color: #fff7ef;
}

.philosophy-section h2 {
  color: #ff9e7d;
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
}

.philosophy-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #ff9e7d;
}

.philosophy-content p {
  margin-bottom: 12px;
  line-height: 1.6;
}

/* 环境展示 */
.environment-section {
  padding: 40px 20px;
  background-color: #fffdfa;
}

.environment-section h2 {
  color: #ff9e7d;
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.gallery-item {
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #f0e6d8;
}

.gallery-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

/* 联系我们 */
.contact-section {
  padding: 40px 20px;
  background-color: #f9f7f2;
}

.contact-section h2 {
  color: #ff9e7d;
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
}

.contact-info {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #f0e6d8;
}

.contact-info p {
  margin-bottom: 10px;
}

/* 登录模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
}

.login-modal {
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0e6d8;
  background-color: #fffdfa;
}

.modal-header h3 {
  margin: 0;
  color: #ff9e7d;
}

.close-modal {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #5a4b3f;
}

.modal-body {
  padding: 0;
}
</style>