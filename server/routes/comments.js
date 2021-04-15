const express = require("express");
const commentsController = require("../controllers/commentsController");
const router = express.Router();

router.get("/listAll", commentsController.listAllComments, (req, res) => {
  console.log("list all comments router is working");
  res.status(200).json(res.locals.response);
});

router.post("/create", commentsController.createComment, (req, res) => {
  console.log("create comment router is working");
  console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});

module.exports = router;