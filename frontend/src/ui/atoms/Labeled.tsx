import { ReactNode } from 'react';
import Label from './Label';

function Labeled({
  id,
  text,
  children,
}: {
  id: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <>
      <Label htmlFor={id} text={text} />
      {children}
    </>
  );
}

export default Labeled;
