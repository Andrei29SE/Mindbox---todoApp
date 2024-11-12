import Todo from "./Todo"
import styles from "./TodoList.module.css"

interface Task {
  id: string | number
  text: string
  isComplited: boolean
}

interface TodoListProps {
  tasks: Task[]
  deliteTask: (id: string | number) => void
  togletask: (id: string | number) => void
}

function TodoList({ tasks, deliteTask, togletask }: TodoListProps): JSX.Element {
  return (
    <div className={styles.todoListContainer}>
      {!tasks.length && <h1>List is empty!</h1>}
      {tasks.map((task) => (
        <Todo
          togletask={togletask}
          deliteTask={deliteTask}
          key={task.id}
          task={task}
        />
      ))}
    </div>
  )
}

export default TodoList
