"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTodoStore } from "@/lib/TodoStore";

export default function TaskDetails() {
  const { id } = useParams();

  // Find the exact task dynamically from our Zustand store
  const task = useTodoStore((state) => state.todos.find((t) => t.id === id));

  if (!task) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-6 p-6">
        <div className="max-w-md w-full text-center space-y-4 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
          <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-extrabold tracking-tight">Task Not Found!</h1>
          <p className="text-zinc-400 text-sm">
            The task you are trying to view does not exist or has been deleted.
          </p>
          <Link
            href="/tasks"
            className="block w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl font-bold transition-all duration-200 cursor-pointer"
          >
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12">
      <div className="w-full max-w-xl space-y-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-center pb-6 border-b border-zinc-800">
          <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Task Overview
          </span>
          <Link
            href="/tasks"
            className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
          >
            Back to Tasks
          </Link>
        </div>

        {/* Dynamic Content Card */}
        <div className="relative group overflow-hidden bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div className="space-y-6">
            
            {/* Status Tag */}
            <span
              className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                task.completed
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-500 border-amber-500/20"
              }`}
            >
              {task.completed ? "Completed" : "Pending Status"}
            </span>

            {/* Task Content */}
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-white leading-snug break-words">
                {task.text}
              </h2>
              <p className="text-zinc-500 text-xs font-medium tracking-wide">
                Task Reference ID: <span className="text-zinc-400 font-mono select-all">{task.id}</span>
              </p>
            </div>

            <hr className="border-zinc-800/80" />

            {/* Extra mock details for premium view */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 font-semibold uppercase">Category</p>
                <p className="font-bold text-zinc-300">General Workspace</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 font-semibold uppercase">Priority</p>
                <p className="font-bold text-amber-500">Medium</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
