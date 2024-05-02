'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { updatePassword as patchUpdatePassword } from '@/api/accountApi';
import { selectUser } from '@/features/user/userSlice';
import { UpdatePasswordBody } from '@/types/api/sign';
import Button from '@/ui/atoms/Button';
import { FormContainer } from '@/ui/atoms/Container';
import FlexBox from '@/ui/atoms/FlexBox';
import Input from '@/ui/atoms/Input';

import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { handleApiCallback } from '@/utils/api';
import LabelBox from '@/ui/molecules/LabelBox';

function UpdateMyInfoPage() {
  const router = useRouter();
  const [passwordInfo, setPasswordInfo] = useState<UpdatePasswordBody>({
    oldPassword: '',
    newPassword: '',
  });

  const updatePassWord = async () => {
    const { status } = await patchUpdatePassword({
      oldPassword: passwordInfo.oldPassword,
      newPassword: passwordInfo.newPassword,
    });

    handleApiCallback(
      status!,
      () => {
        router.push('/');
      },
      () => {
        if (status === 500) {
          alert('현재 비밀번호가 일치하지 않습니다. 다시 시도해 주세요');
          setPasswordInfo({
            ...passwordInfo,
            oldPassword: '',
            newPassword: '',
          });
        }
      },
    );
  };

  return (
    <FormContainer>
      <Typography
        variant="h1"
        size={theme.fonts.size.lg}
        weight={theme.fonts.weight.black}
        align="center"
        {...{ margin: '80px 0px 80px 0px' }}
      >
        개인정보 수정
      </Typography>
      <FormContainer>
        <FlexBox direction="column" rowGap="50px">
          <LabelBox text="현재 비밀번호">
            <Input
              value={passwordInfo.oldPassword as string}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordInfo({
                  ...passwordInfo,
                  oldPassword: e.target.value!,
                })
              }
            />
          </LabelBox>
          <LabelBox text="새로운 비밀번호">
            <Input
              value={passwordInfo.newPassword as string}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordInfo({
                  ...passwordInfo,
                  newPassword: e.target.value!,
                })
              }
            />
          </LabelBox>
          <Button
            width="100%"
            onClick={() => updatePassWord()}
            variant="square"
            disabled={!passwordInfo.newPassword || !passwordInfo.oldPassword}
          >
            수정완료
          </Button>
        </FlexBox>
      </FormContainer>
    </FormContainer>
  );
}

export default UpdateMyInfoPage;
