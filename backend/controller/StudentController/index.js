const Student = require("../../model/student");

exports.addStudent = async (req, res) => {
  try {
    const { name, age } = req.body;
    const id = req.user.id; 
    const newStudent = new Student({
      user: id,
      name: name,
      age: age,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "Student added successfully", data: savedStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Error adding student", error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    const userId = req.user.id;
    const students = await Student.find({ user: userId });

    res.status(200).json({ message: "Students retrieved successfully", data: students });
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ message: "Error retrieving students", error: error.message });
  }
};
