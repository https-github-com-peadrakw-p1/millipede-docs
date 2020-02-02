import React, { useCallback } from 'react';

import { useEventListener } from '../../hooks';
import { useAudioService } from '../../services/audio';

enum WHEEL_QUADRANT {
  TOP = 1,
  BOTTOM = 2,
  LEFT = 3,
  RIGHT = 4
}

enum KEY_CODE {
  ARROW_UP = 38,
  ARROW_DOWN = 40,
  ARROW_LEFT = 37,
  ARROW_RIGHT = 39,
  ESC = 27,
  ENTER = 13,
  SPACE = 32
}

// const centerClickEvent = new Event('centerclick');
// const forwardScrollEvent = new Event('forwardscroll');
// const backwardScrollEvent = new Event('backwardscroll');
// const wheelClickEvent = new Event('wheelclick');
// const menuClickEvent = new Event('menuclick');
// const backClickEvent = new Event('backclick');

const ScrollWheel = () => {
  // const [count, setCount] = useState(0);
  const { togglePause, nextSong } = useAudioService();

  const handleCenterClick = useCallback(
    () => {
      console.log('centerClickEvent');
    },
    // () => window.dispatchEvent(centerClickEvent),
    []
  );

  const handleClockwiseScroll = useCallback(
    () => {
      console.log('forwardScrollEvent');
    },
    // () => window.dispatchEvent(forwardScrollEvent),
    []
  );

  const handleCounterClockwiseScroll = useCallback(() => {
    console.log('backwardScrollEvent');
    // window.dispatchEvent(backwardScrollEvent);
  }, []);

  const handleWheelClick = useCallback(
    (quadrant: number) => {
      // window.dispatchEvent(wheelClickEvent);

      switch (quadrant) {
        case WHEEL_QUADRANT.TOP:
          // window.dispatchEvent(menuClickEvent);
          break;
        case WHEEL_QUADRANT.BOTTOM:
          togglePause();
          break;
        case WHEEL_QUADRANT.LEFT:
          // window.dispatchEvent(backClickEvent);
          break;
        case WHEEL_QUADRANT.RIGHT:
          nextSong();
          break;
        default:
          break;
      }
    },
    [nextSong, togglePause]
  );

  /** Allows for keyboard navigation. */
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.keyCode) {
        case KEY_CODE.ARROW_UP:
        case KEY_CODE.ARROW_LEFT:
          handleCounterClockwiseScroll();
          break;
        case KEY_CODE.ARROW_DOWN:
        case KEY_CODE.ARROW_RIGHT:
          handleClockwiseScroll();
          break;
        case KEY_CODE.ENTER:
          handleCenterClick();
          break;
        case KEY_CODE.SPACE:
          togglePause();
          break;
        case KEY_CODE.ESC:
          handleWheelClick(WHEEL_QUADRANT.TOP);
          break;
        default:
          break;
      }
    },
    [
      handleCounterClockwiseScroll,
      handleClockwiseScroll,
      handleCenterClick,
      togglePause,
      handleWheelClick
    ]
  );

  /** Determine if clockwise/counter-clockwise based on the Knob onChange value. */
  // const handleScroll = useCallback(
  //   (val: number) => {
  //     if (val === 0 && count === 100) {
  //       handleClockwiseScroll();
  //     } else if (val === 100 && count === 0) {
  //       handleCounterClockwiseScroll();
  //     } else if (val > count) {
  //       handleClockwiseScroll();
  //     } else if (val < count) {
  //       handleCounterClockwiseScroll();
  //     }
  //     setCount(val);
  //   },
  //   [count, handleClockwiseScroll, handleCounterClockwiseScroll]
  // );

  useEventListener('keydown', handleKeyPress);

  return <div>empty knob</div>;
};

export default ScrollWheel;
