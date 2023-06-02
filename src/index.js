const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
// For SSL error
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const app = express();
app.use(cors());
app.use(express.json());
app.use(require("./routes/index"));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send...");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
