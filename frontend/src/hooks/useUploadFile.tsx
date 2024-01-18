import { useState } from 'react'
import { FileType } from '..'

const useUploadFile = () => {
  const [file, setFile] = useState<FileType>({
    data: null,
    name: '',
  })
  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    setFile({ name: e.target.files[0].name, data: e.target.files[0] })
  }

  return { file, onUploadFile }
}

export default useUploadFile
