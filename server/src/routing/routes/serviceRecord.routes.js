const router = require("express").Router();
let serviceRecord = require("../../controllers/serviceRecord.controller")

//Routes related to service records
router.post("/create", serviceRecord.createServiceRecord);
router.post("/get/serviceCenter/records", serviceRecord.getServiceCenterRecords);
router.post("/get/user/records", serviceRecord.getUserRecords);
router.delete("/delete", serviceRecord.deleteRecord);

module.exports = router;