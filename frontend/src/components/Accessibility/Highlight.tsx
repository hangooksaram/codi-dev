'use client';

import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

function Highlight() {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      setCursorPosition(e.clientY);
    });

    window.addEventListener('resize', (e: any) => {
      setScreenHeight(e.target!.innerHeight);
    });

    return () => {
      document.removeEventListener('mousemove', (e) => {
        setCursorPosition(e.clientY);
      });

      window.removeEventListener('resize', (e: any) => {
        setScreenHeight(e.target!.innerHeight);
      });
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
    top: position === 'top' ? '0' : `${(cursorPosition / screenHeight) * 100}%`,
    height:
      position === 'top'
        ? `${(cursorPosition / screenHeight) * 100 - 5}%`
        : '100vh',
  }),
);

export default Highlight;
