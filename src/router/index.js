import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register') // 指定组件，可以实现路由懒加载，即当路由被访问时才加载对应的组件：
  },
  // 首页路由配置
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  // 其他未配置的路由都跳转到首页
  {
    path: '*',
    // 重定向
    redirect: '/'
  }
]

const router = new Router({
  mode: 'history', // 路由模式，默认值 'hash' 使用井号（ # ）作路由，值 'history' 可利用 History API 来完成页面跳转且无须重新加载；
  routes
})

// to 即将要进入的目标路由；
// from：当前导航正要离开的路由，from.name 是路由的名称，对应路由配置中的 name；
// from：当前导航正要离开的路由，from.name 是路由的名称，对应路由配置中的 name；
router.beforeEach((to, from, next) => {
  const auth = router.app.$options.store.state.auth
  // 使用 router.app 可以获取 router 对应的 Vue 根实例，使用实例的 $options.store 可以从选项中访问仓库；

  if (auth && to.path.indexOf('/auth/') !== -1) {
    next('/')
  } else {
    next()
  }
})

export default router