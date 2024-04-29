import { MdOutlineCancel } from 'react-icons/md'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { useStateContext } from '../contexts/context'
import { cartData } from '../utils/cart-data'
import { Button } from './'

function Cart() {
  const { iconNavState, setIconNavState } = useStateContext()

  const iconNavbarClosed = (clicked) => {
    setIconNavState({ ...iconNavState, [clicked]: false })
  }

  return (
    <article className="fixed w-full bg-half-transparent top-0 right-0">
      <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white w-80 p-5 overflow-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            size="2xl"
            handleOnClick={() => iconNavbarClosed('cart')}
          />
        </div>

        {cartData?.length > 0 &&
          cartData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 py-2"
            >
              <img className="w-20 h-20" src={item.image} alt={item.name} />

              <div className="flex flex-col gap-2">
                <p className="font-semibold ">{item.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                  {item.category}
                </p>
                <p className="font-semibold text-lg">{item.price}</p>

                <div className="flex items-center justify-between border-1 border-r-0 border-color">
                  <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 cursor-pointer">
                    <AiOutlineMinus />
                  </p>
                  <p className="p-2 border-color dark:border-gray-600 text-green-600">
                    0
                  </p>
                  <p className="p-2 border-l-1 border-color dark:border-gray-600 text-green-600 cursor-pointer">
                    <AiOutlinePlus />
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </article>
  )
}

export default Cart
