"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import AuthModal from "@/components/AuthModal";
import "@/app/styles/navbar.css";

export default function Navbar() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    return (
        <>
            <nav className='navbar'>
                <div className="logo-container">
                    <Image src="/assets/adv.jpg" alt="Logo" width={50} height={50} className="logo"/>
                    <h2>Legal Eagle</h2>
                </div>
                <div className='NavLinks'>
                    <Link href='/'>Home</Link>
                    <button onClick={() => openAuthModal("login")}>Login</button>
                    <button onClick={() => openAuthModal("register")}>Register</button>
                    <Link href='/dashboard'>Dashboard</Link>
                </div>
            </nav>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} mode={authMode} />
        </>
    );
}
