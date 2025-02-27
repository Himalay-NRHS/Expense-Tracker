import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSignIcon, HistoryIcon, PieChartIcon, PlusIcon } from "lucide-react"
import a from "../lib/db"
export default function Home() {
  return (
    <div className="flex-1">
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Manage Your Finances with Ease 
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Track your expenses, monitor your income, and take control of your financial future with our powerful
              expense tracker.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<PlusIcon className="h-10 w-10" />}
            title="Add Expenses"
            description="Input category, amount, date, and description for each expense."
          />
          <FeatureCard
            icon={<DollarSignIcon className="h-10 w-10" />}
            title="Track Income"
            description="Monitor your various sources of income easily."
          />
          <FeatureCard
            icon={<PieChartIcon className="h-10 w-10" />}
            title="Expense Categories"
            description="Organize expenses into categories like Food, Travel, Bills, Shopping, etc."
          />
          <FeatureCard
            icon={<HistoryIcon className="h-10 w-10" />}
            title="Expense History"
            description="View and analyze your complete expense history."
          />
        </div>
      </div>
    </section>

    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2023 ExpenseTracker. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a
            href="mailto:himalayrekha@gmail.com"  target="_blank"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            contact-himalayrekha@gmail.com
          </a>
          <a
            href="https://github.com/Himalay-NRHS/Expense-Tracker"  target="_blank"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
  );
}
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
