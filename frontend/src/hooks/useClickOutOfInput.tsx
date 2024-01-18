import { useEffect } from 'react'
import { SetState } from '..'

const useClickOutOfInput = (elementId: string, setOpen: SetState<boolean>) => {
  const addClickOutOfInputHandler = (e: MouseEvent) => {
    const targetEl = e.target! as HTMLElement

    if (elementId !== targetEl.parentElement?.id && elementId !== targetEl.id) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', addClickOutOfInputHandler)

    return () =>
      document.removeEventListener('click', addClickOutOfInputHandler)
  }, [])
}

export default useClickOutOfInput
