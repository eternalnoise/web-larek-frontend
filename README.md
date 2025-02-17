# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

npm install
npm run start

или

yarn
yarn start
## Сборка

npm run build

или

yarn build

## Описание Архитектуры

Для выполнения проектной работы будет использоваться паттерн MVC с брокером событий. В слое данных (Model) будут храниться и обновляться: список товаров на витрине, список товаров в корзине, функционал добавления/удаления из корзины, добавления данных доставки и контактов, валидация форм, и сборка POST запроса на отправку валидного заказа. Работа с данными для API (GET запрос и конвертация в объекты, POST запрос отправки заказа) осуществляется в `index.ts`. 
Слой отображения (View) отвечает за сборку HTML элементов и заполнение их контента (тексты, ссылки на картинки) данными из моделей. При этом сами компоненты слоя сами никак не ответственны за изменение данных. За обработку событий изменения данных отвечает третий слой – брокер (элемент класса EventEmitter). При кликах пользователя на кнопки, например добавить товар в корзину, обработчик событий кнопок создаст специальное событие для брокера, по которому как обновится список товаров внутри модели корзины, так и перерендерится само вью корзины в соответствии с обновленным массивом данных. 

## Model

Слой данных разбивается на 3 класса – отдельно для витрины, корзины и данных для доставки, плюс базовый класс модели. Можно было бы обойтись и одной сущностью, но было решено разбить зоны отвественности классов по максимуму.

### BaseModel

/src/components/base/model.ts

Абстрактный класс базовой модели, через который будут определяться остальные модели. Таким образом все модели смогут получить доступ к функционалу отправки событий в брокер.

`constructor(data: Partial<T>, protected events: IEvents)` – принимает дженерик типа данных для модели (`IProduct`,`IBasket`, etc) и `IEvents` – интерфейс для обработки событий

`emitChanges(event: string, data?: object)` – сообщает всем слушателям, что в модели поменялись данные. В опциональном аргументе `data` пишется что именно обновилось, например какой именно товар добавился в корзину  


### CatalogModel

/src/components/model/CatalogModel.ts

 Модель витрины, которая заполняется продуктами извне. 
 {
  items: IProduct[], – массив всех продуктов, которые нужно вывести на витрину
 }

 Методы:
 - setProducts(items: IProduct[]) – заполнить массив продуктов. Поскольку все товары приходят массивом из API, он заполняется сразу целиком.

### BasketModel 

/src/components/model/BasketModel.ts

 Класс для работы с текущим состоянием корзины – список товаров и их общая цена. Данные обновляются через события при нажатиях кнопок пользователем. При изменении состояния корзины создает событие `basket_changed` для обновления счетчика в хедере. В текущей реализации валидация проходит только на пустые поля в форме.

 Поля:
 {
  items: Product[], – массив продуктов в корзинe,
  itemsNumber: number, – количество товаров в корзине
  totalPrice: number, - общая стоимость всех продуктов
 }

Методы:
  - addProduct(product: Product) - добавить в корзину
  - removeProduct(product: Product) - удалить из корзины
  - clear() - очищает корзину, например после успешного оформления, чтобы можно было заново создать еще один заказ

### CheckoutModel
/src/components/model/CheckoutModel.ts
Класс для заполнения данных доставки для отправления заказа. Валидация форм проводится в модели и по отдельности, вью компоненты отвечают только за отображение элементов в браузере.
 {
  payment: PaymentOption, - способ оплаты
  address: string, – адрес доставки
  email: string, – почта получателя
  phone: string, – номер телефона получателя
  price: number, - сумма заказа в корзине
  items: string[] - айди предметов в корзине
 }

 Методы:
 - validateDeliveryForm(): boolean – валидирует форму данных доставки и регистрирует события валидации
 - validateContactsForm(): boolean – валидирует форму контактных данных и регистрирует события валидации
 - getOrderDetails() – собирает все нужные данные для отправки запроса на эндпоинт `/order`
 - clear() - очищает формы (после успешного оформления), чтобы можно было заново создать еще один заказ

Используемые интерфейсы:

/src/types.ts:

### IProduct 
 Заполнение карточки товара и товаров в корзине
 {
  id: string, - идентификатор продукта из базы
  description: string, – описание для модального окна карточки товара
  image: string, – относительный путь на изображение, для получения полного пути нужно его сконкатенировать с CDN (константой)
  title: string, – название товара для отображения на витрине и в корзине
  category: string, – категория товара
  price: number | null – цена, для "бесценного" товара она null 
  inBasket: boolean – находится ли товар прямо сейчас в корзине
 }
  

### IBasket
 Заполнение корзины
 {
    items: IProduct[], – список добавленных продуктов
    itemsNumber: number, – количество товаров в корзине
    totalPrice: number, - общая стоимость всех продуктов
 }

### IContacts
 Данные из формы контактов
 {
    email: string,
    phone: string
 }

### IDeliveryDetails
 Данные из формы выбора способа оплаты и указания адреса
 {
    payment: PaymentOption,
    address: string
 }

### ICheckoutDetails
Интерфейс для сборки запроса на отправку заказа. Композирует `IDeliveryDetails`, `IContacts`, добавляет массив `id` продуктов и общую сумму заказа.
{
  payment: string,     
  address: string,
  email: string,
  phone: string,
  total: number,
  items: string[]
}


Дополнительные типы:
/src/types.ts


`type PaymentOption = 'Онлайн' | 'При получении' | undefined` - Выбор способа оплаты, `undefined` на случай валидации формы до выбора способа оплаты.


---

 ## View

Слой отображения отвечает за составление HTML контейнеров. Чтобы вывести какой-либо элемент в окно браузера, в соответствующее вью передается элемент нужной модели и вызывается функция `render()`. При этом при любом изменении данных получается так, что контейнер перерисовывается целиком, даже если поменялась только малая часть данных. Зато осуществляется полное разделение зон ответственности слоёв приложения - отображения только собирают HTML, модели только сохраняют текущие данные.

 Поскольку в проекте есть однотипные модальные окна, можно один раз определить их разворачивание и вставлять туда зарендеренный контейнер. Также пригодятся функции для однотипных операций с элементами HTML. Для такой задачи удобно определить абстрактный класс базового вью, и реализовывать остальные через него. При создании элемента отображения передается HTML контейнер с которым предстоит работать.


### BaseView

/src/components/base/view.ts

Абстрактный класс, который реализуют остальные классы отображений.

`abstract class BaseView<T>`

Конструктор:
Принимает на вход:
`container: HTMLElement` – основной контейнер текущего отображения

Методы:
 - setElement(query: string, value: HTMLElement) – поменять контент элемента
 - toggleClass(element: HTMLElement, className: string, force?: boolean) – переключить класс элемента
 - setText(element: HTMLElement, value: unknown) – установить текстовое содержимое элемента
 - setDisabled(element: HTMLElement, state: boolean) – сменить статус блокировки, например заблокировать кнопку перехода в следующую форму до валидации
 - setHidden(element: HTMLElement) – скрыть элемент, например модальное окно при его закрытии
 - setVisible(element: HTMLElement) – показать элемент, например модальное окно при его открытии
 - setImage(element: HTMLImageElement, src: string, alt?: string) – вставить в элемент img ссылку на картинку и alt
 - render(data?: Partial<T>): HTMLElement – вернуть HTML элемент для вставки в DOM
 - clear(element: HTMLElement) – удаляет все дочерние ноды элемента



### Page

/src/components/view/Page.ts

Отображение главной страницы, содержит внутри себя контейнер витрины, контейнер с иконкой корзины и враппер body документа.

Конструктор принимает на вход:
  
`container: HTMLElement` – должен быть body документа
`events: IEvents` – брокер событий

Поля:
{
    pageContainer: HTMLElement,
    events: IEvents,
    basketIconContainer: HTMLElement,
    catalog: HTMLElement,
    wrapper: HTMLElement;
}

Методы:

`lock()` – заблокировать прокрутку, например при открытии модального окна
`unlock()` – разблокировать прокрутку, например при закрытии модального окна


### Card

/src/components/view/Card.ts

Отвечает за рендер отдельной карточки товара в трех местах - каталоге, превью товара и корзине. В целях избежания дубликации кода и наличия трех разных темплейтов в вёрстке было решено объеденить по сути три разных отображения в одно. Отличаются они передачей разных темплейтов в конструктор, и поэтому некоторые поля могут быть null. 
Для каждой карточки ее контент заполняется через вызов метода `render(item: IProduct)` родительского класса `BaseView`, используя соотвествующие сеттеры. 

На самом элементе карточки на витрине висит обработчик событий, вызывающий событие `catalog_selected`. 
На кнопке добавления в корзину карточки, подставляемой в модальное окно, висит обработчик событий, вызывающий событие `basket_add`, где дополнительно передаются данные продукта. Кнопка добавления в корзину меняется в зависимости от наличия продукта в корзине (становится неактивной или активной) - значения поля `inBasket`.
На кнопке удаления из корзины карточки внутри корзины висит обработчик событий, вызывающий событие `basket_remove`, где дополнительно передаются данные продукта.

Поля:
{
  card_id: string;
  card_title: HTMLElement;
  card_price: HTMLElement;
  card_image: HTMLImageElement | null;
  card_category: HTMLElement | null;
  card_description: HTMLElement | null;
  card_basket_index: HTMLElement | null;
  card_button: HTMLButtonElement | null;
}


Конструктор: 

Принимает на вход 
`container: HTMLElement` - склонированный темплейт карточки (для каталога/для превью/для корзины)
`callback?: () => void` - коллбек действия по клику на эту карточки (открыть превью/добавить в корзину/удалить из корзины)

Методы:
`toggleButtonState(value: boolean)` - переключить состояние кнопки 

### CatalogView

/src/components/view/Catalog.ts

Отвечает за рендер контейнера витрины – catalogContainer. Собирается из списка элементов `IProduct[]`, и для каждого элемента вызывает `render(item)` новой карточки.


### BasketOpenedView

/src/components/view/Basket.ts

Отвечает за рендер контейнера корзины для подстановки в модальное окно. Открывается при событии `basket_open`. Получает список товаров из модели корзины, рендерит контейнер с их списком, добавляет кнопки "Оформить" и подставляет цену всех товаров в корзине. При нажатии на кнопку "Оформить" создает событие `checkout_proceed`.

Поля:
{
    basketContainer: HTMLElement,
    basketList: HTMLElement,
    checkoutButton: HTMLElement,
    totalPrice: HTMLElement
}

Методы:
`updateBasket(basket: IBasket)` - перерендеривает контейнер текущим состоянием модели `BasketModel`

### BasketIconView

/src/components/view/Basket.ts

Отвечает за иконку корзины и отображение счетчика товаров в корзине. При клике на элемент открывается модальное окно корзины. При срабатывании события `basket_changed` счетчик обновляется данными из `BasketModel`


### ModalView

/src/components/view/Modal.ts

Отображение модального окна. На странице одно модальное окно, в которое можно подставить отображение полной карточки товара, корзины, форм и успешного заказа. Закрывается по клику на кнопку "закрыть" или вне внутреннего контента.

Методы:

`open()` – открыть модальное окно
`close()` – закрыть модальное окно, создать событие `modal_close`
`set content(value: HTMLElement)` – сеттер отрендеренного элемента какого-то отображения
`render({content: HTMLElement})` – получить и развернуть элемент модального окна с элементом `content` внутри


### FormView

/src/components/view/Form.ts

Отображение форм. Является родительским классом формы заполнения данных доставки и контактов. Валидация осуществляется снаружи, формам только задается результат проверки и полученные ошибки.

Поля:
`_submitButton` – кнопка отправки формы
`_errors` - ошибки валидации формы

Методы:
`set valid(value: boolean)` - задать состояние валидации формы, сама форма ничего не валидирует
`set errors(value: string)` - передать форме ошибки валидации

### DeliveryDetails

/src/components/view/DeliveryDetails.ts

Отображение формы с полями выбора метода оплаты и ввода адреса доставки. При заполнении полей создает события `deliveryForm_changed` и получает результаты валидации от модели `CheckoutModel`. При успешной валидации разблокируется кнопка "Далее", при ее нажатии создается событие `checkout_proceed`

### ContactsDetails

/src/components/view/Contacts.ts

Отображение формы с полями ввода email и телефона. При заполнении полей создает события `contactsForm_changed` и получает результаты валидации от модели `CheckoutModel`. При успешной валидации разблокируется кнопка "Оплатить", при ее нажатии создается событие `contactsForm_submit`

### Success

/src/components/view/Success.ts

Отображение экрана успешного оформления заказа, заполняет элемент `success` для вывода в модальное окно.


Используемые интерфейсы:

/src/types/types.ts 

### IPage
 {
  pageContainer: HTMLElement;
  events: IEvents; 
  basketIconContainer: HTMLElement;
  catalog: HTMLElement;
  wrapper: HTMLElement;
}

Заполнение отображения главной страницы.

### IBasket 
{
  items: IProduct[];
  itemsNumber: number;  
  totalPrice: number;
}

Интерфейс корзины

### IModal 
{
  content: HTMLElement;
}

Интерфейс модального окна

### ISuccess
{
  successPrice: number;
}

Интерфейс заполнения последнего окошка



---

## Controller

Используется брокер событий – элемент класса `EventEmmiter`. Для каждого кликабельного объекта обработчик событий будет также регистрировать событие в брокере. Для каждого события коллбек функция определяется в `index.ts`. При обработке события обновляются данные в соотвествующей модели и затем вызывается функция `render()` соответствующего элемента отображения.


/src/components/base/EventEmitter.ts

Поля:

`_events: Map<EventName, Set<Subscriber>> – объект, связывающий название события с функцией, которую нужно вызвать`


Методы:

 - on<T extends object>(eventName: EventName, callback: (event: T) => void) - установить функцию из `callback` ответом на событие
 - off(eventName: EventName, callback: Subscriber) – снять обработчик
 - emit<T extends object>(eventName: string, data?: T) – инициировать событие с данными
 - onAll(callback: (event: EmitterEvent) => void) – слушать все события
 - offAll() – сбросить все обработчики
 - trigger<T extends object>(eventName: string, context?: Partial<T>) - коллбек триггер, генерирующий событие при вызове


Дополнительные типы:

`type EventName = string | RegExp;` - для имени события
`type Subscriber = Function;` - тип коллбека при регистрации события
`type EmitterEvent` – тип события, содержащий имя события и дополнительные данные

События:

 - `catalog_changed` – обновление витрины, сработает только один раз, поскольку данные о товарах запрашиваются только при загрузке страницы, но при расширении функционала например фильтрами станет более актуальным.
 - `catalog_selected` - пользователь нажал на карточку товара, в data передается выбранная карточка товара
 - `modal_open` - открыто модальное окно
 - `modal_close` – закрыть текущее модальное окно, вызывается для всех модальных окон
 - `basket_open` – открыть модальное окно корзины
 - `basket_close` – закрыть модальное окно корзины
 - `basket_add` – добавление товара в корзину, в data передается добавленный продукт
 - `basket_remove` – удаление товара из корзины, в data передается удаленный продукт
 - `basket_changed` – обновление корзины
 - `checkout_proceed` - переход к оформлению заказа
 - `deliveryForm_changed` – изменение данных о доставке, вызывает валидацию у модели
 - `deliveryForm_submit` - пользователь нажал "Далее", открыть форму заполнения контактных данных
 - `contactsForm_changed` – изменение формы контактных данных, вызывает валидацию у модели
 - `contactsForm_submit` - пользователь нажал кнопку "оплатить" 
 - `success_close` - закрытие модального окна успешного заказа

---


### Api

/src/components/base/api.ts

Класс для взаимодействия с API ларька. Вызывается для получения списка товаров и отправки заказов.

Конструктор принимает
`baseUrl: string` - адрес, берется из констант
`options: RequestInit = {}` – дополнительные хедеры для запросов


Методы:
`get(uri: string): Promise<object>` – отправляет GET запрос и возвращает промис
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - отправляет POST запрос и возвращает промис



---

### Утилиты
/src/utils/utils.ts

`ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement)` – возвращает по селектору HTML элемент нужного типа

`cloneTemplate<T extends HTMLElement>(query: string | HTMLTemplateElement): T` – возвращает по селектору или элементу темплейта новый HTML элемент нужного типа. Темплейты полезны например для создания карточек продуктов.


---

### Константы
Путь: /src/utils/constants.ts

API_URL – адрес API, берется из переменных окружения
CDN_URL – адрес сервера с картинками для получения абсолютных путей из относительных, берется из переменных окружения
