import { MdPlayCircleFilled } from 'react-icons/md'

import { ICustomComponentProps } from '../../../types/common-type'
import { mergeClassName } from '../../../utils/format'
import Image from './image'

interface IProps extends ICustomComponentProps {
  src: string
  title?: string
  isPlayer?: boolean
  onClick?: () => void
}

export default function Card(props: IProps) {
  return (
    <div
      className={mergeClassName(
        'group mx-3 my-1.5 cursor-pointer',
        props.className
      )}
      onClick={props.onClick}
    >
      <div className="relative h-[200px] rounded-lg overflow-hidden">
        {props.isPlayer && (
          <div className="absolute hidden group-hover:flex items-center justify-center top-0 right-0 bottom-0 left-0 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:content-[''] before:bg-black before:opacity-70">
            <button className="relative z-10">
              <MdPlayCircleFilled size={32} />
            </button>
          </div>
        )}
        <Image src={props.src} />
      </div>
      <p className="py-1.5 line-clamp-2">{props.title}</p>
      {props.children}
    </div>
  )
}
