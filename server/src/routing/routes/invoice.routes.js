const router = require("express").Router();
let invoice = require("../../controllers/invoice.controller")

//Routes related customer
router.post("/create", invoice.createInvoice);
router.post("/get/user", invoice.getUserInvoices);
router.post("/get/serviceCenter", invoice.getServiceCenterInvoices);

module.exports = router;