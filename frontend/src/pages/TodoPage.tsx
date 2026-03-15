import { useState } from "react"
import { useTodos } from "../hooks/useTodos"
import { Pencil, Trash2 } from "lucide-react"

export default function TodoPage() {
  const [title, setTitle] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState("")

  const { todos, loading, error, actionError, addTodo, toggle, remove, update } = useTodos()

  function startEdit(id: number, currentTitle: string) {
    setEditingId(prev => (prev === id ? null : id))
    setEditingTitle(currentTitle)
  }

  async function saveEdit(id: number) {
    if (!editingTitle.trim()) {
      setEditingId(null)
      return
    }
    await update(id, editingTitle)
    setEditingId(null)
    setEditingTitle("")
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center pt-24">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800">
            Tasks
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Simple task management
          </p>
        </div>

        {/* Add */}
        <div className="flex gap-3 mb-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2.5 rounded-xl text-sm outline-none transition"
          />
          <button
            disabled={loading}
            onClick={async () => {
              const success = await addTodo(title)
              if (success) setTitle("")
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl text-sm font-medium transition disabled:opacity-40"
          >
            Add
          </button>
        </div>

        {actionError && (
          <p className="text-sm text-red-500 mb-4">{actionError}</p>
        )}

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        {/* List */}
        <ul className="space-y-2 mt-6">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggle(todo.id, !todo.isCompleted)}
                  className="accent-blue-600"
                />

                {editingId === todo.id ? (
                  <input
                    autoFocus
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => saveEdit(todo.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id)
                      if (e.key === "Escape") setEditingId(null)
                    }}
                    className="flex-1 border border-blue-400 focus:ring-2 focus:ring-blue-100 px-2 py-1 rounded-lg text-sm outline-none"
                  />
                ) : (
                  <span
                    className={`text-sm ${todo.isCompleted
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                      }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              <div className="flex gap-2 ml-3">
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => startEdit(todo.id, todo.title)}
                  className="text-slate-400 hover:text-blue-600 transition"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => remove(todo.id)}
                  className="text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}