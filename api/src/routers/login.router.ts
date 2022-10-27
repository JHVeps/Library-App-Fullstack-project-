import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.post(
  '/',

  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user: any = req.user
    if (user) {
      const token = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        JWT_SECRET,
        {
          expiresIn: '1h',
        }
      )

      console.log('req:', req.user)
      //   res.json({ msg: 'done', user: req.user })
      res.json({ token })
    }
  }
)

export default router
