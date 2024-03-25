import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

const mockUsers = [
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
]

app.get('/', (req, res) => {
  // Text
  // res.send('Hello, World')

  // Json
  // res.send({ message: 'Hello' })

  // Status + Json
  res.status(200).send({ message: 'Hello' })
})

app.get('/v1/users', (req, res) => {
  res.send(mockUsers)
})

//! (:id) Route Parameter
app.get('/v1/users/:id', (req, res) => {
  //! (parseInt) Converting the (string id) to (numeric id)
  const parsedId = parseInt(req.params.id)

  //! (isNaN) Check if the (id) is not a number
  if (isNaN(parsedId)) return res.sendStatus(400)

  //! check if the (Route Parameter) (:id) is existing on (mockUsers) data
  const existedUser = mockUsers.find(user => user.id === parsedId)

  if (!existedUser) return res.sendStatus(404)

  return res.send(existedUser)
})

//! (app.listen) Allows you to listen to a (PORT) for incoming requests, this actually start up the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
