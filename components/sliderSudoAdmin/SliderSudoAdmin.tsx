import React, { useEffect, useState } from 'react';
import styles from './slider.module.css'; // Importa los estilos CSS
import { fetchData } from '../../servicesApi/fetch.services';
import { useRouter } from 'next/router';

const SliderSudoAdmin: React.FC = () => {


    const router = useRouter();
    const [data, setExcelData] = useState<any | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [urls, setUrls] = useState<string>();

    // Function to handle API calls
    const fetchDataAsync = async (url: string) => {

        try {
            const response = await fetchData('GET', url);
            console.log('🚀 ~ response:', response);

            if (response.ok) {
                setExcelData(response?.data);
                setIsLoaded(true);
                return response?.message || ""; // Return message if any
            } else {
                router.push('/notfound');
                return "Failed to fetch data"; // In case of an error
            }
        } catch (error) {
            console.error('Error in fetchDataAsync:', error);
            router.push('/notfound');
            return "An error occurred during fetching"; // In case of network error
        }
    };

    // Effect hook to load data on mount
    useEffect(() => {
        const loadInitialData = async () => {
            const initialMessage = await fetchDataAsync('/api/admin');
            setResponseMessage(initialMessage);
        };
        loadInitialData();
    }, [router]); // Run only once when router changes

    // Update DB handler
    const updateDB = async () => {
        const newMessage = await fetchDataAsync('/api/uploadgeneral');
        setResponseMessage(newMessage);
        await fetchDataAsync('/api/admin')
    };


    return (
        <div>
            <div className={styles.slider}>
                <div className={styles.buttonContainer}>

                    <ul >
                        <li>
                            <button className={styles.button} onClick={() => updateDB()}>
                                Update DB
                            </button>
                        </li>
                        <li>
                            <button className={styles.button} onClick={() => { /* Add reload DB logic */ }}>
                                Reload DB
                            </button>
                        </li>
                        <li>Opción 3</li>
                    </ul>
                </div>
                <div className={styles.container}>
                    Cantidad de empresas operando el sistema: {data ? data.length : 0}
                </div>
                <div className={styles.message}>
                    <p>{responseMessage || "Mensaje final del slider"}</p>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.messages}>
                    {responseMessage && <p>{responseMessage}</p>}
                </div>
            </div>
        </div>

    );
};

export default SliderSudoAdmin;