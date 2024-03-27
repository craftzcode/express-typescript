import express, { Request, Response } from 'express'

import cookieParser from 'cookie-parser'
import session, { Session } from 'express-session'

import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

app.use(express.json())
// app.use(cookieParser())
app.use(cookieParser('secret'))
//! (app.use(session)) This middleware generates a new (session) for each new browser request
app.use(
  session({
    secret: 'igmtdev',
    //! (saveUninitialized: false) All (session) uninitialized will not be saved unless modified, optimizing memory usage
    saveUninitialized: false,
    //! (resave: false) Prevent resaving sessions that have not been modified
    resave: false,
    cookie: {
      maxAge: 60000
    }
  })
)
app.use(routes())

app.get(
  '/',
  (
    req: Request & { session: Session & { visited?: boolean } },
    res: Response
  ) => {
    console.log(req.session)
    console.log(req.session.id)

    //! Adding the property (visited = true) to the session, indicating a user visit
    //! This ensures that the (session ID) remains constant for subsequent visits in the same browser
    req.session.visited = true

    res.cookie('hello', 'world', { maxAge: 60000, signed: true })
    res.send('Hello World')
  }
)
