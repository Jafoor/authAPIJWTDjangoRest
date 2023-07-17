import React from 'react'

import Navbar1 from '@/components/Navbar/Navbar1';

export default function MainLayout({ children }: {
    children: React.ReactNode
  }) {
  return (
    <>
    <Navbar1/>
    {children}
    </>
  )
}