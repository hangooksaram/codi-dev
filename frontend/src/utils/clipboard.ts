import ClipboardJS from 'clipboard'

export const copyText = (
  id: string,
  targetId: string,
  completedMessage: string,
) => {
  const clipboard = new ClipboardJS(`#${id}`)

  document
    .getElementById(id)!
    .setAttribute('data-clipboard-target', `#${targetId}`)

  clipboard.on('success', () => {
    alert(`${completedMessage}가 복사되었습니다!`)
  })

  clipboard.on('error', (e) => {
    alert(e)
  })
}
