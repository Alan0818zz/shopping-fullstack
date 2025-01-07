// 'use server'
// import { cookies } from 'next/headers'
// import { register as apiRegister, login as apiLogin } from '../app/api/authapi'
// import { createSession, deleteSession } from '@/lib/session'

// export async function register(registerData) {
//     try {
//         const response = await apiRegister(registerData);
      
//         if (response.status) {
//           if (response.data?.userId) {
//             // 使用session替代原本的token處理
//             await createSession(response.data.userId);
//           }
//           return true;
//         }
      
//         console.error('註冊失敗:', response.message);
//         return false;
//     } catch (error) {
//         console.error('註冊過程發生錯誤:', error);
//         return false;
//     }
// }

// export async function login(loginData) {
//     try {
//         const response = await apiLogin(loginData)
        
//         if (response.status) {
//           if (response.data?.userId) {
//             // 使用session替代原本的token處理
//             await createSession(response.data.userId);
//           }
//           return {
//             success: true,
//             data: response.data
//           }
//         }
        
//         console.error('登入失敗:', response.message)
//         return {
//           success: false,
//           message: response.message
//         }
//     } catch (error) {
//         console.error('登入過程發生錯誤:', error)
//         return {
//           success: false,
//           message: '系統錯誤，請稍後再試'
//         }
//     }
// }

// export async function logout() {
//     try {
//         await deleteSession();
//         return {
//             success: true
//         }
//     } catch (error) {
//         console.error('登出過程發生錯誤:', error)
//         return {
//             success: false,
//             message: '登出失敗，請稍後再試'
//         }
//     }
// }