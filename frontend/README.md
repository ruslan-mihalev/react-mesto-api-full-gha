# Проект: Место
### Предназначение
Аттесстационный проект промежуточных спринтов курса [Web-разработчик](https://practicum.yandex.ru/web/).

[По этой ссылке вы можете ознакомиться с результатом работы на Github Pages](https://ruslan-mihalev.github.io/react-mesto-auth/)

**Фукционал**
* Редактирование информации в профиле пользователя
* Редактирование аватара
* Добавление / удаление карточек с местами
* Простановка / снятие лайка карточкам
* Отображение общего числай лайков
* Открытие изображения карточки на весь экран
* Регистрация и авторизациия

**Структура**
* Заголовок
* Профайл
* Сетка карточек направлений
* Подвал

**Содержание**
Сайт-галерея о путешественнике и путешествиях

**Технологии**
* BEM
* flex layout
* grid layout
* media queries
* подход mobile first
* custom fonts
* transition animation
* использование max-width вместо width (где это возможно)
* использование списков для перечисляемых элементов
* popup
* form
* JavaScript
* React
* React Context
* fetch
* localStorage
* JWT

Для сборки проекта использовано окружение NodeJS, пакетный менеджер NPM и сборщик Webpack.
Если хотите так-же - привожу список команд установки пакетов ниже:

#### Устанавливаем NodeJS

#### Создаем пустой React проект

```npx create-react-app mesto-react```

#### Дополняем / изменияем полученный проект по своему усмотрению

#### Добавляем файл .editorconfig с любимимы правилами

### Продемонстрирована работа с сетью

#### Регистрация
```POST https://auth.nomoreparties.co/signup```

#### Авторизация
```POST https://auth.nomoreparties.co/signin```

#### Загрузка информации о пользователе с сервера
```GET https://nomoreparties.co/v1/cohortId/users/me```

#### Загрузка карточек с сервера
```GET https://mesto.nomoreparties.co/v1/cohortId/cards```

#### Редактирование профиля
```PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me```

#### Добавление новой карточки
```POST https://mesto.nomoreparties.co/v1/cohortId/cards```

#### Удаление карточки
```DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId```

#### Постановка лайка
```PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes```

#### Снятие лайка
```DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes```

#### Обновление аватара пользователя
```PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar```
