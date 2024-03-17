const router = require('express').Router();

let customer = require('./routes/customer.routes')
let serviceCenter = require('./routes/serviceCenter.routes')
let serviceRecord = require('./routes/serviceRecord.routes')
let booking = require('./routes/booking.routes')
let upload = require('./routes/upload.routes')

//All the Routes that are available in the application are divided into related route files and are called below.

router.use('/customer', customer);
router.use('/serviceCenter', serviceCenter);
router.use('/serviceRecord', serviceRecord);
router.use('/booking', booking);
router.use('/upload', upload);

module.exports = router;