"use client";

import React from 'react'
import NavbarMenu from '@/components/molecules/Navbar/navbarMenu'
import Footer from '@/components/molecules/Footer/footer';
import { usePathname } from 'next/navigation';

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props:AppShellProps) => {
    const { children } = props;
    const pathname = usePathname();

    // Check if current route is an admin or login route
    const isAdminOrLogin = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  return (
    <div>
        {!isAdminOrLogin && <NavbarMenu />}
        {children}
        {!isAdminOrLogin && <Footer />}
    </div>
  )
}

export default AppShell