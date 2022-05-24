const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes')

router.post('/:id/likes', likesCtrl.create)
router.delete('/:id/likes', likesCtrl.remove)

module.exports = router;