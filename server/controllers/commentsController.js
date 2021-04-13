const { Comments } = require("../models/commentsModel");
const commentsController = {};

// List all comments
commentsController.listAllComments = (req, res, next) => {
  const requestBody = req.body;
  Comments.find({})
    .then((data) => {
      res.locals.response = data;
      console.log("commentsController.listAllComments", "all comments listed");
      next();
    })
    .catch((err) => {
      next({
        log: `List All Comments - ERROR: ${err}`,
        message: {
          err: "Error occured in commentsController.listAllComments",
          message: err,
        },
      });
    });
};

// Post a Comment to a Resource, as a User
commentsController.createComment = (req, res, next) => {
  const requestBody = req.body;
  Comments.create({
    text: requestBody.text,
    userId: requestBody.userId,
    resourceId: requestBody.resourceId,
  })
    .then((data) => {
      res.locals.response = data;
      console.log("commentsController.createComment", "comment created");
      next();
    })
    .catch((err) => {
      next({
        log: `Create Comment - ERROR: ${err}`,
        message: {
          err: "Error occured in commentsController.createComment",
          message: err,
        },
      });
    });
};

module.exports = commentsController;
