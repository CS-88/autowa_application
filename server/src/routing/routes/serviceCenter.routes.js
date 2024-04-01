const router = require("express").Router();
let serviceCenter = require("../../controllers/serviceCenter.controller")
let multer = require("../../middleware/multer")

//Routes related to service Centers
router.post("/register", serviceCenter.registerServiceCenter);
router.put("/update", serviceCenter.updateServiceCenter);
router.delete("/delete", serviceCenter.deleteServiceCenter);
router.get("/get", serviceCenter.findAllServiceCenters)
router.post("/get/name", serviceCenter.findServiceCenter)
router.post("/get/email", serviceCenter.findServiceCenterByEmail)
router.post("/get/location", serviceCenter.findServiceCentersByLocation)
router.post("/get/rating", serviceCenter.findServiceCentersByRating)
router.put("/update/pic", multer.upload, serviceCenter.updateServiceCenterPicture)
router.put("/update/count", serviceCenter.updateBookingCount)

module.exports = router;