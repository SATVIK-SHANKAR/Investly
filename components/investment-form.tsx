"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { currencies } from "@/lib/currencies"
import { getPortfolio } from "@/lib/actions"
import { PortfolioResults } from "@/components/portfolio-results"
import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Investment amount is required")
    .refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, "Amount must be a positive number"),
  risk: z.enum(["low", "medium", "high"], {
    required_error: "Please select a risk level",
  }),
  currency: z.string({
    required_error: "Please select a currency",
  }),
})

export default function InvestmentForm() {
  const [loading, setLoading] = useState(false)
  const [portfolioData, setPortfolioData] = useState(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      risk: "medium",
      currency: "USD",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const result = await getPortfolio({
        amount: Number.parseFloat(values.amount),
        risk: values.risk,
        currency: values.currency,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setPortfolioData(result)

        // Scroll to results with smooth animation
        setTimeout(() => {
          document.getElementById("portfolio-results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 100)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Your Portfolio</h2>

      <div className="grid gap-10 md:grid-cols-2">
        <Card className="p-6 bg-white rounded-lg shadow-sm dark:bg-slate-800 border-t-4 border-t-purple-600 transition-all duration-300 hover:shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="transition-all duration-300 hover:translate-y-[-2px]">
                    <FormLabel>Investment Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="10000"
                        {...field}
                        className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </FormControl>
                    <FormDescription>Enter the amount you want to invest</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="risk"
                render={({ field }) => (
                  <FormItem className="transition-all duration-300 hover:translate-y-[-2px]">
                    <FormLabel>Risk Tolerance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose your preferred risk level</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="transition-all duration-300 hover:translate-y-[-2px]">
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your preferred currency</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Portfolio...
                  </>
                ) : (
                  "Generate Portfolio"
                )}
              </Button>
            </form>
          </Form>
        </Card>

        <div
          id="portfolio-results"
          className="p-6 bg-white rounded-lg shadow-sm dark:bg-slate-800 transition-all duration-300 hover:shadow-md"
        >
          {portfolioData ? (
            <PortfolioResults data={portfolioData} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold">$</span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                Your portfolio suggestions will appear here
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Fill out the form and click "Generate Portfolio" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
