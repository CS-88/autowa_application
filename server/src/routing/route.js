const router = require('express').Router();

let customer = require('./routes/customer.routes')
let upload = require('./routes/upload.routes')

//All the Routes that are available in the application are divided into related route files and are called below.
// router.use('/auth', login);
// router.use('/employee', employee);
router.use('/customer', customer);
router.use('/upload', upload);
// router.use('/vendor', vendor);
// router.use('/item', item);
// router.use('/upload', upload);
// router.use('/cart', cart);
// router.use('/order', order);

module.exports = router;