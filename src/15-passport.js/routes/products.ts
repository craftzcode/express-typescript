import { Router } from 'express'

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

export default (router: Router) => {
  router.get('/v1/products', (req, res) => {
    if (req.signedCookies.hello && req.signedCookies.hello === 'world')
      return res.status(200).send(mockProducts)

    return res
      .status(403)
      .send({ message: 'Sorry. You need the correct cookie' })
  })
}
