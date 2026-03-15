import type { ApiResponse, Todo } from "../types/todo"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export async function fetchTodos(): Promise<Todo[]> {
    const res = await api.get<ApiResponse<Todo[]>>("/todos")
    return res.data.data
}
export async function createTodo(title: string):Promise<Todo> {
    const res = await api.post<ApiResponse<Todo>>("/todos",{title})
    return res.data.data
}
export async function toggleTodo(id: number,isCompleted: boolean):Promise<Todo> {
    const res = await api.patch<ApiResponse<Todo>>(`/todos/${id}`,{isCompleted})
    return res.data.data
}
export async function updateTodo(id: number,title:string):Promise<Todo> {
    const res = await api.patch<ApiResponse<Todo>>(`/todos/${id}`,{title})
    return res.data.data
}
export async function deleteTodo(id: number): Promise<void> {
  await api.delete<ApiResponse<null>>(`/todos/${id}`)
}