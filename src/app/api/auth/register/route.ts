import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { d1First, d1Run } from '../../../lib/db';
import { v4 as uuidv4 } from 'uuid';
import { signToken } from '@/app/lib/auth';
import { registerSchema } from '@/app/lib/validators';
import { getNumberEnv } from '@/app/lib/utils';

// const registerSchema = z.object({
//   name: z.string().min(2),
//   email: z.email(),
//   password: z.string().min(6),
//   role: z.enum(['buyer', 'owner', 'admin']).default('buyer'),
// });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(`===>>> data :: ${JSON.stringify(data)}`)
    const parsed = registerSchema.parse(data);
    console.log(`===>>> parsed :: ${JSON.stringify(parsed)}`)

    // const db = getDB();
    // const existing = await db
    //   .prepare('SELECT * FROM users WHERE email = ?')
    //   .bind(parsed.email)
    //   .first();
    
    const existing = await d1First('SELECT * FROM users WHERE email = ? LIMIT 1', [parsed.email]);

    if (existing)
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });

    const hashed = await bcrypt.hash(parsed.password, 10);
    const id = uuidv4();
    // await db
    //   .prepare('INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)')
    //   .bind(id, parsed.name, parsed.email, hashed, parsed.role)
    //   .run();

    const result = await d1Run(
        'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)', 
        [id, parsed.name, parsed.email, hashed, parsed.role]);

    // TODO check if the user was really registered in the database
    // console.log("===>>> user saved");
    // console.log(`===>>> result :: ${JSON.stringify(result)}`);
    if(result === null || result.success !== true) {
      throw new Error("Something went wrong. The user was not registered");
    }

    let expSec = 7 * 24 * 60 * 60;
    if(process.env.TOKEN_EXP_SEC) {
      expSec = getNumberEnv(process.env.TOKEN_EXP_SEC, expSec);
    }
    
    const token = await signToken({
      userId: id,
      email: parsed.email,
      role: parsed.role,
    }, expSec);
    
    // const token = await new SignJWT({
    //   userId: id,
    //   email: parsed.email,
    //   role: parsed.role,
    // })
    //   .setProtectedHeader({ alg: 'HS256' })
    //   .setExpirationTime('7d')
    //   .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const res = NextResponse.json({
      success: true,
      user: { id: id, name: parsed.name, email: parsed.email, role: parsed.role },
    });
    // const res = NextResponse.json({ success: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: expSec,
    });
    return res;
  }  catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message || 'Invalid input' }, { status: 400 });
    } else if (typeof err === 'string') {
      console.error(`Caught string error: ${err}`);
      return NextResponse.json({ error: err || 'Invalid input' }, { status: 400 });
    } else {
      console.error("An unknown error occurred.");
      return NextResponse.json({ error: JSON.stringify(err) || 'Invalid input' }, { status: 400 });
    }
  }
  
  // catch (err: any) {
  //   return NextResponse.json({ error: err.message || 'Invalid input' }, { status: 400 });
  // }
}
