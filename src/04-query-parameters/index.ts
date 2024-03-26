import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

interface Product {
  id: string
  name: string
  price: string
  category: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone',
    price: '599.99',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Sneakers',
    price: '89.99',
    category: 'Fashion'
  },
  {
    id: '3',
    name: 'Backpack',
    price: '49.99',
    category: 'Travel'
  },
  {
    id: '4',
    name: 'Toaster',
    price: '39.99',
    category: 'Kitchen Appliances'
  },
  {
    id: '5',
    name: 'Book',
    price: '12.99',
    category: 'Books'
  }
]

app.get('/', (req, res) => {
  // Text
  // res.send('Hello, World')

  // Json
  // res.send({ message: 'Hello' })

  // Status + Json
  res.status(200).send({ message: 'Hello' })
})

app.get('/v1/products', (req, res) => {
  //! Extract query parameters using (req.query)
  const { filter, value }: { filter?: keyof Product; value?: string } =
    req.query

  // const {
  //   query: { category }
  // }: { query: { category?: string } } = req

  //! Check if both (filter) and (value) are provided in the query
  if (filter && value) {
    //! Convert the filter key to lowercase to handle case-insensitive comparisons
    const filterKey = filter.toLowerCase() as keyof Product

    //! Filter the products based on the specified (filter) type, allowing for case-insensitive matching
    const filteredProducts = mockProducts.filter(product =>
      product[filterKey].toLowerCase().includes(value.toLowerCase())
    )

    //! We use (return) here to ensure that only one response is sent within a single HTTP request cycle in Node.js
    return res.send(filteredProducts)
  }

  //! If no filtering criteria are provided, send all products
  return res.send(mockProducts)
})

app.get('/v1/products/:id', (req, res) => {
  const paramsId = req.params.id

  const existedUser = mockProducts.find(product => product.id === paramsId)

  if (!existedUser) return res.sendStatus(404)

  return res.send(existedUser)
})

//! (app.listen) initiates the server to listen for incoming requests on a specified (PORT). This effectively starts the (express) server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
