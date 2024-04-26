'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { useSession } from 'next-auth/react';

import { CircleUser, UserRoundCog, MonitorSmartphone, DiscAlbum, Computer} from 'lucide-react'

export default function NavbarComponents() {
  const {data: session, status} = useSession()
  // console.log(session, status, 'sss')
  const isAdmin = session?.user?.role === 'admin';
  const isOperator = session?.user?.role === 'operator';
  // console.log(isAdmin, isOperator)

  const menuList = [
    {
      id: 1,
      label: 'Account',
      link: '/accounts',
      icon: <CircleUser size={21} />,
      // hidden: isOperator,
    },
    {
      id: 2,
      label: 'Pre Accounts',
      link: '/pre-account',
      icon: <UserRoundCog size={20} />,
      // hidden: isOperator,
    },
    {
      id: 3,
      label: 'Device',
      link: '/device',
      icon: <MonitorSmartphone size={20} />,
      // hidden: isOperator,
    },
    {
      id: 4,
      label: 'Platform',
      link: '/platform',
      icon: <DiscAlbum size={20} />,
      // hidden: isOperator,
    },
    {
      id: 5,
      label: 'PC-List',
      link: '/minipc',
      icon: <Computer size={20} />,
      // hidden: isOperator,
    },
  ];

  const pathname = usePathname();
  // console.log(pathname, 'routerr')

  return (
    <nav className="text-primary-foreground text-md mt-3">
      <ul className="flex items-center gap-4 rounded-full bg-primary p-1 mx-3 px-3" style={{ display: 'inline-flex', padding: '0.5rem' }}>
        {menuList.map(menu => {
          if (!menu.hidden) {
            return (
              <li className="nav-item p-1" key={menu.id}>
                <Link
                  className={`nav-link text-bg-primary flex align-items-center gap-2 ${pathname === menu.link ? 'text-primary bg-success rounded-full p-2' : ''}`}
                  href={menu.link}
                >
                  {menu.icon}
                  {menu.label}
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
};