# Zhuzh Demo App

A demonstration app showing how a room modification app could work. This is a wireframe/prototype built with Next.js 15 and React 19.

## Features

The app demonstrates a 4-screen workflow:

1. **Logo Screen** - App branding with "Upload a photo" button
2. **Photo Selection Screen** - Shows uploaded photo with "Analyze room" button
3. **Loading Screen** - Displays processing progress with animated steps
4. **Final Screen** - Shows the processed photo with interactive elements and download option

## State Management

The app uses React hooks for state management:
- `currentScreen`: Tracks which screen is currently displayed
- `selectedPhoto`: Stores the uploaded photo URL
- Screen transitions are handled through callback functions

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── LogoScreen.tsx
│   │   ├── PhotoScreen.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── FinalScreen.tsx
│   ├── page.tsx (main app with state management)
│   ├── globals.css
│   └── page.module.css
```

## Usage

1. Start on the logo screen
2. Click "Upload a photo" to select an image file
3. Review the photo and click "Analyze room"
4. Watch the loading animation with progress steps
5. Interact with the final screen and download the result

## Notes

- This is a demo/wireframe - no actual image processing occurs
- The loading screen simulates a 3-second processing time
- Interactive buttons on the final screen are for demonstration purposes
- The app is responsive and works on mobile devices
