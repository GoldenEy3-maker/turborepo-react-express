
export const validateEmail = (value: string) => {
  return new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "g").test(value)
}

export const validateTelPattern = (value: string) => {
  return new RegExp(/^\+7\s\([\d]{3}\)\s[\d]{3}-[\d]{2}-[\d]{2}$/, "g").test(
    value
  )
}

export const validateDatePattern = (value: string) => {
  return new RegExp(/^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19[3-9]\d|20\d{2})$/, "g").test(value)
}
