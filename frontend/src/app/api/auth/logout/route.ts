import { NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'token';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request): Promise<NextResponse> {
    try {
        const response = NextResponse.json(
            { success: true, message: 'Successfully logged out' },
            { status: 200 }
        );

        response.cookies.delete(AUTH_COOKIE_NAME);

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ success: false, message: 'Logout failed' }, { status: 500 });
    }
}