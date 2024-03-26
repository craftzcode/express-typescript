import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

//! (app.listen) Allows you to listen to a (PORT) for incoming requests, this actually start up the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

//! (req, request) Accesses data from the request body, cookies, headers, params, or query
//! (res || response) Sends data, text, HTML, or JSON back to the user
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
