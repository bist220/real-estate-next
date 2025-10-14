// "use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import LoginToggleButton from './LoginToggleButton';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import UserAvatar from './UserAvatar';
import { getDictionary } from '../lib/dictionaries';
import LanguageSelector from './LanguageSelector';
// import { useContext } from 'react';
// import { AuthContext } from '../auth-provider';

export default async function Navbar({locale} : {locale: string}) {
  console.log(`===>>> Navbar:: `)
  const dict = await getDictionary(locale);
  // const {user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          {dict.app}
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/property/new">{dict.button.createProperty}</Link>
          </Button>
          <LoginButton name={dict.button.login}/>
          {/* {(user || isAuthenticated) ? <LogoutButton /> : <></>}
          {(user) ? user.name : <></>} */}
          <LogoutButton name={dict.button.logout}/>
          <UserAvatar />
          <LanguageSelector />
          {/* TODO Delete Later */}
          {/* <LoginToggleButton /> */}
        </div>
      </div>
    </nav>
  );
}
