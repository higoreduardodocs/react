import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { ISave, IUpdate } from '../interfaces/user-interface'
import { UserRepository } from '../repositories/user-repository'

class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async save({ name, email, password }: ISave) {
    const findUser = await this.userRepository.findByEmail(email)
    if (findUser) throw new Error('User already register')

    const hashedPassword = await hash(password, 10)
    const user = this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    })
    return user
  }

  async auth(email: string, password: string) {
    const findUser = await this.userRepository.findByEmail(email)
    if (!findUser) throw new Error('User not register')

    const passwordMatch = await compare(password, findUser.password)
    if (!passwordMatch) throw new Error('Invalid credentials')

    if (!process.env.ACCESS_KEY_TOKEN) throw new Error('No secret provide')
    const token = sign({ email }, process.env.ACCESS_KEY_TOKEN, {
      subject: findUser.id,
      expiresIn: 60 * 15,
    })
    const refreshToken = sign({ email }, process.env.ACCESS_KEY_TOKEN, {
      subject: findUser.id,
      expiresIn: '7d',
    })

    return {
      token,
      refreshToken,
      user: {
        name: findUser.name,
        email: findUser.email,
      },
    }
  }

  async update({ user_id, name, password, newPassword, avatarUrl }: IUpdate) {
    const findUser = await this.userRepository.findById(user_id)
    if (!findUser) throw new Error('User not register')

    const passwordMatch = await compare(password, findUser.password)
    if (!passwordMatch) throw new Error('Invalid credentials')

    const hashedPassword = await hash(newPassword, 10)
    const user = await this.userRepository.update(
      user_id,
      name,
      hashedPassword,
      'avatarUrl'
    )
    return user
  }
}

export { UserService }
