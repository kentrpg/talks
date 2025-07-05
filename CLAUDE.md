# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Slidev-based presentation workspace organized as a PNPM monorepo. It contains multiple presentation projects with shared tooling, configurations, and an interactive development workflow optimized for creating and managing slide decks.

## Technology Stack

- **Presentation Framework**: Slidev v52+
- **Package Manager**: PNPM with workspace and catalog dependencies
- **Frontend**: Vue 3.5+ with TypeScript support
- **Styling**: UnoCSS with Tailwind-compatible utilities
- **Build Tool**: Vite (via Slidev)
- **Linting**: ESLint with Anthony Fu's configuration
- **IDE Integration**: Cursor IDE workflow

## Development Commands

### Main Workspace Commands
```bash
# Interactive presentation picker (recommended)
pnpm picker dev          # Select and start dev server for a presentation
pnpm picker build        # Select and build a presentation
pnpm picker export       # Select and export a presentation

# Direct commands
pnpm dev                 # Start picker with dev command
pnpm build               # Build selected presentation
pnpm build:all           # Build all presentations in workspace
pnpm lint                # Run ESLint across entire workspace
pnpm typecheck           # Run TypeScript checking
```

### Individual Presentation Commands
Navigate to any presentation folder (e.g., `2025-06-06/src/`) and run:
```bash
pnpm dev                 # Start development server (http://localhost:3030)
pnpm build               # Build static presentation
pnpm export              # Export to PDF/other formats
```

## Architecture Overview

### Workspace Structure
```
talks/
├── 2025-06-06/src/      # Date-based presentation folders
│   ├── slides.md        # Main presentation file
│   ├── components/      # Vue components
│   ├── pages/           # Additional slide pages
│   └── snippets/        # Code snippets
├── scripts/picker.ts    # Interactive presentation selector
├── pnpm-workspace.yaml  # Workspace configuration
└── shared configs...    # ESLint, Vite, UnoCSS configs
```

### Key Components

#### Interactive Picker Script
- **Location**: `scripts/picker.ts`
- **Function**: Automatically detects date-based presentation folders
- **Workflow**: Opens Cursor IDE with selected slides.md file during dev
- **Usage**: Filters folders by `YYYY-MM-DD` pattern and sorts by date

#### Shared Configuration
- **Dependencies**: Managed via PNPM catalog references
- **ESLint**: Anthony Fu's config with Vue, Markdown, and Slidev formatting
- **Vite**: Configured with markdown-it-magic-link for enhanced link rendering
- **UnoCSS**: Shared styling configuration across presentations

#### Markdown Integration
- **Magic Links**: Configured in `vite.config.ts` with predefined link mappings
- **MDC Syntax**: Enabled for enhanced markdown component support
- **Slidev Features**: Full integration with Slidev's markdown extensions

## Development Workflow

### Starting a New Presentation
1. Create folder with date format: `YYYY-MM-DD/src/`
2. Add `package.json` with Slidev dependencies
3. Create `slides.md` with presentation content
4. Use `pnpm picker dev` to start development

### Working with Existing Presentations
1. Run `pnpm picker dev` to select presentation
2. Picker automatically opens Cursor IDE with slides.md
3. Development server starts at http://localhost:3030
4. Edit slides.md and components for live preview

### Component Development
- **Location**: `components/` directory within each presentation
- **Example**: `Counter.vue` demonstrates UnoCSS styling patterns
- **Usage**: Import and use directly in slides.md

### Code Snippets
- **Location**: `snippets/` directory for reusable code examples
- **Import**: Use `#region snippet` comments for selective inclusion
- **Purpose**: Demonstrate code concepts within presentations

## Deployment Configuration

### Netlify
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Redirects**: Configured for SPA routing

### Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Rewrites**: All routes redirect to index.html

## Important Notes

### Picker Workflow
- The picker script is the primary entry point for development
- It automatically opens Cursor IDE when running dev command
- Presentations are sorted by date (newest first)
- Use `-y` flag to skip selection and use the newest presentation

### Shared Dependencies
- All packages use catalog references for version management
- Slidev themes are kept at latest versions
- TypeScript and Vue versions are locked across workspace

### ESLint Configuration
- Configured for Vue, Markdown, and Slidev files
- Special formatting rules for slides.md files
- Ignores demo directories and node_modules