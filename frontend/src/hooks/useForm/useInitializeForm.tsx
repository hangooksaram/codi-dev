import { useEffect } from 'react';
import { SetState } from '@/index';
import { FormType } from './useForm';

const useInitializeForm = (
  form: FormType,
  setForm: SetState<FormType>,
  serverData?: object,
) => {
  const setFormFromServerData = (data: object) => {
    const formValues = { ...form };
    Object.keys(data).forEach((key) => {
      if (Object.hasOwn(form, key)) {
        Object.assign(formValues, {
          ...formValues,
          [key]: {
            ...formValues[key],
            value: data[key as keyof typeof data],
          },
        });
      }
    });
    return formValues;
  };

  useEffect(() => {
    if (serverData) setForm(setFormFromServerData(serverData));
  }, [serverData]);
};

export default useInitializeForm;
