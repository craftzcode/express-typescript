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

//! (:id) Route Parameter: Represents the unique identifier of a user
app.get('/v1/users/:id', (req, res) => {
  //! (parseInt) Converts the string (id) to a numeric value
  const parsedId = parseInt(req.params.id)

  //! (isNaN) Checks if the (id) is not a valid number
  if (isNaN(parsedId)) return res.sendStatus(400)

  //! Check if the user with the specified (id) exists in the (mockUsers) data
  const existedUser = mockUsers.find(user => user.id === parsedId)

  if (!existedUser) return res.sendStatus(404)

  return res.send(existedUser)
})

//! (app.listen) initiates the server to listen for incoming requests on a specified (PORT). This effectively starts the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
