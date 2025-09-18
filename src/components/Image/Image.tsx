import React from 'react';
import NextImage from 'next/image';
import classNames from 'classnames';
import { Button } from '@/components/Button/Button';
import styles from './styles.module.scss';

interface ImageProps {
  src: string;
  alt: string;
  isAnalyzing: boolean;
  children?: React.ReactNode;
}

export const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  isAnalyzing, 
  children 
}) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <NextImage
          src={src}
          alt={alt}
          width={800}
          height={1200}
          className={classNames(styles.image, {
            [styles.analyzing]: isAnalyzing
          })}
          priority
        />
        
        {isAnalyzing && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingGradient} />
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};
