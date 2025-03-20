"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const text = "Welcome to Legal Eagle";
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

  const legalDocs = [
    { title: "Contracts", desc: "Legally binding agreements between two or more parties." },
    { title: "Agreements", desc: "Mutual understandings outlining obligations and responsibilities." },
    { title: "NDAs", desc: "Non-Disclosure Agreements protect confidential information." },
    { title: "Court Filings", desc: "Official legal documents submitted for legal proceedings." },
    { title: "Legal Notices", desc: "Formal notifications regarding legal obligations or actions." },
    { title: "Wills & Trusts", desc: "Documents detailing asset distribution after death." },
    { title: "Patents", desc: "Legal rights granting inventors exclusive ownership of innovations." },
    { title: "Business Agreements", desc: "Contracts between companies regarding partnerships or deals." },
    { title: "Employment Contracts", desc: "Agreements outlining terms of employment." },
    { title: "Privacy Policies", desc: "Legal statements describing data collection and usage practices." },
    { title: "Loan Agreements", desc: "Documents detailing terms and conditions for borrowed money." },
    { title: "Divorce Settlements", desc: "Legal agreements determining asset and custody divisions." },
    { title: "Property Deeds", desc: "Legal documents proving ownership of land or real estate." },
    { title: "Trademark Registrations", desc: "Documents securing exclusive rights to brand names or logos." }
  ];

  return (
    <div className="home">
      <h1 className="typing-container">
        <span className="typing-text">{displayText}</span>
        <span className="cursor"></span>
      </h1>
      <p>Upload your legal documents for analysis.</p>

      <div className="legal-doc-container">
        <div className="moving-band">
          {[...legalDocs, ...legalDocs].map((doc, index) => (
            <div className="legal-doc" key={index}>
              <h3>{doc.title}</h3>
              <p>{doc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
