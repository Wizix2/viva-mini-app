import { NextRequest, NextResponse } from 'next/server';

// Get the app version from environment variable or use current timestamp as fallback
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || Date.now().toString();

// Function to check if request is from Telegram WebApp
function isTelegram(request: NextRequest): boolean {
  // Check if URL contains tgWebApp parameter
  const url = request.nextUrl.toString();
  if (url.includes('tgWebApp')) {
    return true;
  }
  
  // Check user agent for Telegram WebView
  const userAgent = request.headers.get('user-agent') || '';
  return userAgent.includes('TelegramWebApp') || 
         userAgent.includes('Telegram') || 
         userAgent.includes('WebView');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Skip static files and other resources
  if (
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }
  
  // If it's a Telegram WebApp request and doesn't already have a version parameter
  if (isTelegram(request) && !request.nextUrl.searchParams.has('v')) {
    const url = request.nextUrl.clone();
    url.searchParams.set('v', APP_VERSION);
    
    // Preserve all existing query parameters
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure matcher to run middleware only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes (/api/*)
     * - Static files (images, js, css, etc.)
     * - _next/static (static files from Next.js)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
