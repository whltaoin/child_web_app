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
      title="个人中心" 
      left-text="退出" 
      @click-left="logout"
    />
    
    <div class="content">
      <div class="user-info">
        <div class="avatar">
          <Icon name="user-o" size="48px" color="#fff" />
        </div>
        <h2>{{ username }}</h2>
        <p>家长用户</p>
      </div>
      
      <CellGroup class="menu-group">
        <Cell 
          title="我的孩子" 
          is-link
          @click="router.push('/user/children')"
        >
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
        <Cell title="设置" is-link>
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
        <Cell title="帮助中心" is-link>
          <Icon name="arrow" size="16px" color="#c8c8cd" />
        </Cell>
        <Cell title="关于我们" is-link>
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

.user-info {
  background-color: #1989fa;
  color: #fff;
  text-align: center;
  padding: 30px 0;
  border-radius: 12px;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.user-info h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.user-info p {
  font-size: 14px;
  opacity: 0.8;
}

.menu-group {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}
</style>