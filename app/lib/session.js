import 'server-only'
import {SignJWT , jwtVerify} from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const key = new TextEncoder().encode(process.env.JWT_SECRET)
import { jwtDecode, JwtPayload } from 'jwt-decode';
const cookie = {
    name: 'session',
    options: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    },
    duration: 60 * 60 * 24 * 1000,
}
export async function encrypt(payload){
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}
export async function decrypt(session) {
    try {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      })
      return payload
    } catch (error) {
      console.log('Failed to verify session')
    }
  }
export async function createSession(userId) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({userId, expires})

  // 3. Store the session in cookies for optimistic auth checks
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
  redirect('/dashboard')
}
export async function getSession() {
  const cookie = cookies().get(cookie.name)?.value
  const session = await decrypt(cookie)
  if (!session?.userId) {
    redirect('/login')
  }
  return {userId: session.userId}
}
export async function deleteSession() {
  cookies().delete(cookie.name)
  redirect('/login')
}
