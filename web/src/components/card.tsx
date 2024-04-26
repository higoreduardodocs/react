import { getHours } from 'date-fns'
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'

import style from './card.module.css'

interface ICard {
  id: string
  name: string
  phone: string
  date: Date
}

function Card({ id, name, phone, date }: ICard) {
  return (
    <div className={style.card}>
      <h4 className={style.clock}>{getHours(new Date(date))}</h4>
      <h4>
        {name} - {phone}
      </h4>
      <div className={style.icons}>
        <GrEdit />
        <RiDeleteBin6Line />
      </div>
    </div>
  )
}

export default Card
