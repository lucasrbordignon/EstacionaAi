import { App } from "./app";
import { ConnectToDatabase } from "./database/conn";

new App().server.listen(3000, () => {
  console.log('Http server running on port 3000')
})

ConnectToDatabase()