import { App } from "./app";
import { ConnectToDatabase } from "./database/conn";
import { logParkingSpace } from "./routes/logParkingSpace.routes";
import { parkingSpaceRoutes } from "./routes/parkingSpace.routes";

const app = new App().server

app.use(parkingSpaceRoutes.getAllParkingSpace)
app.use(parkingSpaceRoutes.getParkingSpaceById)
app.use(parkingSpaceRoutes.createParkingSpace)
app.use(parkingSpaceRoutes.deleteParkingSpace)
app.use(parkingSpaceRoutes.updateParkingSpaces)
app.use(parkingSpaceRoutes.leftParkingSpaces)
app.use(logParkingSpace.getAllLogParkingSpace)

app.listen(3000, () => {
  console.log('Http server running on port 3000')
})

ConnectToDatabase()