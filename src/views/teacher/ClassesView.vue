<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Cell, CellGroup, Icon } from 'vant'

const router = useRouter()

// 模拟课程数据
const classes = ref([
  { id: '1', name: '语言课', time: '周一 10:00-11:00', students: 20 },
  { id: '2', name: '数学课', time: '周二 14:00-15:00', students: 20 },
  { id: '3', name: '美术课', time: '周三 10:00-11:00', students: 20 },
  { id: '4', name: '体育课', time: '周四 14:00-15:00', students: 20 },
  { id: '5', name: '音乐课', time: '周五 10:00-11:00', students: 20 }
])

const back = () => {
  router.back()
}
</script>

<template>
  <div class="page-container">
    <NavBar 
      title="课程管理" 
      left-text="返回" 
      left-arrow
      @click-left="back"
    />
    
    <div class="content">
      <CellGroup>
        <Cell 
          v-for="classItem in classes" 
          :key="classItem.id"
          :title="classItem.name"
          :value="`${classItem.students}人`"
          is-link
        >
          <template #label>
            <div class="class-info">
              <span class="time">{{ classItem.time }}</span>
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

.class-info {
  margin-top: 4px;
}

.time {
  font-size: 12px;
  color: #999;
}
</style>