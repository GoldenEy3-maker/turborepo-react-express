import * as Section from "@/components/Section"
import FavoriteList from "./components/List"
import FavoritesToolbar from "./components/Toolbar"

const FavoritesPage = () => {
  return (
    <main>
      <Section.Root>
        <Section.Header>
          <Section.Title>Заказы</Section.Title>
        </Section.Header>
        <FavoritesToolbar />
        <Section.Content>
          <FavoriteList />
        </Section.Content>
      </Section.Root>
    </main>
  )
}

export default FavoritesPage
