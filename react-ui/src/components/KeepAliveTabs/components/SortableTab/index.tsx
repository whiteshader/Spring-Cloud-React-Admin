/*
 * @Author: wangYe 
 * @Date: 2020-11-05 18:00:19 
 * @Last Modified by: WhiteShader
 * @Last Modified time: 2022-02-21 11:12:12
 */

import { SortableElement } from 'react-sortable-hoc';
import { CloseOutlined } from '@ant-design/icons';
import { useModel, useHistory, useAliveController } from 'umi'
import styles from './index.less';

interface ITab {
    value: {
        hash: string
        key: string
        title: string
        pathname: string
        query: Record<string, any>
        search: string
        state: any
        keepAliveName: string
    }
    // index: number
    tabIndex: number
}

const SortableTab = (props: ITab) => {
    const history = useHistory()
    const { value, tabIndex } = props;
    const { active, dispatch, tabWidth, tarnslateX, showTabs, tabsWidth, tabList } = useModel("system");
    const { dropScope } = useAliveController()
    const closable = tabList.length > 1
    return (
        <div
            className={`${styles.tabItem} link-tab ${tabIndex === active ? styles.active : ''}`}
            title={value.title}
            onClick={() => {
                // translate了 多少个
                const tarnsNumber = Math.floor(tarnslateX / tabWidth)
                // 隐藏了多少
                const isBeyondDistance = tarnslateX - tarnsNumber * tabWidth;
                if (tabIndex - tarnsNumber <= 0) {
                    dispatch({ type: 'CHANGESTATE', payload: { active: tabIndex, tarnslateX: tarnslateX - isBeyondDistance } })
                    history.push({ ...value })
                    return;
                }
                // 是否在可视区域内
                if ((tabIndex - tarnsNumber + 1) === showTabs) {
                    // 需要移动的距离计算
                    const x = (tabIndex + 1) * (tabWidth as number) - (tabsWidth - 100)
                    dispatch({ type: 'CHANGESTATE', payload: { active: tabIndex, tarnslateX: x } })
                    history.push({ ...value })
                    return;
                }
                dispatch({ type: 'CHANGESTATE', payload: { active: tabIndex } })
                history.push({ ...value })

            }}>
            {value.title}
            {
                closable && (
                    <div
                        className={styles.closeIcon}
                        onClick={(e) => {
                            e.stopPropagation()
                            const currentName = value.keepAliveName
                            // 如果关闭激活中的 KeepAlive Tab，需要先离开当前路由
                            // 触发 KeepAlive unactivated 后再进行 drop
                            const localTablist = JSON.parse(JSON.stringify(tabList))
                            localTablist.splice(tabIndex, 1)
                            let activeIndex: number = 0;
                            if (tabIndex < active) {
                                // 我在前面
                                activeIndex = active - 1;
                                dropScope(currentName)
                            } else if (tabIndex === active) {
                                // 点击后面当前窗口
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
                            } else {
                                activeIndex = active
                                dropScope(currentName)
                            }
                            dispatch({ type: "CHANGESTATE", payload: { tabList: localTablist, active: activeIndex, tarnslateX: 0 } })
                        }}>
                        <CloseOutlined />
                    </div>
                )
            }

        </div>
    );
}

export default SortableElement(SortableTab);
