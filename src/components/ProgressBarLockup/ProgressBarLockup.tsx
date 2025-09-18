import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PROGRESS_STEPS, getProgressIncrement, getStepChangeInterval } from '@/utils';
import styles from './styles.module.scss';

interface ProgressBarLockupProps {
  onComplete: () => void;
}

export const ProgressBarLockup: React.FC<ProgressBarLockupProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = 50; // Update every 50ms
    const increment = getProgressIncrement();
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          // Call onComplete after exit animation completes
          setTimeout(onComplete, 800); // Match the exit animation duration
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < PROGRESS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, getStepChangeInterval());

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className={classNames(styles.progressContainer, {
      [styles.exiting]: isExiting
    })}>
      <div className={styles.statusList}>
        {PROGRESS_STEPS.map((step, index) => (
          <div 
            key={index}
            className={classNames(styles.statusItem, {
              [styles.active]: index <= currentStep,
              [styles.inactive]: index > currentStep
            })}
          >
            {step}
          </div>
        ))}
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
