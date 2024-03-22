import mongoose, { Schema, Types } from "mongoose";

interface ICar {  
  marca: string
  modelo: string
  ano: number
  cor: string
  _id?: Types.ObjectId 
}

const CarSchema = new Schema<ICar>({
  marca: {type: String, require: true},
  modelo: {type: String, require: true},
  ano: {type: Number, require: true},
  cor: {type: String, require: true},
  _id: {type: Types.ObjectId, require: false},
})

interface IParking {
  nome: string
  endereco: string
  carros: Types.Array<ICar['_id']>  
}

const ParkingSchema = new Schema<IParking>({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  carros: [{ type: Schema.Types.ObjectId, ref: 'Car' }] // Referência aos carros estacionados
})

const CarModel = mongoose.model<ICar>('Car', CarSchema)
const ParkingModel = mongoose.model<IParking>('Parking', ParkingSchema)

export { CarModel, ParkingModel };
