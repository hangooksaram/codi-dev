import { setHighlight } from "@/features/webAccessibility/webAccessibilitySlice";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

const DarkSection = styled.div(
  {
    position: "fixed",
    left: "0",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
    top: position === "top" ? "0" : `${(cursorPosition / screenHeight) * 100}%`,
    height:
      position === "top"
        ? `${(cursorPosition / screenHeight) * 100 - 5}%`
        : "100vh",
  })
);

const Highlight = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setCursorPosition(e.clientY);
    });

    window.addEventListener("resize", (e: any) => {
      setScreenHeight(e.target!.innerHeight);
    });

    return () => {
      document.removeEventListener("mousemove", (e) => {
        setCursorPosition(e.clientY);
      });

      window.removeEventListener("resize", (e: any) => {
        setScreenHeight(e.target!.innerHeight);
      });
    };
  }, []);

  return (
    <React.Fragment>
      <DarkSection
        cursorPosition={cursorPosition}
        screenHeight={screenHeight}
        position="top"
      ></DarkSection>
      <DarkSection
        cursorPosition={cursorPosition}
        screenHeight={screenHeight}
        position="bottom"
        onClick={() => {
          dispatch(setHighlight());
        }}
      ></DarkSection>
    </React.Fragment>
  );
};

export default Highlight;
