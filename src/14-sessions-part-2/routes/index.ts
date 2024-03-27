import { Router } from 'express'

import products from './products'
import users from './users'

const router = Router()

export default () => {
  products(router)
  users(router)

  return router
}
