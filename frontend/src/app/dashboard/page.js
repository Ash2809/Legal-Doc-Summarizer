"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Background from "@/components/background";
import "../styles/upload.css";
 
export default function Upload() {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*,application/pdf", 
        multiple: true,
    });

    return (
        <div className="upload">
            <Navbar />
            <Background />
            <h1>Upload your legal documents for analysis.</h1>

            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here...</p>
                ) : (
                    <p>Drag & Drop files here, or click to select files</p>
                )}
            </div>

            <div className="preview-container">
                {files.map((file) => (
                    <div key={file.name} className="preview">
                        {file.type.includes("image") ? (
                            <img src={file.preview} alt={file.name} />
                        ) : (
                            <p>{file.name}</p>
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}
