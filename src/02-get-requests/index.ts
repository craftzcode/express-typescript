import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

//! (req, request) To get a data from (body), to access (cookies), to access (headers), to access (params), or to access (query)
//! (res || response) To send back data, text, html, or json to the user
app.get('/', (req, res) => {
  // Text
  // res.send('Hello, World')

  // Json
  // res.send({ message: 'Hello' })

  // Status + Json
  res.status(200).send({ message: 'Hello' })
})

//! (http://localhost:3000/v1/users) api route
app.get('/v1/users', (req, res) => {
  res.send([
    {
      id: 1,
      username: 'ivan',
      displayName: 'Ivan'
    },
    {
      id: 2,
      username: 'ali',
      displayName: 'Ali'
    },
    {
      id: 3,
      username: 'christine',
      displayName: 'Christine'
    }
  ])
})

//! (app.listen) Allows you to listen to a (PORT) for incoming requests, this actually start up the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
