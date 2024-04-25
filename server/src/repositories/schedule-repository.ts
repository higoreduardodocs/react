import { endOfDay, startOfDay } from 'date-fns'

import { prisma } from '../libs/prisma'
import { ISave } from '../interfaces/schedule-interface'

class ScheduleRepository {
  async findAllByDate(date: Date) {
    const schedules = await prisma.schedule.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
      orderBy: {
        date: 'asc',
      },
    })
    return schedules
  }

  async findByDate(date: Date) {
    const schedule = await prisma.schedule.findFirst({
      where: { date },
    })
    return schedule
  }

  async save({ userId, name, phone, date }: ISave) {
    const schedule = await prisma.schedule.create({
      data: {
        user_id: userId,
        name,
        phone,
        date,
      },
    })
    return schedule
  }

  async updateById(id: string, date: Date) {
    const schedule = await prisma.schedule.update({
      where: {
        id,
      },
      data: { date },
    })
    return schedule
  }
}

export { ScheduleRepository }
