import { connection } from '../../DBConnection/connection'
import { type IArea, Status } from '../interfaces/area.interface'

export const getAreas = async () => {
  const connect = await connection()?.connect()
  const collection = connect?.db(process.env.COLLECTION).collection('areas')
  const guests = await collection?.find({}).toArray()
  connect?.close()
  return guests
}

export const getOneArea = async ( id: string ) => {
  const connect = await connection()?.connect()
  const collection = connect?.db(process.env.COLLECTION).collection('areas')
  const guest = await collection?.findOne({ id })
  connect?.close()
  return guest
}

export const addArea = async (area: IArea) => {
  const connect = await connection()?.connect()
  const collection = connect?.db(process.env.COLLECTION).collection('areas')
  const insertedArea = await collection?.insertOne(area)
  connect?.close()
  return insertedArea
}

export const updateArea = async ( area: IArea) => {
  const connect = await connection()?.connect()
  const collection = connect?.db(process.env.COLLECTION).collection('areas')
  const update = { $set: area }
  const updatedArea = await collection?.updateOne({ id:area.id }, update)
  connect?.close()
  return updatedArea
}

export const deleteArea = async ( ids: string[] ) => {
  const connect = await connection()?.connect()
  const collection = connect?.db(process.env.COLLECTION).collection('areas')
  await collection?.deleteMany({id: {$in: ids}})
  connect?.close()
}


export const changeStatus = async ( id: string, status: string ) => {
  const connect = await connection()?.connect()
  const collection = connect?.db(process.env.COLLECTION).collection('areas')
  const area = await collection?.findOne({ id: id })

  if(area){
    let update: any
    if(status === Status.maintenance){
      update = { $set: {...area, status, last_maintenance: Date()} }

    }else{
      update = { $set: {...area, status} }    
    }

    const updatedArea = await collection?.updateOne({ id:area.id }, update)
    connect?.close()
    return updatedArea
  }    
}
