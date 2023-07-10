"use client";
import {
  setZoom,
  setHighlight,
} from "@/features/webAccessibility/webAccessibliitySlice";
import Button from "@/ui/atoms/Button/Button";
import theme from "@/ui/theme";
import { css } from "@emotion/css";
import React from "react";
import { useDispatch } from "react-redux";
import Alarm from "../../../public/icons/alarm.svg";
import ProfileCard from "@/component/Profile/ProfileCard";
import Input from "@/ui/atoms/Input/Input";
import IconInput from "@/ui/atoms/Input/IconInput";
import Chip from "@/ui/atoms/Chip/Chip";
import Typography from "@/ui/atoms/Typography/Typography";

const UiTest = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h2" size="xl">
        ddddd
      </Typography>
      <Chip>안녕</Chip>
      <ProfileCard
        width="313px"
        height="477px"
        src="https://www.imedialife.co.kr/news/photo/202009/33165_33578_3057.jpg"
      ></ProfileCard>
      <ProfileCard
        width="313px"
        height="477px"
        src="https://www.imedialife.co.kr/news/photo/202009/33165_33578_3057.jpg"
        edit={true}
      ></ProfileCard>
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
    </div>
  );
};

export default UiTest;
