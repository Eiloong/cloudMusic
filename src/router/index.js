// 路由整合
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入对应的路由
import discovery from '../views/Discovery.vue'

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    // 发现音乐
    path: '/discovery',
    component: discovery
  },
  // 推荐歌单
  {
    path: '/playlists',
    component: () => import('../views/Playlists.vue')
  },
  // 歌单详情
  {
    path: '/playlist',
    component: () => import('../views/DetailPlaylist.vue')
  },
  // 最新音乐
  {
    path: '/songs',
    component: () => import('../views/Songs.vue')
  },
  // 推荐 mv
  {
    path: '/mvs',
    component: () => import('../views/Mvs.vue')
  },
  // mv 详情
  {
    path: '/mv',
    component: () => import('../views/DetailMv.vue')
  },
  // 搜索结果页
  {
    path: '/result',
    component: () => import('../views/Result.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  routes
})

export default router