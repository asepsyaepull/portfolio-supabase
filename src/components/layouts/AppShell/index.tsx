import NavbarMenu from '@/components/molecules/Navbar/navbarMenu'
import React from 'react'

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props:AppShellProps) => {
    const { children } = props;
  return (
    <div>
        <NavbarMenu />
        {children}
    </div>
  )
}

export default AppShell