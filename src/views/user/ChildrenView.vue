<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Cell, CellGroup, Icon } from 'vant'

const router = useRouter()

// 模拟子女数据
const children = ref([
  { id: '1', name: '小明', age: 5, class: '小班', teacher: '李老师' },
  { id: '2', name: '小红', age: 4, class: '小班', teacher: '王老师' }
])

const back = () => {
  router.back()
}
</script>

<template>
  <div class="page-container">
    <NavBar 
      title="我的孩子" 
      left-text="返回" 
      left-arrow
      @click-left="back"
    />
    
    <div class="content">
      <CellGroup>
        <Cell 
          v-for="child in children" 
          :key="child.id"
          :title="child.name"
          :value="child.class"
          is-link
        >
          <template #label>
            <div class="child-info">
              <span class="age">{{ child.age }}岁</span>
              <span class="teacher">班主任：{{ child.teacher }}</span>
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

.child-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.age,
.teacher {
  font-size: 12px;
  color: #999;
}
</style>