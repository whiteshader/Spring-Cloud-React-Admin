
/*
 * @Author: wangYe 
 * @Date: 2020-11-06 16:11:41 
 * @Last Modified by: wangYe
 * @Last Modified time: 2020-12-18 14:58:53
 */

import { useReducer } from 'react';



interface InitialState {
    collapsed: boolean
    tabList: TabItem[]  // 所有的应有的点击过后的路由
    active: number   // 当前的路由的索引值
    showTabs: number  // 一行最多展示多少个tables
    tarnslateX: number // 转移的距离位置
    tabsWidth: number  //可视区域的总的宽度 
    tabWidth: number //一个tab的宽度cha
}


interface TabItem {
    hash: string
    key: string
    pathname: string
    title: string
    query: Record<string, any>
    search: string
    state: any
    keepAliveName: string
}

interface InitialStateType {
    collapsed?: boolean
    tabList?: TabItem[] // 所有的应有的点击过后的路由
    active?: number // 当前的路由的索引值
    showTabs?: number // 一行最多展示多少个tables
    tarnslateX?: number // 转移的距离位置
    tabsWidth?: number //可视区域的总的宽度 
    tabWidth?: number //一个tab的宽度
}

interface StateType extends InitialState {
    dispatch: React.Dispatch<{
        type: "CHANGESTATE";
        payload: InitialStateType;
    }>
}
export default function useSystem(): StateType {

    const initialState: InitialState = {
        collapsed: false, //菜单是否折叠
        tabList: [],
        active: 0,
        showTabs: 10,
        tarnslateX: 0,
        tabsWidth: 0,
        tabWidth: 120,
    }

    const reducer = (state: InitialState, { type, payload }: { type: "CHANGESTATE", payload: InitialStateType }) => {
        switch (type) {
            case "CHANGESTATE": {
                return { ...state, ...payload }
            }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    return { ...state, dispatch }
}