import { checkSchema } from 'express-validator'

export const loginSchema = checkSchema({
  username: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Username is required'
    }
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isLength: {
      errorMessage: 'Password must be at least 6 characters long',
      options: { min: 6 }
    }
  }
  // confirmPassword: {
  //   in: ['body'],
  //   notEmpty: {
  //     errorMessage: 'Confirm password is required'
  //   },
  //   custom: {
  //     options: (value, { req }) => {
  //       if (value !== req.body.password) {
  //         return Promise.reject('Passwords do not match')
  //       }
  //       return true
  //     }
  //   }
  // }
})
