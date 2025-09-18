import { RoomChoices } from '@/types';

// Generate the current image source based on room choices
export const getCurrentImageSrc = (choices: RoomChoices): string => {
  const wallColor = choices.wallColor === 'original' ? 'original' : choices.wallColor;
  const couch = choices.couch === 'original' ? 'original' : choices.couch;
  const overheadLight = choices.overheadLight === 'original' ? 'original' : choices.overheadLight;
  const coffeeTable = choices.coffeeTable === 'original' ? 'original' : choices.coffeeTable;
  
  return `/rooms/${wallColor}-${couch}-${overheadLight}-${coffeeTable}.jpg`;
};

// Get the original image source
export const getOriginalImageSrc = (): string => '/original.jpg';

// Check if an image exists (for fallback handling)
export const getImageFallback = (src: string, fallback: string = '/original.jpg'): string => {
  // In a real app, you might want to check if the image exists
  // For now, we'll just return the src or fallback
  return src || fallback;
};
