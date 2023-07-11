import * as Section from "@/components/Section"
// import { trpc } from "@/utils/trpc"
// import { useEffect } from "react"
import OrderList from "./components/List"
import OrdersToolbar from "./components/Toolbar"

const OrdersPage = () => {
  // const orderCreateMut = trpc.order.create.useMutation()

  // useEffect(() => {
  //   orderCreateMut.mutate({
  //     title:
  //       "Доработать простую программу(php, js): изменить аккаунт, восстановить пароль, привяка оплаты и т.п.",
  //     description: `
  //     <p>AS IS: Есть простое приложение (php + js).
  //     Реализована функция логина и регистрации пользователя с подтверждением по мейлу либо входа как гостя.
  //     Пришлю вам сокращенную версию, сможете быстро вникнуть в код.
  //     Пользователей сохраняем в БД.
  //     Пользователь переходит в приложение и работает с данными: открывает/сохраняет их в JSONе – либо локально на компьютере, либо в папке на сервере.</p>
  //     <br/>
  //     <strong>TO BE:</strong>
  //     <p>
  //     Добавить совершенно стандартный для таких случаев функционал:
  //       <ol>
  //         <li>Восстановление пароля по мейлу;</li>
  //         <li>Удаление и изменение аккаунта (поменять логин/пароль/мейл);</li>
  //         <li>Работа с фалом: перезаписать текущий JSON в т.ч. локально на компьютер в папку из которой он открыт, показать последние открытые файлы;</li>
  //         <li>Защита кода (тут нужно обсудить варианты, что-то более интересное чем просто обсфуркация);</li>
  //         <li>Оплата (платежную систему пока подключать не нужно, но нужно сделать задел на будущее);</li>
  //       </ol>
  //     </p>
  //     <br />
  //     <p>
  //     Не обязательно оценивать всё сразу, можем разбить на отдельные задачи, принимать и оплачивать также по отдельности.
  //     Можем работать через безопасную сделку или напрямую.
  //     </p>
  //     `,
  //     tags: ["php", "js"],
  //     verified: false,
  //   })
  // }, [])

  return (
    <main>
      <Section.Root>
        <Section.Header>
          <Section.Title>Заказы</Section.Title>
        </Section.Header>
        <OrdersToolbar />
        <Section.Content>
          <OrderList />
        </Section.Content>
      </Section.Root>
    </main>
  )
}

export default OrdersPage
