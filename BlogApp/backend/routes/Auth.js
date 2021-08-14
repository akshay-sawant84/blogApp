const router = require("express").Router();
const authController = require('../controller/AuthContoller')


router.post("/user/login", authController.login);
router.post("/user/register", authController.signup);

module.exports = router;