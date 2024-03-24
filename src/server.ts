import { App } from "./app";
import { ConnectToDatabase } from "./database/conn";
import { parkingSpaceRoutes } from "./routes/parkingSpace.routes";

const app = new App().server

app.use(parkingSpaceRoutes.getAllParkingSpace)

app.listen(3000, () => {
  console.log('Http server running on port 3000')
})

ConnectToDatabase()