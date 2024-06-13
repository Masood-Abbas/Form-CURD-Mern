const fs = require("fs");
const path = require("path");
const User = require("../../model/user");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

const getNextId = async () => {
  try {
    const lastForm = await User.findOne().sort({ id: -1 });
    return lastForm ? lastForm.id + 1 : 1;
  } catch (error) {
    throw new Error("Error fetching the next user ID");
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = await getNextId();
    const result = await User.create({
      id: id,
      name: name,
      email: email,
      password: password,
      file: req.file ? req.file.filename : "default-file.jpg",
    });
    console.log(result);
    res
      .status(201)
      .json({ message: "User successfully created", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// login

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found." });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Login  successful", data: user, token: token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// get all user
exports.showdata = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ message: "Get data successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};
// get user by id
exports.showdatabyid = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error });
  }
};
// update user api
exports.editdata = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (req.file) {
      if (user.file && user.file !== "default-file.jpg") {
        const oldFilePath = path.join(__dirname, "../public/upload", user.file);
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error("Error deleting old file:", err);
          }
        });
      }
      updates.file = req.file.filename;
    }

    const updatedUser = await User.findOneAndUpdate({ id }, updates, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).send({ message: "Error updating user", error });
  }
};
//? delete user by id
exports.deletedata = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Error deleting user", error });
  }
};
