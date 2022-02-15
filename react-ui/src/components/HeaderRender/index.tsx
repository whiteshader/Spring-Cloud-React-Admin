/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/15
 * 
 * */

import RightContent from '@/components/RightContent'
import Tabs from '@/components/Tabs'
import styles from './headerRender.less'
const HeaderRender = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerInfo}>        
                <RightContent />
            </div>
            <Tabs />
        </div>
    );
}

export default HeaderRender;