import { MdOutlineCancel } from 'react-icons/md'

import { useStateContext } from '../contexts/context'
import { userProfileData } from '../utils/user-data'
import { Button } from './'
import avatar from '/assets/avatar.jpg'

function UserProfile() {
  const { iconNavState, setIconNavState } = useStateContext()

  const iconNavbarClosed = (clicked) => {
    setIconNavState({ ...iconNavState, [clicked]: false })
  }

  return (
    <article className="absolute right-5 top-16 bg-white dark:bg-[#42464D] p-5 sm:w-96 w-60">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          size="2xl"
          handleOnClick={() => iconNavbarClosed('userProfile')}
        />
      </div>

      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> John Doe </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Administrator
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            info@shop.com
          </p>
        </div>
      </div>

      {userProfileData?.length > 0 &&
        userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {' '}
                {item.desc}{' '}
              </p>
            </div>
          </div>
        ))}

      <Button content="Logout" />
    </article>
  )
}

export default UserProfile
