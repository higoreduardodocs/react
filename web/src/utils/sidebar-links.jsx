import {
  AiOutlineShoppingCart,
  AiOutlineCalendar,
  AiOutlineStock,
  AiOutlineAreaChart,
  AiOutlineBarChart,
} from 'react-icons/ai'
import { FiShoppingBag } from 'react-icons/fi'
import { IoMdContacts } from 'react-icons/io'
import { RiContactsLine, RiStockLine } from 'react-icons/ri'
import { BsKanban, BsBarChart } from 'react-icons/bs'
import { FiEdit, FiPieChart } from 'react-icons/fi'
import { BiColorFill } from 'react-icons/bi'
import { GiLouvrePyramid } from 'react-icons/gi'

const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'ecommerce',
        icon: FiShoppingBag,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'orders',
        icon: AiOutlineShoppingCart,
      },
      {
        name: 'employees',
        icon: IoMdContacts,
      },
      {
        name: 'customers',
        icon: RiContactsLine,
      },
    ],
  },

  {
    title: 'Apps',
    links: [
      {
        name: 'calendar',
        icon: AiOutlineCalendar,
      },
      {
        name: 'kanban',
        icon: BsKanban,
      },
      {
        name: 'editor',
        icon: FiEdit,
      },
      {
        name: 'color-picker',
        icon: BiColorFill,
      },
    ],
  },

  {
    title: 'Charts',
    links: [
      {
        name: 'line',
        icon: AiOutlineStock,
      },
      {
        name: 'area',
        icon: AiOutlineAreaChart,
      },

      {
        name: 'bar',
        icon: AiOutlineBarChart,
      },
      {
        name: 'pie',
        icon: FiPieChart,
      },
      {
        name: 'financial',
        icon: RiStockLine,
      },
      {
        name: 'color-mapping',
        icon: BsBarChart,
      },
      {
        name: 'pyramid',
        icon: GiLouvrePyramid,
      },
      {
        name: 'stacked',
        icon: AiOutlineBarChart,
      },
    ],
  },
]

export default links
