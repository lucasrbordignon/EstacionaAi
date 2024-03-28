import { Document, model, now, Schema } from "mongoose";

interface carInterface {  
  licencePlate: string
  carModel: string
}

interface carOwnerInterface {
  name: string
  phone: string
}

export interface LogParkingSpaceInterface extends Document {
  enteredAt: Date,
  leftAt?: Date
  car?: carInterface
  carOwner?: carOwnerInterface
}

const LogParkingSpaceSchema: Schema = new Schema({
  enteredAt: { type: Date, requered: true, default: now },
  leftAt: { type: Date },
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