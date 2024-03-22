import { Router } from "express"
import { CarsModel } from "./models/Cars"

const router: Router = Router()

router.post("/cars", async (req, res) => {
  try {
    
    let newCar = new CarsModel(req.body)
    await newCar.save()

    res.status(201).send(newCar)

  } catch (error) {
    res.status(400).send(error)    
  }
})

export { router }

