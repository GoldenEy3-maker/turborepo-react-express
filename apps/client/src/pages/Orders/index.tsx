import OrderItem from "@/components/OrderItem"
import * as Section from "@/components/Section"
import * as Toolbar from "@/components/Toolbar"
import { useState } from "react"
import type { ValueOf } from "utils/types"
import styles from "./styles.module.scss"

const SortValues = {
  Price: "Цена",
  Date: "Дата",
  Popular: "Популярность",
} as const

type SortValues = ValueOf<typeof SortValues>

const OrdersPage = () => {
  const [searchValue, setSearchValue] = useState("")
  const [sortValue, setSortValue] = useState<SortValues>("Дата")

  return (
    <main>
      <Section.Root>
        <Section.Header>
          <Section.Title>Заказы</Section.Title>
        </Section.Header>
        <Toolbar.Root>
          <Toolbar.Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Toolbar.Sort
            label="Сортировать по:"
            handler={(value) => setSortValue(value as SortValues)}
            value={sortValue}
            values={Object.values(SortValues)}
          />
          <Toolbar.Filter></Toolbar.Filter>
        </Toolbar.Root>
        <Section.Content>
          <div className={styles.list}>
            <OrderItem
              id="1"
              title="Доработки сайта на React, фронт + бэк NestJS"
              description={
                <>
                  <p>
                    1. Поправить кнопку и голову персонажа (сейчас они
                    обрезаны).
                    <br />
                    2. Криво открывается ссылка подтверждения email из письма
                    после регистрации. <br />
                    3. Вместо формы регистрации после авторизации добавить
                    кнопку оплаты обучения которая будет перекидывать на
                    страницу оплаты &nbsp;
                    <a href="#">max-tax.fun/payment</a> . –{" "}
                    <a href="#">disk.yandex.ru/i/j6voEoBX</a>
                  </p>
                  <p>
                    1. Поправить кнопку и голову персонажа (сейчас они
                    обрезаны).
                    <br />
                    2. Криво открывается ссылка подтверждения email из письма
                    после регистрации. <br />
                    3. Вместо формы регистрации после авторизации добавить
                    кнопку оплаты обучения которая будет перекидывать на
                    страницу оплаты &nbsp;
                    <a href="#">max-tax.fun/payment</a> . –{" "}
                    <a href="#">disk.yandex.ru/i/j6voEoBX</a>...
                  </p>
                </>
              }
              clicks={2}
              date={new Date("2023-06-23 14:39:00")}
              price="По договоренности"
              verified={true}
              views={20}
            />
            <OrderItem
              id="1"
              title="Доработки сайта на React, фронт + бэк NestJS"
              description={
                <>
                  <p>
                    1. Поправить кнопку и голову персонажа (сейчас они
                    обрезаны).
                    <br />
                    2. Криво открывается ссылка подтверждения email из письма
                    после регистрации. <br />
                    3. Вместо формы регистрации после авторизации добавить
                    кнопку оплаты обучения которая будет перекидывать на
                    страницу оплаты &nbsp;
                    <a href="#">max-tax.fun/payment</a> . –{" "}
                    <a href="#">disk.yandex.ru/i/j6voEoBX</a>
                  </p>
                  <p>
                    1. Поправить кнопку и голову персонажа (сейчас они
                    обрезаны).
                    <br />
                    2. Криво открывается ссылка подтверждения email из письма
                    после регистрации. <br />
                    3. Вместо формы регистрации после авторизации добавить
                    кнопку оплаты обучения которая будет перекидывать на
                    страницу оплаты &nbsp;
                    <a href="#">max-tax.fun/payment</a> . –{" "}
                    <a href="#">disk.yandex.ru/i/j6voEoBX</a>...
                  </p>
                </>
              }
              clicks={5}
              date={new Date("2023-05-23 14:39:00")}
              price={12000}
              verified={false}
              views={20}
            />
          </div>
        </Section.Content>
      </Section.Root>
    </main>
  )
}

export default OrdersPage
