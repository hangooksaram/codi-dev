import { ChangeEvent, FormEventHandler, useCallback, useState } from "react";

const useForm = <T extends Partial<T>>({
  formValueProps,
}: {
  formValueProps: T;
}) => {
  const [formValues, setFormValues] = useState<T>(formValueProps);

  const handleValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    []
  );

  return {
    formValues,
    handleValueChange,
  };
};

export default useForm;
