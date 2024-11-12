import { ReactNode, ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  children: ReactNode
  title?: string
  disabled?: boolean
}

function Button({
  onClick,
  children,
  title,
  disabled = false,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      {...rest}
      className={styles.button}
      onClick={onClick}
      title={title}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
