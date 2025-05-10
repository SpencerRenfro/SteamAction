# SteamAction Cleaning Services

A modern web application for a professional cleaning service company specializing in carpet, tile, grout, and upholstery cleaning.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Using ngrok for Sharing](#using-ngrok-for-sharing)
- [Deployment](#deployment)
- [Service Areas](#service-areas)

## Features

- Responsive design for all device sizes
- Service listing with detailed information
- Service area lookup by ZIP code
- Carpet cleaning calculator tool
- FAQ section with common customer questions
- Modern UI with DaisyUI components

## Technologies Used

- React 19
- Vite 6
- Tailwind CSS
- DaisyUI
- React Router

## Getting Started

### Prerequisites

- Node.js (v18.16.0 or higher)
- npm (v9.5.1 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SteamAction.git
   cd SteamAction
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

The project includes several npm scripts to help you run and build the application:

1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Vite development server at http://localhost:3000.

2. Build the application for production:
   ```bash
   npm run build
   ```
   This will create a production-ready build in the `dist` directory.

3. Preview the production build locally:
   ```bash
   npm run preview
   ```
   This will serve the production build at http://localhost:4173.

## Project Structure

```
SteamAction/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # React components
│   │   ├── CarpetCalculator.jsx
│   │   ├── Faq.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── ServiceAreas.jsx
│   │   └── ServiceList.jsx
│   ├── App.css         # Global styles
│   ├── App.jsx         # Main application component
│   ├── index.css       # Tailwind imports
│   └── main.jsx        # Application entry point
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Using ngrok for Sharing

ngrok is a tool that allows you to expose your local development server to the internet, making it accessible to others. This is useful for sharing your work in progress or testing on different devices.

### Installing ngrok

1. Download and install ngrok from [https://ngrok.com/download](https://ngrok.com/download)
2. Sign up for a free account to get your authtoken
3. Configure ngrok with your authtoken:
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

### Sharing Your Local Development Server

1. Start your development server:
   ```bash
   npm run dev
   ```

2. In a separate terminal, start ngrok to expose your local server:
   ```bash
   ngrok http 3000
   ```

3. ngrok will provide a public URL (e.g., https://abc123.ngrok-free.app) that you can share with others to access your application.

### Configuration for ngrok

The project's Vite configuration already includes settings to work with ngrok:

```javascript
// vite.config.js
export default defineConfig({
  // ...
  server: {
    // ...
    hmr: {
      clientPort: 443 // Use 443 for ngrok
    },
    allowedHosts: ['.ngrok-free.app']
  },
})
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your application

The project includes a `vercel.json` configuration file that ensures proper routing for the React Router application.

## Service Areas

SteamAction currently provides cleaning services in the following areas in Illinois:

- O'Fallon (ZIP codes: 62269, 62236)
- Carlinville (ZIP code: 62626)
- Greenville (ZIP code: 62246)
- Highland (ZIP code: 62249)
- Belleville (ZIP codes: 62220, 62221, 62222, 62223)

Each location has a specific service radius. Check the Service Areas page for more details.
