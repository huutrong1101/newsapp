const router = require("express").Router();
const Post = require("../models/Post");
const cloudinary = require('../cloudinary');
const getSlug = require('speakingurl');
const { getPlaiceholder } = require("plaiceholder");

// Create Post
router.post("/", async (req, res) => {
  let slug;
  const countPost = await Post.findOne({ slug: getSlug(req.body.title) }).countDocuments();
  if (countPost === 1) {
    slug = getSlug(req.body.title) + "-" + Math.random().toString(36).slice(-8);
  } else {
    slug = getSlug(req.body.title);
  }
  // const newPost = new Post({...req.body, ...{ slug }}); // ... nối 2 objects

  const imgArray = req.body.photos;
  console.log(imgArray);
  try {
    const imgs = await Promise.all(imgArray.map(async (img) => {
      const getBlurHash = await getPlaiceholder(img.src, options = {
          size: 32
        }
      ).then(({ blurhash }) => {return {
        src: img.src,
        blurhash: blurhash.hash,
        public_id: img.public_id,
        color: img.color,
      }});

      return getBlurHash;
    }));
    console.log(imgs);
    const photos = [...imgs];
    const newPost = new Post({...req.body, ...{ slug }, ...{photos}}); // ... nối 3 objects
    // console.log(newPost);
    try {
      const savePost = await newPost.save();
      res.status(200).json(savePost);
    } catch (err) {
      res.status(500).json(err)
    }
  } catch (err) {
    err;
  }
  
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      let slug;
      if (getSlug(post.title) === getSlug(req.body.title)) {
        slug = post.slug;
      } else {
        const countPost = await Post.findOne({ slug: getSlug(req.body.title) }).countDocuments();
        if (countPost === 1) {
          slug = getSlug(req.body.title) + "-" +  Math.random().toString(36).slice(-8);
        } else {
          slug = getSlug(req.body.title);
        }
      }
      
      const imgArray = req.body.photos;
      const photosDelete = req.body.photosDelete;
      // console.log(imgArray);
      try {
        const imgs = await Promise.all(imgArray.map(async (img) => {
          const getBlurHash = await getPlaiceholder(img.src, options = {
              size: 32
            }
          ).then(({ blurhash }) => {return {
            src: img.src,
            blurhash: blurhash.hash,
            public_id: img.public_id,
            color: img.color,
          }});

          return getBlurHash;
        }));
        console.log(imgs);
        const photos = [...imgs];
        try {
          const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: {...req.body, ...{ slug }, ...{photos}}
          }, { new: true });
          if (photosDelete) {
            try {
              photosDelete.map((photo) => {
                cloudinary.uploader.destroy(photo.public_id, { invalidate: true }, function(error,result) {
                  console.log(result, error) });
             });
            } catch (err) {
              err;
            }
          }
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        err;
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
          try {
            post.public_id.map((item) => {
              cloudinary.uploader.destroy(item, { invalidate: true }, function(error,result) {
                console.log(result, error) });
            });
             post.photos.map((photo) => {
              cloudinary.uploader.destroy(photo.public_id, { invalidate: true }, function(error,result) {
                console.log(result, error) });
            });
            res.status(200).json("Post has been deleted...");
          } catch (err) {
            err;
          }

      } catch (err) {
        res.status(500).json(err);
      }

    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get post
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const q = getSlug(req.query.q);
  const newest = req.query.newest;
  const page = parseInt(req.query.page || 1);
  const num_results_on_page = parseInt(req.query.num_results_on_page || 11);
  // console.log(q);
  try {
    let posts, total_documents, total_pages;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      total_documents = await Post.find({ categories: {
        $in: [catName],
      }}).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      posts = await Post.find({ categories: {
        $in: [catName],
      }}).skip((page - 1) * num_results_on_page).limit(num_results_on_page);

    } else if (q) {
      total_documents = await Post.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      }).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      posts = await Post.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      }).skip((page - 1) * num_results_on_page).limit(num_results_on_page);

    } else if (newest) {
      posts = await Post.find().limit(8).sort({ createdAt: -1 });
    }

    else if (page) {
      total_documents = await Post.countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      posts = await Post.find().skip((page - 1) * num_results_on_page).limit(num_results_on_page).sort({ createdAt: -1 });
      // posts = await Post.find().skip((page - 1) * num_results_on_page).limit(num_results_on_page);
    }
    else {
      posts = await Post.find(); // ưu tiên lấy num_results_on_page do page có thể bằng 1 nên else if (page) được thực hiện
    }
    res.status(200).json({page, num_results_on_page, total_documents, total_pages, posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;