<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Cell, CellGroup, Icon } from 'vant'

const router = useRouter()

// 模拟检查项数据
const inspections = ref([
  { id: '1', name: '教学设施检查', status: '已完成' },
  { id: '2', name: '安全隐患排查', status: '进行中' },
  { id: '3', name: '卫生状况检查', status: '未开始' },
  { id: '4', name: '师资配备审核', status: '进行中' },
  { id: '5', name: '课程设置评估', status: '未开始' }
])

const back = () => {
  router.back()
}
</script>

<template>
  <div class="page-container">
    <NavBar 
      title="检查管理" 
      left-text="返回" 
      left-arrow
      @click-left="back"
    />
    
    <div class="content">
      <CellGroup>
        <Cell 
          v-for="item in inspections" 
          :key="item.id"
          :title="item.name"
          :value="item.status"
          :value-class="statusClass(item.status)"
          is-link
        >
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
      </CellGroup>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    statusClass(status: string): string {
      switch (status) {
        case '已完成':
          return 'status-completed'
        case '进行中':
          return 'status-progress'
        case '未开始':
          return 'status-pending'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 16px;
}

.status-completed {
  color: #07c160;
}

.status-progress {
  color: #1989fa;
}

.status-pending {
  color: #999;
}
</style>