import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const AUTH_COOKIE_NAME = '213'; /// заменить на вроде access token
const AUTH_PATHS = ['/auth/login', '/auth/registration'];
const DEFAULT_REDIRECT_PATH = '/';

export function middleware(request: NextRequest) {

    // console.log(`>>> Middleware triggered for path: ${request.nextUrl.pathname}`); можно включить для отладки

    const url = request.nextUrl.clone();
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isOnAuthPath = AUTH_PATHS.some(path => pathname.startsWith(path));

    // --- Логика АВТОРИЗОВАННЫХ пользователей ---
    if (authToken) {
        if (isOnAuthPath) {
            url.pathname = DEFAULT_REDIRECT_PATH;
            url.search = '';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
}
