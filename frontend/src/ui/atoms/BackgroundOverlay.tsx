import styled from '@emotion/styled'

const Overlay = styled.div(() => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1,
}))

export default Overlay
