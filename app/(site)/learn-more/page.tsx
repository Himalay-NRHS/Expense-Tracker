import Link from "next/link"
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  CreditCard,
  DollarSign,
  HelpCircle,
  LineChart,
  Lock,
  PieChart,
  Smartphone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearnMorePage() {
  return (
    <div className="flex flex-col min-h-screen">

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Take Control of Your Financial Future
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                ExpenseTracker helps you understand your spending habits, track your income, and achieve your financial
                goals.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/api/auth/signin">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How ExpenseTracker Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our simple three-step process helps you gain clarity on your finances
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">1. Track Expenses</h3>
              <p className="text-muted-foreground">
                Easily record your daily expenses with just a few taps. Categorize them for better organization.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">2. Monitor Income</h3>
              <p className="text-muted-foreground">
                Keep track of all your income sources to get a complete picture of your financial health.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BarChart2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">3. Analyze & Improve</h3>
              <p className="text-muted-foreground">
                Gain insights from detailed reports and visualizations to make better financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to manage your personal finances effectively
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Expense Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Record expenses with category, amount, date, and description. Attach receipts for better
                  record-keeping.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle>Income Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Track multiple income sources, set up recurring income entries, and monitor your earnings over time.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <CardTitle>Categorization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Organize expenses into customizable categories like Food, Travel, Bills, Shopping, and more.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  <CardTitle>Visual Reports</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  View your financial data through intuitive charts and graphs. Identify trends and patterns in your
                  spending.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <CardTitle>Mobile Friendly</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Access your financial data on the go. Our responsive design works perfectly on all devices.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Secure & Private</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Your financial data is encrypted and secure. We never share your information with third parties.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose ExpenseTracker?
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Our expense tracker is designed to help you achieve financial freedom through better money management.
              </p>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-bold">Save More Money</h3>
                    <p className="text-muted-foreground">
                      Identify unnecessary expenses and find opportunities to save more each month.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-bold">Reduce Financial Stress</h3>
                    <p className="text-muted-foreground">
                      Gain clarity on your finances and reduce anxiety about money management.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-bold">Achieve Financial Goals</h3>
                    <p className="text-muted-foreground">
                      Set and track progress toward your financial goals, from debt repayment to saving for a home.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-bold">Make Better Decisions</h3>
                    <p className="text-muted-foreground">
                      Use data-driven insights to make smarter financial choices in your daily life.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="relative rounded-xl border bg-background p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Monthly Savings</h3>
                      <p className="text-muted-foreground">
                        Users report saving an average of $250 per month after using ExpenseTracker for 3 months.
                      </p>
                    </div>
                    <div className="h-40 w-full bg-muted rounded-lg flex items-center justify-center">
                      <div className="w-full px-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Before ExpenseTracker</span>
                            <span>$50/month</span>
                          </div>
                          <div className="h-2 w-[20%] bg-primary/50 rounded-full"></div>
                        </div>
                        <div className="space-y-2 mt-6">
                          <div className="flex justify-between text-sm">
                            <span>After ExpenseTracker</span>
                            <span>$300/month</span>
                          </div>
                          <div className="h-2 w-[80%] bg-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Based on a survey of 1,000+ active users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Get answers to common questions about ExpenseTracker
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold">Is ExpenseTracker free to use?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer a free basic plan with all essential features. Premium plans with advanced features
                    are available for a small monthly fee.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold">Can I access ExpenseTracker on my phone?</h3>
                  <p className="text-muted-foreground">
                    ExpenseTracker works on all devices, including smartphones, tablets, and computers.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold">Is my financial data secure?</h3>
                  <p className="text-muted-foreground">
                    Yes, we use bank-level encryption to protect your data. Your privacy and security are our top
                    priorities.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold">Can I export my financial data?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can export your data in various formats including CSV and PDF for your records or tax
                    purposes.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold">Can I set up recurring expenses?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can set up recurring expenses for bills and subscriptions to save time on manual entry.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold">How do I get started?</h3>
                  <p className="text-muted-foreground">
                    Simply sign up for a free account, and you can start tracking your expenses and income right away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join thousands of users who have transformed their financial lives with ExpenseTracker.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" asChild>
                <Link  href="/api/auth/signin">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-background">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground"> 2025 ExpenseTracker</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link
              href="mailto:contact@expensetracker.com"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              himalayrekha@gmail.com
            </Link>
            <Link
              href="https://github.com/Himalay-NRHS/Expense-Tracker"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

