const router = require("express").Router();
let booking = require("../../controllers/booking.controller")

//Routes related to booking 
router.post("/create", booking.createBooking);
router.post("/get", booking.getBooking);
router.post("/get/id", booking.getBookingById);
router.post("/get/status", booking.getBookingByStatus);
router.post("/get/not/completed", booking.getBookingByNotCompleted);
router.post("/get/name", booking.getBookingByBookingName);
router.post("/get/vehicle/number", booking.getBookingByNumberPlate);
router.put("/set/status", booking.setBookingStatus);
router.delete("/delete", booking.deleteBooking);

module.exports = router;