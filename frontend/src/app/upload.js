"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Background from "@/components/background";

export default function Upload(){
    return (
        <div className="upload">
            <Navbar />
            <Background />
            <h1>Upload your legal documents for analysis.</h1>
            <Footer />
        </div>
    );
}