import Image from "next/image";
import { StyledImagePropsType } from "@/types/ui";

const StyledImage = ({
  id,
  width,
  height,
  src,
  alt,
  onClick,
  ...rest
}: StyledImagePropsType) => (
  <div
    onClick={onClick!}
    style={{ width: width, height: height, position: "relative", ...rest }}
  >
    <Image
      id={id}
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "contain" }}
      unoptimized={true}
    />
  </div>
);

export default StyledImage;
