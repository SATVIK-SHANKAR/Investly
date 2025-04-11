"use client"

import { useState, useEffect } from "react"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-500">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center animate-pulse shadow-lg">
          <span className="text-white font-bold text-2xl">IP</span>
        </div>

        <div className="w-64 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-loading-bar"></div>
        </div>

        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400 animate-pulse font-medium">
          Loading market data...
        </p>
      </div>
    </div>
  )
}
