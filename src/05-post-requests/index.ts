import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

//! (app.listen) initiates the server to listen for incoming requests on a specified (PORT). This effectively starts the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

const mockUsers = [
  {
    id: '1',
    name: 'Ivan Gregor Tabalno',
    username: 'igmtdev'
  },
  {
    id: '2',
    name: 'Aiori Lovemir Iveen Tabalno',
    username: 'alioffical'
  },
  {
    id: '3',
    name: 'Christine Joyce Amper',
    username: 'cjamper12'
  }
]

//! Using (express.json()) is recommended because it is built into (express.js), instead of using an extra library like (body-parser)
app.use(express.json())

app.get('/v1/users', (req, res) => {
  return res.status(200).send(mockUsers)
})

//! This endpoint (app.post) is used to create a new data
app.post('/v1/users', (req, res) => {
  const { body } = req

  const newUser = {
    id: String(Number(mockUsers[mockUsers.length - 1].id) + 1),
    ...body
  }

  mockUsers.push(newUser)

  return res.status(201).send(newUser)
})
