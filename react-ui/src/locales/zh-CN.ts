import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import pages from './zh-CN/pages';
import user from './zh-CN/user';
import role from './zh-CN/role';
import dept from './zh-CN/dept';
import post from './zh-CN/post';
import config from './zh-CN/config';
import sysmenu from './zh-CN/sysmenu';
import notice from './zh-CN/notice';
import dict from './zh-CN/dict';
import job from './zh-CN/job';
import jobLog from './zh-CN/jobLog';
import loginInfo from './zh-CN/loginInfo';
import operLog from './zh-CN/operLog';
import server from './zh-CN/server';
import onlineUser from './zh-CN/onlineUser';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': '蚂蚁集团体验技术部出品',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...user,
  ...post,
  ...dept,
  ...role,
  ...config,
  ...sysmenu,
  ...notice,
  ...dict,
  ...job,
  ...jobLog,
  ...loginInfo,
  ...operLog,
  ...server,
  ...onlineUser,
};
