import Button from "../UI/Button"
import { RiDeleteBin4Line, RiRefreshLine } from "react-icons/ri"
import styles from "./TodoActions.module.css"

interface TodoActionsProps {
  deliteComplitedTask: () => void
  resetTask: () => void
  completedTasksExist: boolean
  resetTaskFilter: () => void
  completeTaskFilter: () => void
  activeTaskFilter: () => void
}

function TodoActions({
  deliteComplitedTask,
  resetTask,
  completedTasksExist,
  resetTaskFilter,
  completeTaskFilter,
  activeTaskFilter,
}: TodoActionsProps): JSX.Element {
  return (
    <>
      <div className={styles.todoActionContainer}>
        <Button
          onClick={deliteComplitedTask}
          data-testid='delete-completed'
          disabled={!completedTasksExist}
          title='Clear completed tasks'>
          <RiDeleteBin4Line />
        </Button>
        <Button onClick={resetTask} title='Clear all' data-testid='deleteall'>
          <RiRefreshLine />
        </Button>
      </div>
      <div className={styles.filters}>
        <Button
          onClick={completeTaskFilter}
          title='Completed'
          data-testid='Completed'>
          Completed tasks
        </Button>
        <Button
          onClick={resetTaskFilter}
          title='Reset filters'
          data-testid='Reset filter'>
          Reset filter
        </Button>
        <Button
          onClick={activeTaskFilter}
          title='Reset filters'
          data-testid='Active'>
          Active
        </Button>
      </div>
    </>
  )
}

export default TodoActions
