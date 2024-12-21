'use server'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:80';

export async function register(registerData) {
  try {
    // console.log('Sending data:', registerData); // 添加這行來檢查
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    });
    console.log('Response:', response);
    const data = await response.json();
    
    return {
      status: response.ok,
      message: data.message || '',
      data: data.data
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: null
    };
  }
}

export async function login(loginData) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    // console.log(data);
    return {
      status: response.ok,
      message: data.message || '',
      data: data
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: null
    };
  }
}