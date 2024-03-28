import { App } from '../app'
import LogParkingSpace, { LogParkingSpaceInterface } from '../models/LogParkingSpace'

const app = new App().server

export const logParkingSpace = {
  getAllLogParkingSpace: app.get('/logParkingSpace', async (req, res) => {
    try {
      const logParkingSpaces = await LogParkingSpace.find()

      res.json(logParkingSpaces)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }),

  createLogParkingSpace: app.post('/logParkingSpace', async (req, res) => {
    try {      
      const bodyLogParkingSpace: LogParkingSpaceInterface = req.body

      const newLogParkingSpace = new LogParkingSpace(bodyLogParkingSpace)
      await newLogParkingSpace.save()

      res.status(201).json(newLogParkingSpace)
      
    } catch (error) {
      res.status(500).json({ message: error })
    }
  })
}