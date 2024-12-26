import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;

            // Verificar si el email fue enviado
            if (!email) {
                return res.status(400).json({ error: 'El campo email es obligatorio' });
            }

            // Conectar a la base de datos
            const client = await clientPromise;
            const db = client.db("menuDB");
            const collection = db.collection("users");

            // Buscar usuario por email
            let user: any | any[] | undefined = await collection.findOne({ email });

            if (!user) {
                // Si el usuario no existe, crear uno nuevo
                const newUser = {
                    email,
                    rol: 'user', // Rol predeterminado, puedes cambiarlo según tus necesidades
                    visit:[],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                const insertResult = await collection.insertOne(newUser);
                if (insertResult.acknowledged) {
                    user = newUser; // Asignar el nuevo usuario creado a la variable `user`
                } else {
                    return res.status(500).json({ error: 'No se pudo crear el usuario' });
                }
            }

            // Generar el token
            const token = jwt.sign(
                { email: user.email, rol: user.rol }, // Datos que incluirás en el token
                process.env.JWT_SECRET as string, // Clave secreta para firmar el token
                { expiresIn: '1h' } // Tiempo de expiración
            );

            return res.status(200).json({ user, token });

        } catch (error) {
            console.error('Error en la API:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // Manejar otros métodos HTTP no permitidos
    return res.status(405).json({ error: 'Método no permitido' });
}
