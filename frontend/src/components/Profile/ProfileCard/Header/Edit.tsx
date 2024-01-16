import Button from "@/ui/atoms/Button";
import theme from "@/ui/theme";
import Link from "next/link";
import EditIcon from "@icons/common/edit.svg";

const Edit = () => (
  <Link href={"/profileForm?edit=true"}>
    <Button variant="round" width="48px" color={theme.colors.info}>
      <EditIcon />
    </Button>
  </Link>
);

export default Edit;
