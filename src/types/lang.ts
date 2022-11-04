import {LangType} from "./types";
import Button from "@mui/material/Button";
import React from "react";

export const  dictionary = {
    // Header
    "Nickname": "Никнейм",
    "Submit": "Сохранить",
    "Catalog": "Каталог",
    "Basket": "Корзина",
    "Admin panel": "Администрирование",
    "Change password": "Изменить паспорт",
    "Old password": "Старый паспорт",
    "New password": "Новый паспорт",
    "Repeat password": "Повторите паспорт",
    "required": "заполните поле",
    "passports does not match": "паспорта не совпадают",
    "password is the same as the old one": "новый паспорт сопадает со старым",
    "Personal data": "Персональные данные",
    "Security": "Безопасность",
    "Login": "Войти",
    "Registration": "Регистрация",
    "Account settings": "Настройки аккаунта",
    "Logout": "Выйти",

    // AdminPage
    "Categories": "Категории",
    "Products": "Товары",
    "Category title": "Название категории",
    "Cancel": "Закрыть",
    "Add category": "Добавить категорию",
    "title": "название",
    "Rename": "Переименовать",
    "Delete": "Удалить",

    // Basket
    "Total": "Всего",

    // LeftFilters
    "all": "все",
    "true": "да",
    "false": "нет",
    "Available": "В наличии",
    "Category": "Категория",
    "Brand": "Бренд",
    "Price": "Цена",
    "Colors": "Цвет",
    "Reset": "Сброс",

    // LoginPage
    "email": "почта",
    "password": "пароль",

    "Add to basket": "Добавить в корзину",
    "Buy now": "Купить сейчас",
    "available": "в наличии",
    "not available": "нет в начилии",

    "Characteristics": "Характеристики",
    "Rating and reviews": "Рейтинг и отзывы",
    "Rating": "Рейтинг",
    "Weight": "Вес",
    "kg": "кг",
    "Description": "Описание",
    "based on": "на основании",
    "reviews": "отзыва",
    "Add review": "Добавить отзыв",
    "price": "цена",
    "yes": "да",
    "no": "нет",
    "available count": "доступное количество",
    "brand": "бренд",

    "Search Products": "Поиск товаров",
    "Nothing found for the selected query parameters": "По выбрнным параметрам запроса ничего не найдено",
    "Default": "По умолчанию",
    "Select category": "Выберите категорию",
}

export const translate = (str: string, lang: LangType):string => {
    if (lang === "ENG") {
        return str
    } else {
        if (dictionary.hasOwnProperty(str)) {
            // @ts-ignore
            return dictionary[str]
        } else {
            return "Не переведено"
        }
    }
}
// {translate("", lang)}