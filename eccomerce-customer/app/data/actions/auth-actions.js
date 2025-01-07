'use server'
import { register , login , logout } from '@/app/data/services/auth-service'
import { SignupFormSchema } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'
export async function signup(state,formData) {
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors
      };
    }
   
  const registerData = {
  
    name: validatedFields.data.name,    // varchar
    member_status: 0,                   // integer, not null, 預設 0 停用
    phone: validatedFields.data.phone,  // varchar, unique, not null
    email: validatedFields.data.email, // varchar, unique, not null
    verified: 0,                       // integer, not null, 預設 0 未驗證
    permission: 1,                    // integer, not null, 預設 1 一般會員
    register_date: new Date().toISOString(),   // timestamp, not null
    password:validatedFields.data.password            // varchar, not null
  };

  const success = await register(registerData);
  
  if (!success) {
    return {
      //errors: validatedFields.error.flatten().fieldErrors,
      error: '註冊失敗，請稍後再試'
    };
  }

  return { success: true };
}
export async function loginAction(prevState, formData) {
   
    try {
      // 表單驗證
      const email = formData.get('email');
      const password = formData.get('password');
      
      if (!email || !password) {
        return {
          success: false,
          error: '請填寫完整的登入資訊'
        }
      }
      const loginData = {
        email: email,
        password: password
      }
      const result = await login(loginData);
      
      if (!result.success) {
        return {
          success: false,
          error: result.message || '登入失敗，請檢查帳號密碼是否正確'
        }
      }
      return { success: true };
    } catch (error) {
      console.error('登入錯誤:', error);
      return {
        success: false,
        error: '系統發生錯誤，請稍後再試'
      }
    }
  }
// export async function loginAction(prevState, formData) {
//     // 驗證表單數據
//     // const validatedFields = LoginFormSchema.safeParse({
//     //   identifier: formData.get('identifier'),
//     //   password: formData.get('password')
//     // })
//     const email= formData.get('email');
//     const password = formData.get('password');
//     // if (!validatedFields.success) {
//     //   return {
//     //     success: false,
//     //     errors: validatedFields.error.flatten().fieldErrors
//     //   }
//     // }
  
//     const loginData = {
//       identifier: email,
//       password: password
//     }
  
//     const result = await login(loginData)
  
//     if (!result.success) {
//       return {
//         success: false,
//         error: result.message || '登入失敗，請檢查帳號密碼是否正確'
//       }
//     }
  
//     redirect('/')
//     //return { success: true }
//   }
//   export async function logoutAction() {
//     logout();
//     redirect("/");
//   }