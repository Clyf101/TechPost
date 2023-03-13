const db = require('../models');

// Get all posts
exports.getAllPosts = (req, res) => {
  db.Post.findAll({
    include: [db.User, db.Comment]
  })
  .then(posts => {
    res.render('posts', { posts });
  })
  .catch(err => {
    console.log(err);
    res.render('error');
  });
};

// Get a single post and its comments
exports.getSinglePost = (req, res) => {
  db.Post.findOne({
    where: { id: req.params.postId },
    include: [db.User, db.Comment]
  })
  .then(post => {
    res.render('single-post', { post });
  })
  .catch(err => {
    console.log(err);
    res.render('error');
  });
};

// Create a new post
exports.createPost = (req, res) => {
  db.Post.create({
    title: req.body.title,
    body: req.body.body,
    UserId: req.session.user.id
  })
  .then(post => {
    res.redirect('/posts');
  })
  .catch(err => {
    console.log(err);
    res.render('error');
  });
};

// Update a post
exports.updatePost = (req, res) => {
  db.Post.update({
    title: req.body.title,
    body: req.body.body
  },
  {
    where: { id: req.params.postId }
  })
  .then(() => {
    res.redirect(`/posts/${req.params.postId}`);
  })
  .catch(err => {
    console.log(err);
    res.render('error');
  });
};

// Delete a post
exports.deletePost = (req, res) => {
  db.Post.destroy({
    where: { id: req.params.postId }
  })
  .then(() => {
    res.redirect('/posts');
  })
  .catch(err => {
    console.log(err);
    res.render('error');
  });
};
