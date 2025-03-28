// "use client";
// import { useState } from "react";
// import Link from 'next/link';
// import Image from 'next/image';
// import AuthModal from "@/components/AuthModal";
// import "@/app/styles/navbar.css";

// export default function Navbar() {
//     const [isAuthOpen, setIsAuthOpen] = useState(false);
//     const [authMode, setAuthMode] = useState("login");

//     const openAuthModal = (mode) => {
//         setAuthMode(mode);
//         setIsAuthOpen(true);
//     };

//     return (
//         <>
//             <nav className='navbar'>
//                 <div className="logo-container">
//                     <Image src="/assets/adv.jpg" alt="Logo" width={50} height={50} className="logo"/>
//                     <h2>Legal Eagle</h2>
//                 </div>
//                 <div className='NavLinks'>
//                     <Link href='/'>Home</Link>
//                     <button onClick={() => openAuthModal("login")}>Login</button>
//                     <button onClick={() => openAuthModal("register")}>Register</button>
//                     <Link href='/dashboard'>Dashboard</Link>
//                 </div>
//             </nav>
//             <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} mode={authMode} />
//         </>
//     );
// }


"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import AuthModal from "@/components/AuthModal";
import "@/app/styles/navbar.css";

export default function Navbar() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check local storage for an existing session (for persistence)
        const user = localStorage.getItem("user");
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear stored session
        setIsAuthenticated(false);
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setIsAuthOpen(false); // Close modal after login
        localStorage.setItem("user", "authenticated"); // Store session
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
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <button onClick={() => openAuthModal("login")}>Login</button>
                            <button onClick={() => openAuthModal("register")}>Register</button>
                        </>
                    )}
                    <Link href='/dashboard'>Dashboard</Link>
                </div>
            </nav>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} mode={authMode} onLoginSuccess={handleLoginSuccess} />
        </>
    );
}
