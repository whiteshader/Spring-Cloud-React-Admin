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
      {props.children}
    </div>
  );
};

export default TabsLayout;