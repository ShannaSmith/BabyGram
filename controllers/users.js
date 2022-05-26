const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const Post = require("../models/post");
const AccessCode = require("../models/accessCode");

const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets

module.exports = {
  signup,
  login,
  profile,
  allUsers,
  grantAccess,
  revokeAccess,
  grantedUsers,
  getLoggedInUser
  
};

async function signup(req, res) {
  try {
    if (req.file) {
      // FilePath unique name to be saved to our bucket
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
      req.body.photoUrl = data.Location; // data.Location is our photoUrl that exists on aws
    }
    req.body.accessCode = Math.random().toString(36).slice(2);
    const user = new User(req.body);
    await user.save();
    const token = createJWT(user); // user is the payload so this is the object in our jwt
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
  //////////////////////////////////////////////////////////////////////////////////
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ err: "User not found" });
    const posts = await Post.find({ user: user._id }).populate("user").exec();
    res.status(200).json({ posts: posts, user: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

async function allUsers(req, res) {
  try {
    const { _id } = req.user;
    const grantedCodes = await AccessCode.find({ owner: _id }).populate(
      "recipient"
    );
    const grantedUserIds = grantedCodes.map((u) => u.recipient._id);
    const grantedUsers = await User.find({
      _id: { $in: grantedUserIds },
    });
    const deniedUsers = await User.find({
      _id: { $nin: [...grantedUserIds, _id] },
    });
    res.send({ grantedUsers, deniedUsers });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

async function grantAccess(req, res) {
  try {
    const { _id } = req.user;
    const { userId } = req.params;
    res.send(AccessCode.create({ owner: _id, recipient: userId }));
  } catch (err) {
    console.log("error granting access==>>", err);
    res.status(400).json({ err });
  }
}

async function revokeAccess(req, res) {
  try {
    const { _id } = req.user;
    const { userId } = req.params;
    await AccessCode.findOneAndDelete({ owner: _id, recipient: userId });
    res.send({ message: "access revoked" });
  } catch (err) {
    console.log("error revoking access==>>", err);
    res.status(400).json({ err });
  }
}

async function grantedUsers(req, res) {
  try {
    const { _id } = req.user;
    const grantedUsers = await AccessCode.find({recipient: _id }).populate('owner');
    res.send(grantedUsers);
  } catch (err) {
    console.log("error revoking access==>>", err);
    res.status(400).json({ err });
  }
}

function getLoggedInUser(req, res) {
  try {
    res.send(req.user);
  } catch (err) {
    console.log("error revoking access==>>", err);
    res.status(400).json({ err });
  }
}

  
/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
