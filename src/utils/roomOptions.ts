import { Option } from '@/types';

// Plus button positions from Figma design
export const PLUS_BUTTON_POSITIONS = {
  overheadLight: { x: 10.4, y: 3.7 }, // left: 41px, top: 22px
  couch: { x: 15.5, y: 66.2 }, // left: 61px, top: 56px  
  coffeeTable: { x: 70.0, y: 62.5 }, // left: 275px, top: 369px
  wallColor: { x: 40.0, y: 75.1 } // left: 157px, top: 443px
} as const;

// Progress steps for analysis
export const PROGRESS_STEPS = [
  'Optimizing style',
  'Picking paint colors',
  'Searching West Elm',
  'Finalizing recommendations'
] as const;

// Get options for different room elements
export const getRoomOptions = (type: keyof typeof PLUS_BUTTON_POSITIONS): Option[] => {
  switch (type) {
    case 'wallColor':
      return [
        { id: 'E8D7D6', src: '#E8D7D6', alt: 'Light pink wall', label: 'Light Pink' },
        { id: 'CFCDD6', src: '#CFCDD6', alt: 'Light gray wall', label: 'Light Gray' },
        { id: 'C8CAB2', src: '#C8CAB2', alt: 'Sage green wall', label: 'Sage Green' }
      ];
    case 'couch':
      return [
        { id: 'couch-1', src: '/options/couch-1.jpg', alt: 'Couch option 1', label: 'Style 1' },
        { id: 'couch-2', src: '/options/couch-2.jpg', alt: 'Couch option 2', label: 'Style 2' },
        { id: 'couch-3', src: '/options/couch-3.jpg', alt: 'Couch option 3', label: 'Style 3' }
      ];
    case 'overheadLight':
      return [
        { id: 'overhead-light-1', src: '/options/overhead-light-1.jpg', alt: 'Light option 1', label: 'Style 1' },
        { id: 'overhead-light-2', src: '/options/overhead-light-2.jpg', alt: 'Light option 2', label: 'Style 2' },
        { id: 'overhead-light-3', src: '/options/overhead-light-3.jpg', alt: 'Light option 3', label: 'Style 3' }
      ];
    case 'coffeeTable':
      return [
        { id: 'coffee-table-1', src: '/options/coffee-table-1.jpg', alt: 'Rowan table', label: 'Rowan', price: '$699' },
        { id: 'coffee-table-2', src: '/options/coffee-table-2.jpg', alt: 'Avery table', label: 'Avery', price: '$850' },
        { id: 'coffee-table-3', src: '/options/coffee-table-3.jpg', alt: 'Jasper table', label: 'Jasper', price: '$920' }
      ];
    default:
      return [];
  }
};

// Get overlay title based on type
export const getOverlayTitle = (type: string): string => {
  switch (type) {
    case 'wall-color':
      return 'Paint';
    case 'coffee-table':
      return 'Coffee table';
    case 'couch':
      return 'Couch';
    case 'light':
      return 'Light';
    default:
      return type.replace('-', ' ');
  }
};
