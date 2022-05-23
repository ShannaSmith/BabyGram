const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const multer = require("multer");
const { Route53RecoveryCluster } = require("aws-sdk");
const upload = multer();
/*---------- Public Routes ----------*/
router.post('/accessCode', usersCtrl.accessCode);

/*---------- Protected Routes ----------*/
router.post("/signup", upload.single("photo"), usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.post('/:username', usersCtrl.profile);
module.exports = router;
