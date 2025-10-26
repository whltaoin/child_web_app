<script setup lang="ts">
// App.vue作为路由容器
</script>

<template>
  <div class="app-container">
    <!-- 路由视图，用于显示当前路由对应的组件 -->
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f5f5f5;
}
</style>
