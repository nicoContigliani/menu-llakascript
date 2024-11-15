import { useState } from "react";

const FileUploadWithPicture = () => {
  const [file, setFile] = useState<File | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !picture) {
      setMessage("Please select both a file and a picture.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("picture", picture);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Success: ${result.message}`);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while uploading the files.");
    }
  };

  return (
    <div>
      <h1>Upload File and Picture</h1>
      <input type="file" onChange={handleFileChange} />
      <input type="file" onChange={handlePictureChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploadWithPicture;
