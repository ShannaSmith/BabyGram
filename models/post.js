const mongoose = require('mongoose');

//A Post has many likes, a like belongs to an Post
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})
module.exports = mongoose.model('Post', postSchema);