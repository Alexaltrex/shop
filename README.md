# shop
* Demo: https://alexaltrex.github.io/shop
* Api: "https://alexaltrex-common-api.herokuapp.com/shop" 
* Api (source code): https://github.com/Alexaltrex/alexaltrex-common-api/blob/main/README.md

<div style="display:flex;">
  <img src="https://user-images.githubusercontent.com/56224288/157691188-f5cb1d83-17f6-404d-9073-08b93d6e38f9.jpg" height="200">
  <img src="https://user-images.githubusercontent.com/56224288/157691192-41c9df25-09ac-4344-ae72-6dfc63919446.jpg" height="200">
  <img src="https://user-images.githubusercontent.com/56224288/157691576-33b8cd29-d808-46aa-aa37-9b988c60ad12.jpg" height="200">
</div> 

## Описание
* Интернет магазин с админ-пенелью для редактирования товаров
* Учетные данные для пользователя: email: alex@mail.ru, password: 12345
* Учетные данные для админа: email: admin@mail.ru, password: admin

## Запуск проекта:
Для установки и запуска необходимы установленные программы: Node.js, npm, Git;
* Клонирование и запуск: git clone https://github.com/Alexaltrex/shop.git;
* Переход в директорию с проектом: cd shop;
* Установка зависимостей: npm install;
* Запуск проекта в режиме разработки: npm start;
* Перейти в браузер и открыть страницу: http://localhost:3000 или http://localhost:3000/shop.

## Разработка 
Full-stack-приложение.
# Front-end 
* На базе React, create-react-app
* Типизация - typescript
* Глобальное состояние - redux, react-redux
* Сетевые запросы: axios
* Работа с формами - formik
* Дизайн - material-ui
* Роутинг - react-router-dom
* Асинхронный код: redux-thunk
* Авторизация на основе токена
# Back-end 
* NodeJs, typescript, express, база данных самописная
* back-end api: https://alexaltrex-common-api.herokuapp.com/shop

## Структура приложения
* Header: ссылка на каталог, форма поиска товаров, выбор языка, ссылка на админ-панель, авторизация, управление профилем (смена пароля и nickname)
* Домашняя страница: выбор категории товара
* Страница с товарами категории: фильтры поиска, фильтры сортировки, карточки товаров с пагинацией
* Страница поиска товаров: фильтры поиска, фильтры сортировки, карточки товаров с пагинацией
* Страница товара: полная информация по товару, его рейтингу, возможность поставить товару рейтинг и отзыв
* Страницы корзины покупателя: список купленных товаров, редактирование его состава (удаление, измерение количества)
* Страницы администратора: две вкладки для товаров и категорий с возможностью удаления, добавления и редактирования
