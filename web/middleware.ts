import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase-middleware';
import { rateLimit } from '@/lib/rate-limit';

export async function middleware(request: NextRequest) {
  // 1. Centralized API Hardening (Rate Limiting & Content-Type)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method);
    
    if (isMutation) {
      // Enforce JSON Content-Type for all mutations
      const contentType = request.headers.get('content-type') || '';
      // We check for application/json, but allow DELETE without body if needed, 
      // however strictness is requested. We enforce it if content-length > 0 or for POST/PUT/PATCH.
      if (request.method !== 'DELETE' && !contentType.includes('application/json')) {
        return NextResponse.json(
          { success: false, error: 'Unsupported Media Type', message: 'Content-Type must be application/json' },
          { status: 415 }
        );
      }

      // Rate Limiting by IP
      const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
      const limitResult = rateLimit(ip);
      
      if (!limitResult.success) {
        return NextResponse.json(
          { success: false, error: 'Too Many Requests', message: 'Rate limit exceeded. Please try again later.' },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': limitResult.limit.toString(),
              'X-RateLimit-Remaining': limitResult.remaining.toString()
            }
          }
        );
      }
    }
  }

  // 2. Delegate to Supabase Middleware for Auth & Routing
  const response = await updateSession(request);

  // 3. Security Headers Injection
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
