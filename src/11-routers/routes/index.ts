import { Router } from 'express'

import productsRouter from './products'

const router = Router()

router.use(productsRouter)

export default router
