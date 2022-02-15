/*
 * @Author: wangYe 
 * @Date: 2021-01-13 19:02:45 
 * @Last Modified by: wangYe
 * @Last Modified time: 2021-01-13 19:03:30
 */


import React from 'react';
import RightContent from '@/components/RightContent'
import Tabs from '@/components/Tabs'
import styles from './headerRender.less'
const HeaderRender = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerInfo}>
                <div></div>
                <RightContent />
            </div>
            <Tabs />
        </div>
    );
}

export default HeaderRender;