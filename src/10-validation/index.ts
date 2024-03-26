import express, { Request, Response } from 'express'

import {
  body,
  checkSchema,
  matchedData,
  query,
  validationResult
} from 'express-validator'

import { createValidationSchema } from './schemas'

const app = express()

const PORT = process.env.PORT || 3000

//! (app.listen) initiates the server to listen for incoming requests on a specified (PORT). This effectively starts the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

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

app.use(express.json())

app.get(
  '/v1/products',
  //! (query()) To validate the (query parameters)
  query('filter')
    .isString()
    .notEmpty()
    .withMessage('Filter cannot be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage('Must at least 3 - 10 characters'),
  (req, res) => {
    // const result = validationResult(req)

    // console.log(result)

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
  }
)

app.post(
  '/v1/products',
  //! (body()) To validate the (body requests)
  // [
  //   body('name')
  //     .notEmpty()
  //     .withMessage('Name cannot be empty')
  //     .isString()
  //     .withMessage('Name must be a string'),
  //   body('price')
  //     .notEmpty()
  //     .withMessage('Price cannot be empty')
  //     .isNumeric()
  //     .withMessage('Name must be a number'),
  //   body('category')
  //     .notEmpty()
  //     .withMessage('Username cannot be empty')
  //     .isString()
  //     .withMessage('Username must be a string')
  // ],
  //! (checkSchema()) To validate the separated (schema) for validation
  checkSchema(createValidationSchema),
  (req: Request, res: Response) => {
    const result = validationResult(req)

    // console.log(result)
    //! Check if the (validationResult) is not empty it means it has an error
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.mapped() })

    //! (matchedData) Get the (data) that validated
    const data = matchedData(req)

    // const { body } = req

    const newUser = {
      id: String(Number(mockProducts[mockProducts.length - 1].id) + 1),
      ...(data as Product)
    }

    mockProducts.push(newUser)

    return res.status(201).send(newUser)
  }
)
