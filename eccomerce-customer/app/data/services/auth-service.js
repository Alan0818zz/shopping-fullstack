'use server'

import { register as apiRegister, login as apiLogin, getUserDetails} from '../../api/authapi'
import { createSession, deleteSession, checkAuth } from '../../lib/session'

export async function register(registerData) {
    try {
        const response = await apiRegister(registerData);
      
        if (response.status) {
          if (response.data?.id) {
            // 使用session替代原本的token處理
            await createSession(response.data.id);
          }
          return true;
        }
      
        console.error('註冊失敗:', response.message);
        return false;
    } catch (error) {
        console.error('註冊過程發生錯誤:', error);
        return false;
    }
}

export async function login(loginData) {
    try {
        const response = await apiLogin(loginData)
        
        if (response.status) {
          if (response.data?.email) {
            // 使用session替代原本的token處理
            await createSession(response.data.email);

          }
          return {
            success: true,
            data: response.data
          }
        }
        
        //console.error('登入失敗:', response.message)
        return {
          success: false,
          message: response.message
        }
    } catch (error) {
        console.error('登入過程發生錯誤:', error)
        return {
          success: false,
          message: '系統錯誤，請稍後再試'
        }
    }
}
// 添加檢查登入狀態的函數
export async function getCurrentUser() {
  const { isAuthenticated, userId } = await checkAuth()
  if (!isAuthenticated) {
    return {
      isAuthenticated: false,
      user: null
    }
  }
  try {
    const userDetails = await getUserDetails(userId)
    return {
      isAuthenticated: true,
      user: userDetails.data.name
    }
  } catch (error) {
    console.error('獲取用戶信息失敗:', error)
    return {
      isAuthenticated: false,
      user: { id: null }
    }
  }
}
// 登出
export async function logout() {
    try {
        await deleteSession();
        return {
            success: true
        }
    } catch (error) {
        console.error('登出過程發生錯誤:', error)
        return {
            success: false,
            message: '登出失敗，請稍後再試'
        }
    }
}