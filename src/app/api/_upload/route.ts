// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// // import { uploadToR2, getR2PublicUrl } from '../../../../src/lib/r2';
// import { uploadToR2, getR2PublicUrl } from '../../lib/r2';

// export async function POST(req: Request) {
//   try {
//     const form = await req.formData();
//     const file = form.get('file') as File | null;
//     if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//     if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
//     if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'File too large' }, { status: 400 });

//     const key = `properties/${uuidv4()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
//     const buf = await file.arrayBuffer();

//     await uploadToR2(key, buf, file.type);
//     const url = getR2PublicUrl(key);

//     return NextResponse.json({ ok: true, key, url });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error(err.message);
//       return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
//     } else if (typeof err === 'string') {
//       console.error(`Caught string error: ${err}`);
//       return NextResponse.json({ error: err || 'Internal server error' },{ status: 500 });
//     } else {
//       console.error("An unknown error occurred.");
//       return NextResponse.json({ error: JSON.stringify(err) || 'Internal server error' },{ status: 500 });
//     }
//   }
  
  
//   // catch (err: any) {
//   //   return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
//   // }
// }
