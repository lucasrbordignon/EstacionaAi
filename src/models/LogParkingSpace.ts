import { Document, model, Schema } from "mongoose";
import { parkingSpaceInterface } from "./ParkingSpace";

interface carInterface {  
  licencePlate: string
  carModel: string
}

interface carOwnerInterface {
  name: string
  phone: string
}

export interface LogParkingSpaceInterface extends Document {
  parkingSpace: parkingSpaceInterface['_id']
  enteredAt: Date,
  leftAt?: Date
  car?: carInterface
  carOwner?: carOwnerInterface
}

const LogParkingSpaceSchema: Schema = new Schema({
  parkingSpace: { type: Schema.Types.ObjectId, ref: 'parkingSpace', required: true },
  enteredAt: { type: Date, requered: true },
  leftat: { type: Date },
  car: {
    licencePlate: { type: String },
    carModel: { type: String }
  },
  carOwner: {
    name: { type: String },
    phone: { type: String }
  }
})

export default model<LogParkingSpaceInterface>('logParkingSpace', LogParkingSpaceSchema)