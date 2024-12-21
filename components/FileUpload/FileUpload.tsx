import { useState, useRef, useEffect } from "react";
import styles from "./FileUpload.module.css";
import ButtonDownloadFile from "../ButtonDownloadFile/ButtonDownloadFile";
import useGeolocation from "../../hooks/useGeolocation";

const FileUploadWithMultiplePictures = ({ setDataqrs, dataqrs, nameCompaines, setNameCompaines }) => {
    const [file, setFile] = useState<File | null>(null);
    const [pictures, setPictures] = useState<File[]>([]);
    const [message, setMessage] = useState<string>("");

    const { location, error, requestLocation } = useGeolocation();

    useEffect(() => {
        requestLocation()
    }, [window])



    // Referencias para los inputs
    const fileInputRef = useRef<HTMLInputElement>(null);
    const picturesInputRef = useRef<HTMLInputElement>(null);

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
        formData.append('latitude', location.latitude.toString()); // Convierte a string
        formData.append('longitude', location.longitude.toString()); // Convierte a string
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Éxito: ${result.message}`);
                setDataqrs(result.dataqr);
                setNameCompaines(result.nameCompaines);
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage("Ocurrió un error al subir los archivos.");
        }
    };

    const isFormValid = file !== null && pictures.length > 0;

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.textContainer}>
                    <span className={styles.titleApp}>Descargar hoja de datos y modificar</span>
                </div>
                <div className={styles.buttonContainer}>
                    <ButtonDownloadFile
                        fileurl="/files/basic/LlakaScript.xlsx"
                        label="Descargar hoja de datos"
                    />
                    <ButtonDownloadFile
                        fileurl="/files/basic/LlakaScript.xlsx"
                        label="Manual de uso"
                    />
                </div>
            </div>

            <br /><br />
            <div>
                <div className={styles.textContainer}>
                    <h4 className={styles.titleApp}>Subir archivo y múltiples imágenes</h4>
                </div>

                {/* Botón para subir archivo principal */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className={styles.uploadButton}
                >
                    Seleccionar archivo principal
                </button>
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />
                {file === null && <p style={{ color: "red" }}>Por favor selecciona un archivo principal.</p>}

                {/* Botón para subir imágenes */}
                <button
                    onClick={() => picturesInputRef.current?.click()}
                    className={styles.uploadButton}
                >
                    Seleccionar imágenes
                </button>
                <input
                    type="file"
                    name="pictures"
                    multiple
                    onChange={handlePicturesChange}
                    ref={picturesInputRef}
                    style={{ display: "none" }}
                />
                {pictures.length === 0 && <p style={{ color: "red" }}>Por favor selecciona al menos una imagen.</p>}

                <hr />
                <div className={styles.buttonContainer}>
                    <button
                        onClick={handleUpload}
                        disabled={!isFormValid}
                        className={styles.buttonSend}
                    >
                        Subir
                    </button>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default FileUploadWithMultiplePictures;
