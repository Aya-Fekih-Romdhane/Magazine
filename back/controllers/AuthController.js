const { Validator } = require("node-input-validator");
const user = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const v = new Validator(req.body, {
    FirstName: "required|minLength:2|maxLength:100",
    LastName: "required|minLength:2|maxLength:100",
    email: "required|email",
    password: "required",
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).send(v.errors);
  }

  try {
    const newUser = new user({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      email: req.body.email,
      phone: req.body.phone,
      adress: req.body.adress,
      password: req.body.password,
    });

    let userData = await newUser.save();
    return res.status(200).send({
      message: "Registration successfull",
      data: userData,
    });
  } catch (err) {
    return res.status(400).send({
      message: "email is already registered ",
      data: err,
    });
  }
};

exports.login = async (req, res) => {
  const v2 = new Validator(req.body, {
    email: "required|email",
    password: "required",
  });

  const matched = await v2.check();

  if (!matched) {
    return res.status(422).send(v2.errors);
  }

  try {
    let userData = await user.findOne({ email: req.body.email });
    if (userData) {
      if (bcrypt.compareSync(req.body.password, userData.password)) {
        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        let token = jwt.sign(
          {
            data: userData,
          },
          jwt_secret,
          { expiresIn: "12h" }
        );

        return res.status(200).send({
           message: "Login successfull",
           data: userData,
           myToken : token,
        });
      } else {
        return res.status(400).send({
          message: "Incorrect credentials",
          data: {},
        });
      }
    } else {
      return res.status(400).send({
        message: "User is not registered",
        data: {},
      });
    }
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};
