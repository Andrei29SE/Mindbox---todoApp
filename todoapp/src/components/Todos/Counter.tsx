import { ReactNode, HTMLAttributes } from "react"
import styles from "./Counter.module.css"

interface CounterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Counter({ children, ...props }: CounterProps): JSX.Element {
  return (
    <div className={styles.count} {...props}>
      {children}
    </div>
  )
}

export default Counter
