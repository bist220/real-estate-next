import '../globals.css';
import React from 'react';
import Navbar from '../components/Navbar';
import AuthProvider from '../auth-provider';
import { getDictionary } from '../lib/dictionaries';


export const metadata = {
  title: 'RealEstate',
  description: 'Property listings — demo'
};


export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  console.log(`===>>> RootLayout`)
  const { locale } = await params
  // const dict = await getDictionary(locale);
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar locale={locale}/>
          <main className="min-h-screen bg-gray-50">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}