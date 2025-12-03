# Viva AI - Next.js UI Template

A premium dark-themed UI template for AI generation applications, inspired by Artlist AI.

## Features

- 🌙 Dark glass-morphism design
- 🎨 Yellow accent theme
- 📱 Fully responsive layout
- 🔄 Smooth animations with Framer Motion
- 🧩 Modular component architecture
- 📋 Multiple page templates

## Tech Stack

- Next.js 15 (App Router)
- TailwindCSS
- Framer Motion
- Lucide Icons

## Components

The project includes the following UI components:

- `VivaSidebar`: Collapsible sidebar navigation
- `VivaNavbar`: Top navigation bar with search
- `VivaTabSwitcher`: Tab navigation for different generation types
- `VivaModelSelect`: Model selection cards
- `VivaResolutionSelect`: Resolution selection tabs
- `VivaDurationSelect`: Duration selection for videos
- `VivaUploadPanel`: File upload component
- `VivaCreditsBadge`: Credits display
- `VivaMediaCard`: Media card for displaying generated content
- `VivaScrollablePanel`: Horizontal scrollable panel

## Pages

- `/` - Main generation page
- `/library` - Content library/explore page
- `/profile` - User profile and subscription
- `/settings` - App settings
- `/history` - Generation history

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

The UI is built with TailwindCSS and can be easily customized by modifying:

- `tailwind.config.ts` - Color schemes and theme settings
- `src/app/globals.css` - Global styles and CSS variables

## License

MIT