import Link from 'next/link'

// Simulamos una lista de empresas
const empresas = [
  { id: 1, nombre: 'LlakaScript' },
  { id: 2, nombre: 'Empresa B' },
  { id: 3, nombre: 'Empresa C' },
]

export default function EmpresasPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lista de Empresas</h2>
      <ul className="space-y-2">
        {empresas.map((empresa) => (
          <li key={empresa.id}>
            <Link href={`/companies/${empresa.nombre}`} className="text-blue-600 hover:underline">
              {empresa.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}