import { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import { useStateValue } from '../contexts/initial-state'
import HomeContainer from '../components/home-container'
import RowContainer from '../components/row-container'
import MenuContainer from '../components/menu-container'
import CartContainer from '../components/cart-container'

export default function Home() {
  const [scrollValue, setScrollValue] = useState(0)
  const [{ foodItems, showCart }] = useStateValue()

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <div className="w-full my-10 flex items-center justify-between">
        <h6 className="font-semibold text-2xl text-headingColor capitalize relative before:absolute before:content before:left-0 before:-bottom-2 before:w-32 before:h-1 before:bg-gradient-to-tr before:from-orange-400 before:to-orange-600 before:rounded-lg">
          Our fresh & healthy fruits
        </h6>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 bg-orange-300 rounded-lg hover:bg-orange-500 hover:shadow-lg transition-all duration-100 ease-in-out cursor-pointer"
            onClick={() => setScrollValue((prevState) => prevState - 287)}
          >
            <MdChevronLeft />
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 bg-orange-300 rounded-lg hover:bg-orange-500 hover:shadow-lg transition-all duration-100 ease-in-out cursor-pointer"
            onClick={() => setScrollValue((prevState) => prevState + 287)}
          >
            <MdChevronRight />
          </button>
        </div>
      </div>

      <RowContainer
        flag={true}
        data={foodItems?.filter((item) => item.category === 'fruits')}
        scrollValue={scrollValue}
      />

      <MenuContainer />

      {showCart && <CartContainer />}
    </section>
  )
}
