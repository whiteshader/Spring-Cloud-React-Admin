/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/22
 * 
 * */

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.dashboard.analysis'
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.dashboard.monitor'
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.dashboard.workplace'
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.account.center'
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.account.settings'
      },
    ],
  },
  {
    name: 'system',
    icon: 'BugOutlined',
    path: '/system',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/',
        redirect: '/system/user',
      },
      {
        name: 'user',
        icon: 'PartitionOutlined',
        path: '/system/user',
        component: 'system/user/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.user'
      },
      {
        name: 'menu',
        icon: 'PartitionOutlined',
        path: '/system/menu',
        component: 'system/menu/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.menu'
      },
      {
        name: 'role',
        icon: 'PartitionOutlined',
        path: '/system/role',
        component: 'system/role/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.role'
      },
      {
        name: 'dept',
        icon: 'PartitionOutlined',
        path: '/system/dept',
        component: 'system/dept/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.dept'
      },
      {
        name: 'post',
        icon: 'PartitionOutlined',
        path: '/system/post',
        component: 'system/post/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.post'
      },
      {
        name: 'dict',
        icon: 'PartitionOutlined',
        path: '/system/dict',
        component: 'system/dict/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.dict'
      },
      {
        name: 'dictData',
        icon: 'PartitionOutlined',
        path: '/system/dict-data/index/:id?',
        component: 'system/dictData/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.dictData'
      },
      {
        name: 'config',
        icon: 'PartitionOutlined',
        path: '/system/config',
        component: 'system/config/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.config'
      },
      {
        name: 'notice',
        icon: 'PartitionOutlined',
        path: '/system/notice',
        component: 'system/notice/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.notice'
      },
      {
        name: 'log',
        icon: 'BugOutlined',
        path: '/system/log/',
        routes: [
          {
            path: '/',
            redirect: '/system/log/operlog',
          },
          {
            name: 'operlog',
            icon: 'PartitionOutlined',
            path: '/system/log/operlog',
            component: 'monitor/operlog',
            access: 'authorize',
            wrappers: ['@/components/KeepAlive'],
            KeepAlive: true,
            title: 'menu.title.operlog'
          },
          {
            name: 'loginInfo',
            icon: 'PartitionOutlined',
            path: '/system/log/logininfor',
            component: 'monitor/logininfor',
            access: 'authorize',
            wrappers: ['@/components/KeepAlive'],
            KeepAlive: true,
            title: 'menu.title.loginInfo'
          },
        ],
      },
    ],
  },
  {
    name: 'monitor',
    icon: 'BugOutlined',
    path: '/monitor',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/',
        redirect: '/monitor/online',
      },
      {
        name: 'onlineUser',
        icon: 'PartitionOutlined',
        path: '/monitor/online',
        component: 'monitor/online',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.onlineUser'
      },
      {
        name: 'job',
        icon: 'PartitionOutlined',
        path: '/monitor/job',
        component: 'monitor/job',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.job'
      },
      {
        name: 'joblog',
        icon: 'PartitionOutlined',
        path: '/monitor/job-log/index/:jobId?',
        component: 'monitor/joblog',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.joblog'
      },
      {
        name: 'druid',
        icon: 'PartitionOutlined',
        path: '/monitor/druid',
        component: 'monitor/druid',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.druid'
      },
      {
        name: 'serverInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/server',
        component: 'monitor/server',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.serverInfo'
      },
      {
        name: 'cacheInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/cache',
        component: 'monitor/cache',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.cacheInfo'
      },
      {
        name: 'cacheList',
        icon: 'PartitionOutlined',
        path: '/monitor/cacheList',
        component: 'monitor/cacheList',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.cacheList'
      },
    ],
  },
  {
    name: 'tool',
    icon: 'BugOutlined',
    path: '/tool',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/',
        redirect: '/tool/gen',
      },
      {
        name: 'gen',
        icon: 'PartitionOutlined',
        path: '/tool/gen',
        component: 'tool/gen/index', 
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.gen'
      },
      {
        name: 'design',
        icon: 'PartitionOutlined',
        path: '/tool/build',
        component: 'tool/builder',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.design'
      },
      {
        name: 'swagger',
        icon: 'PartitionOutlined',
        path: '/tool/swagger',
        component: 'tool/swagger',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.swagger'
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
