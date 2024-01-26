import Link from 'next/link';
import EditIcon from '@icons/common/edit.svg';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';

function Edit() {
  return (
    <Link href="/profileForm?edit=true">
      <Button variant="round" width="48px" color={theme.colors.info.main}>
        <EditIcon />
      </Button>
    </Link>
  );
}

export default Edit;
