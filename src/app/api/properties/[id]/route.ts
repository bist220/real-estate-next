import { NextResponse } from 'next/server';
// import { d1First, d1Run } from '../../../../src/lib/db';
import { d1First, d1Run } from '../../../lib/db';
import { v4 as uuidv4 } from 'uuid';
// import { requireAuth } from '../../../../src/lib/auth';
import { requireAuth } from '../../../lib/auth';
import Property from '@/app/types/Property';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  console.log(`===>>> id :: ${id}`);
  const property = await d1First<Property>('SELECT * FROM properties WHERE id = ? LIMIT 1', [id]);
  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // TODO images as an array or images as comma Separated string?
  // comma Separated string will be okay?
  // if (property.images) {
  //   try {
  //     property.images = JSON.parse(property.images);
  //   } catch {
  //     property.images = [];
  //   }
  // }
  return NextResponse.json({ property: property });
}

// TODO post method to show interest. move this into interest route's post method
// export async function POST(req: Request, { params }: { params: { id: string }}) {
//   try {
//     const auth = await requireAuth(['buyer', 'admin']);
//     if (!auth) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//     const id = (await params).id;
//     console.log(`===>>> id :: ${id}`);
//     const propertyId = await d1First<string>('SELECT id FROM properties WHERE id = ? LIMIT 1', [id]);
//     if (!propertyId) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
//     const body = await req.json();
//     const message = (body.message || '') as string;
//     const interestId = uuidv4();
//     await d1Run('INSERT INTO interests (id, property_id, user_id, message) VALUES (?, ?, ?, ?)', [interestId, propertyId, auth.sub, message]);
//     return NextResponse.json({ ok: true, id: interestId });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error(err.message);
//       return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
//     } else if (typeof err === 'string') {
//       console.error(`Caught string error: ${err}`);
//       return NextResponse.json({ error: err || String(err) }, { status: 500 });
//     } else {
//       console.error("An unknown error occurred.");
//       return NextResponse.json({ error: JSON.stringify(err) || String(err) }, { status: 500 });
//     }
//   }
  
  
//   // catch (err: any) {
//   //   return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
//   // }
// }
