import InvestmentForm from "@/components/investment-form"
import MarketOverview from "@/components/market-overview"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="container max-w-6xl px-4 py-10 mx-auto">
        <div id="home" className="mb-10 text-center animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Investment Portfolio Advisor
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Get personalized investment suggestions based on your risk tolerance and budget
          </p>
        </div>

        <MarketOverview />

        <div className="mt-12 animate-slide-up">
          <InvestmentForm />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
