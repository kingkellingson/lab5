const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;


const photoSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    path: String,
    title: String,
    description: String,
    ownComments: Array,
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  const Photo = mongoose.model('Photo', photoSchema);
  

// upload photo
router.post("/", validUser, upload.single('photo'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const photo = new Photo({
      user: req.user,
      path: "/images/" + req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });
    try {
      await photo.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  

  // get my photos
router.get("/", validUser, async (req, res) => {
    // return photos
    try {
      let photos = await Photo.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

// get all photos
router.get("/all", async (req, res) => {
    try {
      let photos = await Photo.find().sort({
        created: -1
      }).populate('user');
      return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  

// get a single photo
router.get("/:id", async (req, res) => {
  try {
    let photo = await Photo.find()
    // console.log("1found: ", photo)
    let myPhoto = await Photo.find({
      _id: req.params.id
    }).populate('user');
    // console.log("2found: ", myPhoto)
    return res.send(myPhoto);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
  

//////////////////////////////
///////////COMMENTS//////////
/////////////////////////////

// This is the schema for a ticket
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  photo: {
      type: mongoose.Schema.ObjectId,
      ref: "Photo"
    },
  words: String,
  created: {
    type: Date,
    default: Date.now
  },
});


// The model for a comment
const Comment = mongoose.model('Comment', commentSchema);


//create a comment
// router.post('/', validUser, async (req, res) => {
  //check parameters
  // console.log("Received: ", req)
//   });



//   create a comment on that specific photo
router.post("/:id/post", validUser, async (req, res) => {
  // check parameters
  if (!req)
    return res.status(400).send({
      message: "Must upload a file."
    });
  
  const myPhoto = await Photo.find({
    _id: req.params.id
  })
  console.log("try photo: ", myPhoto)
  if (!myPhoto) {
    return res.send({
      comment: 'error: no photo'
    })
  }

  const myComment = new Comment({
    user: req.user,//possibly an error here
    photo: myPhoto,
    words: req.body.commentToAdd
  });

  console.log("added comment: ", myComment)
  console.log("with user: ", myComment.user)
  console.log("with photo: ", myComment.photo)
  try {
    await myComment.save();
    return res.send({
      comment: myComment
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


// get comments -- will list tickets that a user has submitted
router.get("/:id/comment", async (req, res) => {
  let comments = [];
try {
  comments = await Comment.find({
    _id: req.params.id
  }).sort({
      created: -1
  }).populate('user');
  console.log("get comments returned these comments: ", comments)

  return res.send({
      comments: comments
  });
} catch (error) {
  console.log(error);
  return res.sendStatus(500);
}
});


// get a single photo's comments



  module.exports = {
    model: Photo,
    routes: router,
  }

