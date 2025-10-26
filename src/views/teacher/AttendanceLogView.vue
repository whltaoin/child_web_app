<template>
  <div class="attendance-log-container">
    <van-nav-bar title="入离园日志" left-text="返回" left-arrow @click-left="goBack" background="transparent" title-style="color: #ffffff" text-color="#a0aec0" />
    
    <div class="page-content">
      <div class="section-title tech-border">
        <h2>{{ currentDate }}</h2>
        <p>点击班级查看出勤详情</p>
      </div>
      
      <div class="class-cards-container">
        <div 
          v-for="classItem in classList" 
          :key="classItem.id"
          class="class-card tech-border tech-border-glow"
          @click="navigateToClassDetail(classItem.id)"
        >
          <div class="class-card-content">
            <div class="class-name">{{ classItem.name }}</div>
            <div class="class-info">
              <span class="student-count">{{ classItem.studentCount }}名学生</span>
              <span class="attendance-rate">{{ Math.round((classItem.attendedCount / classItem.studentCount) * 100) }}% 已出勤</span>
            </div>
            <div class="attendance-status">
              <span class="status-item">已入园: {{ classItem.attendedCount }}</span>
              <span class="status-item">未入园: {{ classItem.absentCount }}</span>
            </div>
            <div class="card-arrow">›</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 计算当前日期
const currentDate = computed(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})

// 班级数据
const classList = ref([
  { id: 1, name: '小班(芽芽班)', studentCount: 25, attendedCount: 22, absentCount: 3 },
  { id: 2, name: '小班(苗苗班)', studentCount: 23, attendedCount: 20, absentCount: 3 },
  { id: 3, name: '中班(朵朵班)', studentCount: 28, attendedCount: 26, absentCount: 2 },
  { id: 4, name: '中班(花花班)', studentCount: 26, attendedCount: 25, absentCount: 1 },
  { id: 5, name: '大班(果果班)', studentCount: 30, attendedCount: 29, absentCount: 1 },
  { id: 6, name: '大班(星星班)', studentCount: 28, attendedCount: 27, absentCount: 1 }
])

// 返回上一页
const goBack = () => {
  router.back()
}

// 导航到班级详情页
const navigateToClassDetail = (classId: number) => {
  router.push(`/teacher/class-detail/${classId}`)
}
</script>

<style scoped>
:root {
  --dark-bg: #121212;
  --card-bg: #1e1e1e;
  --border-color: #333;
  --primary-light: #0070f3;
  --secondary-color: #7928ca;
  --text-primary: #ffffff;
  --text-secondary: #a0aec0;
  --success-color: #07c160;
  --warning-color: #ff976a;
  --error-color: #ee0a24;
}

.attendance-log-container {
  min-height: 100vh;
  background-color: var(--dark-bg);
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(0, 112, 243, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(121, 40, 202, 0.1) 0%, transparent 50%);
}

.page-content {
  padding: 16px;
}

.section-title {
  background-color: var(--card-bg);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.section-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-color));
}

.section-title h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.section-title p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.class-cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.class-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
}

.class-card:active {
  transform: scale(0.98);
  box-shadow: 0 0 20px rgba(0, 112, 243, 0.4) !important;
}

.class-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.class-name {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary);
}

.class-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}

.attendance-rate {
  font-weight: 500;
  color: var(--primary-light) !important;
}

.attendance-status {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: var(--text-primary);
}

.status-item {
  display: block;
  padding: 4px 0;
}

.card-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.card-arrow:active {
  right: 14px;
  color: var(--primary-light);
}

/* 添加科技感的发光效果 */
.class-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  transform: skewX(-25deg);
  transition: left 0.7s ease;
}

.class-card:active::after {
  left: 125%;
}
</style>