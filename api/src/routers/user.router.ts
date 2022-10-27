import express from 'express'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
  updateBooks,
} from '../controllers/user.controller'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', findAll)
router.get('/:userId', findById)
router.put('/:userId', updateUser)
router.put('/borrow/:userId', updateBooks)
router.delete('/:userId', deleteUser)
router.post('/', createUser)

export default router
