import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
// import { getDB } from '@/lib/db';
// import { z } from 'zod';
import { d1First } from '@/app/lib/db';
import User from '@/app/types/User';
import { loginSchema } from '@/app/lib/validators';
import { signToken } from '@/app/lib/auth';
import { getNumberEnv } from '@/app/lib/utils';

// const loginSchema = z.object({
//   email: z.email(),
//   password: z.string().min(1),
// });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = loginSchema.parse(data);

    // const db = getDB();
    // const user = await db
    //   .prepare('SELECT * FROM users WHERE email = ?')
    //   .bind(parsed.email)
    //   .first();

    const user = await d1First<User>('SELECT * FROM users WHERE email = ? LIMIT 1', [parsed.email]);

    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    const valid = await bcrypt.compare(parsed.password, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // const expSec = 7 * 24 * 60 * 60;
    let expSec = 7 * 24 * 60 * 60;
    if (process.env.TOKEN_EXP_SEC) {
      expSec = getNumberEnv(process.env.TOKEN_EXP_SEC, expSec);
    }
    
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    }, expSec);

    // const token = await new SignJWT({
    //   userId: user.id,
    //   email: user.email,
    //   role: user.role,
    // })
    //   .setProtectedHeader({ alg: 'HS256' })
    //   .setExpirationTime('7d')
    //   .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message || 'Invalid credentials' }, { status: 400 });
    } else if (typeof err === 'string') {
      console.error(`Caught string error: ${err}`);
      return NextResponse.json({ error: err || 'Invalid credentials' }, { status: 400 });
    } else {
      console.error("An unknown error occurred.");
      return NextResponse.json({ error: JSON.stringify(err) || 'Invalid credentials' }, { status: 400 });
    }
  }

  // catch (err: Error) {
  //   return NextResponse.json({ error: err.message || 'Invalid credentials' }, { status: 400 });
  // }
}
