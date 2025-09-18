import React from 'react';
import classNames from 'classnames';
import { Option } from '@/types';
import { OriginalTile } from './OriginalTile/OriginalTile';
import { OptionTile } from './OptionTile/OptionTile';
import { getOverlayTitle } from '@/utils';
import styles from './styles.module.scss';

interface OverlayTrayProps {
  isVisible: boolean;
  options: Option[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
  type: 'light' | 'couch' | 'coffee-table' | 'wall-color';
}

export const OverlayTray: React.FC<OverlayTrayProps> = ({
  isVisible,
  options,
  selectedId,
  onSelect,
  onClose,
  type
}) => {
  return (
    <div 
      className={classNames(styles.overlay, {
        [styles.visible]: isVisible,
        [styles.hidden]: !isVisible
      })}
    >
      <div className={styles.tray}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {getOverlayTitle(type)}
          </h3>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="18" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className={styles.optionsGrid}>
          <OriginalTile
            onClick={() => onSelect('original')}
            isSelected={selectedId === 'original'}
            label="Original"
          />
          
          {options.map((option) => (
            <OptionTile
              key={option.id}
              option={option}
              isSelected={selectedId === option.id}
              type={type}
              onClick={() => onSelect(option.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
