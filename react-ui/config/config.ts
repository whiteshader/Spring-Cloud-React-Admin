// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
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
          path: '/',
          component: '../layouts/SecurityBasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  path: '/',
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
              name: 'test',
              icon: 'BugOutlined',
              path: '/test',
              routes: [
                {
                  path: '/',
                  redirect: '/test/mqtt',
                },
                {
                  name: 'mqtt',
                  icon: 'PartitionOutlined',
                  path: '/test/mqtt',
                  component: './mqtt',
                },
                {
                  name: 'userInfo',
                  icon: 'PartitionOutlined',
                  path: '/test/user',
                  component: 'system/user/index',
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
                  icon: 'PartitionOutlined',
                  path: '/system/user',
                  component: 'system/user/index',
                },
                {
                  name: 'menu',
                  icon: 'PartitionOutlined',
                  path: '/system/menu',
                  component: 'system/menu/index',
                },
                {
                  name: 'role',
                  icon: 'PartitionOutlined',
                  path: '/system/role',
                  component: 'system/role/index',
                },
                {
                  name: 'dept',
                  icon: 'PartitionOutlined',
                  path: '/system/dept',
                  component: 'system/dept/index',
                },
                {
                  name: 'post',
                  icon: 'PartitionOutlined',
                  path: '/system/post',
                  component: 'system/post/index',
                },
                {
                  name: 'dict',
                  icon: 'PartitionOutlined',
                  path: '/system/dict',
                  component: 'system/dict/index',
                },
                {
                  name: 'dictData',
                  icon: 'PartitionOutlined',
                  path: '/system/dict-data/index/:id?',
                  component: 'system/dictData/index',
                },
                {
                  name: 'config',
                  icon: 'PartitionOutlined',
                  path: '/system/config',
                  component: 'system/config/index',
                },
                {
                  name: 'notice',
                  icon: 'PartitionOutlined',
                  path: '/system/notice',
                  component: 'system/notice/index',
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
                    },
                    {
                      name: 'loginInfo',
                      icon: 'PartitionOutlined',
                      path: '/system/log/logininfor',
                      component: 'monitor/logininfor',
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
                  icon: 'PartitionOutlined',
                  path: '/monitor/online',
                  component: 'monitor/online',
                },
                {
                  name: 'job',
                  icon: 'PartitionOutlined',
                  path: '/monitor/job',
                  component: 'monitor/job',
                },
                {
                  name: 'joblog',
                  icon: 'PartitionOutlined',
                  path: '/monitor/job-log/index/:jobId?',
                  component: 'monitor/joblog',
                },
                {
                  name: 'druid',
                  icon: 'PartitionOutlined',
                  path: '/monitor/druid',
                  component: 'monitor/druid',
                },
                {
                  name: 'serverInfo',
                  icon: 'PartitionOutlined',
                  path: '/monitor/server',
                  component: 'monitor/server',
                },
                {
                  name: 'cacheInfo',
                  icon: 'PartitionOutlined',
                  path: '/monitor/cache',
                  component: 'monitor/cache',
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
                  icon: 'PartitionOutlined',
                  path: '/tool/gen',
                  component: 'tool/gen/index',
                },
                {
                  name: 'genEdit',
                  icon: 'PartitionOutlined',
                  path: '/tool/gen/edit',
                  component: 'tool/gen/edit',
                },
                {
                  name: 'genImport',
                  icon: 'PartitionOutlined',
                  path: '/tool/gen/import',
                  component: 'tool/gen/import',
                },
                {
                  name: 'buildForm',
                  icon: 'PartitionOutlined',
                  path: '/tool/build',
                  component: 'tool/build',
                },
                {
                  name: 'swagger',
                  icon: 'PartitionOutlined',
                  path: '/tool/swagger',
                  component: 'tool/swagger',
                },
              ],
            },
            {
              path: '/form',
              icon: 'form',
              name: 'form',
              routes: [
                {
                  path: '/',
                  redirect: '/form/basic-form',
                },
                {
                  name: 'basic-form',
                  icon: 'smile',
                  path: '/form/basic-form',
                  component: './form/basic-form',
                },
                {
                  name: 'step-form',
                  icon: 'smile',
                  path: '/form/step-form',
                  component: './form/step-form',
                },
                {
                  name: 'advanced-form',
                  icon: 'smile',
                  path: '/form/advanced-form',
                  component: './form/advanced-form',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              routes: [
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/articles',
                    },
                    {
                      name: 'articles',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                    },
                    {
                      name: 'projects',
                      icon: 'smile',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                    },
                    {
                      name: 'applications',
                      icon: 'smile',
                      path: '/list/search/applications',
                      component: './list/search/applications',
                    },
                  ],
                },
                {
                  path: '/',
                  redirect: '/list/table-list',
                },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                },
                {
                  name: 'basic-list',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              routes: [
                {
                  path: '/',
                  redirect: '/profile/basic',
                },
                {
                  name: 'basic',
                  icon: 'smile',
                  path: '/profile/basic',
                  component: './profile/basic',
                },
                {
                  name: 'advanced',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              name: 'result',
              icon: 'CheckCircleOutlined',
              path: '/result',
              routes: [
                {
                  path: '/',
                  redirect: '/result/success',
                },
                {
                  name: 'success',
                  icon: 'smile',
                  path: '/result/success',
                  component: './result/success',
                },
                {
                  name: 'fail',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  path: '/',
                  redirect: '/exception/403',
                },
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  path: '/',
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
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  path: '/',
                  redirect: '/editor/flow',
                },
                {
                  name: 'flow',
                  icon: 'smile',
                  path: '/editor/flow',
                  component: './editor/flow',
                },
                {
                  name: 'mind',
                  icon: 'smile',
                  path: '/editor/mind',
                  component: './editor/mind',
                },
                {
                  name: 'koni',
                  icon: 'smile',
                  path: '/editor/koni',
                  component: './editor/koni',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
