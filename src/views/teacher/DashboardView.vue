<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar } from 'vant'
import type { Ref } from 'vue'

const router = useRouter()
const username = ref('')

interface CardItem {
  id: string
  title: string
  description: string
  icon: string
  route: string
  status?: string
  count?: number
  color: string
}

const cardItems: Ref<CardItem[]> = ref([])

const navigateTo = (route: string) => {
  router.push(route)
}

const logout = () => {
  localStorage.removeItem('userRole')
  localStorage.removeItem('username')
  router.push('/login')
}

onMounted(() => {
  username.value = localStorage.getItem('username') || '李'
  
  // 模拟数据加载
  cardItems.value = [
    {
      id: 'attendance',
      title: '入离园日志',
      description: '查看班级出勤情况',
      icon: '📝',
      route: '/teacher/attendance-log',
      status: 'active',
      count: 28,
      color: 'orange'
    },
    {
      id: 'students',
      title: '学生管理',
      description: '管理班级学生信息',
      icon: '👶',
      route: '/teacher/students',
      count: 32,
      color: 'blue'
    },
    {
      id: 'classes',
      title: '课程管理',
      description: '管理您的课程安排',
      icon: '📅',
      route: '/teacher/classes',
      color: 'green'
    },
    {
      id: 'messages',
      title: '家长沟通',
      description: '与家长进行沟通交流',
      icon: '💬',
      route: '/teacher/messages',
      status: 'new',
      count: 5,
      color: 'purple'
    }
  ]
})
</script>

<template>
  <div class="dashboard-container">
    <!-- 顶部导航栏 -->
    <NavBar 
      title="教师工作台" 
      right-text="退出" 
      @click-right="logout"
      class="nav-bar"
    />
    
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <h1>✨ 欢迎回来，{{ username }}老师！</h1>
      <p>今天是 {{ new Date().toLocaleDateString() }}</p>
    </div>
    
    <!-- 功能卡片区域 -->
    <div class="cards-container">
      <div 
        v-for="card in cardItems" 
        :key="card.id"
        class="card child-border"
        :class="`card-${card.color}`"
        @click="navigateTo(card.route)"
      >
        <div class="card-icon">{{ card.icon }}</div>
        <div class="card-content">
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
          <div class="card-footer">
            <span v-if="card.count" class="card-count" :class="`count-${card.color}`">
              {{ card.count }}
            </span>
            <span class="card-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 装饰元素 -->
    <div class="decoration-dots">
      <div class="dot dot-pink" style="top: 15%; left: 8%"></div>
      <div class="dot dot-blue" style="top: 70%; right: 10%"></div>
      <div class="dot dot-yellow" style="bottom: 5%; left: 20%"></div>
      <div class="dot dot-green" style="top: 40%; right: 15%"></div>
    </div>
  </div>
</template>

<style scoped>
/* 童真感主题 */
:root {
  --background-light: #f9f7fd;
  --background-white: #ffffff;
  --accent-color: #f8c2e7;
  --primary-color: #ff8a65;
  --secondary-color: #64b5f6;
  --success-color: #81c784;
  --border-color: #e0e0e0;
  --text-primary: #333333;
  --text-secondary: #757575;
}

.dashboard-container {
  min-height: 100vh;
  background-color: var(--background-light);
  padding: 0;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
}

/* 导航栏 */
.nav-bar {
  background-color: var(--background-white);
  border-bottom: 1px solid var(--border-color);
}

.nav-bar :deep(.van-nav-bar__title) {
  color: var(--text-primary);
  font-weight: 600;
}

.nav-bar :deep(.van-nav-bar__text) {
  color: var(--primary-color);
}

/* 欢迎区域 */
.welcome-section {
  padding: 30px 20px;
  background-color: var(--accent-color);
  color: var(--text-primary);
  border-radius: 0 0 30px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.welcome-section h1 {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
}

.welcome-section p {
  font-size: 14px;
  opacity: 0.9;
}

/* 功能卡片区域 */
.cards-container {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 1;
}

.card {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.card:active {
  transform: scale(0.98);
}

/* 卡片顶部装饰条 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 2px 2px 0 0;
}

.card-orange::before {
  background-color: var(--primary-color);
}

.card-blue::before {
  background-color: var(--secondary-color);
}

.card-green::before {
  background-color: var(--success-color);
}

.card-purple::before {
  background-color: #b39ddb;
}

.card-icon {
  font-size: 32px;
  flex-shrink: 0;
  animation: bounce 3s ease-in-out infinite;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.card-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 10px;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-count {
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.count-orange {
  background-color: var(--primary-color);
}

.count-blue {
  background-color: var(--secondary-color);
}

.count-green {
  background-color: var(--success-color);
}

.count-purple {
  background-color: #b39ddb;
}

.card-arrow {
  font-size: 20px;
  color: var(--primary-color);
  font-weight: bold;
}

/* 动画效果 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* 装饰元素 */
.decoration-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.dot {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
}

.dot-pink {
  width: 120px;
  height: 120px;
  background-color: #f8bbd0;
}

.dot-blue {
  width: 80px;
  height: 80px;
  background-color: #bbdefb;
}

.dot-yellow {
  width: 100px;
  height: 100px;
  background-color: #fff9c4;
}

.dot-green {
  width: 60px;
  height: 60px;
  background-color: #c8e6c9;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 25px 15px;
  }
  
  .welcome-section h1 {
    font-size: 20px;
  }
  
  .cards-container {
    padding: 15px;
    gap: 15px;
  }
  
  .card {
    padding: 15px;
  }
}
</style>