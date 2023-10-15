import { MongoClient, ServerApiVersion } from 'mongodb'

export const connection = () => {
  let client: MongoClient
  try {
    const uri = process.env.MONGO_URL
    client = new MongoClient(uri!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    return client
  } catch (e) {
    console.log(e)
  }
}
