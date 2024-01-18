import styled from '@emotion/styled'
import { device } from '@/ui/theme'

const LayoutWithSideBar = styled.main(() => ({
  width: '100%',
  maxWidth: '1312px',
  margin: '40px 24px 24px 40px',
  [device('smWeb')]: {
    margin: '0 auto',
    marginTop: '20px',
    paddingBottom: '200px',
    width: '90%',
  },
}))

export default LayoutWithSideBar
