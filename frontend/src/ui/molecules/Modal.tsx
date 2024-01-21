import { Dispatch, ReactNode, SetStateAction } from 'react'
import styled from '@emotion/styled'
import Overlay from '../atoms/BackgroundOverlay'

function Modal({
  open,
  setOpen,
  children,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}) {
  return (
    open && (
      <>
        <ModalOverlay onClick={() => setOpen(false)} />
        {children}
      </>
    )
  )
}

const ModalOverlay = styled(Overlay)({
  backgroundColor: 'rgba(0,0,0,0.4)',

  zIndex: 1,
})

export default Modal
