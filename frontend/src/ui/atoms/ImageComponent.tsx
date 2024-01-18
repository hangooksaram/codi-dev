import Image from 'next/image'
import { LocalImagePropsType, StyledImagePropsType } from '@/types/ui'

function ImageComponent({
  width,
  height,
  src,
  alt,
  sizes,
  ...rest
}: LocalImagePropsType) {
  return (
    <Image
      tabIndex={1}
      src={src}
      alt={alt}
      style={{ width, height }}
      sizes={sizes}
      {...rest}
    />
  )
}

export default ImageComponent
