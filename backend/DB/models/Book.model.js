import mongoose, { model, Schema, Types } from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        authorId: {
            type: Types.ObjectId,
            required: true,
            ref: "User",
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const BookModel = mongoose.model('Book', bookSchema);
// export default bookModel;