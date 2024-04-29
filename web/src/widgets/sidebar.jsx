import { Link, NavLink } from 'react-router-dom'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'

import { useStateContext } from '../contexts/context'
import sidebarLinks from '../utils/sidebar-links'

function Sidebar() {
  const { setIsSidebar, theme, color } = useStateContext()

  const normalLink =
    'flex items-center gap-5 rounded-lg text-md capitalize m-2 p-2 dark:text-gray-200 dark:hover:text-slate-900 dark:hover:bg-light-gray hover:bg-secondary-dark-bg hover:text-white'
  const activeLink = `${normalLink} ${
    theme === 'light' ? 'text-white' : 'text-secondary-dark-bg'
  }`

  return (
    <article className="flex flex-col gap-10 min-h-screen p-5 dark:bg-secondary-dark-bg bg-light-gray overflow-auto">
      <div className="flex justify-between items-center dark:text-white text-slate-900">
        <Link
          to="/"
          className="flex items-center gap-3 font-extrabold text-xl tracking-tight"
        >
          <SiShopware />
          <span>Shoppy</span>
        </Link>

        <TooltipComponent className="block md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebar(false)}
            className="text-xl p-3 rounded-full dark:hover:bg-light-gray dark:hover:text-slate-900 hover:bg-secondary-dark-bg hover:text-white transition-all"
          >
            <MdOutlineCancel />
          </button>
        </TooltipComponent>
      </div>

      {sidebarLinks?.length > 0 &&
        sidebarLinks.map((item) => (
          <div key={item.title}>
            <p className="font-bold text-gray-400 uppercase text-center">
              {item.title}
            </p>
            {item.links?.length > 0 &&
              item.links.map((link) => (
                <NavLink
                  key={link.name}
                  to={`/${link.name == 'ecommerce' ? '' : link.name}`}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? color : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {<link.icon />}
                  <span>{link.name}</span>
                </NavLink>
              ))}
          </div>
        ))}
    </article>
  )
}

export default Sidebar
