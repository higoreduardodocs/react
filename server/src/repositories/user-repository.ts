import { prisma } from '../libs/prisma'
import { ISave } from '../interfaces/user-interface'

class UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }
  
  async save({ name, email, password }: ISave) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return user
  }
}

export { UserRepository }
