import { useState } from 'react';
import { FileType } from '..';
import { MAXIMUM_FILE_SIZE } from '@/constants';

const useUploadFile = () => {
  const [file, setFile] = useState<FileType>({
    data: null,
    name: '',
  });

  const isFileSizeOverMaximum = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target!.files![0].size > MAXIMUM_FILE_SIZE) {
      alert('파일첨부 사이즈는 10MB 이내로 가능합니다.');
      return true;
    }

    return false;
  };

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    if (isFileSizeOverMaximum(e)) {
      e.target.value = '';
      return;
    }

    setFile({ name: e.target.files[0].name, data: e.target.files[0] });
  };

  return { file, onUploadFile };
};

export default useUploadFile;
