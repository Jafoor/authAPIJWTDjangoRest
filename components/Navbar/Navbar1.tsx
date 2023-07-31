"use client";

import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import "./Navbar1.scss";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <Link href="/"> Web Dev Creative </Link>
        </div>
        <ul className="links">
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/resources">RESOURCE</Link>
          </li>
          <li>
            <Link href="/blogs">BLOG</Link>
          </li>
          <li>
            <Link href="/questions">INTERVIEW</Link>
          </li>
          {session && session.user?.isAdmin ? (
            <li>
              <Link href="/dashboard">DASHBOARD</Link>
            </li>
          ) : null}
        </ul>
        {session && session.user ? (
          <Link href="#" className="action_btn" onClick={() => signOut()}>
            {" "}
            Sign Out{" "}
          </Link>
        ) : (
          <Link href="#" className="action_btn" onClick={() => signIn()}>
            {" "}
            Get Started
          </Link>
        )}
        <div className="toggle_btn open">
          {open ? (
            <IoIosCloseCircle onClick={() => setOpen(false)} />
          ) : (
            <TbGridDots onClick={() => setOpen(true)} />
          )}
        </div>

        <div className={`dropdown_menu ${open ? "open" : ""}`}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/resources">RESOURCES</Link>
          </li>
          <li>
            <Link href="/interviews">INTERVIEWS</Link>
          </li>
          {session && session.user ? (
            <li>
              <Link href="#" className="action_btn" onClick={() => signOut()}>
                {" "}
                Sign Out{" "}
              </Link>
            </li>
          ) : (
            <li>
              <Link href="#" className="action_btn" onClick={() => signIn()}>
                {" "}
                Sign In{" "}
              </Link>
            </li>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
