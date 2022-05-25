const express = require('express');
const multer  = require('multer');

const postsCtrl = require('../../controllers/posts');
const likesCtrl = require('../../controllers/likes');

const router = express.Router();
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/users/:userId', postsCtrl.myPosts);
router.get('/', postsCtrl.index);

router.post('/:id/likes', likesCtrl.create)
router.delete('/:id/likes', likesCtrl.remove)

module.exports = router;