"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import "@/app/styles/authModal.css";

export default function AuthModal({ isOpen, onClose, mode }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    if (!isOpen) return null;

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (mode === "login") {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Login Successful!");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Registration Successful!");
            }
            onClose(); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{mode === "login" ? "Login" : "Register"}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleAuth}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
                </form>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
        </div>
    );
}
