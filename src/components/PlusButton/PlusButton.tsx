import React from 'react';
import classNames from 'classnames';
import { PlusButtonPosition } from '@/types';
import styles from './styles.module.scss';

interface PlusButtonProps {
  position: PlusButtonPosition;
  onClick: () => void;
  isVisible: boolean;
}

export const PlusButton: React.FC<PlusButtonProps> = ({ 
  onClick, 
  position, 
  isVisible 
}) => {
  return (
    <button
      className={classNames(styles.plusButton, {
        [styles.visible]: isVisible,
        [styles.hidden]: !isVisible
      })}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
      onClick={onClick}
      aria-label="Add item"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 4V20M4 12H20" 
          stroke="black" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
