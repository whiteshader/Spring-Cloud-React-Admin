import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  // primaryColor: '#1890ff',
  primaryColor: '#2F54EB',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '若依管理系统',
  pwa: false,
  iconfontUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
};

export type { DefaultSettings };

export default proSettings;
