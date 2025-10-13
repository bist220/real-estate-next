import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import JwtTokenPayload from '../types/JwtTokenPayload';

const SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';
const encoder = new TextEncoder();
const secretKey = encoder.encode(SECRET);


export async function hashPassword(plain: string) {
    return bcrypt.hashSync(plain, 10);
}


export async function verifyPassword(plain: string, hash: string) {
    return bcrypt.compareSync(plain, hash);
}


// export async function signToken(payload: object, expSec = 3600) {
export async function signToken(payload: JWTPayload, expSec: number = 3600) {
    // return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(`${expSec}s`).sign(secretKey as any);
    return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(`${expSec}s`).sign(secretKey);
}

const isJwtTokenPayload = (payload: unknown): payload is JwtTokenPayload => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'userId' in payload && typeof payload.userId === 'string' &&
    'email' in payload && typeof payload.email === 'string' &&
    'role' in payload && typeof payload.role === 'string' &&
    // 'iat' in payload && typeof payload.iat === 'number' &&
    'exp' in payload && typeof payload.exp === 'number'
  );
};

export async function verifyToken(token: string) {
    // const { payload } = await jwtVerify(token, secretKey as any);
    const { payload } = await jwtVerify(token, secretKey);
    if (isJwtTokenPayload(payload)) {
       return payload;
    } 
    // else {
    //     throw new Error('Invalid JWT payload format.');
    // }
    console.error('Invalid JWT payload format.');
    return;
    // return payload as unknown as JwtTokenPayload;
}


// export function getTokenFromHeader(req: Request) {
//     const h = req.headers.get('authorization') || '';
//     if (h.startsWith('Bearer ')) return h.slice(7);
//     const cookie = req.headers.get('cookie') || '';
//     const m = cookie.match(/token=([^;]+)/);
//     return m ? m[1] : null;
// }


// export async function requireAuth(req: Request, roles?: string[]) {
//     const token = getTokenFromHeader(req);
//     if (!token) throw new Error('UNAUTHORIZED');
//     const payload = await verifyToken(token);
//     if (roles && roles.length && !roles.includes(payload.role)) throw new Error('FORBIDDEN');
//     return payload;
// }

export async function requireAuth(roles?: string[]) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    // const token = getTokenFromHeader(req);
    if (!token || !token.value) throw new Error('UNAUTHORIZED');
    const payload = await verifyToken(token.value);
    if (payload && roles && roles.length && !roles.includes(payload.role)) throw new Error('FORBIDDEN');
    return payload;
}