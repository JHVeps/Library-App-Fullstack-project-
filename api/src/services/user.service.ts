import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (_id: string): Promise<UserDocument> => {
  const foundUser = await User.findOne({ _id })

  if (!foundUser) {
    throw new NotFoundError(`User ${_id} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ lastName: 1 }).populate('books', 'title image')
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const borrowBooks = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const borrowedBooks = update.books
  const foundUser = await User.findOneAndUpdate(
    { userId: userId },
    { $push: { books: borrowedBooks } },
    { returnDocument: 'after' }
  )
  console.log('updated', foundUser)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  borrowBooks,
  deleteUser,
}
