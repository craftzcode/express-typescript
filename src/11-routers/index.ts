import express from 'express'

import { loggingMiddleware } from './middlewares'
import routes from './routes'

const app = express()

const PORT = process.env.PORT || 3000

//! (app.listen) initiates the server to listen for incoming requests on a specified (PORT). This effectively starts the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

app.use(express.json())
app.use(loggingMiddleware)
app.use(routes)
