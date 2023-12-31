const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./src/config/config");
const app = express();

const https = require("https");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

const options = {
  key: fs.readFileSync("./security/cert.key"),
  cert: fs.readFileSync("./security/cert.pem"),
};

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello Node!");
});

const groupApi = require("./src/api/groups.api");
app.use("/group", groupApi());

const topicApi = require("./src/api/topics.api");
app.use("/topic", topicApi());

const supApi = require("./src/api/sup.api");
app.use("/sup", supApi());

const cosupApi = require("./src/api/cosup.api");
app.use("/cosup", cosupApi());

const userApi = require("./src/api/admin.api");
app.use("/admin", userApi());

const loginApi = require("./src/api/login.api");
app.use("/login", loginApi());

const studentApi = require("./src/api/student.api");
app.use("/student", studentApi());

const staffApi = require("./src/api/staff.api");
app.use("/staff", staffApi());

const subTypeApi = require("./src/api/subTypes.api");
app.use("/subtype", subTypeApi());

const uploadDocApi = require("./src/api/uploadDoc.api");
app.use("/uploadDoc", uploadDocApi());

const uploadSubApi = require("./src/api/submission.api");
app.use("/submission", uploadSubApi());

const documentmarkingAPI = require("./src/api/documentmarking.api");
app.use("/documentmarking", documentmarkingAPI());

const presentationmarkingAPI = require("./src/api/presentationmarking.api");
app.use("/presentationmarking", presentationmarkingAPI());

const evaluationAPI = require("./src/api/evaluation.api");
app.use("/evaluation", evaluationAPI());

const panelApi = require("./src/api/panel.api");
app.use("/panel", panelApi());

// app.listen(PORT, () => {
//   console.log(`App listening at http://localhost:${PORT}`);
// });

const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
