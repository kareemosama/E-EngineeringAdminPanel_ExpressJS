const express = require("express");
const router = express.Router();
var User = require("../../Controller/user/userController");
var Login_services = require("../../Service/signServices");

//get users page
router.get("/users", Login_services.verifyToken, User.getUsers);

router.get("/createUser", Login_services.verifyToken, async (req, res) => {
  res.render("user/create", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
  //res.render('user/create')
});

router.get("/updateUser", User.updateUser);

router.get("/user", Login_services.verifyToken, User.getUserDetails);

//API for Users CRUD
router.post("/api/users", User.create);

router.get("/api/users", User.find);

router.put("/api/users/:id", User.update);

router.delete("/api/users/:id", User.delete);

module.exports = router;
