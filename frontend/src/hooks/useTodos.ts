import { useState, useEffect } from "react"
import type { Todo } from "../types/todo"
import { fetchTodos, createTodo, toggleTodo, deleteTodo, updateTodo } from "../api/todoApi"
import { isAxiosError } from "axios"

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)

    async function loadTodos() {
        try {
            setLoading(true)
            setError(null)
            const data = await fetchTodos()
            setTodos(data)
        } catch {
            setError("Failed to load todos")
        } finally {
            setLoading(false)
        }
    }

  async function addTodo(title: string): Promise<boolean> {
  setActionError(null)

  try {
    await createTodo(title)
    await loadTodos()
    return true
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const msg = err.response?.data?.message
      setActionError(Array.isArray(msg) ? msg[0] : msg ?? "Add failed")
    } else {
      setActionError("Unexpected error")
    }
    return false
  }
}

    async function toggle(id: number, isCompleted: boolean) {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, isCompleted } : todo
            )
        )

        try {
            await toggleTodo(id, isCompleted)
        } catch {
            await loadTodos()
        }
    }

    async function remove(id: number) {
        setTodos(prev => prev.filter(todo => todo.id !== id))

        try {
            await deleteTodo(id)
        } catch {
            await loadTodos()
        }
    }

    async function update(id: number, title: string) {
        setActionError(null)

        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, title } : todo
            )
        )

        try {
            await updateTodo(id, title)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setActionError(err.response?.data?.message ?? "Update failed")
            } else {
                setActionError("Unexpected error")
            }
            await loadTodos()
        }
    }

    useEffect(() => {
        loadTodos()
    }, [])

    return {
        todos,
        loading,
        error,
        actionError,
        addTodo,
        toggle,
        remove,
        update
    }
}