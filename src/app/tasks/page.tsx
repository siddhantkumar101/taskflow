"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTodoStore } from "@/lib/TodoStore";

export default function Tasks() {
  const [taskInput, setTaskInput] = useState<string>("");

  // Retrieve state and actions from the Zustand store
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;
    addTodo(taskInput);
    setTaskInput(""); // Reset input field
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12">
      <div className="w-full max-w-2xl space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-800">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
              Workflow Tasks
            </h1>
            <p className="text-zinc-400 text-sm">
              Create, organize, and manage your ongoing work tasks.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard"
              className="bg-zinc-905 border border-amber-500/20 text-amber-500 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-200 cursor-pointer"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Task Input Section */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl space-y-4">
          <label className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
            Create New Task
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask();
              }}
              placeholder="What needs to be done today?"
              className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors duration-200"
            />
            <button
              onClick={handleAddTask}
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-600/10 hover:shadow-amber-500/25 transform active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-white">Your Tasks ({todos.length})</h2>
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
              Interactive Preview
            </span>
          </div>

          {todos.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl space-y-3">
              <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
              <p className="text-zinc-500 text-sm font-medium text-center">
                All caught up! Write a task above to populate your list.
              </p>
            </div>
          ) : (
            /* Active Task List */
            <div className="space-y-3">
              {todos.map((task) => (
                <div
                  key={task.id}
                  className={`group relative flex items-center justify-between p-4 bg-zinc-900/50 border rounded-2xl transition-all duration-300 ${
                    task.completed
                      ? "border-zinc-900 bg-zinc-950/20 opacity-70"
                      : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80"
                  }`}
                >
                  {/* Task Text & Checkbox */}
                  <div
                    onClick={() => toggleTodo(task.id)}
                    className="flex items-center gap-4 flex-1 cursor-pointer select-none"
                  >
                    {/* Circle Checkbox */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.completed
                          ? "bg-amber-500 border-amber-500 text-zinc-950"
                          : "border-zinc-700 group-hover:border-zinc-500"
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Task Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span
                        className={`text-base font-medium transition-all duration-300 ${
                          task.completed
                            ? "line-through text-zinc-600"
                            : "text-zinc-100"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  </div>

                  {/* Actions / Delete Button */}
                  <button
                    onClick={() => deleteTodo(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 p-2 rounded-xl hover:bg-zinc-800/50 transition-all duration-200 cursor-pointer"
                    aria-label="Delete Task"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
