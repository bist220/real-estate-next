'use client';
// import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  // const router = useRouter();

  function change(lang: string) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => change('en')} className="px-2 py-1 border rounded">
        EN
      </button>
      <button onClick={() => change('hi')} className="px-2 py-1 border rounded">
        HI
      </button>
    </div>
  );
}
