// import OrderItem from "@/components/OrderItem"
// import { trpc } from "@/utils/trpc"
import type { FC } from "react"
import { useParams } from "react-router-dom"
// import LoadingSkeleton from "./loadingSkeleton"

const OrderPage: FC = () => {
  const { orderId } = useParams()

  if (!orderId) return null

  // const orderQuery = trpc.order.get.useQuery(orderId, {
  //   refetchOnWindowFocus: false,
  // })

  // if (orderQuery.isFetching || orderQuery.isLoading) return <LoadingSkeleton />

  // if (orderQuery.error || !orderQuery.data) return <div>Error</div>

  // console.log(orderQuery.data)

  // return (
  //   <OrderItem
  //     extended
  //     id={orderQuery.data.id}
  //     clicks={orderQuery.data.clickedUsersId.length}
  //     date={orderQuery.data.createdAt}
  //     description={orderQuery.data.description}
  //     title={orderQuery.data.title}
  //     verified={orderQuery.data.verified}
  //     views={orderQuery.data.viewedUsersId.length}
  //     isFavorite={orderQuery.data.isFavorite}
  //   />
  // )
}

export default OrderPage
