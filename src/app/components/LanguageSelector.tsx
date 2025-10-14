// components/LanguageSelector.js
'use client'; // Mark as a Client Component

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LanguageCombobox } from './LanguageCombobox';

export default function LanguageSelector() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('en'); // Default locale

  useEffect(() => {
    // Read the 'NEXT_LOCALE' cookie on initial render
    const localeCookie = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='));
    if (localeCookie) {
      setCurrentLocale(localeCookie.split('=')[1]);
    }
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    console.log(`===>>> LanguageSelector :: newLocale :: ${newLocale}`);
    setCurrentLocale(newLocale);
    // Set the 'NEXT_LOCALE' cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    // Optionally, refresh the page to apply the new locale
    console.log(`===>>> LanguageSelector :: newLocale :: ${newLocale}`);
    router.refresh(); 
  };

  return (
    <LanguageCombobox onChange={handleLocaleChange} currentLocale={currentLocale}></LanguageCombobox>
    // <div>
    //   <select value={currentLocale} onChange={(e) => handleLocaleChange(e.target.value)}>
    //     <option value="en-US">English</option>
    //     <option value="hi-IN">Hindi</option>
    //     <option value="mr-IN">Marathi</option>
    //   </select>
    // </div>
  );
}