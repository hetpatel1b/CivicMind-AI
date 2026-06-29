import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Updates the Supabase session securely at the edge and enforces routing rules.
 * Automatically refreshes expired authentication tokens.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Define protected routes that require an active session
  const protectedRoutes = ['/dashboard', '/feed', '/report', '/map', '/profile', '/admin'];
  // But /admin/login and /admin/register should NOT be protected (they are auth pages)
  const isAuthRoute = request.nextUrl.pathname === '/login' || 
                      request.nextUrl.pathname === '/register' ||
                      request.nextUrl.pathname === '/admin/login' ||
                      request.nextUrl.pathname === '/admin/register';

  // Securely retrieve the user from the Supabase session
  const { data: { user } } = await supabase.auth.getUser();

  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && !isAuthRoute;

  // Redirect unauthenticated users to the login page
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    // If they were trying to access an admin page, redirect to admin login
    if (request.nextUrl.pathname.startsWith('/admin')) {
      url.pathname = '/admin/login';
    } else {
      url.pathname = '/login';
    }
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages to the dashboard or admin dashboard
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    // We don't check roles in edge middleware for performance/simplicity,
    // so we just route them to their likely destination. Server components will handle strict RBAC.
    if (request.nextUrl.pathname.startsWith('/admin')) {
      url.pathname = '/admin';
    } else {
      url.pathname = '/dashboard';
    }
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
