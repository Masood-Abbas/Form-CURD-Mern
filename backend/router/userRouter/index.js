const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const auth=require("../../middleware/auth/authToken")
const {
  signup,
  login,
  showdata,
  editdata,
  showdatabyid,
  deletedata,
} = require("../../controller/userController");

router.post("/signup", upload.single("file"), signup);
router.post("/login", login);
router.get("/signup",showdata);
router.get("/signup/:id", showdatabyid);
router.patch("/signup/:id", upload.single("file"), editdata);
router.delete("/signup/:id", upload.single("file"), deletedata);

module.exports = router;
