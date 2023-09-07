const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    unique: "Email already exists",
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email must be in valid format",
    ],
  },
  created: {
    type: Date,
    default: Date.now,
  },

  updated: Date,

  hash_password: {
    type: String,
    required: "Password is required",
  },

  salt: String,
});

userSchema
  .virtual("password")
  .set((password) => {
    this._password = password;
    this.salt = this.makeSalt();
    this.hash_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

userSchema.methods = {
  authenticate: (plainText) => {
    return this.encryptPassword(plainText) === this.hash_password;
  },
  encryptPassword: (password) => {
    if (!password) return "";
    try {
      crypto.createHmac("sha1", this.salt).update(password).digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: () => {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

userSchema.path("hash_password").validate((v) => {
  if (this._password && this._password.length < 6) {
    this.invalidate("Password", "Password must be atleast 6 charaters");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

module.exports = new mongoose.model("user", userSchema);
