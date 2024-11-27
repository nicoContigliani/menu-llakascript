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
            <MenuNew
                menuItems={data}
                namecompanies={namecompanies}
            />


        </div>
    );
}