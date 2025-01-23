import mongoose, { Schema, model } from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmEmail: {
            type: Boolean,
            default: false,
        },
        changePasswordTime: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);


export const UserModel = model("User", userSchema);
// export default userModel;