import { FormValidationType, FormValueType } from './useForm';
import { FormType } from './useForm';

export const getFormattedFormValues = (initialFormValues: FormType) => {
  const form = { ...initialFormValues };
  Object.keys(initialFormValues).forEach((key) => {
    const formValue = form[key];

    Object.assign(form, {
      ...form,
      [key]: {
        ...formValue,
        value: formValue.initialValue ?? null,
        isValid: 'initial',
      },
    });
  });

  return form;
};

export const combineValuesWithValidation = (
  form: FormValueType,
  validation: FormValidationType,
) => {
  const newForm = {};

  Object.entries(form).forEach((formElement) => {
    const [key, value] = formElement;

    Object.assign(newForm, {
      ...newForm,
      [key]: {
        value,
        isValid: 'initial',
        validCondition: validation[key],
      },
    });
  });

  return newForm;
};
