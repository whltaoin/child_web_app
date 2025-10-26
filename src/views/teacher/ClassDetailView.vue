<template>
  <div class="class-detail-container">
    <van-nav-bar 
      :title="`${className} 出勤详情`" 
      left-text="返回" 
      left-arrow 
      @click-left="goBack" 
      :right-text="currentDate"
      background="transparent" 
      title-style="color: #ffffff" 
      text-color="#a0aec0" 
    />
    
    <div class="page-content">
      <div class="attendance-summary tech-border tech-border-glow">
        <div class="summary-item">
          <div class="summary-number">{{ totalStudents }}</div>
          <div class="summary-label">总人数</div>
        </div>
        <div class="summary-item">
          <div class="summary-number attended">{{ attendedCount }}</div>
          <div class="summary-label">已入园</div>
        </div>
        <div class="summary-item">
          <div class="summary-number absent">{{ absentCount }}</div>
          <div class="summary-label">未入园</div>
        </div>
      </div>
      
      <div class="student-list">
        <div class="section-title tech-border">儿童出勤情况</div>
        
        <div 
          v-for="student in sortedStudents" 
          :key="student.id"
          class="student-item tech-border"
        >
          <div class="student-avatar">
            <img :src="student.avatar" alt="{{ student.name }}" />
          </div>
          
          <div class="student-info">
            <div class="student-name-row">
              <span class="student-name">{{ student.name }}</span>
              <div class="status-badge" :class="student.status">
                <div class="status-indicator" :class="student.status"></div>
                <span>
                  {{ student.status === 'attended' ? '已入园' : '未入园' }}
                </span>
              </div>
            </div>
            <div class="parent-contact">家长: {{ student.parentContact }}</div>
            <div v-if="student.status === 'attended'" class="arrival-time">
              入园时间: {{ student.arrivalTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 获取班级ID参数
const classId = computed(() => {
  return Number(route.params.id)
})

// 班级名称
const className = ref('')

// 儿童数据
const students = ref<Array<{
  id: number
  name: string
  avatar: string
  parentContact: string
  status: 'attended' | 'absent'
  arrivalTime?: string
}>>([])

// 计算当前日期
const currentDate = computed(() => {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
})

// 计算统计数据
const totalStudents = computed(() => students.value.length)
const attendedCount = computed(() => students.value.filter(s => s.status === 'attended').length)
const absentCount = computed(() => students.value.filter(s => s.status === 'absent').length)

// 排序学生列表（未入园的排在前面）
const sortedStudents = computed(() => {
  return [...students.value].sort((a, b) => {
    if (a.status === 'absent' && b.status === 'attended') return -1
    if (a.status === 'attended' && b.status === 'absent') return 1
    return a.name.localeCompare(b.name)
  })
})

// 模拟数据加载
const loadClassData = () => {
  // 根据班级ID设置班级名称
  const classNames: Record<number, string> = {
    1: '小班(芽芽班)',
    2: '小班(苗苗班)',
    3: '中班(朵朵班)',
    4: '中班(花花班)',
    5: '大班(果果班)',
    6: '大班(星星班)'
  }
  
  className.value = classNames[classId.value] || '班级详情'
  
  // 生成模拟学生数据
  const mockStudents = []
  const totalCount = 25 + Math.floor(Math.random() * 6) // 25-30名学生
  
  for (let i = 1; i <= totalCount; i++) {
    const isAttended = Math.random() > 0.1 // 90%的概率已入园
      
      // 使用正确的类型
      const studentStatus: 'attended' | 'absent' = isAttended ? 'attended' : 'absent'
    
    mockStudents.push({
      id: i,
      name: `幼儿${i}`,
      avatar: `https://picsum.photos/seed/${i + classId.value * 100}/60/60`,
      parentContact: `138****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: studentStatus,
      arrivalTime: isAttended ? generateRandomTime() : undefined
    })
  }
  
  students.value = mockStudents
}

// 生成随机入园时间（8:00-9:30之间）
const generateRandomTime = (): string => {
  const hour = Math.floor(Math.random() * 1.5) + 8 // 8-9点
  const minute = Math.floor(Math.random() * 60)
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 页面加载时获取数据
onMounted(() => {
  loadClassData()
})
</script>

<style scoped>
:root {
  --dark-bg: #121826;
  --card-bg: #1a2034;
  --border-color: #2d3748;
  --primary-color: #0070f3;
  --primary-light: #3291ff;
  --secondary-color: #7928ca;
  --accent-color: #ff0080;
  --text-primary: #ffffff;
  --text-secondary: #a0aec0;
  --success-color: #07c160;
  --error-color: #ee0a24;
}

.class-detail-container {
  min-height: 100vh;
  background-color: var(--dark-bg);
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(0, 112, 243, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(121, 40, 202, 0.1) 0%, transparent 50%);
}

.page-content {
  padding: 16px;
}

.attendance-summary {
  display: flex;
  justify-content: space-around;
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 20px 0;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.attendance-summary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-light), var(--secondary-color));
}

.tech-border-glow::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 14px;
  background: linear-gradient(45deg, var(--primary-light), var(--secondary-color));
  z-index: -1;
  opacity: 0.7;
  filter: blur(4px);
}

.summary-item {
  text-align: center;
  position: relative;
  z-index: 1;
}

.summary-number {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 4px;
  text-shadow: 0 0 8px rgba(0, 112, 243, 0.3);
}

.summary-number.attended {
  color: var(--success-color);
  text-shadow: 0 0 8px rgba(7, 193, 96, 0.3);
}

.summary-number.absent {
  color: var(--error-color);
  text-shadow: 0 0 8px rgba(238, 10, 36, 0.3);
  animation: techPulseFast 2s infinite;
}

.summary-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.student-list {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: var(--text-primary);
  position: relative;
  padding-bottom: 8px;
}

.section-title.tech-border::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-light), transparent);
}

.student-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
}

.student-item:last-child {
  border-bottom: none;
}

.student-item:active {
  transform: translateY(2px);
  box-shadow: 0 4px 12px rgba(0, 112, 243, 0.2);
}

.student-item.absent {
  border-left: 3px solid var(--error-color);
  padding-left: 12px;
  box-shadow: 0 2px 8px rgba(238, 10, 36, 0.1);
}

.student-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  box-shadow: 0 2px 8px rgba(0, 112, 243, 0.3);
}

.student-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.student-info {
  flex: 1;
}

.student-name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.student-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.status-badge {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-badge.attended {
  background-color: rgba(7, 193, 96, 0.2);
  color: var(--success-color);
}

.status-badge.absent {
  background-color: rgba(238, 10, 36, 0.2);
  color: var(--error-color);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}

.status-indicator.attended {
  background-color: var(--success-color);
  color: var(--success-color);
  animation: techPulseSlow 3s infinite;
}

.status-indicator.absent {
  background-color: var(--error-color);
  color: var(--error-color);
  animation: techPulseFast 1.5s infinite;
}

.parent-contact {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.arrival-time {
  font-size: 12px;
  color: var(--text-secondary);
}

/* 学生项悬停效果 */
.student-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  transform: skewX(-25deg);
  transition: left 0.7s ease;
}

.student-item:active::after {
  left: 125%;
}

/* 动画效果 */
@keyframes techPulseSlow {
  0% {
    box-shadow: 0 0 0 0 rgba(7, 193, 96, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(7, 193, 96, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(7, 193, 96, 0);
  }
}

@keyframes techPulseFast {
  0% {
    box-shadow: 0 0 0 0 rgba(238, 10, 36, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(238, 10, 36, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(238, 10, 36, 0);
  }
}
</style>