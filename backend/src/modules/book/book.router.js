import { Router } from 'express';
import * as bookController from './book.controller.js';
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../middleware/errorHandling.js';

const router = Router();

// Routes
router.post('/', auth, asyncHandler(bookController.createBook));
router.get('/', asyncHandler(bookController.getAllBooks));
router.get('/:id', asyncHandler(bookController.getBookById));
router.put('/:id', auth, asyncHandler(bookController.updateBook));
router.delete('/:id', auth, asyncHandler(bookController.deleteBook));

export default router;