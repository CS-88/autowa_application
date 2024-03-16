const router = require("express").Router();
let customer = require("../../controllers/customer.controller")
let multer = require("../../middleware/multer")

//Routes related customer
router.post("/register", customer.registerCustomer);
router.post("/get/customer", customer.findCustomer);
router.put("/update", customer.updateCustomer);
router.put("/update/password", customer.updateCustomerPassword);
router.post("/update/pic", customer.updateCustomerPicture);
router.delete("/delete", customer.deleteCustomer);

module.exports = router;