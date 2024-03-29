'use client';

import { FormEvent } from 'react';
import { findId } from '@/api/accountApi';
import Button from '@/ui/atoms/Button';
import Container from '@/ui/atoms/Container';
import FlexBox from '@/ui/atoms/FlexBox';
import Input from '@/ui/atoms/Input';
import StyledLink from '@/ui/atoms/Link';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import useNewForm, {
  FormPropertyType,
  FormType,
} from '@/hooks/useNewForm/useNewForm';
import {
  AccountImageComponent,
  AccountFormContainer,
} from '@/components/pages/account/AccountContainers';
import styled from '@emotion/styled';
import ImageComponent from '@/ui/atoms/ImageComponent';
import FindIdImage from '@images/find-id.png';

function FindIdPage() {
  interface FindIdFormValuesType extends FormType {
    email: FormPropertyType<string>;
  }

  const initialFormValues: FindIdFormValuesType = {
    email: {
      validCondition: {
        required: true,
        regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      },
    },
  };

  const { form, handleFormValueChange, validateAllFormValues } =
    useNewForm(initialFormValues);

  const postFindId = async () => {
    const { status } = await findId(form.email.value!);

    if (status === 200) {
      alert('해당 이메일로 아이디가 전송되었습니다.');
    } else {
      alert(
        '이메일 전송이 실패했습니다. 이메일 주소를 다시 한번 확인해주세요.',
      );
    }
  };

  const handleSubmitFindIdForm = async (e: FormEvent) => {
    e.preventDefault();

    const isFormValid = validateAllFormValues();

    if (isFormValid) await postFindId();
  };
  return (
    <FlexBox {...{ height: '100%' }}>
      <AccountImageComponent
        width="60%"
        height="auto"
        src={FindIdImage}
        alt="아이디 찾기 페이지 입니다."
      />

      <Container width="55.5%">
        <form onSubmit={(e) => handleSubmitFindIdForm(e)}>
          <AccountFormContainer
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowGap="40px"
          >
            <div>
              <Typography
                variant="div"
                size={theme.fonts.size.lg}
                weight={theme.fonts.weight.black}
                align="center"
                {...{ marginBottom: '10px' }}
              >
                아이디를 잊어버리셨나요?
              </Typography>
              <Typography
                variant="div"
                size={theme.fonts.size.md}
                color={theme.colors.gray.dark}
                align="center"
              >
                저희가 찾아드릴게요!
              </Typography>
            </div>
            <FlexBox direction="column" rowGap="20px">
              <Input
                id="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                value={form.email.value}
                onChange={handleFormValueChange}
                invalid={form.email.isValid === 'invalid'}
              />
              <Button type="submit" width="100%" variant="square">
                아이디 찾기
              </Button>
            </FlexBox>
            <StyledLink href="/account/findPw">
              {'비밀번호가 기억이 안나시나요? >'}
            </StyledLink>
          </AccountFormContainer>
        </form>
      </Container>
    </FlexBox>
  );
}

export default FindIdPage;
