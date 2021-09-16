// import React from 'react';
// import  RunTimeLayoutConfig from '@ant-design/pro-layout';
// export const layout: RunTimeLayoutConfig = ({ initialState }) => {
//   return {
//     menu: {
//       // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
//       params: {
//         userId: initialState?.currentUser?.userid,
//       },
//       request: async (params, defaultMenuData) => {
//         // initialState.currentUser 中包含了所有用户信息
//         const menuData = await fetchMenuData();
//         return menuData;
//       },
//     },
//   };
// };

export async function getInitialState() {    
    console.log('get init state')
    return {};
  }