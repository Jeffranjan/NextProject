# Ganpati Computers

A modern, full-featured e-commerce platform dedicated to selling high-quality laptops. Built with the latest web technologies to ensure a seamless and secure shopping experience.

## 🚀 Features

- **User Authentication**: Secure sign-up and login powered by [Supabase Auth](https://supabase.com/auth).
- **Product Catalog**: Browse a wide range of laptops with advanced filtering and search capabilities.
- **Admin Dashboard**: Comprehensive admin interface for managing products, inventory, and orders.
- **Secure Payments**: Integrated [Razorpay](https://razorpay.com/) for safe and reliable transactions.
- **Shopping Cart**: Dynamic cart functionality with persistent state.
- **Responsive Design**: Fully responsive UI built with [Tailwind CSS](https://tailwindcss.com/) for all devices.
- **Modern UI/UX**: Smooth animations and transitions using [Framer Motion](https://www.framer.com/motion/).

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **State Management**: React Context & Hooks
- **Animations**: Framer Motion
- **Icons**: [Lucide React](https://lucide.dev/)
- **Payments**: Razorpay

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ganpati-computers.git
   cd ganpati-computers
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Generic UI components (buttons, inputs, etc.)
├── lib/                  # Utility functions and data
├── public/               # Static assets (images, icons)
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
