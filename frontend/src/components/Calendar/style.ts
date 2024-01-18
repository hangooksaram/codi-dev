import styled from '@emotion/styled'
import theme from '@/ui/theme'

export const dayPickerContainerStyle = {
  width: '100%',
  maxWidth: '482px',
  height: '590px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderRadius: '20px',
  border: `1px solid ${theme.colors.gray.main}`,
  background: theme.colors.white,
  padding: '30px 20px',
}

export const CustomCaptionNavigation = styled.button`
  height: 24px;
  border: none;
  outline: none;
  background-color: transparent;
`

export const CustomContentDates = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  size: ${theme.fonts.size.md};
  font-weight: ${theme.fonts.weight.regular};
  margin-bottom: 39px;
`
