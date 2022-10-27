import React, { useEffect } from 'react';
import defaultSettings from '../../../../config/defaultSettings';

/**
 *
 * @author whiteshader@163.com
 *
 * */

const CacheInfo: React.FC = () => {
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
    <div style={{marginTop:'38px'}}>
      <iframe
        style={{ width: '100%', border: '0px', height: '100%' }}
        // frameborder={'0'}
        scrolling="yes"
        src={`${defaultSettings.apiBasePath}/swagger-ui/index.html`}
        id="bdIframe"
       />
    </div>
  );
};

export default CacheInfo;
