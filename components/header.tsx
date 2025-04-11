"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle navigation link clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()

    // Close mobile menu if open
    setIsMobileMenuOpen(false)

    // If it's just a # link, do nothing more
    if (targetId === "#") return

    // Handle scrolling to section
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">IP</span>
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">InvestPro</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "home")}
            >
              Home
            </Link>
            <Link
              href="#markets"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "markets")}
            >
              Markets
            </Link>
            <Link
              href="#portfolio"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "portfolio-results")}
            >
              Portfolio
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "about")}
            >
              About
            </Link>
          </nav>

          <ModeToggle />
        </div>

        <div className="flex md:hidden items-center space-x-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-slide-down">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              href="/"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "home")}
            >
              Home
            </Link>
            <Link
              href="#markets"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "markets")}
            >
              Markets
            </Link>
            <Link
              href="#portfolio"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "portfolio-results")}
            >
              Portfolio
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400 transition-colors"
              onClick={(e) => handleNavClick(e, "about")}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
