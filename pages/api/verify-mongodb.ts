import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ServerApiVersion } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = `mongodb+srv://nicocontigliani:ch8piRaA4WKxa3hi@clusterllakascript.tv2rm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLlakaScript`
    // process.env.MONGO_URI_ATLAS || process.env.MONGO_URI_LOCAL 
    // if (
    //     (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") || process.env.NODE_ENV === undefined
    // ) console.log("🚀 ~ handler ~ uri:", uri)

    if (!uri) {
        return res.status(500).json({ error: 'MongoDB URI is not defined' })
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    console.log("🚀 ~ handler ~ client:", client)

    try {
        await client.connect()
        await client.db("menuDB").command({ ping: 1 })
        res.status(200).json({ message: "Successfully connected to MongoDB!",serDB:client })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        res.status(500).json({ error: 'Failed to connect to MongoDB', userDB:client })
    } finally {
        await client.close()
    }
}

