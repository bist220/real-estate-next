// "use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import LoginToggleButton from './LoginToggleButton';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import UserAvatar from './UserAvatar';
// import { useContext } from 'react';
// import { AuthContext } from '../auth-provider';

export default function Navbar() {

  // const {user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          RealEstate
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/property/new">List Property</Link>
          </Button>
          <LoginButton />
          {/* {(user || isAuthenticated) ? <LogoutButton /> : <></>}
          {(user) ? user.name : <></>} */}
          <LogoutButton />
          <UserAvatar />
          {/* TODO Delete Later */}
          {/* <LoginToggleButton /> */}
        </div>
      </div>
    </nav>
  );
}
