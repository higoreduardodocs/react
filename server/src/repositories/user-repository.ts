import { prisma } from '../libs/prisma'
import { ISave } from '../interfaces/user-interface'

class UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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

  async update(
    user_id: string,
    name: string,
    password: string,
    avatarUrl: string
  ) {
    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        password,
        avatarUrl,
      },
    })

    return user
  }
}

export { UserRepository }
