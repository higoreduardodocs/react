import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoFastFood } from 'react-icons/io5'

import { categories } from '../utils/data'
import { useStateValue } from '../contexts/initial-state'
import RowContainer from './row-container'

const MenuContainer = () => {
  const [filter, setFilter] = useState('chicken')
  const [{ foodItems }] = useStateValue()

  return (
    <article className="w-full my-6">
      <h6 className="font-semibold text-2xl text-headingColor capitalize relative before:absolute before:content before:left-0 before:-bottom-2 before:w-32 before:h-1 before:bg-gradient-to-tr before:from-orange-400 before:to-orange-600 before:rounded-lg">
        Our Hot Dishes
      </h6>

      <div className="w-full flex items-center lg:justify-center justify-start gap-8 py-6 overflow-x-auto scrollbar-none">
        {categories &&
          categories.map((item) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={item.id}
              className="group flex flex-col items-center justify-center gap-3 w-24 min-w-[94px] h-28 rounded-lg drop-shadow-xl bg-card hover:bg-cartNumBg cursor-pointer"
              onClick={() => setFilter(item.urlParamName)}
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-cartNumBg group-hover:bg-white">
                <IoFastFood className="text-lg text-white group-hover:text-textColor" />
              </span>
              <small className="text-sm text-textColor group-hover:text-white">
                {item.name}
              </small>
            </motion.div>
          ))}
      </div>

      <RowContainer
        flag={false}
        data={foodItems?.filter((item) => item.category === filter)}
      />
    </article>
  )
}
export default MenuContainer
