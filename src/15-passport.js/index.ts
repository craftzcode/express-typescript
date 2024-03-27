import express, { Request, Response } from 'express'

import cookieParser from 'cookie-parser'
import session, { Session } from 'express-session'
import passport from 'passport'

import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

app.use(express.json())
// app.use(cookieParser())
app.use(cookieParser('secret'))
app.use(
  session({
    secret: 'igmtdev',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(routes())

app.get(
  '/',
  (
    req: Request & { session: Session & { visited?: boolean } },
    res: Response
  ) => {
    console.log(req.session)
    console.log(req.session.id)

    req.session.visited = true

    res.cookie('hello', 'world', { maxAge: 60000, signed: true })
    res.send('Hello World')
  }
)
