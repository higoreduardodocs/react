import { useEffect, useState } from 'react'
import { format, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'react-toastify'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { api } from '../libs/api'
import useAuth from '../hooks/use-auth'
import Header from '../components/header'
import Card from '../components/card'
import style from './dashboard.module.css'

interface ISchedule {
  id: string
  name: string
  phone: string
  date: Date
  user_id: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [date, setDate] = useState(new Date())
  const [schedules, setSchedules] = useState<Array<ISchedule>>([])

  const isDisabled = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }
  const isAvailabled = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }
  const getSchedules = async () => {
    api
      .get('/schedules', {
        params: {
          date,
        },
      })
      .then((res) => setSchedules(res.data))
      .catch((err) => {
        console.log(err)
        toast.error('Falha ao buscar agenda')
      })
  }

  useEffect(() => {
    getSchedules()
  }, [date]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Header />
      <div className={style.content}>
        <h2>Bem vindo(a) {user.name}</h2>
        <p>
          Está é sua lista de horários de&nbsp;
          {isToday(date) ? 'hoje' : format(date, 'dd/MM/yyyy')}
        </p>

        <div className={style.wrapper}>
          <div className={style.description}>
            <h3>Próximos horários</h3>
            <div className={style.list}>
              {schedules?.length > 0 &&
                schedules.map((item) => <Card key={item.id} {...item} />)}
              {/* {Array.from({ length: 20 }, (_, k) => k + 1).map((_, i) => (
                <Card key={i} />
              ))} */}
            </div>
          </div>

          <div className={style.calendar}>
            <DayPicker
              selected={date}
              mode="single"
              disabled={isDisabled}
              modifiers={{ available: isAvailabled }}
              classNames={{ day: style.day }}
              modifiersClassNames={{ selected: style.selected }}
              onDayClick={(date: Date) => setDate(date)}
              locale={ptBR}
              fromMonth={new Date()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
