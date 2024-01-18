import { Ref, RefObject, useEffect } from 'react'

const usePressEnterKey = (element: RefObject<HTMLButtonElement>) => {
  const clickWhenEnterIsPressed = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      element!.current!.click()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', clickWhenEnterIsPressed)
    return () => {
      document.removeEventListener('keydown', clickWhenEnterIsPressed)
    }
  }, [])
}

export default usePressEnterKey
