"use client";

import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import "./Navbar1.scss";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  return (
<header>
        <div className="navbar">
            <div className="logo">
                <a href="#"> Web Dev Creative </a>
            </div>
            <ul className="links">
                <li><a href="hero">HOME</a></li>
                <li><a href="hero">HOME</a></li>
                <li><a href="hero">LIST</a></li>
                <li><a href="hero">LIST</a></li>
            </ul>
            {session && session.user ? (
            <a href="#" className="action_btn" onClick={() => signOut()} > Sign Out </a>
            ) : (<a href="#" className="action_btn" onClick={() => signIn()} > Get Started</a>)}
            <div className="toggle_btn open">
                {open?
                <IoIosCloseCircle onClick={() => setOpen(false)}/> :
                <TbGridDots onClick={() => setOpen(true)}/>
                
                }
            
            </div>

            <div className={`dropdown_menu ${open ? "open" : ""}`}>
                <li><a href="hero">Resources</a></li>
                <li><a href="hero">HOME</a></li>
                <li><a href="hero">LIST</a></li>
                <li><a href="hero">LIST</a></li>
                {session && session.user ? (
                <li><a href="#" className="action_btn" onClick={() => signOut()}> Sign Out </a></li>
                ) : 
                ( <li><a href="#" className="action_btn" onClick={() => signIn()}> Sign In </a></li>)}
            </div>
        </div>
    </header>
  );
};

export default Navbar;
