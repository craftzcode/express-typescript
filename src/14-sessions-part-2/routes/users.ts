import { Request, Response, Router } from 'express'

import { Session } from 'express-session'
import { matchedData, validationResult } from 'express-validator'

import { loginSchema } from '../schemas'

interface TUser {
  id: string
  username: string
  password: string
}

const mockUsers: TUser[] = [
  {
    id: '1',
    username: 'igmtdev',
    password: 'alibee17'
  }
]

export default (router: Router) => {
  router.post(
    '/login',
    loginSchema,
    (req: Request & { session: Session & { user?: TUser } }, res: Response) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() })
      }

      const { username, password } = matchedData(req)

      const existedUser = mockUsers.find(user => user.username === username)

      //! Check if there's an (existedUser) or check if the (existedUser.password) is correct
      if (!existedUser || existedUser.password !== password)
        return res.status(401).send({ message: 'Invalid username or password' })

      //! After logging in add a (user) to the (session)
      req.session.user = existedUser
      return res.status(200).send(existedUser)
    }
  )

  router.get(
    '/auth/status',
    (req: Request & { session: Session & { user?: TUser } }, res: Response) => {
      //! Check if there's no (user) on (session)
      if (!req.session.user)
        return res.status(401).send({ message: 'Unauthorize' })

      return res.status(200).send(req.session.user)
    }
  )
}
