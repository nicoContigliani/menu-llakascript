import { useState } from "react";

const FileUploadWithMultiplePictures = () => {
    const [file, setFile] = useState<File | null>(null);
    const [pictures, setPictures] = useState<File[]>([]);
    const [message, setMessage] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handlePicturesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setPictures(Array.from(event.target.files));
        }
    };

    const handleUpload = async () => {
        if (!file || pictures.length === 0) {
            setMessage("Por favor selecciona un archivo y al menos una imagen.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        pictures.forEach((picture) => formData.append("pictures", picture));

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Éxito: ${result.message}`);
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage("Ocurrió un error al subir los archivos.");
        }
    };

    const isFormValid = file !== null && pictures.length > 0; // Validación del formulario

    return (
        <div>
            <h1>Subir archivo y múltiples imágenes</h1>
            <input 
                type="file" 
                name="file" 
                onChange={handleFileChange} 
            />
            {file === null && <p style={{ color: "red" }}>Por favor selecciona un archivo principal.</p>}
            <br />
            <input 
                type="file" 
                name="pictures" 
                multiple 
                onChange={handlePicturesChange} 
            />
            {pictures.length === 0 && <p style={{ color: "red" }}>Por favor selecciona al menos una imagen.</p>}
            <br />
            <hr />
            <button 
                onClick={handleUpload} 
                disabled={!isFormValid} // Botón deshabilitado si el formulario no es válido
            >
                Subir
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUploadWithMultiplePictures;
