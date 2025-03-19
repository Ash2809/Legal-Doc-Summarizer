"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const text = "Welcome to Legal Doc Analyzer";
  const typingSpeed = 100; 
  const pauseBeforeRestart = 2000; 
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;

    function typeText() {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i)); 
        i++;
        setTimeout(typeText, typingSpeed);
      } else {
        setTimeout(() => {
          setDisplayText(""); 
          i = 0;
          typeText();
        }, pauseBeforeRestart);
      }
    }

    typeText(); 

    return () => setDisplayText("");
  }, []);

  return (
    <div className="home">
      <h1 className="typing-container">
        <span className="typing-text">{displayText}</span>
        <span className="cursor"></span> {}
      </h1>
      <p>Upload your documents for analysis.</p>
    </div>
  );
}
