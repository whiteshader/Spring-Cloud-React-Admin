import KeepAliveTabs from '@/components/KeepAliveTabs';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/22
 *
 * */

const TabsLayout: React.FC = (props) => {
  return (
    <div>
      <KeepAliveTabs />
      <div style={{ margin: '24px' }}>{props.children}</div>
    </div>
  );
};

export default TabsLayout;
