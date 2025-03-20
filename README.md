# Expense Tracker(My simple Hobby project)
(My simple Hobby project)

A simple web app to track your expenses and income. Built with Next.js, Prisma, and PostgreSQL.

## Features

* User authentication (Sign in / Sign up)
* Add expenses with category, amount, date, and description
* Track income entries
* Categorize expenses (Food, Travel, Bills, Shopping, etc.)
* View complete expense and income history

## Tech Stack

* Next.js
* Prisma ORM
* PostgreSQL
* Next-Auth
* Tailwind CSS 

## Setup Instructions

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Setup your `.env` file with the database URL
4. Run Prisma migrations
   ```
   npx prisma migrate dev
   ```
5. Start the development server
   ```
   npm run dev
   ```

## Future Improvements

* Edit/Delete expenses
* Date range filters
* Charts and analytics
* Export data (CSV/PDF)
* Budget limits per category


