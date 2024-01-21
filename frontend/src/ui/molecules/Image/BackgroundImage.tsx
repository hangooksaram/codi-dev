import styled from '@emotion/styled'
import { ReactNode, CSSProperties } from 'react'
import { LocalImagePropsType } from '@/types/ui'
import ImageComponent from '@/ui/atoms/ImageComponent'

export function BackgroundImage({
  image,
  style,
  children,
}: {
  image: LocalImagePropsType
  style: CSSProperties
  children: ReactNode
}) {
  const { width, height } = image

  return (
    <BackgroundImageContainer width={width} height={height} style={style}>
      <ImageComponent {...image} />
      <Content>{children}</Content>
    </BackgroundImageContainer>
  )
}

const BackgroundImageContainer = styled.div(
  ({ width, height }: { width?: string; height?: string }) => ({
    position: 'relative',
    width,
    height,
  }),
)

const Content = styled.div(() => ({
  position: 'absolute',
}))
