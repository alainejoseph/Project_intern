var express = require("express");
var router = express.Router();
var adminHelpers = require("../helpers/adminHelper");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/topcards", async (req, res) => {
  adminHelpers
    .getTopCards()
    .then((obj) => {
      res.status(200).json({ obj });
    })
    .catch((err) => {
      res.status(400).json({ status: false });
    });
});

router.get("/getusers", async (req, res) => {
  adminHelpers
    .getUsers(req.session.user._id)
    .then((users) => {
      console.log(users);
      res.status(200).json({ users });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: false });
    });
});

module.exports = router;
