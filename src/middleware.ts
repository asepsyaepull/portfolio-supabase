import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = request.nextUrl.pathname === '/login'

  if (!isAdminRoute && !isLoginRoute) {
    return NextResponse.next()
  }

  // Check session via cookie — lightweight, no DB import
  const token = request.cookies.get('session_token')?.value

  if (isAdminRoute && !token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // For logged-in users hitting /login → redirect to /admin
  if (isLoginRoute && token) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
