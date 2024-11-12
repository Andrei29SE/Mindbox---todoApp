import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  test("Рендер приложения", () => {
    render(<App />)

    expect(screen.getByText(/What needs to be done\?/i)).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/Add new task/i)).toBeInTheDocument()
    expect(screen.getByText("Enter")).toBeInTheDocument()
  })

  test("Добавление задачи", () => {
    render(<App />)

    const input = screen.getByPlaceholderText(/Add new task/i)
    const button = screen.getByText("Enter")

    fireEvent.change(input, { target: { value: "Новая задача добавлена" } })
    fireEvent.click(button)

    expect(screen.getByText("Новая задача добавлена")).toBeInTheDocument()
  })

  test("Удаление задачи из списка задач", () => {
    render(<App />)

    const input = screen.getByPlaceholderText(/Add new task/i)
    const button = screen.getByText("Enter")
    fireEvent.change(input, { target: { value: "Задача для удаления добавлена" } })
    fireEvent.click(button)

    const deleteButton = screen.getByText("Задача для удаления добавлена")
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(screen.getByTestId("delete one task"))

    expect(deleteButton).not.toBeInTheDocument()
  })

  test("Фильтрация завершенная задача", () => {
    render(<App />)

    const inputElement = screen.getByPlaceholderText(/Add new task/i)
    const addButton = screen.getByTitle(/Submit/i)

    fireEvent.change(inputElement, { target: { value: "Задача 1" } })
    fireEvent.click(addButton)
    const completeButton = screen.getAllByTestId("toglle completed")[0]
    fireEvent.click(completeButton)

    fireEvent.change(inputElement, { target: { value: "Задача 2" } })
    fireEvent.click(addButton)

    const completedFilterButton = screen.getByTestId("Completed")
    fireEvent.click(completedFilterButton)

    expect(screen.queryByText("Задача 2")).not.toBeInTheDocument()
    expect(screen.getByText("Задача 1")).toBeInTheDocument()
  })

  test("Фильтрация активная задача", () => {
    render(<App />)

    const inputElement = screen.getByPlaceholderText(/Add new task/i)
    const addButton = screen.getByTitle(/Submit/i)

    fireEvent.change(inputElement, { target: { value: "Задача 1" } })
    fireEvent.click(addButton)
    fireEvent.change(inputElement, { target: { value: "Задача 2" } })
    fireEvent.click(addButton)

    const completeButton = screen.getAllByTestId("toglle completed")[0]
    fireEvent.click(completeButton)

    const activeFilterButton = screen.getByTestId("Active")
    fireEvent.click(activeFilterButton)

    expect(screen.queryByText("Задача 1")).not.toBeInTheDocument()
    expect(screen.getByText("Задача 2")).toBeInTheDocument()
  })

  test("Сброс фильтров - Reset filters", () => {
    render(<App />)

    const inputElement = screen.getByPlaceholderText(/Add new task/i)
    const addButton = screen.getByTitle(/Submit/i)

    fireEvent.change(inputElement, { target: { value: "Задача 1" } })
    fireEvent.click(addButton)
    fireEvent.change(inputElement, { target: { value: "Задача 2" } })
    fireEvent.click(addButton)

    const activeFilterButton = screen.getByTestId("Active")
    fireEvent.click(activeFilterButton)

    const resetFilterButton = screen.getByTestId("Reset filter")
    fireEvent.click(resetFilterButton)

    expect(screen.getByText("Задача 1")).toBeInTheDocument()
    expect(screen.getByText("Задача 2")).toBeInTheDocument()
  })

  test("Удаление всех задач за раз", () => {
    render(<App />)

    const input = screen.getByPlaceholderText(/Add new task/i)
    const button = screen.getByText("Enter")

    fireEvent.change(input, { target: { value: "Задача 1" } })
    fireEvent.click(button)
    fireEvent.change(input, { target: { value: "Задача 2" } })
    fireEvent.click(button)

    expect(screen.getByText("Задача 1")).toBeInTheDocument()
    expect(screen.getByText("Задача 2")).toBeInTheDocument()

    fireEvent.click(screen.getByTestId("deleteall"))

    expect(screen.queryByText("Задача 1")).not.toBeInTheDocument()
    expect(screen.queryByText("Задача 2")).not.toBeInTheDocument()
  })

  test("Удаление только завершенных задач", () => {
    render(<App />)

    const input = screen.getByPlaceholderText(/Add new task/i)
    const button = screen.getByText("Enter")

    fireEvent.change(input, { target: { value: "Задача 1" } })
    fireEvent.click(button)
    fireEvent.change(input, { target: { value: "Задача 2" } })
    fireEvent.click(button)
    fireEvent.change(input, { target: { value: "Задача 3" } })
    fireEvent.click(button)

    expect(screen.getByText("Задача 1")).toBeInTheDocument()
    expect(screen.getByText("Задача 2")).toBeInTheDocument()
    expect(screen.getByText("Задача 3")).toBeInTheDocument()

    const completeButton1 = screen.getAllByTestId("toglle completed")[0]
    fireEvent.click(completeButton1)
    const completeButton2 = screen.getAllByTestId("toglle completed")[1]
    fireEvent.click(completeButton2)

    const deleteComplited = screen.getByTestId("delete-completed")
    fireEvent.click(deleteComplited)

    expect(screen.queryByText("Задача 1")).not.toBeInTheDocument()
    expect(screen.queryByText("Задача 2")).not.toBeInTheDocument()
    expect(screen.getByText("Задача 3")).toBeInTheDocument()
  })
})
