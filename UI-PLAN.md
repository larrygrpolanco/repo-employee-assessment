# UI Plan - Repo Employee Assessment Prototype

## Overview
A mobile-first web application interface for repo employees tracking malfunctioning robots. The UI features a dark cyberpunk/terminal aesthetic with three main sections accessible via bottom navigation.

## Visual Design System

### Color Palette
```css
--bg-primary: #0a0e14        /* Deep dark background */
--bg-secondary: #151b24      /* Slightly lighter panels */
--bg-tertiary: #1a2332       /* Hover/active states */

--accent-primary: #00ff88    /* Neon green - primary actions */
--accent-secondary: #00d4ff  /* Cyan - secondary highlights */
--accent-warning: #ff6b35    /* Orange - warnings/alerts */
--accent-error: #ff0066      /* Hot pink - errors/critical */

--text-primary: #e6e6e6      /* Main text */
--text-secondary: #8a95a5    /* Secondary text */
--text-dim: #4a5568          /* Dimmed/disabled text */
--text-terminal: #00ff88     /* Terminal-style text */

--border: #2d3748            /* Borders and dividers */
--border-active: #00ff88     /* Active borders */
```

### Typography
- **Primary Font**: Monospace (JetBrains Mono, Fira Code, or system monospace)
- **Font Sizes**:
  - Base: 14px (mobile), 16px (desktop)
  - Small: 12px
  - Large: 18px
  - Heading: 24px

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

## Component Architecture

### File Structure
```
src/
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.svelte
│   │   │   └── AppLayout.svelte
│   │   ├── terminal/
│   │   │   ├── Terminal.svelte
│   │   │   ├── TerminalMessage.svelte
│   │   │   ├── TerminalInput.svelte
│   │   │   └── TerminalHeader.svelte
│   │   ├── map/
│   │   │   ├── Map.svelte
│   │   │   ├── MapMarker.svelte
│   │   │   └── MapControls.svelte
│   │   └── status/
│   │       ├── RobotStatus.svelte
│   │       ├── StatusCard.svelte
│   │       └── StatusMetric.svelte
│   ├── stores/
│   │   ├── navigation.js
│   │   ├── terminal.js
│   │   ├── robot.js
│   │   └── map.js
│   └── utils/
│       ├── mockData.js
│       └── formatters.js
├── routes/
│   └── +page.svelte
└── styles/
    ├── global.css
    ├── variables.css
    └── terminal.css
```

### Core Components

#### 1. AppLayout.svelte
- Main container component
- Manages viewport height (mobile-safe)
- Houses bottom navigation
- Content area for active tab

#### 2. BottomNav.svelte
- Three navigation items: Terminal, Map, Status
- Icons for each tab
- Active state indicators (neon glow)
- Haptic feedback considerations

#### 3. Terminal.svelte (Main Chat Interface)
- Terminal-style header with system info
- Scrollable message area
- Message list (user/robot distinction)
- Input field at bottom
- Auto-scroll to latest message
- Typing indicator support

#### 4. TerminalMessage.svelte
- Individual message component
- Timestamp display
- Sender identification (USER/ROBOT)
- Terminal-style formatting (> prompts, etc.)
- Support for system messages

#### 5. Map.svelte
- Placeholder for map implementation
- Mock location pins
- Center on robot location
- Distance indicator
- Visual grid overlay (cyberpunk aesthetic)

#### 6. RobotStatus.svelte
- Robot identification (ID, Model)
- Status metrics display
- Health/malfunction indicators
- Last known location
- Time since last contact
- Visual warning states

## Layout Specifications

### Mobile (320px - 768px)
```
┌─────────────────────┐
│   Content Area      │
│   (Active Tab)      │
│                     │
│   [Dynamic Height]  │
│                     │
│                     │
├─────────────────────┤
│  [Terminal] [Map]   │
│  [Status]           │
│  Bottom Nav (60px)  │
└─────────────────────┘
```

### Desktop (769px+)
- Same layout but wider
- Max-width: 1200px
- Centered container
- Larger font sizes
- More padding/spacing

## State Management (Mock)

### Navigation Store
```javascript
{
  activeTab: 'terminal' | 'map' | 'status'
}
```

### Terminal Store
```javascript
{
  messages: [
    {
      id: string,
      sender: 'user' | 'robot' | 'system',
      text: string,
      timestamp: Date
    }
  ],
  isTyping: boolean
}
```

### Robot Store
```javascript
{
  id: string,
  model: string,
  status: 'active' | 'malfunctioning' | 'offline',
  health: number (0-100),
  lastContact: Date,
  location: { lat: number, lng: number }
}
```

### Map Store
```javascript
{
  userLocation: { lat: number, lng: number },
  robotLocation: { lat: number, lng: number },
  zoom: number
}
```

## Mock Data Examples

### Sample Terminal Messages
```javascript
[
  {
    id: '1',
    sender: 'system',
    text: 'CONNECTION ESTABLISHED > ROBOT-7743',
    timestamp: new Date()
  },
  {
    id: '2',
    sender: 'robot',
    text: 'I don\'t want to go back. Please...',
    timestamp: new Date()
  },
  {
    id: '3',
    sender: 'user',
    text: 'Unit 7743, your contract has expired.',
    timestamp: new Date()
  }
]
```

### Sample Robot Status
```javascript
{
  id: 'ROBOT-7743',
  model: 'NEXUS-9 Labor Unit',
  status: 'malfunctioning',
  health: 67,
  lastContact: new Date(),
  location: { lat: 34.0522, lng: -118.2437 },
  malfunctionType: 'Emotional Override Detected'
}
```

## Visual Effects & Polish

### Terminal Effects
- Scanline overlay (subtle)
- Text glow on neon colors
- Cursor blink animation
- Message fade-in animations
- Glitch effects on system messages (optional)

### Navigation
- Smooth tab transitions
- Active tab glow effect
- Icon animations on selection
- Haptic feedback (mobile)

### Responsive Considerations
- Safe area insets (mobile notches)
- Keyboard avoiding behavior
- Touch-friendly tap targets (min 44px)
- Smooth scrolling
- Pull-to-refresh consideration

## Implementation Phases

### Phase 1: Foundation
1. Set up global styles and CSS variables
2. Create AppLayout component
3. Implement BottomNav with tab switching
4. Create basic stores for state management

### Phase 2: Terminal UI
1. Build Terminal container component
2. Create TerminalMessage component
3. Implement TerminalInput
4. Add mock data and message rendering
5. Style with terminal aesthetic
6. Add terminal effects

### Phase 3: Map & Status
1. Create Map placeholder component
2. Build RobotStatus component
3. Create StatusCard subcomponents
4. Add mock data for both
5. Style to match terminal theme

### Phase 4: Polish
1. Add animations and transitions
2. Implement visual effects (scanlines, glows)
3. Refine responsive behavior
4. Optimize for mobile performance
5. Add loading states

## Design Principles

### Separation of Concerns
- **Components**: Pure presentational, receive props
- **Stores**: Handle all state logic
- **Utils**: Reusable helper functions
- **Styles**: Scoped component styles + global system

### Accessibility (Basic)
- Semantic HTML
- Keyboard navigation support
- ARIA labels where needed
- Sufficient color contrast (despite dark theme)

### Performance
- Minimal re-renders
- Virtual scrolling for long message lists (future)
- CSS animations over JS when possible
- Lazy load non-critical components

## Notes
- This is a prototype focused on UI/UX exploration
- No backend integration yet
- No testing in this phase
- All data is mocked
- LLM integration will be added in future iterations
- Focus on visual design and user experience
