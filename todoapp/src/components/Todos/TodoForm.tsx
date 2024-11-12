import { useState, ChangeEvent, FormEvent } from "react"
import styles from "./TodoForm.module.css"
import Button from "../UI/Button"

interface TodoFormProps {
  addTask: (taskText: string) => void
}

function TodoForm({ addTask }: TodoFormProps): JSX.Element {
  const [text, setText] = useState<string>("")

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTask(text)
    setText("")
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={handleOnSubmit}>
        <input value={text} onChange={handleChange} placeholder='Add new task' />
        <Button type='submit' title='Submit'>
          Enter
        </Button>
      </form>
    </div>
  )
}

export default TodoForm
