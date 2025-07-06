var express = require("express");
var router = express.Router();
const User = require("../Models/User");
const Group = require("../Models/Group");
const auth = require("../middleWare/authMid");
const path = require("path");
const fileSchema = require("../Models/Files");
const { createSecretToken } = require("../util/secretToken");
const { getGroupUsers } = require("../helpers/groupHelpers");
const fs = require("fs");

/* GET home page. */
router.get("/", (req, res, next) => {
  const user = req.session.user;
  console.log("auth test \n", user);
  if (!user) {
    res.status(404).json({ status: false });
  } else {
    res.status(200).json({ user });
    next();
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  const saveUser = await newUser.save();
  req.session.user = saveUser;
  res
    .status(201)
    .json({ message: "User logged in successfully", success: true });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  // Simulate login logic
  if (user) {
    if (user.pass == req.body.pass) {
      req.session.user = user;
      res.json({ message: "Logged in", user: user });
    } else {
      res.status(400).json({ message: "incorrect password" });
    }
  } else {
    res.status(400).json({ message: "Missing user" });
  }
});

router.get("/logout", (req, res) => {
  try {
    if (req.session) {
      req.session.destroy();
      res.cookie("connect.sid", "none", { expires: new Date() + 1000 });
      res.json({ status: true });
    }
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ status: false });
  }
});

router.post("/creategroup", async (req, res) => {
  console.log(req.body);
  const group = { ...req.body, createdAt: new Date().toLocaleString() };
  const newGroup = new Group(group);
  const save = newGroup.save();
  res.json({ status: true });
});

router.get("/getgroups", async (req, res) => {
  let groups = await Group.find();
  res.json({ group: groups });
});

router.post("/joingroup/:id", async (req, res) => {
  try {
    let group = await Group.findById(req.params.id);
    group.members.push(req.body.user);
    const saveGroup = await group.save();
    res.json({ status: true });
  } catch (err) {
    console.log(err);
    res.json({ status: false });
  }
});

router.get("/getgroup/:id", async (req, res) => {
  try {
    let group = await Group.findById(req.params.id);

    res.json({ status: true, group });
  } catch (err) {
    res.json({ status: false });
  }
});

router.post("/uploadmaterial/:id", async (req, res) => {
  const File = req.files.file;
  console.log(File);
  if (req.params.id != undefined) {
    const filename = `${Date().toLocaleString()}_${File.name}`;
    const uploadPath = path.join(
      "public",
      "materials",
      `${req.params.id}`,
      filename,
    );
    var fileObj = new fileSchema({
      filename: filename,
      originalName: File.name,
      groupId: req.params.id,
    });
    console.log(uploadPath);
    File.mv(uploadPath, (err) => {
      if (err) {
        console.log("materials post route\n", err);
      }
      fileObj
        .save()
        .then(() => {
          console.log("file uploaded");
          res.status(200).json({ status: true });
        })
        .catch((err) => {
          console.log("upload db error\n", err);
        });
    });
  } else {
    console.log("upload err");
    res.status(400).json({ status: false });
  }
});

router.get("/getmaterials/:id", async (req, res) => {
  console.log(`req id : ${req.params.id}`);
  if (req.params.id != undefined) {
    try {
      const files = await fileSchema
        .find({ groupId: req.params.id })
        .select(["+originalName", "+filename"]);
      console.log("get files : ", files);
      res.json({ files });
    } catch (err) {
      console.log("get mat err \n", err);
      res.status(500).json({ error: "Error fetching files" });
    }
  }
});

router.get("/download/:groupId/:filename", async (req, res) => {
  try {
    if (req.params.filename != undefined && req.params.groupId != undefined) {
      const file = await fileSchema.findOne({
        filename: req.params.filename,
        groupId: req.params.groupId,
      });
      if (!file) {
        return res.status(404).send("File not found or access denied.");
      }
      const filePath = path.join(
        "public",
        "materials",
        file.groupId,
        file.filename,
      );

      if (!fs.existsSync(filePath)) {
        return res.status(404).send("File missing from server.");
      }

      res.download(filePath, file.originalName);
    }
  } catch (err) {
    console.log("download err", err);
  }
});

router.get("/getgroupusers/:id", async (req, res) => {
  // console.log(`group id ${req.params.id}`);
  if (req.params.id != undefined) {
    getGroupUsers(req.params.id)
      .then((users) => {
        console.log(users);
        res.status(200).json({ users });
      })
      .catch((err) => {
        // console.log(`error in geting users \n ${err}`);
      });
  }
});

router.get("/me", (req, res) => {
  if (req.session.user) {
    console.log("me", req.session.user);
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

router.post("/profile", async (req, res) => {
  console.log(req.body);
  User.updateOne(req.body)
    .then((resdata) => {
      req.session.user = req.body;
      console.log("updated", resdata);
      res.status(200).json({ status: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: false });
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.cookie("connect.sid", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000), // expires in 10ms
    }); // default session cookie name
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
