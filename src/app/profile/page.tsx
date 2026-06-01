"use client";

import Link from "next/link";
import { useTodoStore } from "@/lib/TodoStore";

export default function Profile() {
  // Pull live metrics from the Zustand store
  const total = useTodoStore((state) => state.totalTask);
  const completed = useTodoStore((state) => state.totaltaskcompleted);
  const pending = useTodoStore((state) => state.totaltaskpending);

  // Compute completion rate dynamically (prevents division by zero)
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12">
      {/* Container */}
      <div className="w-full max-w-2xl space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-zinc-800">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
              User Profile
            </h1>
            <p className="text-zinc-400 text-sm">
              Manage your personal taskflow credentials and metrics.
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
              className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative group overflow-hidden bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Placeholder */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white font-black text-3xl shadow-lg shadow-amber-500/20">
              SD
            </div>
            
            {/* User Details */}
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">Siddharth</h2>
              <p className="text-sm font-semibold text-amber-500 tracking-wider uppercase">
                Task Master Level 1
              </p>
              <p className="text-zinc-400 text-xs">
                Member since June 2026 • Premium Account
              </p>
            </div>
          </div>

          <hr className="border-zinc-800 my-6" />

          {/* User Metrics from Zustand Store */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Zustand Store Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              
              <div className="p-4 bg-zinc-950/40 border border-zinc-800/80 rounded-xl">
                <p className="text-xs text-zinc-500 font-semibold uppercase">Total</p>
                <p className="text-2xl font-black text-white mt-1">{total}</p>
              </div>

              <div className="p-4 bg-zinc-950/40 border border-zinc-800/80 rounded-xl">
                <p className="text-xs text-zinc-500 font-semibold uppercase">Completed</p>
                <p className="text-2xl font-black text-emerald-400 mt-1">{completed}</p>
              </div>

              <div className="p-4 bg-zinc-950/40 border border-zinc-800/80 rounded-xl">
                <p className="text-xs text-zinc-500 font-semibold uppercase">Rate</p>
                <p className="text-2xl font-black text-amber-500 mt-1">{completionRate}%</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
