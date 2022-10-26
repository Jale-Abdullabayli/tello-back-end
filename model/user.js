
const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name!"],
    },
    surname: {
      type: String,
      required: [true, "Please provide a surname!"],
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: [validator.isEmail, "Provide a correct email!"],
    },

    photo: String,
   
    forgetPassword: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please confirm the password!"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },

        message: "Passwords are not the same",
      },

    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetExpires: Date
  },{
    timestamps: true,
}
);

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();
  this.passwordConfirm = undefined;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (realPassword, cryptedPassword) {
  return await bcrypt.compare(realPassword.toString(), cryptedPassword);
};


userSchema.methods.generatePassToken = async function () {
  const resetToken = crypto.randomBytes(48).toString("hex");

  const hashPassword = crypto
    .createHash("md5")
    .update(resetToken)
    .digest("hex");

  this.forgetPassword = hashPassword;
  this.resetExpires = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("user", userSchema);

module.exports = User;