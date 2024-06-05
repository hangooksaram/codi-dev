import { ReactNode } from 'react';
import InvisibleLabel from './InvisibleLabel';

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
      <InvisibleLabel htmlFor={id} text={text} />
      {children}
    </>
  );
}

export default Labeled;
