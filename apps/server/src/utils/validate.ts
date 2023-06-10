export const validateRequiredFields = (input: Record<string, string>) => {
  return !Object.values(input).some(value => value.length === 0)
}