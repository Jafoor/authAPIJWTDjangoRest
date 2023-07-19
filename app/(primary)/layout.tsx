import React from 'react'

import Navbar1 from '@/components/Navbar/Navbar1';
import Footer from '@/components/Footer/Footer';

export default function MainLayout({ children }: {
    children: React.ReactNode
  }) {
  return (
    <>
    <Navbar1/>
    {children}
    <Footer/>
    </>
  )
}