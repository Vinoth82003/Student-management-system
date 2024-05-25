const mongoose = require("mongoose");
const TopStudents = require("./models/TopStudents"); // Adjust the path to your model

mongoose
  .connect("mongodb://localhost:27017/student-ms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const sections = ["A", "B", "C"];
const ranks = ["1", "2", "3"];
const imagePaths = [
  "/user-images/female-1.jpg",
  "/user-images/female-2.jpg",
  "/user-images/female-3.jpg",
  "/user-images/male-1.jpg",
  "/user-images/male-2.jpg",
  "/user-images/male-3.png",
];

const students = [];

for (let std = 1; std <= 12; std++) {
  sections.forEach((sec) => {
    ranks.forEach((rank, index) => {
      students.push({
        name: `Student_${std}_${sec}_${rank}`,
        rollno: `Roll_${std}_${sec}_${rank}`,
        std: std.toString(),
        sec: sec,
        rank: rank,
        imagePath: imagePaths[index % imagePaths.length],
      });
    });
  });
}

TopStudents.insertMany(students)
  .then(() => {
    console.log("Data inserted successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data: ", error);
    mongoose.connection.close();
  });
