export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
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
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
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
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    name: 'system',
    icon: 'BugOutlined',
    path: '/system',
    routes: [
      {
        path: '/',
        redirect: '/system/user',
      },
      {
        name: 'user',
        title: 'menu.title.user',
        icon: 'PartitionOutlined',
        path: '/system/user',
        component: 'system/user/index',
        access: 'authorize'
      },
      {
        name: 'menu',
        title: 'menu.title.menu',
        icon: 'PartitionOutlined',
        path: '/system/menu',
        component: 'system/menu/index',
        access: 'authorize'
      },
      {
        name: 'role',
        title: 'menu.title.role',
        icon: 'PartitionOutlined',
        path: '/system/role',
        component: 'system/role/index',
        access: 'authorize'
      },
      {
        name: 'dept',
        title: 'menu.title.dept',
        icon: 'PartitionOutlined',
        path: '/system/dept',
        component: 'system/dept/index',
        access: 'authorize'
      },
      {
        name: 'post',
        title: 'menu.title.post',
        icon: 'PartitionOutlined',
        path: '/system/post',
        component: 'system/post/index',
        access: 'authorize'
      },
      {
        name: 'dict',
        title: 'menu.title.dict',
        icon: 'PartitionOutlined',
        path: '/system/dict',
        component: 'system/dict/index',
        access: 'authorize'
      },
      {
        name: 'dictData',
        title: 'menu.title.dictData',
        icon: 'PartitionOutlined',
        path: '/system/dict-data/index/:id?',
        component: 'system/dictData/index',
        access: 'authorize'
      },
      {
        name: 'config',
        title: 'menu.title.config',
        icon: 'PartitionOutlined',
        path: '/system/config',
        component: 'system/config/index',
        access: 'authorize'
      },
      {
        name: 'notice',
        title: 'menu.title.notice',
        icon: 'PartitionOutlined',
        path: '/system/notice',
        component: 'system/notice/index',
        access: 'authorize'
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
            title: 'menu.title.operlog',
            icon: 'PartitionOutlined',
            path: '/system/log/operlog',
            component: 'monitor/operlog',
            access: 'authorize'
          },
          {
            name: 'loginInfo',
            title: 'menu.title.loginInfo',
            icon: 'PartitionOutlined',
            path: '/system/log/logininfor',
            component: 'monitor/logininfor',
            access: 'authorize'
          },
        ],
      },
    ],
  },
  {
    name: 'monitor',
    icon: 'BugOutlined',
    path: '/monitor',
    routes: [
      {
        path: '/',
        redirect: '/monitor/online',
      },
      {
        name: 'onlineUser',
        title: 'menu.title.onlineUser',
        icon: 'PartitionOutlined',
        path: '/monitor/online',
        component: 'monitor/online',
        access: 'authorize'
      },
      {
        name: 'job',
        title: 'menu.title.job',
        icon: 'PartitionOutlined',
        path: '/monitor/job',
        component: 'monitor/job',
        access: 'authorize'
      },
      {
        name: 'joblog',
        title: 'menu.title.joblog',
        icon: 'PartitionOutlined',
        path: '/monitor/job-log/index/:jobId?',
        component: 'monitor/joblog',
        access: 'authorize'
      },
      {
        name: 'druid',
        title: 'menu.title.druid',
        icon: 'PartitionOutlined',
        path: '/monitor/druid',
        component: 'monitor/druid',
        access: 'authorize'
      },
      {
        name: 'serverInfo',
        title: 'menu.title.serverInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/server',
        component: 'monitor/server',
        access: 'authorize'
      },
      {
        name: 'cacheInfo',
        title: 'menu.title.cacheInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/cache',
        component: 'monitor/cache',
        access: 'authorize'
      },
    ],
  },
  {
    name: 'tool',
    icon: 'BugOutlined',
    path: '/tool',
    routes: [
      {
        path: '/',
        redirect: '/tool/gen',
      },
      {
        name: 'gen',
        title: 'menu.title.gen',
        icon: 'PartitionOutlined',
        path: '/tool/gen',
        component: 'tool/gen/index', 
        access: 'authorize'
      },
      {
        name: 'design',
        title: 'menu.title.design',
        icon: 'PartitionOutlined',
        path: '/tool/design',
        component: 'tool/design',
        access: 'authorize',
      },
      {
        name: 'swagger',
        title: 'menu.title.swagger',
        icon: 'PartitionOutlined',
        path: '/tool/swagger',
        component: 'tool/swagger',
        access: 'authorize',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
