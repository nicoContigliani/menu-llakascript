// import React, { useEffect, useState } from 'react'
// import { notFound } from 'next/navigation'
// import { useRouter } from 'next/router'

// // Simulamos una base de datos de empresas
// const empresas = [
//     { id: 1, nombre: 'LlakaScript', descripcion: 'Descripción de la Empresa A' },
//     { id: 2, nombre: 'Empresa B', descripcion: 'Descripción de la Empresa B' },
//     { id: 3, nombre: 'Empresa C', descripcion: 'Descripción de la Empresa C' },
// ]

// export default function EmpresaPage({ params }: { params: { id: string } }) {
//     const router = useRouter()
//     const [empresa, setEmpresa] = useState<any | undefined>(undefined)
//     const [data, setExcelData] = useState<any | undefined>()

//     useEffect(() => {
//         if (router.isReady) {
//             const nombre = router.query.nombre as string

//             const fetchExcelData = async () => {

//                 const formData = {
//                     folder: nombre,
//                     file: `${nombre}.xlsx`,
//                 };

//                 try {
//                     const response = await fetch("/api/readFile", {
//                         method: "POST", // Cambiamos a POST
//                         headers: {
//                             "Content-Type": "application/json", // Indicamos JSON
//                         },
//                         body: JSON.stringify(formData), // Serializamos el body
//                     });

//                     const result = await response.json();

//                     if (response.ok) {
//                         console.log("🚀 Datos obtenidos correctamente:", result?.data);
//                         setExcelData(result.data); // Guarda los datos en el estado
//                     } else {

//                         console.error("Error al obtener los datos:", result.error || result.message);
//                     }
//                 } catch (error) {
//                     console.error("🚀 ~ Error en fetchExcelData:", error);
//                     notFound()
//                 }
//             };

//             fetchExcelData();

//             // const foundEmpresa = empresas.find(e => e.nombre === nombre)
//             // if (!foundEmpresa) {
//             //     notFound()
//             // } else {
//             //     setEmpresa(foundEmpresa)
//             // }

//         }
//     }, [router.isReady, router.query.id, router.query.nombre])



//     // useEffect(() => {
//     //     if (empresa) {
//     //         const fetchExcelData = async () => {
//     //             const formData = {
//     //                 folder: empresa.nombre,
//     //                 file: `${empresa.nombre}.xlsx`,
//     //             };

//     //             try {
//     //                 const response = await fetch("/api/readFile", {
//     //                     method: "POST", // Cambiamos a POST
//     //                     headers: {
//     //                         "Content-Type": "application/json", // Indicamos JSON
//     //                     },
//     //                     body: JSON.stringify(formData), // Serializamos el body
//     //                 });

//     //                 const result = await response.json();

//     //                 if (response.ok) {
//     //                     console.log("🚀 Datos obtenidos correctamente:", result?.data);
//     //                     setExcelData(result.data); // Guarda los datos en el estado
//     //                 } else {

//     //                     console.error("Error al obtener los datos:", result.error || result.message);
//     //                 }
//     //             } catch (error) {
//     //                 console.error("🚀 ~ Error en fetchExcelData:", error);
//     //             }
//     //         };

//     //         fetchExcelData();
//     //     }
//     // }, [empresa]);






//     return (
//         <div>
//             prueba
//             {/* <h2 className="text-xl font-semibold mb-4">{empresa?.nombre || "Empresa no encontrada"}</h2>
//             <p>{empresa?.descripcion}</p> */}
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import MenuNew from '../../components/MenuNew/MenúNew';

export default function EmpresaPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [data, setExcelData] = useState<any | undefined>();
    const [namecompanies, setNameCompanies] = useState<any | undefined>();

    useEffect(() => {
        if (router.isReady) {
            const nombre:any = router.query.nombre as string;

            const fetchExcelData = async () => {
                const formData = {
                    folder: nombre,
                    file: `${nombre}.xlsx`,
                };
                setNameCompanies(nombre)
                try {
                    const response = await fetch("/api/readFile", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        console.log("🚀 Datos obtenidos correctamente:", result?.data);
                        setExcelData(result.data);
                    } else {
                        console.error("Error al obtener los datos:", result.error || result.message);
                        router.push('/notfound'); // Redirige manualmente a una página de "No encontrado"
                    }
                } catch (error) {
                    console.error("🚀 ~ Error en fetchExcelData:", error);
                    router.push('/notfound'); // Redirige si ocurre un error
                }
            };

            fetchExcelData();
        }
    }, [router.isReady, router.query.id, router.query.nombre]);

    return (
        <div>
            <h1>Menu</h1>
            <MenuNew
                menuItems={data}
                namecompanies={namecompanies}
            />


        </div>
    );
}