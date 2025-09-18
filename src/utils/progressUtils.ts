// Progress bar configuration
export const PROGRESS_CONFIG = {
  duration: 5000, // 5 seconds total
  interval: 50, // Update every 50ms
  stepInterval: 1250, // Change step every 1.25 seconds (5 seconds / 4 steps)
} as const;

// Calculate progress increment per interval
export const getProgressIncrement = (): number => {
  return (PROGRESS_CONFIG.interval / PROGRESS_CONFIG.duration) * 100;
};

// Get step change interval
export const getStepChangeInterval = (): number => {
  return PROGRESS_CONFIG.stepInterval;
};

// Calculate total duration
export const getTotalDuration = (): number => {
  return PROGRESS_CONFIG.duration;
};
