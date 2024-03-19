const router = require("express").Router();
let booking = require("../../controllers/booking.controller")

//Routes related to booking 
router.post("/create", booking.createBooking);
router.post("/get", booking.getBooking);
router.post("/get/status", booking.getBookingByStatus);
router.post("/get/booking/name", booking.getBookingByBookingName);
router.post("/get/vehicle/number", booking.getBookingByNumberPlate);
router.put("/set/status", booking.setBookingStatus);

module.exports = router;