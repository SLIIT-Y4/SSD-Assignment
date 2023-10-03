

const Login = require("../modal/login.modal");
const mongoose = require("mongoose");
const { validationResult } = require('express-validator');

const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  if (req.body) {
    const login = new Login(req.body);
    await login
      .save()
      .then((data) => res.status(200).send({ data: data }))
      .catch((err) => res.status(200).send(err));
  }
};

const userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  if (req.body) {
    await Login.findOne({ email: req.params.email })
      .then((data) => {
        res.status(200).send({ data });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

const lockUser = async (req, res) => {
  const { email } = req.body;

  console.log(`Attempting to lock user with email: ${email}`);

  try {
    const user = await Login.findOne({ email: email }).lean();
    console.log("Current state of user:", user);

      if (!user) {
          console.error(`User with email: ${email} not found.`);
          return res.status(400).send({ error: "User not found." });
      }

      user.isLocked = true;
      console.log("Trying to lock user with email:", email);
      const updated = await Login.updateOne({ email: email }, { $set: { isLocked: true } });
console.log("Update operation result:", updated);


      console.log(`User with email: ${email} has been locked.`);
      res.status(200).send({ message: "User locked successfully." });
  } catch (error) {
      console.error(`Failed to lock user with email: ${email}. Reason: ${error.message}`);
      res.status(500).send({ error: `Failed to lock user. Reason: ${error.message}` });
  }
};



const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  await Login.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Deleted" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  add,
  userLogin,
  deleteUser,
  lockUser
};
