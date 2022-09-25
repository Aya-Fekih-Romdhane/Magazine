const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema(
  {
    FirstName: { type: String, default: "" },
    LastName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    adress: { type: String, default: "" },
    password: String,
    profile_image: { type: String, default: "" },
    profession: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", schema);

module.exports = User;
