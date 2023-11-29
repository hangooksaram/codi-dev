import Image from "next/image";
import { LocalImagePropsType, StyledImagePropsType } from "@/types/ui";

const ImageComponent = ({
  width,
  height,
  src,
  alt,
  sizes,
  ...rest
}: LocalImagePropsType) => (
  <Image
    tabIndex={1}
    src={src}
    alt={alt}
    style={{ width: width, height: height }}
    sizes={sizes}
    unoptimized={true}
    {...rest}
  />
);

export default ImageComponent;
