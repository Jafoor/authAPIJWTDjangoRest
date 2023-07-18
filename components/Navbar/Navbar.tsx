"use client";

import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import "./Navbar.scss";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const [navbar, setNavbar] = useState("navbar");
  const [header, setHeader] = useState("header");

  const showNavbar = () => {
    setNavbar("navbar showNavbar");
  };

  const closeNavbar = () => {
    setNavbar("navbar");
  };

  const addBg = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 20) {
        setHeader("header addBg");
      } else {
        setHeader("header");
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", addBg);
  }

  return (
    <div className={header}>
      <Link href="/">
      <div className="logoDiv">
        <span className="logo">Quick Prep</span>
      </div>
      </Link>
      

      <div className={navbar}>
        <ul className="menu">
          <li onClick={closeNavbar} className="listItem">
            <Link href="/" className="link">
              Resources
            </Link>
          </li>

          <li onClick={closeNavbar} className="listItem">
            <Link href="/" className="link">
              Test
            </Link>
          </li>

          <li onClick={closeNavbar} className="listItem">
            <Link href="/" className="link">
              Tech Interviews
            </Link>
          </li>
        </ul>
        <IoIosCloseCircle onClick={closeNavbar} className="icon closeIcon" />
      </div>

      {session && session.user ? (
        <div className="flex flex-row gap-2">
          <Image
            className="border-1 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto"
            src={session.user?.image as string}
            width={30}
            height={30}
            alt={session.user?.name as string ?? "Profile Pic"}
            priority={true}
          />
          <div className="SignUp flex" onClick={() => signOut()}>
            <div className="text">Sign Out</div>
            <TbGridDots onClick={showNavbar} className="icon toggleNavbarIcon" />
          </div>
        </div>
        
      ) : (
        <div className="SignUp flex" onClick={() => signIn()}>
          <div className="text">Sign In</div>
          <TbGridDots onClick={showNavbar} className="icon toggleNavbarIcon" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
