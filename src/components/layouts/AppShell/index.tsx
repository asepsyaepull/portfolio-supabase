import React from 'react'
import NavbarMenu from '@/components/molecules/Navbar/navbarMenu'
import Footer from '@/components/molecules/Footer/footer';

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props:AppShellProps) => {
    const { children } = props;
  return (
    <div>
        <NavbarMenu />
        {children}
        <Footer />
    </div>
  )
}

export default AppShell