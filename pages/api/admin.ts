// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../utils/mongodb";
// import cache from 'memory-cache'; // Importar memory-cache

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "GET") {
//         return res.status(405).json({ error: "Método no permitido, usa GET" });
//     }

//     const { folder } = req.query;

   

//     try {
//         // Revisar caché para evitar consulta repetitiva en la base de datos
//         const cachedData = cache.get(); // Usamos cache.get() para obtener los datos del caché
//         if (cachedData) {
//             console.log("Datos obtenidos del caché");
//             return res.status(200).json({ data: cachedData });
//         }

//         // Conectar a MongoDB (conexión persistente)
//         const client = await clientPromise;
//         const db = client.db("menuDB");
//         const collection = db.collection("companies");

//         // Buscar en la colección según el folderName
//         const companies = await collection.find().toArray(); // Asegurarse de convertir a array
//         console.log("🚀 ~ handler ~ companies:", companies);

//         if (!companies || companies.length === 0) {
//             return res.status(404).json({ error: "No se encontraron empresas con el folder especificado" });
//         }

//         // Almacenar en caché usando cache.put()
//         cache.put(folder, companies, 10 * 60 * 1000); // Guardar en caché por 10 minutos

//         // Devolver los datos
//         return res.status(200).json({ data: companies });
//     } catch (error) {
//         console.error("Error al procesar la solicitud:", error);

//         return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Método no permitido, usa GET" });
    }

    const { folder } = req.query;

    try {
        // Conectar a MongoDB (conexión persistente)
        const client = await clientPromise;
        const db = client.db("menuDB");
        const collection = db.collection("companies");

        // Buscar en la colección según el folderName
        const companies = await collection.find().toArray(); // Asegurarse de convertir a array
        console.log("🚀 ~ handler ~ companies:", companies);

        if (!companies || companies.length === 0) {
            return res.status(404).json({ error: "No se encontraron empresas con el folder especificado" });
        }

        // Devolver los datos
        return res.status(200).json({ data: companies });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);

        return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
    }
}
