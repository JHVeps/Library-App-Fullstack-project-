import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  // _id?: string
  isbn: string
  genre: string
  title: string
  image: string
  description: string
  publisher: string
  author: string
  status: string
  publishDate: string
  borrowDate: Date
  returnDate: Date
  borrowerId?: mongoose.Schema.Types.ObjectId
  //borrowerId: mongoose.Schema.Types.ObjectId[]
}

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publisher: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  publishDate: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: String,
  },
  returnDate: {
    type: String,
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    //type: String,
    ref: 'User',
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
