import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: "string",
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: { type: "string", required: true, trim: true, index: true },
    avatar: {
      type: "string", //cloudinary URL
      required: true,
    },
    coverImage: { type: "string" },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    password: { type: string, required: [true, "Password is required"] },
    refreshToken: { type: string },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){

  if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()

});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
      }, process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )
}

userSchema.methods.generateRefreshToken = async function(){
  return jwt.sign(
    {
      _id: this._id
    }, process.env.REFRESH_ACCESS_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User", userSchema);
