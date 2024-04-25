import { getHours, isBefore, startOfHour } from 'date-fns'

import { ScheduleRepository } from '../repositories/schedule-repository'
import { ISave } from '../interfaces/schedule-interface'

class ScheduleService {
  private scheduleRepository: ScheduleRepository

  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  async save({ userId, name, phone, date }: ISave) {
    const dateFormatted = new Date(date)

    const hourStart = startOfHour(dateFormatted)
    if (isBefore(hourStart, new Date())) {
      throw new Error('Invalid past date')
    }

    const hour = getHours(hourStart)
    if (hour <= 9 || hour >= 19) {
      throw new Error('Invalid hour range')
    }

    const findScheduleAvailable = await this.scheduleRepository.findByDate(
      hourStart
    )
    if (findScheduleAvailable) throw new Error('Invalid schedule available')

    const schedule = await this.scheduleRepository.save({
      userId,
      name,
      phone,
      date: hourStart,
    })
    return schedule
  }

  async findAllByDate(date: Date) {
    const schedules = await this.scheduleRepository.findAllByDate(date)
    return schedules
  }

  async updateById(id: string, date: Date) {
    const dateFormatted = new Date(date)

    const hourStart = startOfHour(dateFormatted)
    if (isBefore(hourStart, new Date())) {
      throw new Error('Invalid past date')
    }

    const hour = getHours(hourStart)
    if (hour <= 9 || hour >= 19) {
      throw new Error('Invalid hour range')
    }

    const findScheduleAvailable = await this.scheduleRepository.findByDate(
      hourStart
    )
    if (findScheduleAvailable) throw new Error('Invalid schedule available')

    const schedule = await this.scheduleRepository.updateById(id, hourStart)
    return schedule
  }
}

export { ScheduleService }
