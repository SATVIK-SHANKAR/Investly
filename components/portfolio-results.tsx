"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { PieChartIcon as ChartPie, Waves, BarChart, PieChartIcon } from "lucide-react"

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

const riskMetrics = {
  low: {
    volatility: 2,
    return: 3,
    liquidity: 5,
    diversification: 4,
    timeHorizon: 5,
  },
  medium: {
    volatility: 3,
    return: 4,
    liquidity: 4,
    diversification: 3,
    timeHorizon: 3,
  },
  high: {
    volatility: 5,
    return: 5,
    liquidity: 3,
    diversification: 2,
    timeHorizon: 2,
  },
}

// Generate mock historical data for each stock
const generateHistoricalData = (symbol, days = 30, trend = "up") => {
  const data = []
  let value = trend === "up" ? 100 : 150

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - (trend === "up" ? 0.4 : 0.6)) * 5
    value = Math.max(50, value + change)
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: Number.parseFloat(value.toFixed(2)),
    })
  }

  return data
}

export function PortfolioResults({ data }) {
  const [activeTab, setActiveTab] = useState("table")
  const [mounted, setMounted] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)

  useEffect(() => {
    setMounted(true)
    if (data?.breakdown?.length > 0) {
      setSelectedStock(data.breakdown[0].symbol)
    }
  }, [data])

  if (!mounted || !data || !data.breakdown) {
    return <div>No portfolio data available</div>
  }

  const { total, currency, risk, breakdown } = data

  const pieData = breakdown.map((item) => ({
    name: item.symbol,
    value: item.allocated,
  }))

  const totalAllocated = breakdown.reduce((sum, item) => sum + item.allocated, 0)
  const remaining = Number.parseFloat((total - totalAllocated).toFixed(2))

  const radarData = [
    { subject: "Volatility", A: riskMetrics[risk].volatility, fullMark: 5 },
    { subject: "Return Potential", A: riskMetrics[risk].return, fullMark: 5 },
    { subject: "Liquidity", A: riskMetrics[risk].liquidity, fullMark: 5 },
    { subject: "Diversification", A: riskMetrics[risk].diversification, fullMark: 5 },
    { subject: "Time Horizon", A: riskMetrics[risk].timeHorizon, fullMark: 5 },
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Generate historical data for the selected stock
  const stockHistoricalData = selectedStock
    ? generateHistoricalData(selectedStock, 30, Math.random() > 0.5 ? "up" : "down")
    : []

  return (
    <div id="portfolio-results" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden border-t-4 border-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ChartPie className="h-4 w-4 text-purple-500" />
              Total Investment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {formatCurrency(total)}
            </div>
            <p className="text-xs text-muted-foreground">{risk.charAt(0).toUpperCase() + risk.slice(1)} risk profile</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-t-4 border-emerald-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Waves className="h-4 w-4 text-emerald-500" />
              Remaining Funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              {formatCurrency(remaining)}
            </div>
            <p className="text-xs text-muted-foreground">{((remaining / total) * 100).toFixed(2)}% of total</p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-t-4 border-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1">
        <CardHeader className="pb-2">
          <CardTitle>Portfolio Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="table" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Table</span>
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Allocation</span>
              </TabsTrigger>
              <TabsTrigger value="radar" className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2V12L19 19" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 12L5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="hidden sm:inline">Risk Profile</span>
              </TabsTrigger>
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <Waves className="h-4 w-4" />
                <span className="hidden sm:inline">Stock Chart</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-0 pt-2">
              <div className="animate-fade-in">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Allocated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breakdown.map((item, index) => (
                      <TableRow
                        key={item.symbol}
                        className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setSelectedStock(item.symbol)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            {item.symbol}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                        <TableCell className="text-right">{item.shares.toFixed(4)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.allocated)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pie" className="mt-0 pt-2">
              <div className="animate-fade-in h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(name) => `Symbol: ${name}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="radar" className="mt-0 pt-2">
              <div className="animate-fade-in h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name={`${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk Profile`}
                      dataKey="A"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                      animationBegin={0}
                      animationDuration={1200}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="chart" className="mt-0 pt-2">
              <div className="animate-fade-in">
                <div className="mb-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Stock:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {breakdown.map((item, index) => (
                      <button
                        key={item.symbol}
                        onClick={() => setSelectedStock(item.symbol)}
                        className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                          selectedStock === item.symbol
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                            : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {item.symbol}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stockHistoricalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="value"
                        name={selectedStock}
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationBegin={0}
                        animationDuration={1200}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
