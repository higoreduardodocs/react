import { hash } from 'bcrypt'

import { ISave } from '../interfaces/user-interface'
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
}

export { UserService }
