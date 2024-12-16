'use server'
import { register } from '@/lib/UserService'
import { SignupFormSchema } from '../lib/definitions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export async function signup(state,formData) {
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
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
    id: crypto.randomUUID(), // 生成一個 UUID,
    name: validatedFields.data.name,    // varchar
    member_status: 0,                   // integer, not null, 預設 0 停用
    phone: "09090909090",                   // varchar, unique, not null
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

// 'use server'
// import { SignupFormSchema } from '../lib/definitions'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

// export async function signup(state, formData) {
//   // 驗證表單數據
//   const validatedFields = SignupFormSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//   })

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }

//   try {
//     const nameParts = validatedFields.data.name.split(' ')
//     const user = {
//       firstName: nameParts[0],
//       lastName: nameParts[1] || '',
//       email: validatedFields.data.email,
//       password: validatedFields.data.password,
//     }

//     const response = await fetch('http://localhost:3000/api/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     })

//     const data = await response.json()
    
//     if (!response.ok) {
//       console.error('註冊失敗:', data)
//       return {
//         errors: {
//           _form: data.error || '註冊失敗，請稍後再試'
//         }
//       }
//     }

//     // 設置 cookies
//     cookies().set('userId', data.userId, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 7 // 7 天
//     })

//     // 註冊成功後重定向到首頁或儀表板
//     redirect('/')
    
//     return { success: true }
//   } catch (error) {
//     console.error('Signup error:', error)
//     return {
//       errors: {
//         _form: '註冊失敗，請稍後再試'
//       }
//     }
//   }
// }

// export async function logout() {
//   // 清除 cookie
//   cookies().delete('userId')
//   redirect('/login')
// }