import * as Table from "@/components/Table"
import UserProfile from "@/components/UserProfile"
import RatingSpan from "@/components/RatingSpan"

const TopPerformers = () => {
  return (
    <Table.Root template="1fr 1fr 1fr 1fr">
      <Table.Head>
        <Table.Row>
          <Table.Cell>Профиль</Table.Cell>
          <Table.Cell>Заказов за месяц</Table.Cell>
          <Table.Cell>Рейтиг</Table.Cell>
          <Table.Cell>Опыт работы</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <UserProfile />
          </Table.Cell>
          <Table.Cell>20</Table.Cell>
          <Table.Cell><RatingSpan value={4.7} /></Table.Cell>
          <Table.Cell>2 года</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <UserProfile />
          </Table.Cell>
          <Table.Cell>20</Table.Cell>
          <Table.Cell><RatingSpan value={4.7} /></Table.Cell>
          <Table.Cell>2 года</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <UserProfile />
          </Table.Cell>
          <Table.Cell>20</Table.Cell>
          <Table.Cell><RatingSpan value={4.7} /></Table.Cell>
          <Table.Cell>2 года</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}
export default TopPerformers
