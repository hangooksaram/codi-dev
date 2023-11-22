export const invalid = <T,>(
  value: T,
  validateConditions: ValidateConditions
) => {
  let invalid = false;
  const { required, min, max, regex } = validateConditions;
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

  return invalid;
};

export const validate = <T,>(value: T) => {
  return {
    isRequired: () => value !== "" && value !== null && value !== undefined,
    isRegexCorrect: (regex: RegExp) => new RegExp(regex!).test(value as string),
    isMin: (min: number) => typeof value === "number" && value > min!,
    isMax: (max: number) => typeof value === "number" && value < max!,
  };
};

export interface ValidateConditions {
  required?: boolean;
  regex?: RegExp;
  min?: number;
  max?: number;
}

export type ValidType = "initial" | "invalid" | "valid";
