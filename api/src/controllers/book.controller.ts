import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import bookService from '../services/book.service'
import { BadRequestError } from '../helpers/apiError'

// POST /book
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      isbn,
      genre,
      title,
      image,
      description,
      publisher,
      author,
      status,
      publishDate,
      borrowDate,
      returnDate,
      borrowerId,
    } = req.body

    const book = new Book({
      isbn,
      genre,
      title,
      image,
      description,
      publisher,
      author,
      status,
      publishDate,
      borrowDate,
      returnDate,
      borrowerId,
    })

    await bookService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await bookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await bookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookService.deleteBook(req.params.bookId)
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/:isbn
export const findByIsbn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findByIsbn(req.params.isbn))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    }
    next(error)
  }
}

// GET /books
export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAllBooks())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    }
    next(error)
  }
}

// GET /books (sort by title)
export const findAllTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAllTitle())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    }
    next(error)
  }
}

// GET /books (sort by author)
export const findAllAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAllAuthor())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    }
    next(error)
  }
}

// GET /books (sort by status)
export const findAllStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAllStatus())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    }
    next(error)
  }
}

// GET /books by genre
export const findByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findByGenre(req.params.genre))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    }
    next(error)
  }
}
