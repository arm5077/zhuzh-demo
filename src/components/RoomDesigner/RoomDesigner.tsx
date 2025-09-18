import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useWindowSize } from 'react-use';
import { Image as CustomImage } from '@/components/Image/Image';
import { PlusButton } from '@/components/PlusButton/PlusButton';
import { OverlayTray } from '@/components/OverlayTray/OverlayTray';
import { Button } from '@/components/Button/Button';
import { ProgressBarLockup } from '@/components/ProgressBarLockup/ProgressBarLockup';
import { RoomChoices, OverlayState } from '@/types';
import { PLUS_BUTTON_POSITIONS, getRoomOptions, getCurrentImageSrc } from '@/utils';
import styles from './styles.module.scss';

// Type for overlay configuration
interface OverlayConfig {
  type: keyof RoomChoices;
  isVisible: boolean;
  options: ReturnType<typeof getRoomOptions>;
  selectedId: string | null;
  overlayType: 'light' | 'couch' | 'coffee-table' | 'wall-color';
}

interface RoomDesignerProps {
  onAnalysisComplete?: () => void;
}

type AppState = 'intro' | 'analyzing' | 'interactive';

export const RoomDesigner: React.FC<RoomDesignerProps> = () => {
  // Get viewport dimensions
  const { height: viewportHeight } = useWindowSize();
  
  // Track if component has mounted (to avoid hydration mismatch)
  const [isMounted, setIsMounted] = useState(false);

  // Default values for when activeOverlay is null
  const DEFAULT_OVERLAY_TYPE: keyof RoomChoices = 'wallColor';
  const DEFAULT_OVERLAY_CONFIG: OverlayConfig = {
    type: DEFAULT_OVERLAY_TYPE,
    isVisible: false,
    options: getRoomOptions(DEFAULT_OVERLAY_TYPE),
    selectedId: null,
    overlayType: 'wall-color'
  };

  // State management
  const [appState, setAppState] = useState<AppState>('intro');
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [choices, setChoices] = useState<RoomChoices>({
    wallColor: 'original',
    couch: 'original',
    overheadLight: 'original',
    coffeeTable: 'original'
  });
  const [activeOverlay, setActiveOverlay] = useState<OverlayState | null>(null);
  const [plusButtonsVisible, setPlusButtonsVisible] = useState(false);
  const [plusButtonsRendered, setPlusButtonsRendered] = useState(false);
  const [downloadSectionVisible, setDownloadSectionVisible] = useState(false);

  // Helper function to get overlay configuration with defaults
  const getOverlayConfig = (overlay: OverlayState | null): OverlayConfig => {
    if (!overlay) return DEFAULT_OVERLAY_CONFIG;

    const typeMapping = {
      wallColor: 'wall-color',
      overheadLight: 'light',
      coffeeTable: 'coffee-table',
      couch: 'couch'
    } as const;

    return {
      type: overlay.type,
      isVisible: overlay.isVisible,
      options: getRoomOptions(overlay.type),
      selectedId: choices[overlay.type],
      overlayType: typeMapping[overlay.type]
    };
  };

  useEffect(() => {
    // Set mounted state to true after component mounts (client-side only)
    setIsMounted(true);
    
    // Delay the entrance animations to allow the screen transition to complete
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setIsExiting(true);
    // Delay the actual transition to allow animations to complete
    setTimeout(() => {
      setAppState('analyzing');
      setIsExiting(false);
    }, 600); // Match the animation duration
  };

  const handleAnalysisComplete = () => {
    setAppState('interactive');

    // Show interactive elements after analysis completes
    setTimeout(() => {
      setPlusButtonsRendered(true);
      setDownloadSectionVisible(true);

      // Small delay to ensure elements are rendered before animating in
      setTimeout(() => {
        setPlusButtonsVisible(true);
      }, 50);
    }, 100); // Small delay after progress bar exit animation completes
  };

  const handlePlusButtonClick = (type: keyof RoomChoices) => {
    setActiveOverlay({ type, isVisible: true });
    setPlusButtonsVisible(false);

    // Delay unmounting to allow fade-out animation
    setTimeout(() => {
      setPlusButtonsRendered(false);
    }, 300); // Match the fade-out animation duration
  };

  const handleOverlayClose = () => {
    setActiveOverlay(null);
    setPlusButtonsRendered(true);

    // Small delay to ensure PlusButtons are rendered before animating in
    setTimeout(() => {
      setPlusButtonsVisible(true);
    }, 50);
  };

  const handleOptionSelect = (type: keyof RoomChoices, id: string) => {
    setChoices(prev => ({ ...prev, [type]: id }));

    // Small delay to ensure PlusButtons are rendered before animating in
    setTimeout(() => {
      setPlusButtonsVisible(true);
    }, 50);
  };

  const handleImageClick = () => {
    if (activeOverlay) {
      setActiveOverlay(null);
      setPlusButtonsRendered(true);

      // Small delay to ensure PlusButtons are rendered before animating in
      setTimeout(() => {
        setPlusButtonsVisible(true);
      }, 50);
    } else if (plusButtonsVisible) {
      setPlusButtonsVisible(false);

      // Delay unmounting to allow fade-out animation
      setTimeout(() => {
        setPlusButtonsRendered(false);
      }, 300);
    } else {
      setPlusButtonsRendered(true);

      // Small delay to ensure PlusButtons are rendered before animating in
      setTimeout(() => {
        setPlusButtonsVisible(true);
      }, 50);
    }
  };

  const handleDownloadImage = () => {
    const currentImageSrc = getCurrentImageSrc(choices);
    const link = document.createElement('a');
    link.href = currentImageSrc;
    link.download = `zhuzh-room-design-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className={classNames(styles.container, {
        [styles.containerVisible]: isVisible
      })}
      style={isMounted ? { height: `${viewportHeight}px` } : undefined}
    >

      {/* Top container */}
      <div className={styles.top}>
        <div className={classNames(styles.disclaimer, {
          [styles.disclaimerVisible]: isVisible
        })}>
          Demonstration
        </div>
      </div>

      {/* Middle container */}
      <div className={styles.middle}>
        {/* Intro content - always rendered but with conditional visibility */}
        <div className={classNames(styles.introContent, {
          [styles.introVisible]: appState === 'intro' && !isExiting,
          [styles.introExiting]: isExiting
        })}>
          <div className={styles.logoLockup}>
            <div className={styles.logoContainer}>
              <Image
                src="/logo.svg"
                alt="Zhuzh"
                width={300}
                height={Math.round(300 * 83 / 268)} // preserve ratio based on original 268x83
                priority
              />
            </div>

            <h1 className={styles.title}>
              Reimagine your space
            </h1>
          </div>
        </div>

        {/* Interactive content - always rendered but with conditional visibility */}
        <div className={classNames(styles.interactiveContent, {
          [styles.interactiveVisible]: appState !== 'intro'
        })}>
          <div 
            className={classNames(styles.imageSection, {
              [styles.fullSizeImage]: appState === 'interactive'
            })} 
            onClick={handleImageClick}>
            <CustomImage
              src={getCurrentImageSrc(choices)}
              alt="Room design"
              isAnalyzing={appState === 'analyzing'}
            >
              {plusButtonsRendered && (
                <>
                  <PlusButton
                    position={PLUS_BUTTON_POSITIONS.overheadLight}
                    onClick={() => handlePlusButtonClick('overheadLight')}
                    isVisible={plusButtonsVisible}
                  />
                  <PlusButton
                    position={PLUS_BUTTON_POSITIONS.couch}
                    onClick={() => handlePlusButtonClick('couch')}
                    isVisible={plusButtonsVisible}
                  />
                  <PlusButton
                    position={PLUS_BUTTON_POSITIONS.coffeeTable}
                    onClick={() => handlePlusButtonClick('coffeeTable')}
                    isVisible={plusButtonsVisible}
                  />
                  <PlusButton
                    position={PLUS_BUTTON_POSITIONS.wallColor}
                    onClick={() => handlePlusButtonClick('wallColor')}
                    isVisible={plusButtonsVisible}
                  />
                </>
              )}
            </CustomImage>
          </div>
        </div>
      </div>


      {/* Bottom container */}
      <div className={styles.bottom}>

        <div className={classNames(styles.introButtonContainer,
          {
            [styles.introVisible]: appState === 'intro' && !isExiting,
            [styles.introExiting]: isExiting
          }
        )}>
          <div className={classNames(styles.buttonContainer, {
            [styles.buttonContainerVisible]: appState === 'intro'
          })}>
            <Button onClick={handleGetStarted}>
              Upload a photo
            </Button>
          </div>
        </div>



        <div className={classNames(styles.interactiveControls, {
          [styles.interactiveVisible]: appState !== 'intro',
          [styles.analyzing]: appState === 'analyzing',
          [styles.interactiveComplete]: appState === 'interactive'
        })}>
           {/* Progress bar lockup */}
            {appState === 'analyzing' && (
              <div className={classNames(styles.progressWrapper, {
                [styles.progressVisible]: true
              })}>
                <ProgressBarLockup onComplete={handleAnalysisComplete} />
              </div>
            )}
          <div className={classNames(styles.controls, {
            [styles.analyzing]: appState === 'analyzing'
          })}>
            {/* Final controls */}
            <div className={classNames(styles.downloadSection, {
              [styles.downloadSectionVisible]: appState === 'interactive' && downloadSectionVisible
            })}>
              <div className={styles.instructionText}>
                <span className={styles.medium}>Tap a button to <strong>Zhuzh</strong> </span>
              </div>
              <div className={styles.warningText}>
                Warning: Zhuzhing may result in a far more beautiful home.
              </div>
              <div className={styles.downloadButton}>
                <Button onClick={handleDownloadImage} variant="secondary">
                  Download photo
                </Button>
              </div>
            </div>
          </div>
        </div>



      </div>


      <OverlayTray
        isVisible={getOverlayConfig(activeOverlay).isVisible}
        options={getOverlayConfig(activeOverlay).options}
        selectedId={getOverlayConfig(activeOverlay).selectedId}
        onSelect={(id) => activeOverlay?.type && handleOptionSelect(activeOverlay.type, id)}
        onClose={handleOverlayClose}
        type={getOverlayConfig(activeOverlay).overlayType}
      />
    </div>
  );
};
