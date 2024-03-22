import mongoose, { Schema, Types } from "mongoose";

interface ICars {  
  marca: string
  modelo: string
  ano: number
  cor: string
  _id?: Types.ObjectId 
}

interface IParking {
  nome: string
  endereco: string
  carros: Types.Array<ICars['_id']>  
}

const ParkingSchema = new Schema<IParking>({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  carros: [{ type: Schema.Types.ObjectId, ref: 'Cars' }] // Referência aos carros estacionados
})


const ParkingModel = mongoose.model<IParking>('Parking', ParkingSchema)

export { ParkingModel };

