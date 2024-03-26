import express, { NextFunction, Request, Response } from 'express'

const app = express()

const PORT = process.env.PORT || 3000

//! (app.listen) initiates the server to listen for incoming requests on a specified (PORT). This effectively starts the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`METHOD:${req.method}`)
  console.log(`URL:${req.url}`)

  //! This function (next) is a callback used to signal the end of the current middleware
  // Call the (next) function to proceed to the next middleware or route handler
  next()
}

//! This (app.use) sets up the (loggingMiddleware) globally for all routes
// app.use(loggingMiddleware)

//! This will sets up the (loggingMiddleware) only for the specific route
app.get('/', loggingMiddleware, (req, res) => {
  return res.sendStatus(200)
})
