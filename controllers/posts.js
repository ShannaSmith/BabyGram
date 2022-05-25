const Post = require("../models/post");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();
module.exports = {
  index,
  create,
  myPosts,
};

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    if (req.file) {
      const filePath = `${uuidv4()}/${req.file.originalname}`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: req.file.buffer,
      };

      const data = await new Promise((resolve, reject) =>
        s3.upload(params, (err, data) => {
          if (err) reject(err);
          if (data) resolve(data);
        })
      );
      req.body.photoUrl = data.Location;
    }
    const post = await Post.create(req.body);
    await post.populate("user");
    res.status(201).json({ post });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}

async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}

async function myPosts(req, res) {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId }).populate("user").exec();
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}
