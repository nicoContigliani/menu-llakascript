import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/router'

// Simulamos una base de datos de empresas
const empresas = [
    { id: 1, nombre: 'LlakaScript', descripcion: 'Descripción de la Empresa A' },
    { id: 2, nombre: 'Empresa B', descripcion: 'Descripción de la Empresa B' },
    { id: 3, nombre: 'Empresa C', descripcion: 'Descripción de la Empresa C' },
]

export default function EmpresaPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [empresa, setEmpresa] = useState<any | undefined>(undefined)

    useEffect(() => {
        if (router.isReady) {
            const nombre = router.query.nombre as string
            const foundEmpresa = empresas.find(e => e.nombre === nombre)
            if (!foundEmpresa) {
                notFound()
            } else {
                setEmpresa(foundEmpresa)
            }
        }
    }, [router.isReady, router.query.id])

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{empresa?.nombre || "Empresa no encontrada"}</h2>
            <p>{empresa?.descripcion}</p>
        </div>
    )
}