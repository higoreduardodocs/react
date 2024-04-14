import useApp from '../../../hooks/use-app'
import { MediaType } from '../../../types/film-type'

interface IProps {
  genders: number[]
  mediaType: MediaType
}

export default function GenderList(props: IProps) {
  const { genders } = useApp()

  return (
    <ul className="flex flex-wrap items-center gap-1">
      {props.genders?.map((item, key) => (
        <li key={key} className="text-sm p-1 bg-zinc-950 rounded-md">
          {genders[props.mediaType]?.find((i) => i.id === item)?.name}
        </li>
      ))}
    </ul>
  )
}
