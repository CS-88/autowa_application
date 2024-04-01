const router = require('express').Router();

let customer = require('./routes/customer.routes')
let serviceCenter = require('./routes/serviceCenter.routes')
let serviceRecord = require('./routes/serviceRecord.routes')
let invoice = require('./routes/invoice.routes.js')
let booking = require('./routes/booking.routes')
let auth = require('./routes/login.routes.js')
let ml = require('./routes/ml.routes.js')

//All the Routes that are available in the application are divided into related route files and are called below.

router.use('/customer', customer);
router.use('/serviceCenter', serviceCenter);
router.use('/serviceRecord', serviceRecord);
router.use('/invoice', invoice);
router.use('/booking', booking);
router.use('/auth', auth);
//router.use('/ml', ml);

module.exports = router;