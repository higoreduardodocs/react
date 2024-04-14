import { MediaType } from '../../types/film-type'

interface IProps {
  type: MediaType | 'search' | 'list'
}

export default function Search(props: IProps) {
  return <section>Search</section>
}
