import Link from 'next/link';
import Image from 'next/image';
import "@/app/styles/navbar.css";

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className="logo-container">
                <Image src="/assets/adv.jpg" alt="Logo" width={50} height={50} className="logo"/>
                <h2>Legal Eagle</h2>
            </div>
            <div className='NavLinks'>
                <Link href='/'>Home</Link>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Register</Link>
                <Link href='/dashboard'>Dashboard</Link>
            </div>
        </nav>
    );
}
