import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 教师路由
const teacherRoutes: RouteRecordRaw[] = [
  {
    path: '/teacher/dashboard',
    name: 'TeacherDashboard',
    component: () => import('../views/teacher/DashboardView.vue'),
    meta: { requiresAuth: true, roles: ['teacher'] }
  },
  {
    path: '/teacher/students',
    name: 'TeacherStudents',
    component: () => import('../views/teacher/StudentsView.vue'),
    meta: { requiresAuth: true, roles: ['teacher'] }
  },
  {
    path: '/teacher/classes',
    name: 'TeacherClasses',
    component: () => import('../views/teacher/ClassesView.vue'),
    meta: { requiresAuth: true, roles: ['teacher'] }
  },
  {
    path: '/teacher/attendance-log',
    name: 'TeacherAttendanceLog',
    component: () => import('../views/teacher/AttendanceLogView.vue'),
    meta: { requiresAuth: true, roles: ['teacher'] }
  },
  {
    path: '/teacher/class-detail/:id',
    name: 'TeacherClassDetail',
    component: () => import('../views/teacher/ClassDetailView.vue'),
    meta: { requiresAuth: true, roles: ['teacher'] }
  }
]

// 家长路由
const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('../views/user/ProfileView.vue'),
    meta: { requiresAuth: true, role: 'user' }
  },
  {
    path: '/user/children',
    name: 'userChildren',
    component: () => import('../views/user/ChildrenView.vue'),
    meta: { requiresAuth: true, role: 'user' }
  }
]

// 验收小组路由
const schoolRoutes: RouteRecordRaw[] = [
  {
    path: '/school/reports',
    name: 'schoolReports',
    component: () => import('../views/school/ReportsView.vue'),
    meta: { requiresAuth: true, role: 'school' }
  },
  {
    path: '/school/inspections',
    name: 'schoolInspections',
    component: () => import('../views/school/InspectionsView.vue'),
    meta: { requiresAuth: true, role: 'school' }
  }
]

// 公共路由
const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  // 捕获所有未匹配的路由，重定向到首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...publicRoutes, ...teacherRoutes, ...userRoutes, ...schoolRoutes]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    // 检查当前用户角色
    const currentRole = localStorage.getItem('userRole') || localStorage.getItem('role')
    if (!currentRole) {
      // 未登录，重定向到首页（登录按钮在首页）
      next('/')
    } else {
      // 已登录，检查权限（处理roles和role两种情况）
      const allowedRoles = Array.isArray(to.meta.roles) ? to.meta.roles : 
                           to.meta.role ? [to.meta.role] : []
      
      if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
        // 没有权限
        next('/404')
      } else {
        // 有权限，继续导航
        next()
      }
    }
  } else {
    // 不需要认证，直接导航
    next()
  }
})

export default router