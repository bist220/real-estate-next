import { verifyToken } from "@/app/lib/auth";
import { d1All } from "@/app/lib/db";
import { createProperty } from "@/app/lib/propertyDal";
import { propertyCreateSchema, propertyUpdateSchema } from "@/app/lib/validators";
import Property from "@/app/types/Property";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // const idOrSlug = params.id;

    const searchParams = req.nextUrl.searchParams
    // const query = searchParams.get('query')
    // const url = new URL(req.nextUrl);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const prefetchSize = parseInt(searchParams.get('prefetchSize') || '30'); // Prefetch 3 pages worth of data

    // const page = parseInt(params.page) || 1;
    // const pageSize = parseInt(params.pageSize) || 10;
    // const prefetchSize = parseInt(params.prefetchSize) || 30; // Prefetch 3 pages worth of data

    // const row = await d1All('SELECT * FROM properties LIMIT 5', []);
    // if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // if (row.images) {
    //     try {
    //         row.images = JSON.parse(row.images);
    //     } catch {
    //         row.images = [];
    //     }
    // }



    // const url = new URL(request.url);
    // const page = parseInt(url.searchParams.get('page')) || 1;
    // const pageSize = parseInt(url.searchParams.get('pageSize')) || 10;
    // const prefetchSize = parseInt(url.searchParams.get('prefetchSize')) || 30; // Prefetch 3 pages worth of data

    const offset = (page - 1) * pageSize;

    // Determine the start and end offset for the prefetch window
    const prefetchOffset = Math.max(0, offset); // Start from the current page's offset
    const prefetchLimit = prefetchSize;

    try {
        // Fetch a larger chunk of data using the prefetch strategy
        //   const { results } = await env.DB.prepare(
        //     `SELECT * FROM items ORDER BY id ASC LIMIT ? OFFSET ?`
        //   )
        //     .bind(prefetchLimit, prefetchOffset)
        //     .all();

        const results = await d1All('SELECT * FROM properties LIMIT ? OFFSET ?', [prefetchLimit, prefetchOffset]);
        console.log(`===>>> results :: ${JSON.stringify(results)}`)

        if (!results) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        // if (results.images) {
        //     try {
        //         results.images = JSON.parse(results.images);
        //     } catch {
        //         results.images = [];
        //     }
        // }

        // Simulate in-memory paging from the pre-fetched results
        const startIndex = offset - prefetchOffset;
        const endIndex = startIndex + pageSize;
        // let paginatedResults: Record<string, unknown>[] = [];
        // if (results) {
        //     paginatedResults = results.slice(startIndex, endIndex);
        // }

        const paginatedResults = results.slice(startIndex, endIndex);

        // You might also want to fetch the total count for full pagination UI
        // This can be done once and cached if the total count doesn't change frequently
        // const { results: countResult } = await env.DB.prepare(`SELECT COUNT(*) as total FROM items`).all();
        // const totalItems = countResult[0].total;

        return new Response(JSON.stringify({
            page,
            pageSize,
            data: paginatedResults,
            // totalItems: totalItems // Include if you fetch total count
        }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response('Internal Server Error', { status: 500 });
    }


    // return NextResponse.json({ property: row });
}

// const updateSchema = z.object({
//     slug: z.string().optional(),
//     name: z.string().min(1),
//     builder: z.string().min(1),
//     price: z.number().positive(),
//     location: z.string().min(1),
//     description: z.string().optional(),
//     images: z.string().optional(),
// });

// export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const auth = await verifyToken(token);
    if (!auth) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    // const id = (await params).id;

    // const db = getDB();

    // Verify ownership
    // const existing = await db
    //   .prepare('SELECT * FROM properties WHERE id = ?')
    //   .bind(params.id)
    //   .first();
    // const existing = await d1First<Property>('SELECT * FROM properties WHERE id = ? LIMIT 1', [id]);

    // const existing = await d1First<Property>('SELECT * FROM properties WHERE id = ? LIMIT 1', [id]);
    // if (!existing) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    // if (existing.owner_id !== auth.userId)
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json<Property>();
    const propertyDto = propertyCreateSchema.parse(body);

    // if(!body) {
    //     return NextResponse.json({ error: 'Property already exists' }, { status: 409 });
    // }
    
    // if(propertyDto.id) {
    //     const existing = await d1First<Property>('SELECT * FROM properties WHERE id = ? LIMIT 1', [propertyDto.id]);
    //     if (!existing) return NextResponse.json({ error: 'Property already exists' }, { status: 409 });
    // }
    
    // if (propertyDto.slug) {
    //     const existing = await d1First<Property>('SELECT id FROM properties WHERE slug = ? LIMIT 1', [propertyDto.slug]);
    //     if (!existing) return NextResponse.json({ error: 'Property already exists with the provided slug' }, { status: 409 });
    // }

    await createProperty(propertyDto, auth.userId);

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