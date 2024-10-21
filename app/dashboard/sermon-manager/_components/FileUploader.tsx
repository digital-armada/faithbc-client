// @ts-nocheck
"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const FileUploader = ({ allowedTypes, multiple = false, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const session = useSession();

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;
    const validFiles = [];
    let errorMessage = "";

    // Validate file types
    for (let i = 0; i < selectedFiles.length; i++) {
      const fileType = selectedFiles[i].type;
      if (allowedTypes.includes(fileType)) {
        validFiles.push(selectedFiles[i]);
      } else {
        errorMessage = `Invalid file type: ${selectedFiles[i].name}. Allowed types are: ${allowedTypes.join(", ")}`;
        break; // Stop checking after the first invalid file
      }
    }

    if (errorMessage) {
      setError(errorMessage);
      setFiles([]);
    } else {
      setError("");
      setFiles(validFiles);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    // Log the files array
    console.log("Files array:", files);

    // Check if files exist
    if (!files || files.length === 0) {
      console.log("No files selected");
      return;
    }

    // Log detailed information about each file
    files.forEach((file, index) => {
      console.log(`File ${index + 1} details:`, {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: new Date(file.lastModified).toLocaleString(),
      });
    });

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    // Log FormData (note: FormData cannot be directly console.logged)
    console.log("FormData entries:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Log authorization token (redacted for security)
    console.log("Authorization token present:", !!session?.data?.strapiToken);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`,
        {
          headers: { Authorization: `Bearer ${session?.data?.strapiToken}` },
          method: "POST",
          body: formData,
        },
      );

      // Log response status
      console.log("Upload response status:", response.status);

      const result = await response.json();
      console.log("Upload result:", result);

      onUpload(result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Upload failed:", {
        error: err,
        message: err.message,
        stack: err.stack,
      });
      setError("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
        accept={allowedTypes.join(",")} // Specify allowed types for the input
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleUpload}>Upload</button>
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUploader;
