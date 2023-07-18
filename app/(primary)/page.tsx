import Image from "next/image";
import Selection from "@/components/Selection/Selection";
import Testimonial from "@/components/Testimonial/Testimonial";
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Quick1 Dev Interview Preparation',
  description: 'Generated1 by create next app',
}

const Home = () => {
  return (
    <div>
      <Selection/>
      <Testimonial/>
    </div>
  )
}

export default Home
