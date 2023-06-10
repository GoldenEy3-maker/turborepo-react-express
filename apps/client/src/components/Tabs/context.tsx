import type { FlowComponent } from "solid-js"
import { createContext, useContext } from "solid-js"
import type { SetStoreFunction } from "solid-js/store"
import { createStore } from "solid-js/store"

type TabsContextStore = {
  activeWidth: number
  activeOffset: number
}

type TabsContext = [TabsContextStore, SetStoreFunction<TabsContextStore>]

const TabsContext = createContext<TabsContext>()

export const TabsContextProvider: FlowComponent = (props) => {
  const contextStore = createStore<TabsContextStore>({
    activeOffset: 0,
    activeWidth: 0,
  })

  return (
    <TabsContext.Provider value={contextStore}>
      {props.children}
    </TabsContext.Provider>
  )
}

export const useTabsContext = () => {
  const context = useContext(TabsContext)

  if (!context) throw new Error("TabsContextProvider is lost!")

  return context
}
