import { UserModel } from "../../../DB/models/User.model.js";
import  {BookModel}  from "../../../DB/models/Book.model.js";

// Get a single user's profile
export const getProfile = async (req, res, next) => {
        const user = await UserModel.findById(req.user._id);
        if (!user) {
                return next(new Error("User not found", { cause: 404 }));
        }
        return res.status(200).json({ message: "success", user });
};

// Get books added by the logged-in user
export const getUserBooks = async (req, res) => {
        const books = await BookModel.find({ authorId: req.user._id });

        if (!books) {
                return next(new Error("No books found for this user", { cause: 404 }));
        }
        return res.status(200).json({ count: books.length, data: books });
};