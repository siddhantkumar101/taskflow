"use client";

import Link from "next/link";
import { useTodoStore } from "@/lib/TodoStore";

export default function Dashboard() {
  // Pull live metrics directly from the store
  const total = useTodoStore((state) => state.totalTask);
  const completed = useTodoStore((state) => state.totaltaskcompleted);
  const pending = useTodoStore((state) => state.totaltaskpending);

  // Compute completion rate dynamically (prevents division by zero)
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12">
      {/* Container */}
      <div className="w-full max-w-4xl space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-zinc-800">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-zinc-400 text-sm">
              Real-time analytics and overview of your task metrics.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="bg-zinc-900 border border-zinc-800 px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
            >
              Back to Home
            </Link>
            <Link
              href="/tasks"
              className="bg-zinc-905 border border-amber-500/20 text-amber-500 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-200 cursor-pointer"
            >
              Go to Tasks
            </Link>
            <button className="bg-amber-600 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-amber-500 transition-all duration-200 shadow-lg shadow-amber-600/10 cursor-pointer">
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Card 1: Total Tasks */}
          <div className="relative group overflow-hidden bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-700/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
                Total Tasks
              </span>
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">{total}</span>
              <span className="text-zinc-500 text-xs font-medium">all time</span>
            </div>
          </div>

          {/* Card 2: Completed Tasks */}
          <div className="relative group overflow-hidden bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
                Completed
              </span>
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-emerald-400">{completed}</span>
              <span className="text-emerald-500/70 text-xs font-semibold">{completionRate}% rate</span>
            </div>
          </div>

          {/* Card 3: Pending Tasks */}
          <div className="relative group overflow-hidden bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
                Pending
              </span>
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-amber-500">{pending}</span>
              <span className="text-zinc-500 text-xs font-medium">awaiting completion</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
