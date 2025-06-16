This project is part of a multi-repository workspace for **Rent It Forward** (RENTITFORWARD-WORKSPACE), a peer-to-peer rental marketplace.

Workspace contains (RENTITFORWARD-WORKSPACE):
- `rentitforward-web/`: Next.js + Tailwind web app
- `rentitforward-mobile/`: Expo + React Native mobile app
- `rentitforward-shared/`: Shared logic (types, utils, API clients)

Please use shared logic from `rentitforward-shared` wherever possible.

# Rent It Forward – Shared Package

This package contains shared logic used by both the web and mobile apps in the **Rent It Forward** multi-repo workspace.

## 📁 Folder Structure
src/
├── constants/ # Static configs
├── design-system/ # Cross-platform UI tokens (Tailwind & NativeWind)
│ ├── colors.ts
│ ├── spacing.ts
│ ├── typography.ts
│ ├── theme.ts
│ └── ...
├── types/ # Shared TypeScript types (User, Listing, etc.)
├── utils/ # Helpers (pricing, date, validation, etc.)
└── index.ts # Re-export entry point


## 🎨 Design System Details

Located in: `src/design-system/`

This directory provides a central, token-based design system for both web (Tailwind) and mobile (NativeWind) usage.

Includes:
- **Colors**: Brand palette
- **Spacing**: Margin/padding system
- **Typography**: Fonts, weights, sizes
- **Breakpoints**: Responsive design tokens
- **Tokens.ts**: Flattened export for global usage

## 🛠 Usage

In web:
import { theme } from 'rentitforward-shared/src/design-system/theme';

In mobile:
import { tokens } from 'rentitforward-shared/src/design-system/tokens';