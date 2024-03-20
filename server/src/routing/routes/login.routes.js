const router = require("express").Router();
let login = require("../../controllers/login.controller")

//Routes of login
router.post("/login/web", login.loginWebUser);
router.post("/login/mobile", login.loginMobileUser);

module.exports = router;