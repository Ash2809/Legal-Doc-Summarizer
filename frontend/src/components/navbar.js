import Link from 'next/link';
import "@/app/styles/navbar.css";

export default function Navbar() {
    return (
        <nav className='navbar'>
            <h2>Legal Document Summarizer</h2>
            <div className='NavLinks'>
                <Link href='/'>Home</Link>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Register</Link>
                <Link href='/dashboard'>Dashboard</Link>
            </div>
        </nav>
    );
}
