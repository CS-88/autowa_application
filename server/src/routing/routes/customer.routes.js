const router = require("express").Router();
const multer = require('../../middleware/multer');
let customer = require("../../controllers/customer.controller")

//Routes related customer
router.post("/register", customer.registerCustomer);
router.post("/get", customer.findCustomer);
router.put("/update", customer.updateCustomer);
router.put("/update/password", customer.updateCustomerPassword);
router.post("/update/pic", multer.upload ,customer.updateCustomerPicture);
router.delete("/delete", customer.deleteCustomer);

module.exports = router;