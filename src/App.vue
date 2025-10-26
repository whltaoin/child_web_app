<script setup lang="ts">
import { ref } from 'vue'
import { Button, Cell, CellGroup, NavBar, Tabbar, TabbarItem } from 'vant'

const active = ref(0)
const showToast = () => {
  alert('你好，移动端应用开发！')
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar 
      title="移动应用示例" 
      left-text="" 
      right-text="设置"
      left-arrow
      @click-left="showToast"
      @click-right="showToast"
    />
    
    <!-- 主内容区域 -->
    <div class="content">
      <van-cell-group>
        <van-cell title="欢迎使用Vue 3 + TypeScript + Vant" />
        <van-cell title="这是一个移动端应用" />
        <van-cell title="已完成基础配置" />
      </van-cell-group>
      
      <div class="button-group">
        <van-button type="primary" @click="showToast">主按钮</van-button>
        <van-button type="default" @click="showToast">默认按钮</van-button>
        <van-button type="danger" @click="showToast">信息按钮</van-button>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">发现</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 768px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.button-group {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.van-button {
  font-size: 16px;
  height: 44px;
}

.van-tabbar {
  background-color: #fff;
}
</style>
