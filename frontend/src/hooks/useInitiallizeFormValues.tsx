import { useSearchParams } from "next/navigation";

const useInitiallizeFormValues = <T extends object>(formValues: T) => {
  const pathParams = useSearchParams();
  const isEdit = useSearchParams().get("edit");
  if (isEdit)
    pathParams.forEach((value, key) => {
      if (key in formValues) Object.assign(formValues, { [key]: value });
    });

  return { formValues, isEdit, pathParams };
};

export default useInitiallizeFormValues;
