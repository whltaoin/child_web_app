<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Cell, CellGroup, Icon } from 'vant'

const router = useRouter()
const username = ref('')

onMounted(() => {
  username.value = localStorage.getItem('username') || ''
})

const logout = () => {
  localStorage.removeItem('userRole')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<template>
  <div class="page-container">
    <NavBar 
      title="验收报告" 
      left-text="退出" 
      @click-left="logout"
    />
    
    <div class="content">
      <div class="welcome-section">
        <h2>欢迎您，{{ username }}验收员</h2>
        <p>请查看或创建验收报告</p>
      </div>
      
      <CellGroup>
        <Cell title="小班验收报告" is-link>
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
        <Cell title="中班验收报告" is-link>
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
        <Cell title="大班验收报告" is-link>
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
        <Cell title="创建新报告" is-link>
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
  padding: 20px;
}

.welcome-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.welcome-section h2 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #333;
}

.welcome-section p {
  color: #666;
  font-size: 14px;
}
</style>