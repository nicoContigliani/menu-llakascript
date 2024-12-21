import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import { fetchData } from '../../servicesApi/fetch.services';
import { useDispatch } from 'react-redux';
import { setChExcelData } from '../../redux/slices/chExcelDataSlice';

// Importación dinámica de MenuNew con una imagen de fondo mientras se carga
const MenuNew = dynamic(() => import('../../components/MenuNew/MenúNew'), {
    loading: () => (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url('/imagesflama.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Cargando...</p>
        </div>
    ),
    ssr: false,
});

export async function getServerSideProps({ params }: { params: { nombre: string } }) {
    const { nombre } = params;

    if (!nombre) {
        return {
            redirect: {
                destination: '/notfound',
                permanent: false,
            },
        };
    }

    return {
        props: { nombre }, // Pasamos "nombre" como prop al componente
    };
}

export default function EmpresaPage({ nombre }: { nombre: string }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setExcelData] = useState<any | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchExcelData = useMemo(() => {
        return async (folder: string) => {
            const formData = {
                folder,
                file: `${folder}.xlsx`,
            };

            try {
                const response = await fetchData( 'POST', '/api/readFile',formData);
                console.log("🚀 ~ return ~ response:", response)
                if (response.ok) {
                    dispatch(setChExcelData(response));
                    setExcelData(response?.data);
                    setIsLoaded(true);
                } else {
                    dispatch(
                        setChExcelData({
                            ok: false,
                            data: null,
                            error: response.error,
                            message: response.message,
                        })
                    );
                    router.push('/notfound');
                }
            } catch (error) {
                console.error('Error en fetchExcelData:', error);
                router.push('/notfound');
            }
        };
    }, [dispatch, router]);

    useEffect(() => {
        if (nombre && !data) {
            fetchExcelData(nombre);
        }
    }, [nombre, data, fetchExcelData]);

    return (
        <Layout>
            <div className={isLoaded ? 'fade-in' : ''}>
                <MenuNew menuItems={data} namecompanies={nombre} />
            </div>
        </Layout>
    );
}
