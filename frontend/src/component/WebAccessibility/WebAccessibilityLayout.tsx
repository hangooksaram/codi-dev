import {
  selectHighlight,
  selectZoom,
} from "@/features/webAccessibility/webAccessibliitySlice";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Highlight from "./Highlight";
import myFont from "@/ui/font";

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
    <StyledLayout zoom={zoom} className={myFont.className}>
      {highlight && <Highlight />}
      {children}
    </StyledLayout>
  );
};

export default WebAccessibilityLayout;
