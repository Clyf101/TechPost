const db = require('../models');

// Create a new comment
exports.createComment = (req, res) => {
  db.Comment.create({
    text: req.body.text,
    PostId: req.params.postId,
    UserId: req.session.user.id
  })
  .then(comment => {
    res.redirect(`/posts/${req.params.postId}`);
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/posts/${req.params.postId}`);
  });
};

// Delete a comment
exports.deleteComment = (req, res) => {
  db.Comment.destroy({
    where: { id: req.params.commentId }
  })
  .then(() => {
    res.redirect(`/posts/${req.params.postId}`);
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/posts/${req.params.postId}`);
  });
};
