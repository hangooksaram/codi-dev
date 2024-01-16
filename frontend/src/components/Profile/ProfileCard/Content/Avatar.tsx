import styled from "@emotion/styled";

const Avatar = styled.div(({ imgUrl }: { imgUrl?: string }) => ({
  background: `url(${imgUrl}) `,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  aspectRatio: 1 / 1,
  minWidth: "140px",
  borderRadius: "50%",
}));

export default Avatar;
