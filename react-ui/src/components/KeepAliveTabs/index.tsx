/*
 * @Author: wangYe 
 * @Date: 2020-11-05 17:09:40 
 * @Last Modified by: WhiteShader
 * @Last Modified time: 2022-02-21 11:12:12
 */

import { useEffect, useRef } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { Dropdown, Menu, Divider } from 'antd';
import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import { useModel, history, useAliveController } from 'umi'
import SortableTab from './components/SortableTab'
import styles from './index.less';


const SortableList = SortableContainer(() => {
    const tabsRef = useRef<any>()
    const { tabList, tarnslateX } = useModel("system");
    return (
        <div className={`${styles.tabList}`} ref={tabsRef}  >
            {/* <div className={styles.linkTabs} style={{ transform: `translateX(-${tarnslateX}px)` }}> */}
            <div className={styles.linkTabs} style={{ transform: `translateX(-${tarnslateX}px)` }}>
                {
                    tabList.map((value, index: number) => (
                        <SortableTab key={`item-${index}`} index={index} value={value} tabIndex={index} />
                    ))
                }
            </div>
        </div >
    );
});

const KeepAliveTabs = () => {
    const { initialState } = useModel<any>("@@initialState");
    const { collapsed } = initialState;
    const { tabList, dispatch, active, showTabs, tabsWidth, tabWidth, tarnslateX } = useModel("system");
    const { dropScope, clear } = useAliveController();

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
        const dataSource = JSON.parse(JSON.stringify(tabList))
        const activeItem = dataSource[active as number]
        dataSource.splice(newIndex, 0, dataSource.splice(oldIndex, 1)[0]);
        const movedActiveIndex = dataSource.findIndex((item: string) => item === activeItem)
        dispatch({ type: "CHANGESTATE", payload: { tabList: dataSource, active: movedActiveIndex } })
    }


    // 当前的索引值active showTabs一排能展示多少个
    // 计算应该在菜单展示的菜单有哪些

    const arr: any[] = []
    if (tabList.length > showTabs) {
        // 前面隐藏的元素
        const beforeTab = Math.floor(tarnslateX / tabWidth);
        // 后面隐藏的元素
        const afterTab = Math.floor(tarnslateX / tabWidth) + showTabs
        tabList.forEach((item, index) => {
            if (index < beforeTab) {
                arr.push(item)
            }
            if (index >= afterTab) {
                arr.push(item)
            }
        })
    }


    const menuMore = (
        <Menu onClick={(e) => {
            // 判断点击多余tab的展示移动距离是多少 
            // 计算超出了多少
            // tabsWidth tabWidth showTabs 100是右边操作的距离目前写死
            const isBeyondDistance = ((showTabs as number) * (tabWidth as number)) - (tabsWidth as number) + 100;
            // TODO 找到当前点击的索引值
            const curClickIndex = tabList?.findIndex(item => item.pathname === e.key) as number;
            // 能展示多少个
            const totalShowIndex = (showTabs as number) - 1;
            if (curClickIndex > totalShowIndex) {
                // 计算移动的距离
                const x = (curClickIndex - totalShowIndex) * (tabWidth as number) + isBeyondDistance
                dispatch({ type: 'CHANGESTATE', payload: { tarnslateX: x, active: curClickIndex } })
            } else {
                dispatch({ type: 'CHANGESTATE', payload: { tarnslateX: tabWidth * curClickIndex, active: curClickIndex } })
            }
            history.push({ ...tabList[curClickIndex] })
        }}>
            {
                arr.map(item => {
                    return <Menu.Item key={item.pathname}> {item.title}</Menu.Item>
                })
            }
        </Menu>
    );
    const menu = (
        <Menu onClick={(e) => {
            let activeIndex: number = 0;
            const localTablist = JSON.parse(JSON.stringify(tabList))
            switch (e.key) {
                case "closeCurrent": {
                    const currentName = localTablist[active].keepAliveName
                    if (active > 0) {
                        activeIndex = active - 1
                        const timer = setTimeout(() => {
                            clearTimeout(timer)
                            history.push(tabList[activeIndex])
                        }, 10)
                    } else {
                        activeIndex = 0
                        const timer = setTimeout(() => {
                            clearTimeout(timer)
                            history.push(localTablist[activeIndex])
                        }, 10)
                    }
                    const unlisten = history.listen(() => {
                        unlisten()
                        const dropTimer = setTimeout(() => {
                            clearTimeout(dropTimer)
                            dropScope(currentName)
                        }, 10)
                    })
                    localTablist.splice(active, 1)
                    dispatch({ type: "CHANGESTATE", payload: { tabList: localTablist, active: activeIndex, tarnslateX: 0 } })
                    break;
                }
                case "closeOther": {
                    const needDelete = localTablist.filter((item: any, index: number) => index !== active);
                    const needUpdate = localTablist.filter((item: any, index: number) => index === active);
                    needDelete.forEach((item: any) => dropScope(item.keepAliveName));
                    dispatch({ type: "CHANGESTATE", payload: { tabList: needUpdate, active: 0, tarnslateX: 0 } })
                    break;
                }
                case "closeAll": {
                    const unlisten = history.listen(() => {
                        unlisten()
                        const dropTimer = setTimeout(() => {
                            clearTimeout(dropTimer)
                            clear()
                        }, 10)
                    })
                    const timer = setTimeout(() => {
                        clearTimeout(timer)
                        history.push("/")
                    }, 10)
                    dispatch({ type: "CHANGESTATE", payload: { tabList: [], active: 0, tarnslateX: 0 } })
                    break;
                }
                case "closeLeft": {
                    const needDelete = localTablist.filter((item: any, index: number) => index < active);
                    const needUpdate = localTablist.filter((item: any, index: number) => index >= active);
                    needDelete.forEach((item: any) => dropScope(item.keepAliveName));
                    dispatch({ type: "CHANGESTATE", payload: { tabList: needUpdate, active: 0, tarnslateX: 0 } })
                    break;
                }
                case "closeRight": {
                    const needDelete = localTablist.filter((item: any, index: number) => index > active);
                    const needUpdate = localTablist.filter((item: any, index: number) => index <= active);
                    needDelete.forEach((item: any) => dropScope(item.keepAliveName));
                    dispatch({ type: "CHANGESTATE", payload: { tabList: needUpdate, tarnslateX: 0 } })
                    break;
                }
            }

        }}>
            <Menu.Item key="closeCurrent">关闭当前标签</Menu.Item>
            <Menu.Item key="closeOther">关闭其他标签</Menu.Item>
            <Menu.Item key="closeAll">关闭全部标签</Menu.Item>
            <Menu.Item key="closeLeft" disabled={active === 0}>关闭当前左边标签</Menu.Item>
            <Menu.Item key="closeRight" disabled={active === tabList.length - 1}>关闭当前右边标签</Menu.Item>
        </Menu>
    );



    useEffect(() => {

        window.onresize = () => {
            const width = document.getElementById("contentContainer") ? document.getElementById("contentContainer")!.getBoundingClientRect()!.width : 0;
            dispatch({ type: "CHANGESTATE", payload: { tabsWidth: width, tarnslateX: 0 } })
        }

        const timer = setTimeout(() => {
            const width = document.getElementById("contentContainer") ? document.getElementById("contentContainer")!.getBoundingClientRect()!.width : 0;
            dispatch({ type: "CHANGESTATE", payload: { tabsWidth: width } })
        }, 100);
        return () => {
            clearTimeout(timer)
        }
    }, [collapsed])


    useEffect(() => {
        const timer = setTimeout(() => {
            // 需要重新计算拿到当前tab的宽度
            const itemWidth = document.getElementsByClassName("link-tab")[0] ? document.getElementsByClassName("link-tab")[0]!.getBoundingClientRect().width : 120;
            //计算一排能展示多少个tab 需要减去操作占用的空间100
            const isShowTabs = Math.ceil((tabsWidth as number - 100) / itemWidth);
            if (itemWidth > 0 && tabWidth > 0) {
                dispatch({ type: "CHANGESTATE", payload: { showTabs: isShowTabs, tabWidth: itemWidth } })
            }
        }, 100);
        return () => {
            clearTimeout(timer)
        }
    }, [tabsWidth])



    return (
        // <div className={styles.tabs} style={{ width: initialState?.collapsed ? "calc(100vw - 41px)" : "calc(100vw - 249px)" }}>
        <div className={styles.tabs} id="contentContainer">
            {tabList.length > 0 && <SortableList onSortEnd={onSortEnd} axis={'x'} distance={1} />}
            <div className={`${styles.tabLeftMenu}  ${tabList.length >= showTabs && styles.boxShadow}`}>
                {
                    tabList.length > showTabs && (
                        <>
                            <Dropdown overlay={menuMore} className={styles.tabMore}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <MoreOutlined />
                                </a>
                            </Dropdown>
                            <Divider type='vertical' />
                        </>
                    )
                }
                {
                    tabList.length > 1 && (
                        <Dropdown overlay={menu} className={styles.menuRight}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                操作 <DownOutlined />
                            </a>
                        </Dropdown>
                    )
                }

            </div>

        </div>
    );
}

export default KeepAliveTabs;
