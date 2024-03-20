const router = require("express").Router();
let invoice = require("../../controllers/invoice.controller")

//Routes related to Invoicing
router.post("/create", invoice.createInvoice);
router.post("/get/user", invoice.getUserInvoices);
router.post("/get/serviceCenter", invoice.getServiceCenterInvoices);
router.delete("/delete", invoice.deleteInvoice);

module.exports = router;