import { ICustomComponentProps } from '../../../types/common-type'
import { mergeClassName } from '../../../utils/format'

export default function Container(props: ICustomComponentProps) {
  return (
    <section className={mergeClassName('px-6 py-3 mx-auto', props.className)}>
      {props.children}
    </section>
  )
}
