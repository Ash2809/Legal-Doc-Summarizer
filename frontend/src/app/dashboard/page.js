"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Background from "@/components/background";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import "../styles/upload.css";

export default function Upload() {
    const [files, setFiles] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle file drop
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            alert("Invalid file! Only PDF or images under 5MB are allowed.");
            return;
        }

        const file = acceptedFiles[0];
        setFiles([
            Object.assign(file, {
                preview: URL.createObjectURL(file), // Generate preview URL
            }),
        ]);
        setResult(null); // Reset previous result
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [], "application/pdf": [] },
        multiple: false,
        maxSize: 5 * 1024 * 1024, // 5MB limit
    });

    // Function to upload file
    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }

        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);

        const endpoint = file.type.includes("pdf")
        ? "http://localhost:8000/process_pdf/"
        : "http://localhost:8000/process_image/";


        try {
            setLoading(true);
            const response = await axios.post(endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(response.data);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload">
            <Navbar />
            <Background />
            <h1>Upload & Analyze Your Legal Documents</h1>

            {/* Dropzone Area */}
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <FiUploadCloud size={50} color="#fff" className="upload-icon" />
                <p className="upload-text">
                    {isDragActive ? "Drop your file here..." : "Drag & Drop a file, or Click to Upload"}
                </p>
                <p className="file-info">Accepted: PDF, Images (Max: 5MB)</p>
            </div>

            {/* Preview Section */}
            <div className="preview-container">
                {files.length > 0 && (
                    <div className="preview fade-in">
                        {files[0].type.includes("pdf") ? (
                            <div className="pdf-preview">
                                <AiOutlineFilePdf size={50} color="red" />
                                <p>{files[0].name}</p>
                            </div>
                        ) : (
                            <img src={files[0].preview} alt={files[0].name} className="preview-img" />
                        )}
                    </div>
                )}
            </div>

            {/* Upload Button */}
            <button className="upload-btn" onClick={handleUpload} disabled={loading}>
                {loading ? (
                    <>
                        <FaSpinner className="spinner" />
                        Processing...
                    </>
                ) : (
                    "Upload & Analyze"
                )}
            </button>

            {/* Processing Animation */}
            {loading && (
                <div className="loading-animation">
                    <FaSpinner className="spinner large" />
                    <p>Analyzing document... Please wait.</p>
                </div>
            )}

            {/* Display Results */}
            {result && (
                <div className="result-container fade-in">
                    <h2>Extracted Text:</h2>
                    <p>{result.extracted_text}</p>
                    <h2>Summary:</h2>
                    <p>{result.summary}</p>
                </div>
            )}

        </div>
    );
}
