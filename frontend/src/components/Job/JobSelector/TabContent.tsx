import Button from '@/ui/atoms/Button';
import FlexBox from '@/ui/atoms/FlexBox';
import theme from '@/ui/theme';
import { Dispatch, SetStateAction } from 'react';

function TabContent({
  jobs,
  selected,
  setSelected,
}: {
  jobs: { name: string }[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  return (
    <FlexBox justifyContent="flex-start" columnGap="15px" rowGap="15px" isWrap>
      {jobs?.map(({ name }, index) => {
        return (
          <Button
            onClick={() => setSelected(name)}
            type="button"
            variant="default"
            size="small"
            outline
            key={index}
            color={
              selected === name
                ? theme.colors.assist.normal
                : theme.colors.white
            }
            hoverDisabled
          >
            {name}
          </Button>
        );
      })}
    </FlexBox>
  );
}

export default TabContent;
