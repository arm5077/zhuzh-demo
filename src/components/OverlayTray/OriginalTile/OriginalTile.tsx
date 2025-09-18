import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface OriginalTileProps {
  onClick: () => void;
  isSelected: boolean;
  label: string;
}

export const OriginalTile: React.FC<OriginalTileProps> = ({ onClick, isSelected, label }) => {
  return (
    <button
      className={classNames(styles.originalTile, {
        [styles.selected]: isSelected
      })}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.label}>{label}</div>
      </div>
    </button>
  );
};
