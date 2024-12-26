import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Aquí podrías manejar cookies o tokens según sea necesario.
    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
