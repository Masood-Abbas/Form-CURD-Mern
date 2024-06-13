const express = require("express");
const router = express.Router();
const { addStudent, getStudents } = require("../../controller/StudentController");
const auth = require("../../middleware/auth/authToken");

router.post("/student", auth, addStudent);
router.get("/student", auth, getStudents);

module.exports = router;
