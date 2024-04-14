import { mergeClassName } from '../../../utils/format'

const BUTTON = `text-base font-semibold text-primary hover:text-white text-center w-[32px] h-[32px] rounded-lg border border-primary hover:bg-primary`
const ACTIVE = `!text-white bg-primary`

export default function Pagination() {
  const getClassName = (item: number) => {
    if (item === 1) return mergeClassName(BUTTON, ACTIVE)
    return BUTTON
  }
  return (
    <div className="flex items-center justify-end gap-2 px-3">
      {Array.from({ length: 7 }, (_, k) => k + 1).map((item) => (
        <button key={item} className={getClassName(item)}>
          {item}
        </button>
      ))}
    </div>
  )
}
