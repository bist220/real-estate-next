import './globals.css';
import React from 'react';
import Navbar from './components/Navbar';
import AuthProvider from './auth-provider';


export const metadata = {
  title: 'RealEstate',
  description: 'Property listings — demo'
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log(`===>>> RootLayout`)
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}