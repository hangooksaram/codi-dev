import {
  selectHighlight,
  selectZoom,
} from "@/features/webAccessibility/webAccessibliitySlice";
import { Inter } from "next/font/google";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Highlight from "./Highlight";

const inter = Inter({ subsets: ["latin"] });
type StyledLayoutProps = {
  zoom: number;
};

const StyledLayout = styled.body((props: StyledLayoutProps) => ({
  zoom: `${props.zoom}`,
}));

const WebAccessibilityLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const zoom = useSelector(selectZoom);
  const highlight = useSelector(selectHighlight);

  return (
    <StyledLayout zoom={zoom} className={inter.className}>
      {highlight && <Highlight />}
      {children}
    </StyledLayout>
  );
};

export default WebAccessibilityLayout;
