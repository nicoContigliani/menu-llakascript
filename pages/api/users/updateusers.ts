import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PATCH') {
        try {
            const { email, visitData } = req.body;

            // Verificar si email y visitData fueron enviados
            if (!email || !visitData) {
                return res.status(400).json({ error: 'El campo email y visitData son obligatorios' });
            }

            // Conectar a la base de datos
            const client = await clientPromise;
            const db = client.db("menuDB");
            const collection = db.collection("users");

            // Buscar si el usuario existe
            const user = await collection.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Actualizar el campo visit
            const updateResult = await collection.updateOne(
                { email }, // Filtro para encontrar al usuario
                {
                    $push: { visit: visitData }, // Agregar el nuevo visitData al array
                    $set: { updatedAt: new Date() }, // Actualizar la fecha de modificación
                }
            );

            if (!updateResult.acknowledged) {
                return res.status(500).json({ error: 'No se pudo actualizar el campo visit' });
            }

            return res.status(200).json({ message: 'Campo visit actualizado correctamente' });
        } catch (error) {
            console.error('Error en la API:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // Manejar otros métodos HTTP no permitidos
    return res.status(405).json({ error: 'Método no permitido' });
}
