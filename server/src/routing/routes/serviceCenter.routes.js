const router = require("express").Router();
let serviceCenter = require("../../controllers/serviceCenter.controller")

//Routes related to service Centers
router.post("/register", serviceCenter.registerServiceCenter);
router.put("/update", serviceCenter.updateServiceCenter);
router.delete("/delete", serviceCenter.deleteServiceCenter);
router.get("/get", serviceCenter.findAllServiceCenters)
router.post("/get/serviceCenter", serviceCenter.findServiceCenter)
router.post("/get/serviceCenter/email", serviceCenter.findServiceCenterByEmail)
router.post("/get/serviceCenter/location", serviceCenter.findServiceCentersByLocation)
router.put("/update/pic", serviceCenter.updateServiceCenterPicture)

module.exports = router;