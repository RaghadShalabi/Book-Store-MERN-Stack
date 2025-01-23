import  {BookModel}  from '../../../DB/models/Book.model.js';

// Create a new book
export const createBook = async (req, res, next) => {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
        return next(new Error("Send all required fields: title, author, publishYear", { cause: 400 }));
    }

    const newBook = { title, author, publishYear, authorId: req.user._id };
    const book = await BookModel.create(newBook);

    return res.status(201).json({ message: "Book created successfully", book });
};

// Get all books
export const getAllBooks = async (req, res, next) => {
    const books = await BookModel.find({});
    return res.status(200).json({ count: books.length, data: books });
};

// Get a book by ID
export const getBookById = async (req, res, next) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
        return next(new Error("Book not found", { cause: 404 }));
    }
    return res.status(200).json(book);
};

// Update a book
export const updateBook = async (req, res, next) => {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
        return next(new Error("Send all required fields: title, author, publishYear", { cause: 400 }));
    }
    const book = await BookModel.findById(id);
    if (!book) {
        return next(new Error("Book not found", { cause: 404 }));
    }

    if (book.authorId.toString() !== req.user._id.toString()) {
        return next(new Error("You are not authorized to update this book", { cause: 403 }));
    }

    // تحديث الكتاب
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: "Book updated successfully", book: updatedBook });
};

// Delete a book
export const deleteBook = async (req, res, next) => {
    const { id } = req.params;
    
    // التحقق من أن المستخدم هو مالك الكتاب
    const book = await BookModel.findById(id);
    if (!book) {
        return next(new Error("Book not found", { cause: 404 }));
    }

    if (book.authorId.toString() !== req.user._id.toString()) {
        return next(new Error("You are not authorized to delete this book", { cause: 403 }));
    }

    // حذف الكتاب
    await BookModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Book deleted successfully" });
};