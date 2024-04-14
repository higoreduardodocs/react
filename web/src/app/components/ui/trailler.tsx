import { IoIosClose } from 'react-icons/io'

import useApp from '../../../hooks/use-app'
import Container from './container'

const SHOW = `opacity-0 pointer-events-none none`
const HIDE = `opacity-100 block`

export default function Trailler() {
  const { trailler, setTrailler } = useApp()
  const handleHideTrailler = () => setTrailler('')

  return (
    <div
      className={`${
        !trailler ? SHOW : HIDE
      } fixed top-0 right-0 bottom-0 left-0 after:fixed after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-black after:opacity-90 ease-out duration-300 z-20`}
    >
      <Container className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-full overflow-hidden">
        <div className="bg-header rounded-lg">
          <button onClick={handleHideTrailler} type="button" className="p-3">
            <IoIosClose size={18} />
          </button>
          <iframe src={trailler} className="w-full h-[500px]"></iframe>
        </div>
      </Container>
    </div>
  )
}
