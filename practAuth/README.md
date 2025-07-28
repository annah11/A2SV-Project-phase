# Job Listing Dashboard

A modern, responsive job listing dashboard built with Next.js (App Router) and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Modern UI**: Clean, professional design with hover effects and smooth transitions
- **Job Cards**: Reusable components displaying job information with company avatars
- **API Integration**: Next.js API routes serving job data
- **Type Safety**: TypeScript implementation for better development experience
- **Performance**: Optimized images and efficient data loading

## 📁 Project Structure

\`\`\`
app/
├── page.tsx                 → Main dashboard page
├── components/
│   └── JobCard.tsx         → Reusable job card component
├── data/
│   └── jobs.json          → Mock job data
├── api/
│   └── jobs/
│       └── route.ts       → API endpoint for job data
└── globals.css            → Global styles and utilities
\`\`\`

## 🎨 Styling Approach

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Semantic Classes**: Used meaningful utility classes for maintainable code
- **Responsive Design**: Mobile-first breakpoints (sm, md, lg)
- **Color System**: Consistent color palette with semantic meanings
- **Typography**: Proper font weights and sizes for hierarchy
- **Spacing**: Consistent padding and margins using Tailwind's spacing scale

## 📊 Data Loading

The application supports multiple data loading strategies:

1. **API Route**: Primary method using `/api/jobs` endpoint
2. **Fallback Import**: Direct JSON import if API fails
3. **Server-Side Rendering**: Data fetched at build time for optimal performance

## 🔧 Key Components

### JobCard Component
- Displays job information in a clean card layout
- Company avatar with proper image optimization
- Job type badges with color coding
- Location with icon
- Hover effects for better interactivity

### Dashboard Layout
- Header with job statistics
- Grid layout adapting to screen size
- Empty state handling
- Statistics cards showing job type distribution

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## 📱 Responsive Breakpoints

- **Mobile**: Single column layout
- **Tablet (md)**: 2-column grid
- **Desktop (lg)**: 3-column grid
- **Stats**: 1-4 columns based on screen size

The dashboard is fully responsive and provides an optimal viewing experience across all device sizes.
