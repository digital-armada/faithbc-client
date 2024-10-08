// @ts-nocheck
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const FileUploader = ({ allowedTypes, multiple = false, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

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
    if (files.length === 0) return;

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`,
        {
          headers: { Authorization: `Bearer ${session?.data?.strapiToken}` },

          method: "POST",
          body: formData,
        },
      );
      const result = await response.json();
      onUpload(result);
    } catch (err) {
      console.error("Upload failed:", err);
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
    </div>
  );
};

export default FileUploader;
