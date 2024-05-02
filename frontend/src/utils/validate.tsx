export const invalid = <T,>(
  value: T,
  validateConditions: ValidateConditions,
) => {
  let invalid = false;
  const { required, min, max, regex, minLength } = validateConditions;
  const validation = validate<T>(value);

  if (required) {
    invalid = !validation.isRequired();
  }

  if (min) {
    invalid = !validation.isMin(min);
  }

  if (max) {
    invalid = !validation.isMax(max);
  }

  if (regex) {
    invalid = !validation.isRegexCorrect(regex);
  }

  if (minLength) {
    invalid = !validation.isMinLength(minLength);
  }

  return invalid;
};

export const validate = <T,>(value: T) => {
  return {
    isRequired: () =>
      value !== null &&
      value !== undefined &&
      ((typeof value === 'string' && value !== '') ||
        (Array.isArray(value) && value.length > 0)),
    isRegexCorrect: (regex: RegExp) => new RegExp(regex!).test(value as string),
    isMin: (min: number) => typeof value === 'number' && value > min!,
    isMax: (max: number) => typeof value === 'number' && value < max!,
    isMinLength: (minLength: number) =>
      typeof value === 'string' && value.length > minLength,
  };
};

export interface ValidateConditions {
  required?: boolean;
  regex?: RegExp;
  min?: number;
  max?: number;
  minLength?: number;
}

export type ValidType = 'initial' | 'invalid' | 'valid';
