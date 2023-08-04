"use client";

import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import Grid from "@/ui/atoms/Grid";
import theme from "@/ui/theme";

const BadgesPage = () => {
  const mock = [
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
    {
      a: "d",
      b: "f",
    },
  ];
  return (
    <Card color={theme.colors.background} padding="30px">
      <FlexBox isWrap={true} rowGap="10px" columnGap="10px">
        {mock.map((item, index) => (
          <Card width="230px" height="230px" key={index}>
            {item.a}
            {item.b}
          </Card>
        ))}
      </FlexBox>
    </Card>
  );
};

export default BadgesPage;
