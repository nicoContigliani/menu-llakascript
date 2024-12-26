import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
