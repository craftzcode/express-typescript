import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

//! (app.listen) Allows you to listen to a (PORT) for incoming requests, this actually start up the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
