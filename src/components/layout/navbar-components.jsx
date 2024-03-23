'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link'

import { CircleUser, UserRoundCog } from 'lucide-react'

export default function NavbarComponents({ role, page }) {
  // const isAdmin = role === 'admin';
  // const isOperator = role === 'operator';

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
  ];

  const pathname = usePathname();
  // console.log(pathname, 'routerr')

  return (
    <nav className="text-primary-foreground text-md">
      <ul className="flex items-center gap-4 rounded-full bg-primary p-1 mx-3 w-[30%]">
        {menuList.map(menu => {
          if (!menu.hidden) {
            return (
              <li className="nav-item p-1" key={menu.id}>
                <Link
                  className={`nav-link text-bg-primary flex align-items-center gap-2 ${pathname === menu.link ? 'text-success' : ''}`}
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