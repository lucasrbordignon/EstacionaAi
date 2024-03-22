import mongoose from "mongoose";

export async function ConnectToDatabase() {
  await import('dotenv/config')
  
  try {    
    mongoose.set('strictQuery', true)

    await mongoose
    .connect(process.env.DB_CONN_STRING || "")
    
    console.log('Conectado ao banco!')
  } catch (error) {
    console.log({erro: error})
  }
}