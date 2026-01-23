# Agentcamp - Landing Page

Marketing landing page for Agentcamp, a 4-week intensive program that teaches builders how to create production-ready AI agents without writing code.

## About Agentcamp

Agentcamp bridges the gap between AI experimentation and production deployment. Instead of teaching AI theory, the program focuses on an **orchestration-first methodology** — starting with workflow control and state management before adding AI autonomy.

### Program Highlights

- **Duration:** 4 weeks, 8 live sessions
- **Audience:** Founders, marketers, ops leads, and creators who want to move from ChatGPT prompts to deployed AI systems
- **Approach:** Control before intelligence - learn to orchestrate first, then add AI capabilities
- **Outcome:** Build 4 real projects, from content processors to production-deployed agents
- **Cost:** 100% sponsored (valued at $499 USD)

Part of the **Frutero** ecosystem, the most active builder community in LATAM.

## Project info

**Live URL:** https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## Development

### Local Development Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd agentcamp-2.0-landing

# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

### Project Structure

```
src/
├── components/
│   ├── landing/          # Landing page sections
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CurriculumSection.tsx
│   │   └── ...
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── scroll-reveal.tsx
│   │   ├── tubelight-navbar.tsx
│   │   └── ...
│   └── NavLink.tsx
├── hooks/                # Custom React hooks
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── lib/                  # Utility functions
│   └── utils.ts
├── pages/                # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
└── App.tsx               # Root component
```

### Customization

**Updating Content:**
- Landing sections are in `src/components/landing/`
- Each section is a self-contained component
- Data arrays (FAQs, testimonials, etc.) are defined at the top of each file

**Styling:**
- Global theme configuration: `tailwind.config.ts`
- CSS variables: `src/index.css`
- Component-level styling uses Tailwind utility classes

**Adding Sections:**
1. Create new component in `src/components/landing/`
2. Import and add to `src/pages/Index.tsx`
3. Add navigation link in `src/components/landing/Navbar.tsx` if needed

### Editing Options

**Option 1: Use Lovable (Recommended)**

Visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting. Changes are automatically committed to this repo.

**Option 2: Local IDE**

Make changes locally and push. Changes will be reflected in Lovable.

**Option 3: GitHub Web Editor**

Edit files directly on GitHub using the pencil icon.

**Option 4: GitHub Codespaces**

Launch a cloud development environment from the "Code" button on GitHub.

## Landing Page Structure

This landing page includes the following sections:

1. **Hero Section** - Value proposition and primary CTA
2. **Pain Points** - Addresses common AI implementation challenges
3. **Transformation** - Before/after comparison
4. **Method** - Orchestration-first approach explained
5. **Curriculum** - 4-week program breakdown with expandable details
6. **Ecosystem** - Partners and community stats
7. **Testimonials** - Builder feedback
8. **Audience Fit** - Clear "is this for you?" filtering
9. **Pricing** - Sponsorship details and program logistics
10. **FAQ** - Common questions answered
11. **Final CTA** - Conversion section
12. **Footer** - Links and social media

### Key Features

- **Scroll-based animations** using Framer Motion with custom reveal components
- **Tubelight navigation** with smooth indicator transitions
- **Glassmorphism design** with gradient accents and blur effects
- **Mobile-responsive** with floating CTA on mobile
- **Accessibility-focused** using Radix UI primitives

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Reusable component library built on Radix UI
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Icon library

## Deployment

### Deploy via Lovable

1. Open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID)
2. Click **Share → Publish**
3. Your site will be live at a Lovable subdomain

### Custom Domain

Connect your own domain:
1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow DNS configuration instructions

[Learn more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

### Alternative Deployment Options

This is a standard Vite + React app and can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Configure in repository settings
- **Any static host**: Upload contents of `dist/` after `npm run build`

## Contributing

This is a marketing landing page for Agentcamp. For content updates or design improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Copyright © 2026 Frutero. All rights reserved.

## Support

For questions about the Agentcamp program, visit the landing page or contact the Frutero team.

For technical issues with this repository, please open an issue.
