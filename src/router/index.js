import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '主页',
      icon: 'home'
    },
    children: [{
      path: 'home',
      name: 'homePage',
      hidden: true,
      component: () => import('@/views/home/index'),
      redirect: '/home/main',
      children: [
        {
          path: 'main',
          name: 'main',
          hidden: true,
          component: () => import('@/views/home/main')
        },
        {
          path: 'match',
          name: 'match',
          hidden: true,
          component: () => import('@/views/home/match'),
          meta: {
            title: '赛事中心'
          }
        },
        {
          path: 'players',
          name: 'players',
          hidden: true,
          component: () => import('@/views/home/players'),
          meta: {
            title: '球员中心'
          }
        },
        {
          path: 'data',
          name: 'data',
          hidden: true,
          component: () => import('@/views/home/data'),
          meta: {
            title: '数据中心'
          }
        }
      ]
    }]
  },
  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/users',
    name: 'Manager',
    meta: {
      title: '后台管理',
      icon: 'user_manager'
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/manager/mgUser'),
        name: 'Managers_users',
        meta: {
          title: 'root-用户管理',
          icon: 'user_manager'
        }
      },
      {
        path: 'team',
        component: () => import('@/views/manager/mgTeam'),
        name: 'manager_team',
        meta: {
          title: 'root-球队管理',
          icon: 'team_manager'
        }
      },
      {
        path: 'player',
        component: () => import('@/views/manager/mgPlayer'),
        name: 'player',
        meta: {
          title: 'root-球员管理',
          icon: 'players_manager'
        }
      },
      {
        path: 'match',
        component: () => import('@/views/manager/mgMatch'),
        name: 'match',
        meta: {
          title: 'root-赛事管理',
          icon: 'mg_match'
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/manager/mgNotice'),
        name: 'notice',
        meta: {
          title: '公告管理',
          icon: 'notice'
        }
      },
      {
        path: 'publish',
        component: () => import('@/views/manager/publish'),
        name: 'notpublishice',
        meta: {
          title: '发布公告',
          icon: 'publish'
        }
      }
    ]
  },
  {
    path: '/teams',
    component: Layout,
    redirect: '/teams/manager',
    name: 'Nested',
    meta: {
      title: '球队管理',
      icon: 'manager_player'
    },
    children: [
      {
        path: 'manager',
        component: () => import('@/views/teams/manager'),
        name: 'Manager',
        meta: {
          title: '球员管理',
          icon: 'manager_player'
        }
      },
      {
        path: 'create',
        component: () => import('@/views/teams/create'),
        name: 'create',
        meta: {
          title: '签约球员',
          icon: 'add_player'
        }
      },
      {
        path: 'service',
        component: () => import('@/views/teams/service'),
        name: 'service',
        meta: {
          title: '效力管理',
          icon: 'player_service'
        }
      },
      {
        path: 'analysis',
        component: () => import('@/views/teams/analysis'),
        name: 'analysis',
        meta: {
          title: '数据分析',
          icon: 'analysis'
        }
      },
      {
        path: 'compare',
        component: () => import('@/views/teams/compare'),
        name: 'compare',
        meta: {
          title: '数据对比',
          icon: 'compare'
        }
      }
    ]
  },
  {
    path: '/myteam',
    component: Layout,
    meta: {
      title: '我的主队',
      icon: 'myteam'
    },
    children: [{
      path: '/',
      name: 'myteam',
      hidden: true,
      component: () => import('@/views/myteam/index'),
      meta: {
        title: '',
        icon: 'myteam'
      },
      redirect: '/myteam/team',
      children: [
        {
          path: 'team',
          name: 'team',
          hidden: true,
          component: () => import('@/views/myteam/team'),
          meta: {
            title: '阵容'
          }
        },
        {
          path: 'data',
          name: 'data',
          hidden: true,
          component: () => import('@/views/myteam/data'),
          meta: {
            title: '数据中心'
          }
        },
        {
          path: 'match',
          name: 'match',
          hidden: true,
          component: () => import('@/views/myteam/match'),
          meta: {
            title: '赛程'
          }
        },
        {
          path: 'person',
          name: 'person',
          hidden: true,
          component: () => import('@/views/myteam/person'),
          meta: {
            title: '人员变动'
          }
        }
      ]
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/user/userInfo'),
      meta: {
        title: '我的信息',
        icon: 'userInfo'
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'passwd',
      name: 'Form',
      component: () => import('@/views/user/passwd'),
      meta: {
        title: '修改密码',
        icon: 'passwd'
      }
    }]
  },
  {
    path: '/public',
    component: Layout,
    meta: {
      title: 'public'
    },
    children: [
      {
        path: 'team',
        component: () => import('@/views/public/team'),
        name: 'team',
        meta: {
          title: '球队'
        }
      },
      {
        path: 'player',
        component: () => import('@/views/public/player'),
        name: 'player',
        meta: {
          title: '球员'
        }
      },
      {
        path: 'match',
        component: () => import('@/views/public/match'),
        name: 'match',
        meta: {
          title: '赛事'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
