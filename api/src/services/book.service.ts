import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findByIsbn = async (isbn: string): Promise<BookDocument> => {
  const foundBook = await Book.findOne({ isbn })
  if (!foundBook) {
    throw new NotFoundError(`Book ${isbn} not found`)
  }
  // if (foundBook && foundBook.borrowerId.length > 0) {
  //   foundBook.status = 'Not Available'
  //   return foundBook.populate('borrowerId')
  // }
  // if (foundBook && foundBook.borrowerId.length == 0) {
  //   foundBook.status = 'Available'
  // }
  return foundBook
}

const findAllBooks = async (): Promise<BookDocument[]> => {
  const foundBooks = await Book.find().populate('borrowerId')
  if (!foundBooks) {
    throw new NotFoundError('Books not found')
  }
  return foundBooks
}

const findAllTitle = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1 })
}

const findAllAuthor = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ author: 1 })
}
//find all books with no borrowers / all available books
const findAllStatus = async (): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({ borrowerId: { $size: 0 } })

  return foundBooks
}

//find all books with genre: string ?
const findByGenre = async (genre: string): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({ genre })
  if (!foundBooks) {
    throw new NotFoundError(`Books ${genre} not found`)
  }
  return foundBooks
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findByIsbn,
  findAllBooks,
  findAllTitle,
  findAllAuthor,
  findAllStatus,
  findByGenre,
  update,
  deleteBook,
}
