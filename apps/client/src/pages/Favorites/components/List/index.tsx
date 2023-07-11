// import OrderItem from "@/components/OrderItem"
// import { trpc } from "@/utils/trpc"
import type { FC } from "react"
// import LoadingSkelet from "./loadingSkelet"
import styles from "./styles.module.scss"

const FavoriteList: FC = () => {
  // const favorites = trpc.order.getAll.useQuery()

  return (
    <div className={styles.list}>
      {/* {!favorites.isFetching && !favorites.isLoading ? (
        !favorites.error && favorites.data && favorites.data.length > 0 ? (
          favorites.data?.map((order) => (
            <OrderItem
              key={order.id}
              id={order.id}
              title={order.title}
              description={order.description}
              clicks={order.clickedUsersId.length}
              date={order.createdAt}
              price={order.price}
              verified={order.verified}
              views={order.viewedUsersId.length}
              isFavorite={order.isFavorite}
            />
          ))
        ) : null
      ) : (
        <LoadingSkelet />
      )} */}
    </div>
  )
}

export default FavoriteList
