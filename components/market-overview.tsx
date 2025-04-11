"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts"
import { ArrowDown, ArrowUp, TrendingUp, BarChart3 } from "lucide-react"

// Mock data for market indices
const marketIndices = [
  {
    name: "S&P 500",
    value: 4892.37,
    change: 0.87,
    color: "emerald",
  },
  {
    name: "NASDAQ",
    value: 15628.95,
    change: 1.24,
    color: "emerald",
  },
  {
    name: "DOW",
    value: 38239.98,
    change: 0.56,
    color: "emerald",
  },
  {
    name: "RUSSELL",
    value: 2042.65,
    change: -0.32,
    color: "rose",
  },
]

// Mock data for charts
const generateChartData = (days = 30, trend = "up") => {
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

const stockData = {
  "1D": generateChartData(24, "up"),
  "1W": generateChartData(7, "up"),
  "1M": generateChartData(30, "up"),
  "3M": generateChartData(90, "down"),
  "1Y": generateChartData(365, "up"),
}

export default function MarketOverview() {
  const [activeTab, setActiveTab] = useState("1M")
  const [chartType, setChartType] = useState("line")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div id="markets" className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-purple-600" />
          Market Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((idx) => (
            <Card key={idx} className="h-40 animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              </CardHeader>
              <CardContent>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4"></div>
                <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div id="markets" className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-purple-600" />
        Market Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketIndices.map((index) => (
          <Card
            key={index.name}
            className="overflow-hidden border-t-4 border-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{index.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                <div className={`flex items-center ${index.change > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {index.change > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  <span>{Math.abs(index.change)}%</span>
                </div>
              </div>
              <div className="h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generateChartData(20, index.change > 0 ? "up" : "down")}>
                    <defs>
                      <linearGradient id={`gradient-${index.name}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={index.change > 0 ? "#10b981" : "#ef4444"} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={index.change > 0 ? "#10b981" : "#ef4444"} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={index.change > 0 ? "#10b981" : "#ef4444"}
                      fillOpacity={1}
                      fill={`url(#gradient-${index.name})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-t-4 border-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              S&P 500 Performance
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Tabs value={chartType} onValueChange={setChartType} className="w-full sm:w-auto">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="line">Line</TabsTrigger>
                  <TabsTrigger value="area">Area</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList className="w-full sm:w-auto grid grid-cols-5">
                  <TabsTrigger value="1D">1D</TabsTrigger>
                  <TabsTrigger value="1W">1W</TabsTrigger>
                  <TabsTrigger value="1M">1M</TabsTrigger>
                  <TabsTrigger value="3M">3M</TabsTrigger>
                  <TabsTrigger value="1Y">1Y</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {chartType === "line" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockData[activeTab]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "#374151", opacity: 0.2 }}
                    axisLine={{ stroke: "#374151", opacity: 0.2 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "#374151", opacity: 0.2 }}
                    axisLine={{ stroke: "#374151", opacity: 0.2 }}
                    domain={["dataMin - 10", "dataMax + 10"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "0.5rem",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    labelStyle={{ fontWeight: "bold" }}
                  />
                  <Legend />
                  <Line
                    name="S&P 500 Value"
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {chartType === "area" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockData[activeTab]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "#374151", opacity: 0.2 }}
                    axisLine={{ stroke: "#374151", opacity: 0.2 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "#374151", opacity: 0.2 }}
                    axisLine={{ stroke: "#374151", opacity: 0.2 }}
                    domain={["dataMin - 10", "dataMax + 10"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "0.5rem",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    labelStyle={{ fontWeight: "bold" }}
                  />
                  <Legend />
                  <Area
                    name="S&P 500 Value"
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="url(#colorValue)"
                    fillOpacity={1}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
