import { NextRequest, NextResponse } from 'next/server';
// import { getDB } from '@/lib/db';
import { d1First } from '../../../../lib/db';
// import { verifyAuth } from '@/lib/auth';
import { verifyToken } from '../../../../lib/auth';
import Property from '@/app/types/Property';
import { updateProperty } from '@/app/lib/propertyDal';
import { propertyUpdateSchema } from '@/app/lib/validators';



// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const auth = await verifyToken(token);
    if (!auth) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const id = (await params).id;

    // const db = getDB();

    // Verify ownership
    // const existing = await db
    //   .prepare('SELECT * FROM properties WHERE id = ?')
    //   .bind(params.id)
    //   .first();
    const existing = await d1First<Property>('SELECT * FROM properties WHERE id = ? LIMIT 1', [id]);
    if (!existing) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    if (existing.owner_id !== auth.userId)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json<Property>();
    const propertyDto = propertyUpdateSchema.parse(body);

    // const body = await req.json();
    await updateProperty(propertyDto, id);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message || 'Internal server error' },{ status: 500 });
    } else if (typeof err === 'string') {
      console.error(`Caught string error: ${err}`);
      return NextResponse.json({ error: err || 'Internal server error' },{ status: 500 });
    } else {
      console.error("An unknown error occurred.");
      return NextResponse.json({ error: JSON.stringify(err) || 'Internal server error' },{ status: 500 });
    }
  }
    
  // catch (err: any) {
  //   console.error('Update property error:', err);
  //   return NextResponse.json({ error: err.message || 'Internal server error' },{ status: 500 });
  // }
}


