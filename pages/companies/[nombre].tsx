// import React, { useEffect, useState } from 'react';
// import { notFound } from 'next/navigation';
// import { useRouter } from 'next/router';
// import MenuNew from '../../components/MenuNew/MenúNew';
// import Layout from '../../components/Layout';

// export default function EmpresaPage({ params }: { params: { id: string } }) {
//     const router = useRouter();
//     const [data, setExcelData] = useState<any | undefined>();
//     const [namecompanies, setNameCompanies] = useState<any | undefined>();

//     useEffect(() => {
//         if (router.isReady) {
//             const nombre: any = router.query.nombre as string;

//             const fetchExcelData = async () => {
//                 const formData = {
//                     folder: nombre,
//                     file: `${nombre}.xlsx`,
//                 };
//                 setNameCompanies(nombre)
//                 try {
//                     const response = await fetch("/api/readFile", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(formData),
//                     });

//                     const result = await response.json();

//                     if (response.ok) {
//                         console.log("🚀 Datos obtenidos correctamente:", result?.data);
//                         setExcelData(result.data);
//                     } else {
//                         console.error("Error al obtener los datos:", result.error || result.message);
//                         router.push('/notfound'); // Redirige manualmente a una página de "No encontrado"
//                     }
//                 } catch (error) {
//                     console.error("🚀 ~ Error en fetchExcelData:", error);
//                     router.push('/notfound'); // Redirige si ocurre un error
//                 }
//             };

//             fetchExcelData();
//         }
//     }, [router.isReady, router.query.id, router.query.nombre]);

//     return (
//         <>
//             <Layout>

//                 <MenuNew
//                     menuItems={data}
//                     namecompanies={namecompanies}
//                 />

//             </Layout>

//         </>
//     );
// }




// import React, { useEffect, useState, useMemo } from 'react';
// import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';
// import Layout from '../../components/Layout';
// import { fetchData } from '../../servicesApi/fetch.services';
// import { useDispatch } from 'react-redux';
// import { setChExcelData } from '../../redux/slices/chExcelDataSlice';

// // Importación dinámica de MenuNew con una imagen de fondo mientras se carga
// const MenuNew = dynamic(() => import('../../components/MenuNew/MenúNew'), {
//     loading: () => (
//         <div
//             style={{
//                 height: '100vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundImage: `url('/imagesflama.png')`, // Cambia esta ruta por tu imagen real
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//             }}
//         >
//             <p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Cargando...</p>
//         </div>
//     ),
//     ssr: false,
// });

// export default function EmpresaPage({ params }: { params: { id: string } }) {
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [data, setExcelData] = useState<any | undefined>(undefined);
//     const [namecompanies, setNameCompanies] = useState<string | undefined>(undefined);
//     const [isLoaded, setIsLoaded] = useState(false); // Estado para manejar la animación

//     // Memoizar los datos de la empresa para evitar cambios innecesarios
//     const fetchExcelData = useMemo(() => {
//         return async (nombre: string) => {
//             const formData = {
//                 folder: nombre,
//                 file: `${nombre}.xlsx`,
//             };

//             try {
//                 const response = await fetchData(formData, 'POST', '/api/readFile');
//                 if (response.ok) {
//                     dispatch(setChExcelData(response));
//                     setExcelData(response?.data);
//                     setIsLoaded(true); // Activa el estado cuando los datos están listos
//                 } else {
//                     dispatch(
//                         setChExcelData({
//                             ok: false,
//                             data: null,
//                             error: response.error,
//                             message: response.message,
//                         })
//                     );
//                     console.error('Error al obtener los datos:', response.error || response.message);
//                     router.push('/notfound'); // Redirige a la página de "No encontrado"
//                 }
//             } catch (error) {
//                 console.error('Error en fetchExcelData:', error);
//                 router.push('/notfound'); // Redirige si ocurre un error
//             }
//         };
//     }, [dispatch, router]);

//     useEffect(() => {
//         if (router.isReady) {
//             const nombre = router.query.nombre as string;
//             setNameCompanies(nombre);
//             if (nombre && !data) {
//                 fetchExcelData(nombre); // Solo hace la petición si no hay datos previamente
//             }
//         }
//     }, [router.isReady, router.query.nombre, fetchExcelData, data]);

//     return (
//         <Layout>
//             <div className={isLoaded ? 'fade-in' : ''}>
//                 <MenuNew menuItems={data} namecompanies={namecompanies} />
//             </div>
//         </Layout>
//     );
// }

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { setChExcelData } from '../../redux/slices/chExcelDataSlice';
import { fetchData } from '../../servicesApi/fetch.services';

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
                const response = await fetchData(formData, 'POST', '/api/readFile');
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
