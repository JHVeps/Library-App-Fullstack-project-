import GoogleTokenStrategy from 'passport-google-id-token'
import { ParsedToken, VerifiedCallback } from '../util/utils'
import User from '../models/User'
import { GOOGLE_CLIENT_ID, ADMIN } from '../util/secrets'

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        const email = parsedToken.payload.email
        console.log('googleId:', googleId)
        console.log('parsedToken:', parsedToken)

        let user: any = await User.findOne({ email })
        if (!user) {
          console.log('============CREATING A NEW USER')

          user = new User({
            email,
            firstName: parsedToken.payload.given_name,
            lastName: parsedToken.payload.family_name,
            isAdmin: email === ADMIN,
          })
          user.save()
        }

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}
