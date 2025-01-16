import mongoose, { Document, Schema } from "mongoose";
interface IUser extends Document {
  email: string;
  displayname: string;
  password: string;
  image: string;
  cloudinaryid: string;
}

const googleAuthSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayname: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    cloudinaryid: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

export const googleAuthModel = mongoose.model<IUser>(
  "googleuser",
  googleAuthSchema
);
