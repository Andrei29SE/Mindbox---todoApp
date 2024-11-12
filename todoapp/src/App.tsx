import "./App.css"
import Counter from "./components/Todos/Counter"
import TodoActions from "./components/Todos/TodoActions"
import TodoForm from "./components/Todos/TodoForm"
import TodoList from "./components/Todos/TodoList"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface Task {
  id: string
  text: string
  isComplited: boolean
}

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]) // Массив задач
  const [filter, setFilter] = useState<"All" | "Completed" | "Active">("All")

  const addTaskHandler = (text: string): void => {
    const newTodo: Task = {
      text,
      isComplited: false,
      id: uuidv4(),
    }
    setTasks((prevTasks) => [...prevTasks, newTodo])
  }

  const deliteTaskHandler = (id: string | number): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const togleTaskHandler = (id: string | number): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isComplited: !task.isComplited } : task
      )
    )
  }

  const resetTaskHandler = (): void => {
    setTasks([])
  }

  const deletComplitedTasksHandler = (): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isComplited))
  }

  const tasksLeftCount = tasks.filter((task) => !task.isComplited).length
  const completedTasksCount = tasks.filter((task) => task.isComplited).length

  const handleShowComplete = (): void => {
    setFilter("Completed")
  }

  const handleShowActive = (): void => {
    setFilter("Active")
  }

  const handleResetFilter = (): void => {
    setFilter("All")
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") {
      return task.isComplited
    }
    if (filter === "Active") {
      return !task.isComplited
    }
    return true
  })

  return (
    <div className='App'>
      <h1>What needs to be done?</h1>
      <TodoForm addTask={addTaskHandler} />
      {!!tasks.length && (
        <TodoActions
          completedTasksExist={!!completedTasksCount}
          resetTask={resetTaskHandler}
          deliteComplitedTask={deletComplitedTasksHandler}
          completeTaskFilter={handleShowComplete}
          activeTaskFilter={handleShowActive}
          resetTaskFilter={handleResetFilter}
        />
      )}

      <TodoList
        togletask={togleTaskHandler}
        deliteTask={deliteTaskHandler}
        tasks={filteredTasks}
      />
      <div className='score'>
        <Counter>
          {completedTasksCount >= 0 && (
            <h1>{`Completed items: ${completedTasksCount}  `}</h1>
          )}
        </Counter>
        <Counter>
          {tasksLeftCount >= 0 && <h1>{`Overall items: ${tasksLeftCount}`}</h1>}
        </Counter>
      </div>
    </div>
  )
}

export default App
