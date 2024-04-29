import { MdOutlineCancel } from 'react-icons/md'

import { chatData } from '../utils/chat-data'
import { useStateContext } from '../contexts/context'
import { Button } from './'

function Notification() {
  const { iconNavState, setIconNavState } = useStateContext()

  const iconNavbarClosed = (clicked) => {
    setIconNavState({ ...iconNavState, [clicked]: false })
  }

  return (
    <article className="absolute right-5 top-16 bg-white dark:bg-[#42464D] p-5 sm:w-96 w-60">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <button
            type="button"
            className="text-white text-xs rounded p-1 px-2 bg-orange-theme "
          >
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          size="2xl"
          handleOnClick={() => iconNavbarClosed('notification')}
        />
      </div>

      {chatData?.length > 0 &&
        chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
          >
            <img
              className="rounded-full h-10 w-10"
              src={item.image}
              alt={item.message}
            />
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {' '}
                {item.desc}{' '}
              </p>
            </div>
          </div>
        ))}

      <Button content="See all notifications" />
    </article>
  )
}

export default Notification
