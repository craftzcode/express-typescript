import { Request, Response, Router } from 'express'

import { checkSchema, matchedData, validationResult } from 'express-validator'

import {
  createValidationSchema,
  filterValidationSchema
} from '../schemas/index'

const router = Router()

interface Product {
  id: string
  name: string
  price: number
  category: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone',
    price: 599.99,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Sneakers',
    price: 89.99,
    category: 'Fashion'
  },
  {
    id: '3',
    name: 'Backpack',
    price: 49.99,
    category: 'Travel'
  },
  {
    id: '4',
    name: 'Toaster',
    price: 39.99,
    category: 'Kitchen Appliances'
  },
  {
    id: '5',
    name: 'Book',
    price: 12.99,
    category: 'Books'
  }
]

router.get('/v1/products', (req: Request, res: Response) => {
  const { filter, value }: { filter?: 'name' | 'category'; value?: string } =
    req.query

  if (filter && value) {
    const filterKey = filter.toLowerCase() as 'name' | 'category'

    const filteredProducts = mockProducts.filter(product =>
      product[filterKey].toLowerCase().includes(value.toLowerCase())
    )

    return res.send(filteredProducts)
  }

  return res.send(mockProducts)
})

router.post(
  '/v1/products',
  checkSchema(createValidationSchema),
  (req: Request, res: Response) => {
    const result = validationResult(req)

    if (!result.isEmpty())
      return res.status(400).send({ errors: result.mapped() })

    const data = matchedData(req)

    const newUser = {
      id: String(Number(mockProducts[mockProducts.length - 1].id) + 1),
      ...(data as Product)
    }

    mockProducts.push(newUser)

    return res.status(201).send(newUser)
  }
)

export default router
