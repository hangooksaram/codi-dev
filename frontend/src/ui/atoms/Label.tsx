import styled from '@emotion/styled';

const StyledLabel = styled.label(() => ({
  position: 'fixed',
  left: '-999px',
  opacity: '0',
}));

function Label({ htmlFor, text }: { htmlFor: string; text: string }) {
  return <StyledLabel htmlFor={htmlFor}> {text}</StyledLabel>;
}

export default Label;
