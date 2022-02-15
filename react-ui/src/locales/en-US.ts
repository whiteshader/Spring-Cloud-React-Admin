import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pages from './en-US/pages';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import user from './en-US/user';
import role from './en-US/role';
import dept from './en-US/dept';
import post from './en-US/post';
import config from './en-US/config';
import sysmenu from './en-US/sysmenu';
import notice from './en-US/notice';
import dict from './en-US/dict';
import job from './en-US/job';
import jobLog from './en-US/jobLog';
import loginInfo from './en-US/loginInfo';
import operLog from './en-US/operLog';
import server from './en-US/server';
import onlineUser from './en-US/onlineUser';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Produced by Ant Financial Experience Department',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
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
