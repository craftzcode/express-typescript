import { Router } from 'express'

import products from './products'

const router = Router()

export default () => {
  products(router)

  return router
}
