<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Cell, CellGroup, Icon } from 'vant'

const router = useRouter()

// 模拟学生数据
const students = ref([
  { id: '1', name: '小明', age: 5, gender: '男', class: '小班' },
  { id: '2', name: '小红', age: 4, gender: '女', class: '小班' },
  { id: '3', name: '小华', age: 5, gender: '男', class: '小班' },
  { id: '4', name: '小丽', age: 4, gender: '女', class: '小班' },
  { id: '5', name: '小强', age: 5, gender: '男', class: '小班' }
])

const back = () => {
  router.back()
}
</script>

<template>
  <div class="page-container">
    <NavBar 
      title="学生管理" 
      left-text="返回" 
      left-arrow
      @click-left="back"
    />
    
    <div class="content">
      <CellGroup>
        <Cell 
          v-for="student in students" 
          :key="student.id"
          :title="student.name"
          :value="student.class"
          is-link
        >
          <template #label>
            <div class="student-info">
              <span class="age">{{ student.age }}岁</span>
              <span class="gender">{{ student.gender }}</span>
            </div>
          </template>
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
      </CellGroup>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 16px;
}

.student-info {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.age,
.gender {
  font-size: 12px;
  color: #999;
}
</style>