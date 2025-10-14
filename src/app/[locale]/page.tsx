import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import { PropertyList } from '../types/ResponseType';
import { Button } from '@/components/ui/button'
// import { getBaseUrl } from './lib/utils';
import { headers } from 'next/headers';
import { getDictionary } from '../lib/dictionaries';
import { LanguageType } from '../types/LocaleType';

async function getBaseUrl() {
  // Get protocol (http or https) and host from request headers
  const protocol = (await headers()).get('x-forwarded-proto') || 'http';
  const host = (await headers()).get('host');

  // In Cloudflare, ports are not usually needed for the final URL,
  // but this logic ensures it works correctly in other environments.
  return `${protocol}://${host}`;
}

async function getProperties() {
  console.log(`===>>> getProperties`);
  // console.log(`===>>> getProperties url :: ${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/properties`);
  const baseUrl = await getBaseUrl();
  console.log(`===>>> getProperties url :: ${baseUrl ?? 'http://localhost:3000'}/api/properties`);
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/properties`, { cache: 'no-store' });
  const res = await fetch(`${baseUrl ?? 'http://localhost:3000'}/api/properties`, { cache: 'no-store' });
  console.log("===>>> res :: " + JSON.stringify(res))
  console.log(`===>>> getProperties exit`);
  return res.json<PropertyList>();
}


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  console.log(`===>>> HomePage`)
  const { locale } = await params;
  console.log(`===>>> HomePage :: locale :: ${JSON.stringify(locale)}`)
  const props = await getProperties();
  const data = props.data

  // const intlLocale = new Intl.Locale(locale);
  // const language = intlLocale.language;

  const dict = await getDictionary(locale);

  // const props = {}
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{dict.homePage.title}</h1>
        <Button variant="outline" asChild>
          <Link href="/property/new">{dict.button.createProperty}</Link>
        </Button>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.length ? data.map((p) => <PropertyCard key={p.id} property={p} />) : <p>No properties yet.</p>}
      </div>
    </div>
  );
}