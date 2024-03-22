import mongoose, { Schema } from "mongoose";

interface ICars {  
  marca: string
  modelo: string
  ano: number
  cor: string
}

const CarsSchema = new Schema<ICars>({
  marca: {type: String, require: true},
  modelo: {type: String, require: true},
  ano: {type: Number, require: true},
  cor: {type: String, require: true},
})

export const CarsModel = mongoose.model<ICars>('Cars', CarsSchema)
