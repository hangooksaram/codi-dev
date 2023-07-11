"use client";

import { FormContainer } from "@/ui/atoms/Layout/Container";
import Typography from "@/ui/atoms/Typography/Typography";
import theme from "@/ui/theme";

interface ProfileFormValueProps {
  career: string;
  disability: string;
  education: string;
  imgUrl: string;
  introduction: string;
  job: string;
  period: string;
  severity: string;
}
const profileFormValueProps = {
  career: "",
  disability: "",
  education: "",
  imgUrl: "",
  introduction: "",
  job: "",
  period: "",
  severity: "",
};

import FormInputContainer, {
  Form as MentorProfileForm,
} from "@/ui/atoms/Input/FormInput";
import IconInputContainer from "@/ui/atoms/Input/IconInput";
import Input from "@/ui/atoms/Input/Input";
import useForm from "@/hooks/useForm";
import Button from "@/ui/atoms/Button/Button";
import ProfileImage from "../../../public/icons/profile-image.svg";
import Dropdown from "@/ui/atoms/Input/Dropdown";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Search from "../../../public/icons/search.svg";
import Textarea from "@/ui/atoms/Input/Textarea";

const MenteeProfileFormPage = () => {
  const { formValues: menteeProfileFormValues, handleValueChange } =
    useForm<ProfileFormValueProps>({ formValueProps: profileFormValueProps });
  const handleSignUpSubmit = () => {};
  return (
    <FormContainer>
      <Typography
        variant="h1"
        size={theme.fonts.size.lg}
        weight={theme.fonts.weight.black}
        align="center"
        {...{ margin: "80px 0px 80px 0px" }}
      >
        멘토프로필 작성하기
      </Typography>
      <MentorProfileForm>
        <FormInputContainer text="프로필 사진">
          <IconInputContainer iconComponent={<ProfileImage />}>
            <Input
              id="profileImage"
              name="profileImage"
              type="image"
              value={menteeProfileFormValues.imgUrl}
              onChange={handleValueChange}
            />
          </IconInputContainer>
          <Button
            width="30%"
            variant="square"
            type="button"
            {...{ marginLeft: "10px" }}
          >
            등록하기
          </Button>
        </FormInputContainer>
        <FormInputContainer text="장애 분류">
          <FlexBox direction="column" rowGap="10px">
            <FlexBox columnGap="10Px">
              <Dropdown
                width="100%"
                type="중분류"
                categories={["1", "2", "3"]}
              ></Dropdown>
              <Dropdown
                width="100%"
                type="소분류"
                categories={["1", "2", "3"]}
              ></Dropdown>
            </FlexBox>

            <Dropdown
              width="100%"
              type="세분류"
              categories={["1", "2", "3"]}
            ></Dropdown>
          </FlexBox>
        </FormInputContainer>
        <FormInputContainer text="중증도">
          <Button
            width="50%"
            color={theme.colors.white}
            variant="square"
            {...{
              border: `1px solid ${theme.colors.gray.main}`,
              marginRight: "10px",
            }}
          >
            중증
          </Button>
          <Button
            width="50%"
            color={theme.colors.white}
            variant="square"
            {...{
              border: `1px solid ${theme.colors.gray.main}`,
            }}
          >
            경증
          </Button>
        </FormInputContainer>
        <FormInputContainer text="학력">
          <Dropdown
            type="최종 학력"
            categories={["초등학교", "중학교", "고등학교", "대학교"]}
          />

          <IconInputContainer iconComponent={<Search />}>
            <Input
              id="education"
              name="education"
              value={menteeProfileFormValues.education}
              onChange={handleValueChange}
            />
          </IconInputContainer>
        </FormInputContainer>
        <FormInputContainer text="희망 직무">
          <IconInputContainer iconComponent={<Search />}>
            <Input
              id="education"
              name="education"
              value={menteeProfileFormValues.education}
              onChange={handleValueChange}
            />
          </IconInputContainer>
        </FormInputContainer>
        <FormInputContainer text="자기 소개">
          <Textarea
            id="introduction"
            name="introduction"
            value={menteeProfileFormValues.introduction}
            onChange={handleValueChange}
            placeholder="최소 50 글자"
          />
        </FormInputContainer>
        {/* 
        
        
        <FormInputContainer text="직무 경력"></FormInputContainer>
        */}
      </MentorProfileForm>
    </FormContainer>
  );
};

export default MenteeProfileFormPage;
