import { Router } from "express";
import { bookSeat, changeDates, changeSeats, organizeConference } from "../controllers/conference.controllers";
import { isAuthenticated } from "../middlewares/authenticator.middleware";


const router = Router()

router.use(isAuthenticated)
router.post('/conference', organizeConference)
router.patch('/conference/:conferenceId', changeSeats)
router.patch('/conference/:conferenceId/dates', changeDates)
router.post('/conference/book', bookSeat)

export { router as ConferenceRoutes };
