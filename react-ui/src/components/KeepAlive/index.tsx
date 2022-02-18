/*
 * @Author: wangYe 
 * @Date: 2020-12-18 13:25:08 
 * @Last Modified by: wangYe
 * @Last Modified time: 2020-12-21 17:54:54
 */


import React, { useEffect } from 'react';
import { KeepAlive, useIntl, useModel } from 'umi';

export default function KeepAlivePage(props: any) {
    const intl = useIntl()
    const { dispatch, tabList, showTabs, tarnslateX, tabsWidth, tabWidth } = useModel("system")
    useEffect(() => {
        // 去重
        const localTablist = JSON.parse(JSON.stringify(tabList));
        const isExit = localTablist.findIndex((item: any) => item.pathname === props.location.pathname);
        // 需要计算translateX
        if (isExit < 0) {
            const obj = { ...props.location, title: intl.formatMessage({ id: props.route.title }), keepAliveName: props.route.name }
            localTablist.push(obj);
            let x = 0;
            if (localTablist.length >= showTabs) {
                const isBeyondDistance = ((showTabs as number) * (tabWidth as number)) - (tabsWidth as number) + 100;
                x = isBeyondDistance + (localTablist.length - showTabs) * tabWidth
            }
            dispatch({ type: 'CHANGESTATE', payload: { tabList: localTablist, active: localTablist.length - 1, tarnslateX: x } });
        } else {
            const isBeyondDistance = ((showTabs as number) * (tabWidth as number)) - (tabsWidth as number) + 100;
            const curClickIndex = tabList.findIndex(item => item.pathname === props.location.pathname) as number;
            // 能展示多少个
            const totalShowIndex = (showTabs as number) - 1;
            if (curClickIndex > totalShowIndex) {
                // 计算移动的距离
                const x = (curClickIndex - totalShowIndex) * (tabWidth as number) + isBeyondDistance
                dispatch({ type: 'CHANGESTATE', payload: { tarnslateX: x, active: isExit } })
            } else {
                // 计算隐藏了多少个
                const transNum = Math.ceil(tarnslateX / tabWidth);
                if (isExit < transNum) {
                    dispatch({ type: 'CHANGESTATE', payload: { tarnslateX: tabWidth * curClickIndex, active: isExit } })
                } else {
                    dispatch({ type: 'CHANGESTATE', payload: { active: isExit } })
                }
            }
        }
    }, [dispatch, intl, props.location, props.route.name, props.route.title, showTabs, tabList])

    if (props.route.keppAlive) {
        return (
            <KeepAlive saveScrollPosition={props.route.saveScrollPosition ?? "screen"} name={props.route.title}>
                {props.children}
            </KeepAlive>
        )
    }
    return props.children
}
