import { Dispatch, SetStateAction } from 'react';

export interface FileType {
  data: File | null;
  name: string;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;
