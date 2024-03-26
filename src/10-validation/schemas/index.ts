export const createValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 1,
        max: 32
      },
      errorMessage: 'Name must at least 5 - 32 characters'
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty'
    },
    isString: {
      errorMessage: 'Name must be a string'
    }
  },
  price: {
    notEmpty: {
      errorMessage: 'Price cannot be empty'
    },
    isFloat: {
      errorMessage: 'Price must be a number'
    }
  },
  category: {
    isLength: {
      options: {
        min: 1,
        max: 32
      },
      errorMessage: 'Category must at least 5 - 32 characters'
    },
    notEmpty: {
      errorMessage: 'Category cannot be empty'
    },
    isString: {
      errorMessage: 'Category must be a string'
    }
  }
}
