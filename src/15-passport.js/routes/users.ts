import { Request, Response, Router } from 'express'

import { Session } from 'express-session'
import { matchedData, validationResult } from 'express-validator'

import { loginSchema } from '../schemas'

import '../strategies/local-strategy'

import passport from 'passport'

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
  // router.post(
  //   '/login',
  //   loginSchema,
  //   (req: Request & { session: Session & { user?: TUser } }, res: Response) => {
  //     const errors = validationResult(req)

  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({ errors: errors.mapped() })
  //     }

  //     const { username, password } = matchedData(req)

  //     const existedUser = mockUsers.find(user => user.username === username)

  //     if (!existedUser || existedUser.password !== password)
  //       return res.status(401).send({ message: 'Invalid username or password' })

  //     req.session.user = existedUser
  //     return res.status(200).send(existedUser)
  //   }
  // )

  // router.get(
  //   '/auth/status',
  //   (req: Request & { session: Session & { user?: TUser } }, res: Response) => {
  //     if (!req.session.user)
  //       return res.status(401).send({ message: 'Unauthorize' })

  //     return res.status(200).send(req.session.user)
  //   }
  // )

  router.post(
    '/login',
    loginSchema,
    passport.authenticate('local'),
    (req: Request, res: Response) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() })
      }

      res.sendStatus(200)
    }
  )

  router.get('/auth/status', (req, res) => {
    if (!req.user) return res.status(401).send({ message: 'Unauthorize' })

    return res.status(200).send(req.user)
  })
}
