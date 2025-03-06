# Asset Sentry Quest

A modern asset management application built with React, TypeScript, and Tailwind CSS. This application helps organizations track, manage, and maintain their physical assets.

## Features

### Asset Management
- Create, view, update, and delete assets
- Track asset details including serial numbers, locations, and status
- Filter and search assets by various criteria
- QR code generation for easy asset identification

### Inspection Management
- Schedule and track asset inspections
- Record inspection results and findings
- Track maintenance history

### Dashboard & Analytics
- Visual overview of asset status and health
- Track key metrics like active assets, maintenance needs
- Recent activity tracking

## Technical Implementation

### Architecture
- React with TypeScript for type safety
- React Router for navigation
- React Query for data fetching and caching
- Tailwind CSS for styling
- Shadcn UI components for consistent design

### API Integration
- Clean service layer for API communication
- Support for both mock data and real API endpoints
- Error handling and loading states

### Form Handling
- Zod schema validation for robust form validation
- Custom form validation hooks
- Consistent error messaging

### Error Handling
- Global error boundaries to prevent app crashes
- Contextual error messages
- Toast notifications for user feedback

### Responsive Design
- Mobile-first approach
- Responsive layouts for all screen sizes
- Device detection for optimized experiences

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd asset-sentry-quest

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=your-api-url
```

## Project Structure

```
/src
  /components     # Reusable UI components
    /assets       # Asset-specific components
    /dashboard    # Dashboard components
    /inspections  # Inspection components
    /layout       # Layout components
    /shared       # Shared components
    /ui           # UI components (buttons, cards, etc.)
  /hooks          # Custom React hooks
  /lib            # Utility functions
  /pages          # Page components
  /services       # API services
  /types          # TypeScript type definitions
```

## Deployment

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Update the environment variables according to your deployment environment

### Deployment Platforms

#### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel project settings
3. Deploy using Vercel's automatic deployment

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `dist`
4. Configure environment variables in Netlify settings

#### Traditional Hosting
1. Run `npm run build`
2. Upload the contents of the `dist` directory to your web server
3. Configure your web server to serve the application
4. Ensure all routes redirect to `index.html` for client-side routing

### Performance Optimization
- Assets are automatically optimized during build
- JavaScript is split into chunks for better caching
- Source maps are disabled in production for smaller bundle size

## Recent Improvements

- **Error Boundaries**: Implemented global error boundaries to prevent app crashes
- **Form Validation**: Added Zod schema validation for robust form handling
- **API Integration**: Created a clean service layer with proper error handling
- **Mock Data Support**: Added support for both mock data and real API endpoints
- **Component Organization**: Improved component structure with barrel exports
