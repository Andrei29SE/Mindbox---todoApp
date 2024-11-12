import styles from "./Todo.module.css"
import { RiDeleteBin2Line } from "react-icons/ri"
import { FaCheckCircle } from "react-icons/fa"

interface Task {
  id: string | number
  text: string
  isComplited: boolean
}

interface TodoProps {
  task: Task
  deliteTask: (id: string | number) => void
  togletask: (id: string | number) => void
}

function Todo({ task, deliteTask, togletask }: TodoProps): JSX.Element {
  return (
    <div
      className={`${styles.todo} ${task.isComplited ? styles.completedTodo : ""}`}>
      <h1 className={styles.todoText}>{task.text}</h1>
      <RiDeleteBin2Line
        className={styles.deleteIcon}
        onClick={() => deliteTask(task.id)}
        data-testid='delete one task'
      />
      <FaCheckCircle
        className={styles.checkIcon}
        onClick={() => togletask(task.id)}
        data-testid='toglle completed'
      />
    </div>
  )
}

export default Todo
