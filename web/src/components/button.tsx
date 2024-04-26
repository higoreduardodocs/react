import style from './button.module.css'

interface IButton {
  type?: 'submit' | 'button' | 'reset' | undefined
  title: string
  content: string
  onClick?: () => void
}

const Button = ({ type = 'button', title, content, ...rest }: IButton) => {
  return (
    <button type={type} title={title} className={style.button} {...rest}>
      {content}
    </button>
  )
}

export default Button
