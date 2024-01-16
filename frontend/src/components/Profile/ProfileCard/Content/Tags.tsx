import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";

const Tags = ({
  career,
  disability,
  severity,
}: {
  career?: string;
  disability: string;
  severity: string;
}) => (
  <FlexBox isWrap rowGap="5px" columnGap="5px" {...{ marginTop: "22px" }}>
    <Chip size="small">{disability!}</Chip>
    <Chip size="small">{severity}</Chip>
    {career && <Chip size="small">{career}</Chip>}
  </FlexBox>
);

export default Tags;
