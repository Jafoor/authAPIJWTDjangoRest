"use client"

import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import {TbGridDots} from "react-icons/tb";

import './Navbar.scss';


const Navbar = () => {

    const [navbar, setNavbar] = useState("navbar");
    const [header, setHeader] = useState("header");

    const showNavbar = () => {
        setNavbar("navbar showNavbar")
    }

    const closeNavbar = () => {
        setNavbar("navbar");
    }

    const addBg = () => {
        if(window.scrollY >= 20){
            setHeader("header addBg")
        }else{
            setHeader("header")
        }
    }

    window.addEventListener("scroll", addBg);

  return (
    <div className={header}>
        <div className="logoDiv">
            <span className="logo">Quick Prep</span>
        </div>

        <div className={navbar}>
            <ul className="menu">
                <li onClick={closeNavbar} className="listItem">
                    <a href="/" className="link"> Used Cars</a>
                </li>

                <li onClick={closeNavbar} className="listItem">
                    <a href="/" className="link"> Used Cars</a>
                </li>

                <li onClick={closeNavbar} className="listItem">
                    <a href="/" className="link"> Used Cars</a>
                </li>

                <li onClick={closeNavbar} className="listItem">
                    <a href="/" className="link"> Used Cars</a>
                </li>
            </ul>
            <IoIosCloseCircle onClick={closeNavbar} className="icon closeIcon"/>
            
        </div>

        <div className="SignUp flex">
            <div className="text">
                Sign Up
            </div>
            <TbGridDots onClick={showNavbar} className="icon toggleNavbarIcon"/>
        </div>

    </div>

  )
}

export default Navbar
