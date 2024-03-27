import passport from 'passport'
import { Strategy } from 'passport-local'

interface TUser {
  id: string
  username: string
  password: string
}

const mockUsers: TUser[] = [
  {
    id: '1',
    username: 'igmtdev',
    password: 'alibee17'
  }
]

passport.serializeUser((user: TUser, done) => {
  console.log('Inside Serialize')
  console.log(user)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log('Inside Deserialize')
  console.log(`Deserializing User ID: ${id}`)
  try {
    const existedUser = mockUsers.find(user => user.id === id)
    if (!existedUser) throw new Error('Invalid username or password')
    done(null, existedUser)
  } catch (error) {
    done(error, null)
  }
})

export default passport.use(
  new Strategy((username, password, done) => {
    try {
      const existedUser = mockUsers.find(user => user.username === username)
      if (!existedUser || existedUser.password !== password)
        throw new Error('Invalid username or password')
      done(null, existedUser)
    } catch (error) {
      done(error, null)
    }
  })
)
