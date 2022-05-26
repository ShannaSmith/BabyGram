const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/
// router.post('/accessPage', usersCtrl.accessCode);
router.post("/signup", upload.single("photo"), usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/

router.get('/', usersCtrl.allUsers);
router.get('/me', usersCtrl.getLoggedInUser);
router.get('/granted', usersCtrl.grantedUsers);
router.get('/grant/:userId', usersCtrl.grantAccess);
router.get('/revoke/:userId', usersCtrl.revokeAccess);
router.get('/:username', usersCtrl.profile);
router.get('/account', usersCtrl.grantedUsers);
module.exports = router;
