import Link from "next/link";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
          Welcome to TaskFlow
        </h1>
        <p className="text-zinc-400 text-lg">
          This is the Home route. Get started by organizing your workflow today.
        </p>
        <button className="bg-amber-600 px-6 py-3 rounded-xl text-lg font-bold text-white hover:bg-amber-500 transition-colors cursor-pointer">
          <Link href="/dashboard">dashboard</Link>
        </button>
      </div>
    </div>
  );  
}
