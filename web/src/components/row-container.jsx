/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdShoppingBasket } from 'react-icons/md'

import { useStateValue } from '../contexts/initial-state'
import { actionType } from '../contexts/reducer'

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef()
  const [items, setItems] = useState([])
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue()

  const addToCart = (curItem) => {
    if (items?.length === 0 || !items.find((item) => item.id === curItem.id))
      setItems((prevState) => [...prevState, curItem])

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    })
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  useEffect(() => {
    rowContainer.current.scrollLeft = scrollValue
  }, [scrollValue])

  return (
    <article
      ref={rowContainer}
      className={`w-full flex items-center gap-3 scroll-smooth ${
        flag
          ? 'overflow-x-scroll scrollbar-none'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {data?.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-evenly w-275 min-w-[275px] md:w-300 md:w-min-[300px] my-4 bg-cardOverlay py-2 px-4 backdrop-blur-lg rounded-lg"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL}
                alt={item?.title}
                className="w-40 h-40 object-contain drop-shadow-2xl"
              />

              <motion.button
                whileTap={{ scale: 0.75 }}
                type="button"
                className="flex items-center justify-center w-8 h-8 bg-red-600 hover:shadow-md transition-all duration-100 ease-in-out rounded-full cursor-pointer"
                onClick={() => addToCart(item)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.button>
            </div>

            <div className="w-full flex flex-col items-end justify-end">
              <h5 className="font-semibold text-base md:text-lg text-textColor">
                {item?.title}
              </h5>
              <span className="text-sm text-gray-500 mt-1">
                {item?.calories} Calories
              </span>
              <span className="font-semibold text-lg text-headingColor">
                <small className="text-sm text-red-500">$</small> {item?.price}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <img
            src="/images/not-found.svg"
            alt="Items not available"
            className="h-340"
          />
          <span className="font-semibold text-xl text-headingColor my-2">
            Items not available
          </span>
        </div>
      )}
    </article>
  )
}
export default RowContainer
