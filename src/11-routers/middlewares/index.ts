import { NextFunction, Request, Response } from 'express'

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`METHOD:${req.method}`)
  console.log(`URL:${req.url}`)

  next()
}
