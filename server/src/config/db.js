import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let memoryServer = null

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI missing in .env')

  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    console.log(`MongoDB connected: ${mongoose.connection.name}`)
    return
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console.error('\nMongoDB connection failed. Check MONGODB_URI in server/.env\n')
      throw err
    }

    console.warn('\nLocal MongoDB not found — starting in-memory database (dev mode)')
    memoryServer = await MongoMemoryServer.create()
    await mongoose.connect(memoryServer.getUri())
    console.log('In-memory MongoDB ready (data resets when server stops)\n')
  }
}

export async function disconnectDB() {
  await mongoose.disconnect()
  if (memoryServer) {
    await memoryServer.stop()
    memoryServer = null
  }
}
