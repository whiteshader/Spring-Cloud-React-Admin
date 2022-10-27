import React, { useEffect } from 'react';
import defaultSettings from '../../../../config/defaultSettings';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

const DruidInfo: React.FC = () => {
  useEffect(() => {
    const frame = document.getElementById('bdIframe');
    if (frame) {
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      frame.style.width = `${Number(deviceWidth) - 220}px`;
      frame.style.height = `${Number(deviceHeight) - 120}px`;
    }
  });

  return (
    // <PageContainer title="Druid Information" header={{}} footer={[]}>
    <iframe
      style={{ width: '100%', border: '0px', height: '100%' }}
      // frameborder={'0'}
      scrolling="yes"
      src={`${defaultSettings.apiBasePath}/druid/login.html`}
      id="bdIframe"
     />
    // </WrapContent>
  );
};

export default DruidInfo;
