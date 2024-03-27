import express from 'express'

import cookieParser from 'cookie-parser'

import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

app.use(express.json())
//! (cookieParser()) To parse (cookies)
// app.use(cookieParser())
app.use(cookieParser('secret'))
app.use(routes())

app.get('/', (req, res) => {
  // res.cookie('hello', 'world', { maxAge: 60000 })
  res.cookie('hello', 'world', { maxAge: 60000, signed: true })
  res.send('Hello World')
})
