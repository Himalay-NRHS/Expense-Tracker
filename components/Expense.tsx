"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CalendarIcon, CreditCard, DollarSign, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useSession, signIn } from "next-auth/react";


const expenseCategories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Health", "Education", "Other"]

export default function AddExpensePage() {
  const { data: session, status } = useSession();

  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    amount?: string
  }>({})
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { amount?: string } = {}

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const data = {
        amount: Number(amount),
        transactionType: "expense",
        expensecategory: category || null,
        expensename: name || null,
        description: description || null,
        createdAt: date?.toISOString() || new Date().toISOString().split('T')[0],
        email: session?.user?.email

     
    };
try{
    const res= await fetch('/api/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add income');
          }
          
          setAmount("");
          setToastMessage("Income added successfully"); 
          return response.json();
        })
        .then(() => {
          router.push("/dashboard");
        })
        .catch(error => {
          console.error('Error adding income:', error);
        });

          setAmount("");
          setToastMessage("Income added successfully"); 
      }catch(err){
  
        setToastMessage("Something went wrong");
    
      }
    }

  }
  if(session || status=="loading" ){
    return (
    <div className="container max-w-md mx-auto py-10">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card className="border-t-4 border-t-red-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-red-500" />
            Add Expense
          </CardTitle>
          <CardDescription>Record a new expense transaction</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center">
                Amount <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className={cn("pl-9", errors.amount && "border-red-500 focus-visible:ring-red-500")}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
              {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Expense Name</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="e.g., Groceries, Rent, etc."
                  className="pl-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add more details about this expense"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Save Expense
            </Button>
          </CardFooter>
        </form>
      </Card>
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

