import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  // _id?: string
  firstName: string
  lastName: string
  email: string
  // userName: string
  // password: string
  isAdmin: boolean
  books: mongoose.Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // userName: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 4,
  // },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
