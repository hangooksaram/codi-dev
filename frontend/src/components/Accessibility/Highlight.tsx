'use client';

import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

function Highlight() {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPosition(e.clientY);
  };

  const handleResize = (e: any) => {
    setScreenHeight(e.target!.innerHeight);
  };

  const addHighlightEventListeners = () => {
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
  };

  const removeHighlightEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
  };

  useEffect(() => {
    addHighlightEventListeners();

    return () => {
      removeHighlightEventListeners();
    };
  }, []);

  return (
    <>
      <DarkSection
        cursorPosition={cursorPosition}
        screenHeight={screenHeight}
        position="top"
      />
      <DarkSection
        cursorPosition={cursorPosition}
        screenHeight={screenHeight}
        position="bottom"
      />
    </>
  );
}

const DarkSection = styled.div(
  {
    position: 'fixed',
    left: '0',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 100,
  },
  ({
    cursorPosition,
    screenHeight,
    position,
  }: {
    cursorPosition: number;
    screenHeight: number;
    position: string;
  }) => ({
    top: position === 'top' ? '0' : `${(cursorPosition / screenHeight) * 120}%`,
    height:
      position === 'top'
        ? `${(cursorPosition / screenHeight) * 100 - 15}%`
        : '100vh',
  }),
);

export default Highlight;
