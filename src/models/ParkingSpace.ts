import { Document, model, now, Schema } from "mongoose";

interface carInterface {  
  licencePlate: string
  carModel: string
}

interface carOwnerInterface {
  name: string
  phone: string
}

export interface parkingSpaceInterface extends Document {
  number:  number
  isOccupied: boolean
  enteredAt: Date,
  car: carInterface
  carOwner: carOwnerInterface
}

const parkingSpaceSchema = new Schema({
  number:  { type: Number, required: true, unique: true },
  isOccupied:  { type: Boolean, default: false },
  enteredAt: {type: Date, requered: true, default: now },
  car: {
    licencePlate: { type: String },
    carModel: { type: String }
  },
  carOwner: {
    name: { type: String },
    phone: { type: String }
  }
})

export default model<parkingSpaceInterface>('parkingSpace', parkingSpaceSchema)

