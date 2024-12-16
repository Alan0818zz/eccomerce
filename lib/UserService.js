'use server'
import { cookies } from 'next/headers'
import { register as apiRegister, login as apiLogin } from '../app/api/authapi'

export async function register(registerData) {
    try {
        // 先檢查數據
        // console.log('UserService received data:', registerData);
      const response = await apiRegister(registerData);
      
      if (response.status) {
        if (response.data?.token) {
          cookies().set('token', response.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 7天
          });
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
    const response = await apiLogin(loginData);
    
    if (response.status) {
      if (response.data?.token) {
        cookies().set('token', response.data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7
        });
      }
      return true;
    }
    
    console.error('登入失敗:', response.message);
    return false;
  } catch (error) {
    console.error('登入過程發生錯誤:', error);
    return false;
  }
}