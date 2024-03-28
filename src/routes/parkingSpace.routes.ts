import { App } from "../app"
import LogParkingSpace from "../models/LogParkingSpace"
import ParkingSpace from "../models/ParkingSpace"

const app = new App().server

export const parkingSpaceRoutes = {

  getAllParkingSpace: app.get('/parkingSpace', async (req, res) => {
    try {
      const parkingSpaces = await ParkingSpace.find()
      
      res.json(parkingSpaces.map((parkingSpace) => {
        const { id, isOccupied, number} = parkingSpace
        const { licencePlate, carModel } = parkingSpace.car
        const { name, phone } = parkingSpace.carOwner

        return {
          id,
          number,
          isOccupied,
          car: {
            licencePlate,
            carModel,
          },
          carOwner: {
            name,
            phone
          }
        }
      }))
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }),

  getParkingSpaceById: app.get('/parkingSpace/:id', async (req, res) => {
    const { id } = req.params

    try {
      const parkingSpaces = await ParkingSpace.findById(id)

      if (!parkingSpaces) {
        return res.status(404).json({ message: 'Vaga não encontrada' })
      }

      const { isOccupied} = parkingSpaces
      const { licencePlate, carModel } = parkingSpaces.car
      const { name, phone } = parkingSpaces.carOwner

      res.json({
        id,
        isOccupied,
        car: {
          licencePlate,
          carModel,
        },
        carOwner: {
          name,
          phone
        }
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }),

  createParkingSpace: app.post('/parkingSpace', async (req, res) => {
    const { number } = req.body 
      
    try {
      const newParkingSpace = new ParkingSpace({ number })
      await newParkingSpace.save()

      res.status(201).json(newParkingSpace)
      
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }),

  updateParkingSpaces: app.put('/parkingSpace/:id', async (req, res) => {
    const { id } = req.params
    const { number, isOccupied, car, carOwner } = req.body

    try {
      const parkingSpace = await ParkingSpace.findByIdAndUpdate(id, { number, isOccupied, car, carOwner }, { new: true })

      if (!parkingSpace) {
        return res.status(404).json({ message: 'vaga não encontrada.' })        
      }

      res.json(parkingSpace)

    } catch (error) {
      res.status(400).json({ message: error})
    }
  }), 

  leftParkingSpaces: app.put('/parkingSpace/:id/left', async (req, res) => {
    const { id } = req.params
    const { number } = req.body

    try {
      const parkingSpace = await ParkingSpace.findById(id)

      if (!parkingSpace) {
        return res.status(404).json({ message: 'vaga não encontrada.' })        
      }

      const leftAt = new Date()
      const {enteredAt, isOccupied, car, carOwner } = parkingSpace

      const newParkingSpace = new LogParkingSpace({ _id: id, number, enteredAt, leftAt , isOccupied, car, carOwner } )
      await newParkingSpace.save()

      await ParkingSpace.findByIdAndUpdate(id, { number, isOccupied: false, car: {}, carOwner: {} }, { new: true })

      res.json(newParkingSpace)

    } catch (error) {
      res.status(400).json({ message: error})
    }
  }), 

  deleteParkingSpace: app.delete('/parkingSpace/:id', async (req, res) => {
    const { id } = req.params

    try {
      const parkingSpace = await ParkingSpace.findByIdAndDelete(id)

      if (!parkingSpace) {
        return res.status(404).json({ message: 'vaga não encontrada.' })        
      }
      res.json({ message: 'Vaga excluida com sucesso.' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  })
}