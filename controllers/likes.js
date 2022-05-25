const Post = require("../models/post");

module.exports = {
  remove,
  create,
};

async function create(req, res) {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
        id,
        { $push: { likes: req.user._id } },
        { new: true }
      )
    ;
    res.send(post);
  } catch (err) {
    console.log("err==>>", err);
    res.status(500).json({ data: err });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    const post =await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.send(post);
  } catch (err) {
    console.log("err==>>", err);
    res.status(500).json({ data: err });
  }
}
