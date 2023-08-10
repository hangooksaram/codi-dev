import { useSearchParams } from "next/navigation";

const useInitiallizeFormValues = <T extends object, S extends object>(
  formikValues: T,
  restFormValues: S
) => {
  const pathParams = useSearchParams();
  const isEdit = useSearchParams().get("edit");
  if (isEdit)
    pathParams.forEach((value, key) => {
      if (key in formikValues) Object.assign(formikValues, { [key]: value });
      if (key in restFormValues)
        Object.assign(restFormValues, { [key]: value });
    });

  return { formikValues, restFormValues, isEdit, pathParams };
};

export default useInitiallizeFormValues;
