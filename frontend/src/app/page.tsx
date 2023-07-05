"use client";
import {
  setZoom,
  setHighlight,
} from "@/features/webAccessibility/webAccessibliitySlice";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import theme from "@/ui/theme";
import { css } from "@emotion/css";
import React from "react";
import { useDispatch } from "react-redux";
import Alarm from "../../public/icons/alarm.svg";
import IconInput from "@/ui/Input/IconInput";
import Chip from "@/ui/Chip/Chip";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <main>
      <Chip>안녕</Chip>
      <IconInput imgComponent={<Alarm />} />
      <div
        className={css`
          font-size: ${theme.fonts.size.xl};
        `}
      >
        ㄹㄴㅇㄹㅇㄴㄹㄴㅇㄹ
      </div>
      <Input style={{ marginBottom: "20px" }} />
      <Button
        color={theme.colors.primary}
        variant="default"
        onClick={() => dispatch(setZoom(1.5))}
      >
        1.5배 확대
      </Button>
      <Button
        variant="round"
        width="100px"
        onClick={() => dispatch(setZoom(1))}
      >
        축소
      </Button>
      <Button
        variant="round"
        width="66px"
        onClick={() => dispatch(setHighlight())}
      >
        하이라이팅
      </Button>
    </main>
  );
}
