import { MdOutlineCancel } from 'react-icons/md'

import { useStateContext } from '../contexts/context'
import { chatData } from '../utils/chat-data'
import { Button } from './'

function Chat() {
  const { iconNavState, setIconNavState } = useStateContext()

  const iconNavbarClosed = (clicked) => {
    setIconNavState({ ...iconNavState, [clicked]: false })
  }

  return (
    <article className="absolute right-5 top-16 bg-white dark:bg-[#42464D] p-5 sm:w-96 w-60">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Messages</p>
          <button
            type="button"
            className="text-white  text-xs rounded p-1 px-2 bg-orange"
          >
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          size="2xl"
          handleOnClick={() => iconNavbarClosed('chat')}
        />
      </div>

      {chatData?.length > 0 &&
        chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer"
          >
            <div className="relative">
              <img
                className="rounded-full h-10 w-10"
                src={item.image}
                alt={item.message}
              />
              <span
                style={{ background: item.dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1"
              />
            </div>
            <div>
              <p className="font-semibold dark:text-gray-200 ">
                {item.message}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {item.time}
              </p>
            </div>
          </div>
        ))}

      <Button content="See all messages" />
    </article>
  )
}

export default Chat
