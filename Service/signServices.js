var Userdb = require("../Model/user/userdb");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const user = await Userdb.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ message: "Email Doesnt exist" });

  if (user.password != req.body.password) {
    return res.status(400).json({ message: " Invalid password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "120s",
    }
  );

  if (req.cookies[`${user._id}`]) {
    req.cookies[`${user._id}`] = "";
  }

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌", user: user, token });
};

exports.logout = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    // console.log("no tokeeen")
    return res.sendStatus(403).json({ message: "No token found" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = data.id;
    req.userRole = data.role;

    return next();
  } catch {
    console.log("Invalid tokeen");
    // res.json({ message: "invalid token " });
    res.redirect("/");
  }
};
