const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const cloudinary = require('../cloudinary');

// Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.body.profilePic) {
      const user = await User.findById(req.params.id);
      if (user.profilePic) {
        cloudinary.uploader.destroy(user.public_id, {invalidate: true}, function(error,result) {
          console.log(result, error) });
      }
    }
    
    try {
      const user = await User.findById(req.params.id);
      await Post.updateMany(
        { 'username': user.username }, // điệu kiện nếu where username = user.username
        { $set: { "username": req.body.username } },
      )
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, { new: true });

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }

  } else {
    res.status(401).json("You can update only your account!");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        const posts = await Post.find({ username: user.username });
        posts.forEach((el) => {
          if (el.public_id) {
            cloudinary.uploader.destroy(el.public_id, {invalidate: true}, function(error,result) {
              console.log(result, error) });
          }
        })
        
        await Post.deleteMany({ username: user.username});
        await User.findByIdAndDelete(req.params.id);
        if (user.profilePic) {
          cloudinary.uploader.destroy(user.public_id, {invalidate: true}, function(error,result) {
            console.log(result, error) });
        }
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// Get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others} = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;