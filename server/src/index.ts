import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'

import { UserRoute } from './routes/user-route'
import { ScheduleRoute } from './routes/schedule-route'

const app: Application = express()

const userRoutes = new UserRoute().getRoutes()
const scheduleRoutes = new ScheduleRoute().getRoutes()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes)
app.use('/schedules', scheduleRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Internal server error' })
})

app.listen(3001, () => {
  console.log('Server running on: http://localhost:3001')
})
