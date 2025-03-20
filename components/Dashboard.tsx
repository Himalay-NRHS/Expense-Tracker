"use client"

import { useEffect, useState } from "react"
import { PlusIcon, ShoppingCartIcon, TrendingUpIcon, WalletIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useSession, signIn, signOut } from "next-auth/react";


interface Transaction {
  id: string
  amount: number
  transactionType: "income" | "expense"
  expenseCategory: string | null
  expenseName: string | null
  date: string
}

const sampleBackendData: Record<string, Transaction> = {
  t1: {
    id: "t1",
    amount: 2500,
    transactionType: "income",
    expenseCategory: null,
    expenseName: null,
    date: "2023-04-01",
  },
  t2: {
    id: "t2",
    amount: 1500,
    transactionType: "income",
    expenseCategory: null,
    expenseName: null,
    date: "2023-04-15",
  },
  t3: {
    id: "t3",
    amount: 120,
    transactionType: "expense",
    expenseCategory: "Food",
    expenseName: "Groceries",
    date: "2023-04-03",
  },
  t4: {
    id: "t4",
    amount: 85,
    transactionType: "expense",
    expenseCategory: "Food",
    expenseName: "Restaurant",
    date: "2023-04-10",
  },
  t5: {
    id: "t5",
    amount: 200,
    transactionType: "expense",
    expenseCategory: "Bills",
    expenseName: "Electricity",
    date: "2023-04-05",
  },
  t6: {
    id: "t6",
    amount: 150,
    transactionType: "expense",
    expenseCategory: "Bills",
    expenseName: "Internet",
    date: "2023-04-07",
  },
  t7: {
    id: "t7",
    amount: 300,
    transactionType: "expense",
    expenseCategory: "Travel",
    expenseName: "Gas",
    date: "2023-04-12",
  },
  t8: {
    id: "t8",
    amount: 250,
    transactionType: "expense",
    expenseCategory: "Shopping",
    expenseName: "Clothes",
    date: "2023-04-18",
  },
}

// Category colors for consistent visualization
const categoryColors: Record<string, string> = {
  Food: "hsl(142, 76%, 36%)",
  Travel: "hsl(217, 91%, 60%)",
  Bills: "hsl(43, 96%, 56%)",
  Shopping: "hsl(291, 64%, 42%)",
  Other: "hsl(215, 14%, 34%)",
}

export function Dashboard() {
  const { data: session, status } = useSession();

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
 
 useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Convert object of objects to array
        const transactionsArray = Object.values(sampleBackendData)

        // Sort by date (newest first)
        transactionsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setTransactions(transactionsArray)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate summary data
  const totalIncome = transactions.filter((t) => t.transactionType === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.transactionType === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  // Calculate expense by category
  const expensesByCategory = transactions
    .filter((t) => t.transactionType === "expense")
    .reduce((acc: Record<string, number>, t) => {
      const category = t.expenseCategory || "Other"
      acc[category] = (acc[category] || 0) + t.amount
      return acc
    }, {})

  // Convert to array for chart
  const categoryData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
  }))

  // Sort by amount (highest first)
  categoryData.sort((a, b) => b.amount - a.amount)

  // Calculate percentages for each category
  const totalExpenseAmount = categoryData.reduce((sum, item) => sum + item.amount, 0)
  const categoryPercentages = categoryData.map((item) => ({
    ...item,
    percentage: Math.round((item.amount / totalExpenseAmount) * 100),
  }))

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }
  if(session || status=="loading" ){
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.push("/dashboard/add-expense")}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard/add-income")}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Income
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 w-24 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-20 bg-muted rounded mb-2"></div>
                <div className="h-4 w-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <TrendingUpIcon className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {transactions.filter((t) => t.transactionType === "income").length} income transactions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <ShoppingCartIcon className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {transactions.filter((t) => t.transactionType === "expense").length} expense transactions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                  <WalletIcon className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${balance >= 0 ? "text-blue-600" : "text-red-600"}`}>
                    ${balance.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {balance >= 0 ? "You're doing great!" : "Watch your spending"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>How your money was spent across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    {/* Improved chart visualization */}
                    <div className="flex flex-col h-full">
                      {/* Stacked bar showing percentages */}
                      <div className="h-8 w-full flex rounded-md overflow-hidden mb-6">
                        {categoryPercentages.map((item, index) => (
                          <div
                            key={index}
                            className="h-full relative group"
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: categoryColors[item.category] || categoryColors.Other,
                              transition: "all 0.3s ease",
                            }}
                          >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            <div className="hidden group-hover:block absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-background border rounded-md p-2 shadow-lg z-10 whitespace-nowrap">
                              <p className="font-medium">{item.category}</p>
                              <p>
                                ${item.amount} ({item.percentage}%)
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Vertical bars with animation */}
                      <div className="flex-1 flex items-end justify-around gap-2">
                        {categoryPercentages.map((item, index) => (
                          <div key={index} className="flex flex-col items-center group">
                            <div className="relative">
                              <div
                                className="w-16 md:w-20 rounded-t-md transition-all duration-500 ease-out hover:brightness-110"
                                style={{
                                  height: `${(item.amount / Math.max(...categoryPercentages.map((c) => c.amount))) * 250}px`,
                                  backgroundColor: categoryColors[item.category] || categoryColors.Other,
                                  animation: `growUp 1s ease-out ${index * 0.1}s`,
                                }}
                              ></div>
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background border rounded-md p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                ${item.amount}
                              </div>
                            </div>
                            <div className="mt-2 text-sm font-medium truncate w-16 md:w-20 text-center">
                              {item.category}
                            </div>
                            <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div className="flex items-center" key={transaction.id}>
                        <div
                          className={`w-2 h-10 rounded-full mr-3 ${
                            transaction.transactionType === "income" ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center">
                            <p className="text-sm font-medium leading-none">
                              {transaction.transactionType === "income" ? "Income" : transaction.expenseName}
                            </p>
                            {transaction.transactionType === "expense" && (
                              <Badge
                                className="ml-2"
                                style={{
                                  backgroundColor: categoryColors[transaction.expenseCategory || "Other"],
                                  color: "white",
                                }}
                              >
                                {transaction.expenseCategory}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                        </div>
                        <div
                          className={`font-medium ${
                            transaction.transactionType === "income" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.transactionType === "income" ? "+" : "-"}${transaction.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>Complete history of your financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {transactions.map((transaction) => (
                    <div
                      className="flex items-center p-2 hover:bg-muted/50 rounded-lg transition-colors"
                      key={transaction.id}
                    >
                      <div
                        className={`w-2 h-10 rounded-full mr-3 ${
                          transaction.transactionType === "income" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium leading-none">
                            {transaction.transactionType === "income" ? "Income" : transaction.expenseName}
                          </p>
                          {transaction.transactionType === "expense" && (
                            <Badge
                              className="ml-2"
                              style={{
                                backgroundColor: categoryColors[transaction.expenseCategory || "Other"],
                                color: "white",
                              }}
                            >
                              {transaction.expenseCategory}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                      </div>
                      <div
                        className={`font-medium ${
                          transaction.transactionType === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.transactionType === "income" ? "+" : "-"}${transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {categoryPercentages.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: categoryColors[item.category] || categoryColors.Other }}
                            ></div>
                            <span className="font-medium">{item.category}</span>
                          </div>
                          <span>
                            ${item.amount} ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full"
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: categoryColors[item.category] || categoryColors.Other,
                              animation: `growRight 1s ease-out ${index * 0.1}s`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-[300px]">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Balance</div>
                      </div>
                    </div>

                    {/* Circular progress chart */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />

                      {/* Income arc */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(142, 76%, 36%)"
                        strokeWidth="10"
                        strokeDasharray={`${(totalIncome / (totalIncome + totalExpenses)) * 251.2} 251.2`}
                        strokeLinecap="round"
                        style={{ animation: "circleAnimation 1.5s ease-out forwards" }}
                      />

                      {/* Expense arc */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(0, 84%, 60%)"
                        strokeWidth="10"
                        strokeDasharray={`${(totalExpenses / (totalIncome + totalExpenses)) * 251.2} 251.2`}
                        strokeDashoffset={`${-1 * (totalIncome / (totalIncome + totalExpenses)) * 251.2}`}
                        strokeLinecap="round"
                        style={{ animation: "circleAnimation 1.5s ease-out forwards" }}
                      />
                    </svg>
                  </div>

                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Income: ${totalIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Expenses: ${totalExpenses.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      <style jsx global>{`
        @keyframes growUp {
          from { height: 0; }
        }
        
        @keyframes growRight {
          from { width: 0; }
        }
        
        @keyframes circleAnimation {
          from { stroke-dashoffset: 251.2; }
        }
      `}</style>
    </div>
  )}
  else{
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-3xl font-bold">ExpenseTracker</h1>
        <p className="text-lg text-muted-foreground">Track your expenses and income easily</p>
        <Button onClick={() => signIn()}>Sign in to get started</Button>
      </div>
    )

  }
}

