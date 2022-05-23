const Post = required('../models/post');
const S3 = required('aws-sdk/clients/s3');
const {v4:uuidv4 } = require('uuid');

const s3 = new S3();
module.exports ={
index
}
function create(req, res){
    console.log(req,file, req.body, 'this is create method', req.user)
    try{
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params ={Bucket: process.env.Bucket_Name, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
            console.log(err, 'from aws')
            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});
            console.log(post)
            await post.populate('user');
        res.status(201).json({post: post})  
          })
    }catch(err){
console.log(err);
res.json({data:err})
    }
}

async function index(req, res){
    try{
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
        }catch(err){

        }
}