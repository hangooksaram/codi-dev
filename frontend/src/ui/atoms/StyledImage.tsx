import Image from 'next/image';
import { StyledImagePropsType } from '@/types/ui';

function StyledImage({
  id,
  width,
  height,
  src,
  alt,
  onClick,
  ...rest
}: StyledImagePropsType) {
  return (
    <div
      onClick={onClick!}
      style={{ width, height, position: 'relative', ...rest }}
    >
      <Image
        id={id}
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        unoptimized
      />
    </div>
  );
}

export default StyledImage;
