import { ChangeEvent, useEffect, useState } from 'react'
import { ValidType, ValidateConditions, invalid } from '../../utils/validate'
import { getFormattedFormValues } from './utils'

const useNewForm = (initialFormValues: FormType, serverData?: object) => {
  const [form, setForm] = useState<FormType>(
    getFormattedFormValues(initialFormValues),
  )

  const [isSubmitted, setIsSubmitted] = useState(false)

  const setFormFromServerData = (data: object) => {
    const formValues = { ...form }
    Object.keys(data).forEach((key) => {
      if (Object.hasOwn(form, key)) {
        Object.assign(formValues, {
          ...formValues,
          [key]: {
            ...formValues[key],
            value: data[key as keyof typeof data],
          },
        })
      }
    })
    return formValues
  }

  useEffect(() => {
    if (serverData) setForm(setFormFromServerData(serverData))
  }, [serverData])

  const convertToFormData = () => {
    const formValues = { ...form }
    const formData = {}
    Object.keys(formValues).forEach((key) => {
      const formValue = formValues[key]
      Object.assign(formData, {
        ...formData,
        [key]: formValue.value,
      })
    })

    return formData
  }

  /** input 태그 를 사용하지 않을 시, 타입 지정 필요 */
  const handleFormValueChange = <T,>(
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: T },
  ) => {
    const target = 'target' in e ? e.target : e
    const { name, value } = target

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: {
          ...form[name],
          value,
          isValid:
            isSubmitted && setIsValid<T>(value as T, form[name].validCondition),
        } as FormPropertyType<T>,
      }
    })
  }

  const validateFormValue = <T,>(
    formName: keyof typeof form,
    formValue: FormPropertyType<T>,
  ) => {
    const isValid = setIsValid(formValue.value!, formValue.validCondition)
    setForm((prevForm) => {
      return {
        ...prevForm,
        [formName]: {
          ...form[formName],
          isValid,
        } as FormPropertyType<T>,
      }
    })

    return isValid
  }

  const validateAllFormValues = () => {
    const isValid: ValidType[] = []
    Object.entries(form).forEach((item) => {
      const [formName, formValue] = item
      isValid.push(
        validateFormValue<typeof formValue.value>(
          formName as keyof typeof form,
          formValue,
        ),
      )
    })
    setIsSubmitted(true)

    return !isValid.includes('invalid')
  }

  const setIsValid = <T,>(value: T, validCondition: ValidateConditions) => {
    return invalid(value, validCondition) ? 'invalid' : 'valid'
  }

  return {
    form,
    handleFormValueChange,
    validateAllFormValues,
    setIsSubmitted,
    convertToFormData,
  }
}

export interface FormPropertyType<T> {
  initialValue?: T
  value?: T
  validCondition: ValidateConditions
  isValid?: ValidType
}

export interface FormType {
  [key: string]: FormPropertyType<any>
}

export default useNewForm
