import { ReactNode } from "react";
import Label from "./Label";

const Labeled = ({
  id,
  text,
  children,
}: {
  id: string;
  text: string;
  children: ReactNode;
}) => (
  <>
    <Label htmlFor={id} text={text} />
    {children}
  </>
);

export default Labeled;
