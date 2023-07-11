import Button from "@/ui/atoms/Button/Button";
import Card from "@/ui/atoms/Card/Card";
import Input from "@/ui/atoms/Input/Input";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Image from "next/image";

const SignInImageCard = styled(Card)`
  display: flex;
  justify-content: flex-end;
  border-radius: 0;
  border-bottom-right-radius: 20px;
`;

const SignInRightArea = styled.div`
  width: 60%;
`;

const SignInInput = styled(Input)`
  height: 70px;
  background-color: ${theme.colors.gray.light};
  font-size: ${theme.fonts.size.md};
`;

const SignInTextButton = styled(Button)`
  height: fit-content;
  color: ${theme.colors.gray.dark};
  background-color: transparent;
`;

const StyledSignInImage = styled(Image)(() => ({
  maxWidth: "90%",
  height: "auto",
  objectFit: "contain",
}));

export {
  SignInImageCard,
  SignInInput,
  SignInRightArea,
  SignInTextButton,
  StyledSignInImage,
};
