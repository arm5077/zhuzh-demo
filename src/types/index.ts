// App state types (no longer needed with unified component)
// export type AppScreen = 'intro' | 'room-designer';

// Room choices interface
export interface RoomChoices {
  wallColor: string;
  couch: string;
  overheadLight: string;
  coffeeTable: string;
}

// Option interface for overlay trays
export interface Option {
  id: string;
  src: string;
  alt: string;
  label: string;
  price?: string;
}

// Overlay state interface
export interface OverlayState {
  type: keyof RoomChoices;
  isVisible: boolean;
}

// Plus button position interface
export interface PlusButtonPosition {
  x: number;
  y: number;
}
