// // src/utils/db.ts
// import { MongoClient, Db } from 'mongodb'

// declare global {
//     var _mongoClientPromise: Promise<MongoClient>
// }

// if (!process.env.MONGODB_URI) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

// const uri = process.env.MONGODB_URI
// const options = {}

// let client
// let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === 'development') {
//     // In development mode, use a global variable so the client is not re-created
//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options)
//         global._mongoClientPromise = client.connect()
//     }
//     clientPromise = global._mongoClientPromise
// } else {
//     // In production mode, it's best to not use a global variable
//     client = new MongoClient(uri, options)
//     clientPromise = client.connect()
// }

// const connectToDatabase = async (): Promise<Db> => {
//     const client = await clientPromise
//     console.log('[MONGO DB ATLAS]: Database connected.')
//     return client.db() // This will use the default database specified in the URI
// }

// export { clientPromise, connectToDatabase }

import mongoose from 'mongoose'

export const connectMongoDB = async () => {
    const mongoBDURI = process.env.MONGODB_URI

    if (!mongoBDURI) {
        throw new Error('Not DB configuration provided.')
    }

    try {
        await mongoose.connect(mongoBDURI)
        console.log('[MONGODB ATLAS]: Connected to MongoDB Atlas Cluster.')
    } catch (error) {
        console.log(
            `[MONGODB ATLAS]: Error connecting to MongoDB Atlas Cluster: ${error}`
        )
    }
}
