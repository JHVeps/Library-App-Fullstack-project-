import express from 'express'
import checkAuth from '../middlewares/checkAuth'

import {
  createBook,
  findByIsbn,
  deleteBook,
  findAllBooks,
  findAllTitle,
  findAllAuthor,
  findAllStatus,
  updateBook,
  findByGenre,
  updateUserId,
} from '../controllers/book.controller'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAllBooks)
router.get('/title', findAllTitle)
router.get('/author', findAllAuthor)
router.get('/status', findAllStatus)
router.get('/:isbn', findByIsbn)
router.get('/book/:genre', findByGenre)
// Protected Admin Routes, checkAuth not working properly yet
router.put('/:bookId', updateBook)
router.put('/:bookId', updateUserId)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
