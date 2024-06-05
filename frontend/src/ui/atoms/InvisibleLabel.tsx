import styled from '@emotion/styled';

const StyledInvisibleLabel = styled.label(() => ({
  position: 'fixed',
  left: '-999px',
  opacity: '0',
}));

function InvisibleLabel({ htmlFor, text }: { htmlFor: string; text: string }) {
  return <StyledInvisibleLabel htmlFor={htmlFor}> {text}</StyledInvisibleLabel>;
}

export default InvisibleLabel;
