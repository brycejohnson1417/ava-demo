# AVA Demo

AVA Demo is an early personal-assistant interface prototype. It tests a terminal-style interaction direction for a more opinionated personal intelligence system.

View the AI Studio prototype: https://ai.studio/apps/5a48f8a7-0887-4959-a629-3f10efa7cb53

## What It Explores

- Terminal-inspired assistant interaction.
- A lightweight personal-system identity.
- Fast AI-assisted prototyping of assistant UI concepts.
- The early direction that later AVA OS concepts build on.

## Technical Notes

- React and Vite frontend.
- Gemini API integration through `@google/genai`.
- Express and local SQLite dependencies are present for prototype service experiments.
- Motion, Tailwind, and lucide-react for interface behavior.

## Current Status

This is an earlier prototype source repo. It is useful context for the AVA direction, but AVA OS is the stronger current concept.

## Run Locally

Prerequisite: Node.js.

1. Install dependencies:
   `npm install`
2. Create a local environment file based on `.env.example`.
3. Add your own Gemini API key locally.
4. Run the app:
   `npm run dev`

## API Key Boundary

Do not deploy this Vite app with a private Gemini key embedded into browser JavaScript. If deploying outside AI Studio, use a server-side API route or an explicit visitor-provided key flow.

## AI-Assisted Build Note

This prototype was built with AI assistance. The useful work is in fast concept exploration, comparing assistant interaction patterns, and identifying which direction deserves deeper investment.

## Related Public Notes

See the combined prototype overview repo: https://github.com/brycejohnson1417/ai-studio-prototype-overviews
