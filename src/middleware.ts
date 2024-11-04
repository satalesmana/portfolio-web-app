import type { NextRequest } from 'next/server'
import {  NextResponse } from 'next/server'

const protectedRoutes = ['/admin']

export default async function middleware(req: NextRequest) {
    const cookie = req.cookies.get('auth-session')
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)

    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}