import { forwardRef, ForwardRefRenderFunction } from 'react'

import style from './input.module.css'

interface InputProps {
  placeholder: string
  Icon: React.ElementType
  type?: string
  error?: string
}

const Wrapper: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { placeholder, Icon, type, error, ...rest },
  ref
) => {
  return (
    <div className={style.box}>
      <div className={style.wrapper}>
        <Icon />
        <input
          type={type || 'text'}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </div>
      {error && <span className={style.message}>{error}</span>}
    </div>
  )
}

export const Input = forwardRef(Wrapper)
