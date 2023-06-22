export const cls = (cls: (string | undefined)[], conditionCls?: Record<string, boolean>) => {
  const cloneCls = cls.filter(c => c !== undefined)

  if (conditionCls) {
    Object.keys(conditionCls).map(key => {
      if (conditionCls[key]) {
        cloneCls.push(key)
      }
    })
  }

  return cloneCls.join(" ")
}


export const getMonths = () => {
  return Array.from({ length: 12 }, (e, i) => new Date(new Date().getFullYear(), i, 1))
}

export const getDaysInCurrentMonth = () => {
  const date = new Date()
  const value = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  return Array.from({ length: value }, (e, i) => new Date(date.getFullYear(), date.getMonth(), i + 1))
}

export const getHours = () => {
  return Array.from({ length: 24 }, (e, i) => `${i + 1}:00`)
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}