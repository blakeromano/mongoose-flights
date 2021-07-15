import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"
const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.post("/", flightsCtrl.create)
router.get("/new", flightsCtrl.newFlight)
router.get("/:id", flightsCtrl.show)
router.post("/:id/tickets", flightsCtrl.createTicket)
router.post("/:id/destinations", flightsCtrl.addToDestinations)

export {
  router
}
