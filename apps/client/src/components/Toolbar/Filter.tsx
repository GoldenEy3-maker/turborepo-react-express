import * as Filters from "@/components/Filter"
import type { ChangeEventHandler } from "react"
import { useState, type FC } from "react"
import type { ValueOf } from "utils/types"
import styles from "./styles.module.scss"

const CheckboxValues = {
  React: "react",
  Angular: "angular",
  Vue: "vue",
  Figma: "figma",
  Verified: "verified",
} as const

type CheckboxValues = ValueOf<typeof CheckboxValues>

type CheckboxValuesState = {
  [Key in CheckboxValues]: {
    checked: boolean
    value: "on" | "off" | undefined
  }
}

export const Filter: FC = () => {
  const [checkboxValue, setCheckboxValue] = useState<CheckboxValuesState>({
    angular: {
      checked: false,
      value: undefined,
    },
    figma: {
      checked: false,
      value: undefined,
    },
    react: {
      checked: false,
      value: undefined,
    },
    verified: {
      checked: false,
      value: undefined,
    },
    vue: {
      checked: false,
      value: undefined,
    },
  })

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const handleState = (state: {
      checked: boolean
      value: "on" | "off" | undefined
    }) => {
      const newState = state

      if (state.value === undefined || state.value === "on")
        newState.checked = true

      if (state.value === "off") newState.checked = false

      switch (state.value) {
        case "off":
          newState.value = undefined
          break
        case "on":
          newState.value = "off"
          break
        default:
          newState.value = "on"
          break
      }

      return newState
    }

    setCheckboxValue((state) => ({
      ...state,
      [event.target.id as CheckboxValues]: handleState(
        state[event.target.id as CheckboxValues]
      ),
    }))
  }

  console.log(checkboxValue)

  return (
    <Filters.Root>
      <Filters.Trigger className={styles.filter} title="Фильтры">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
        </svg>
      </Filters.Trigger>
      <Filters.Content>
        <Filters.Group legend="Теги">
          <Filters.Checkbox
            label="React"
            id={CheckboxValues.React}
            checked={checkboxValue.react.checked}
            value={checkboxValue.react.value}
            onChange={changeHandler}
          />
          <Filters.Checkbox
            label="Angular"
            id={CheckboxValues.Angular}
            checked={checkboxValue.angular.checked}
            value={checkboxValue.angular.value}
            onChange={changeHandler}
          />
          <Filters.Checkbox
            label="Vue"
            id={CheckboxValues.Vue}
            checked={checkboxValue.vue.checked}
            value={checkboxValue.vue.value}
            onChange={changeHandler}
          />
          <Filters.Checkbox
            label="Figma"
            id={CheckboxValues.Figma}
            checked={checkboxValue.figma.checked}
            value={checkboxValue.figma.value}
            onChange={changeHandler}
          />
        </Filters.Group>
        <Filters.Group legend="Сертификат">
          <Filters.Checkbox
            label="Сертифицированные"
            id={CheckboxValues.Verified}
            checked={checkboxValue.verified.checked}
            value={checkboxValue.verified.value}
            onChange={changeHandler}
          />
        </Filters.Group>
      </Filters.Content>
    </Filters.Root>
  )
}
