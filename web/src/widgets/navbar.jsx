import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'

import avatar from '/assets/avatar.jpg'
import { useStateContext } from '../contexts/context'
import { Cart, Chat, Notification, UserProfile } from '../components'

// eslint-disable-next-line react/prop-types
const NavButton = ({ content, icon, color, dotColor, handleOnClick }) => {
  return (
    <TooltipComponent content={content} position="BottomCenter">
      <button
        type="button"
        onClick={handleOnClick}
        style={{ color: color }}
        className="relative text-xl rounded-full p-3 dark:hover:bg-light-gray hover:bg-gray-300 transition-all cursor-pointer"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  )
}

function Navbar() {
  const { isSidebar, setIsSidebar, color, iconNavState, setIconNavState } =
    useStateContext()

  const iconNavbarClicked = (clicked) => {
    setIconNavState({ ...iconNavState, [clicked]: true })
  }

  return (
    <nav className="flex items-center flex-wrap md:justify-end justify-between px-2 py-1 m-2 dark:bg-secondary-dark-bg bg-light-gray">
      <div className="md:hidden block">
        <NavButton
          content="Menu"
          icon={<AiOutlineMenu />}
          color={color}
          handleOnClick={() => setIsSidebar(!isSidebar)}
        />
      </div>

      <div className="flex gap-1">
        <NavButton
          content="Cart"
          icon={<FiShoppingCart />}
          color={color}
          handleOnClick={() => iconNavbarClicked('cart')}
        />
        <NavButton
          content="Chat"
          icon={<BsChatLeft />}
          color={color}
          dotColor="#03C9D7"
          handleOnClick={() => iconNavbarClicked('chat')}
        />
        <NavButton
          content="Notification"
          icon={<RiNotification3Line />}
          color={color}
          dotColor="rgb(254, 201, 15)"
          handleOnClick={() => iconNavbarClicked('notification')}
        />
        <TooltipComponent
          content="Profile"
          position="BottomCenter"
          onClick={() => iconNavbarClicked('userProfile')}
        >
          <div className="flex items-center gap-2 p-1 rounded-lg dark:hover:bg-light-gray hover:bg-gray-300 cursor-pointer transition-all">
            <img src={avatar} alt="Profile" className="rounded-full w-8 h-8" />
            <span className="text-gray-400 font-bold">John Doe</span>
            <MdKeyboardArrowDown style={{ color: color }} />
          </div>
        </TooltipComponent>
      </div>

      {iconNavState.cart && <Cart />}
      {iconNavState.chat && <Chat />}
      {iconNavState.notification && <Notification />}
      {iconNavState.userProfile && <UserProfile />}
    </nav>
  )
}

export default Navbar
