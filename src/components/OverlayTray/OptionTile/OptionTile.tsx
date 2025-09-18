import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Option } from '@/types';
import styles from './styles.module.scss';

interface OptionTileProps {
  option: Option;
  isSelected: boolean;
  type: 'light' | 'couch' | 'coffee-table' | 'wall-color';
  onClick: () => void;
}

export const OptionTile: React.FC<OptionTileProps> = ({
  option,
  isSelected,
  type,
  onClick
}) => {
  return (
    <button
      className={classNames(styles.optionTile, {
        [styles.selected]: isSelected
      })}
      onClick={onClick}
    >
      {type === 'wall-color' ? (
        <div 
          className={styles.colorSwatch}
          style={{ backgroundColor: option.src }}
        />
      ) : (
        <div className={styles.imageContainer}>
          <Image
            src={option.src}
            alt={option.alt}
            width={120}
            height={120}
            draggable={false}
            className={styles.optionImage}
          />
        </div>
      )}
      <div className={styles.optionLabel}>
        <span className={styles.optionName}>{option.label}</span>
        {option.price && (
          <span className={styles.optionPrice}>{option.price}</span>
        )}
      </div>
    </button>
  );
};
