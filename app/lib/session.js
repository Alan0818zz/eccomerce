import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const key = new TextEncoder().encode(process.env.JWT_SECRET)

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

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
        return null
    }
}

export async function createSession(userId) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({ userId, expires })

    const cookieStore = await cookies()
    cookieStore.set(cookie.name, session, {
        ...cookie.options,
        expires: expires,
    })
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(cookie.name)?.value
  const session = await decrypt(sessionCookie)
  if (!session?.userId) {
      // redirect('/login')
  }
  return { userId: session.userId }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(cookie.name)
  redirect('/login')
}