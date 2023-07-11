export const cls = (
  cls: (string | undefined)[],
  conditionCls?: Record<string, boolean>
) => {
  const cloneCls = cls.filter((c) => c !== undefined)

  if (conditionCls) {
    Object.keys(conditionCls).map((key) => {
      if (conditionCls[key]) {
        cloneCls.push(key)
      }
    })
  }

  return cloneCls.join(" ")
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}
