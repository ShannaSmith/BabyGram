const Post = require("../models/post");

module.exports = {
  remove,
  create,
};

async function create(req, res) {
  const { id } = req.params;
  try {
    return Post.findByIdAndUpdate(
      id,
      { $push: { likes: req.user._id } },
      { new: true }
    );
  } catch (err) {
    console.log("err==>>", err);
    res.status(500).json({ data: err });
  }
}

async function remove(req, res) {
    const { id } = req.params;
  try {
    return Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
  } catch (err) {
    console.log("err==>>", err);
    res.status(500).json({ data: err });
  }
}
