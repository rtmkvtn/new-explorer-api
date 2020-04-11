# News Explorer API
Api for news explorer

[Link](https://www.newsxyz.xyz/api)

## v 1.0.0

### Available at:
  + https://www.newsxyz.xyz/api
  + 84.201.154.27 

Node.js server with express app.  
App connects to mongodb `mongodb://localhost:27017/news-explorer-db` using mongoose.  
Db has 2 collections:
  + users
  + articles
____
## Realized routes:
____
## Create New User

Adds new user to the db. Returns this user's json data.

  + ### URL:
  /signup

  + ### Method:
  POST

  + ### Authorization:
  None 

  + ### URL Params:
  None

  + ### Data Params:
  name = [String], 2 to 30 characters  
  email = [email], user's email 
  password = [String], 8+ characters 

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "_id": "5e632ca3f4263a31a3c61015",
      "email": "user@mail.com"
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 409
    + **Content:** `{ "message": "Пользователь с таким email уже зарегистрирован." }` 
  OR  
    + **Code:** 400
    + **Content:** `{ "message": "err.message" }` 

____

## Login

Saves authorization token for the user in httpOnly cookie.

  + ### URL:
  /signin

  + ### Method:
  POST

  + ### Authorization:
  None 

  + ### URL Params:
  None

  + ### Data Params:
  email = [email], user's email 
  password = [String], 8+ characters 

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc0MWYwN2RmM2M1YjA2MzhlZjcxNzkiLCJpYXQiOjE1ODQ2ODcxODgsImV4cCI6MTU4NTI5MTk4OH0.HCO0_4yru_qy-MhGdtQ_R5pBC8gpI80xasdDDDaw"
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 401
    + **Content:** `{ "message": "Неверная почта или пароль." }` 
  OR  
    + **Code:** 400
    + **Content:** `{ "message": "err.message" }` 

____

## Show User

Returns json data of user

  + ### URL:
  /users/me

  + ### Method:
  GET

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params: 
  None

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "email": "mail@ivan.ru"
      "name": "Ivan",
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }` 
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____ 

## Show User's Articles Collection

Returns array of json datas of all the articles which were added by requesting user

  + ### URL:
  /articles

  + ### Method:
  GET

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  None

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    [
      {
          "_id": "5e8cf8a4098ec42f48daafd2",
          "keyword": "keyword1",
          "title": "title1",
          "text": "text1",
          "date": "2020-04-07T22:03:16.887Z",
          "source": "source1",
          "link": "http://www.link1.com",
          "image": "http://www.image1.com",
          "__v": 0
      },
      {
        ...
      },
      ...,
    ]
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____

## Add New Article

Adds new article to the articles collection. Returns this article's json data

  + ### URL:
  /articles

  + ### Method:
  POST

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  None

  + ### Data Params:
  name = [String], 2 to 30 characters  
  keyword = [String], 1+ characters 
  text = [String], 2+ characters 
  date = [Date], YYYY.MM.DD HH:MM format date. `Date.now` by default 
  source = [String] 
  image = [url], link to the image 
  link = [url], link to the article   

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "_id": "5e8d52c928ab40393b372c19",
      "keyword": "keyword2213",
      "title": "title2",
      "text": "text2",
      "date": "2020-04-08T04:27:53.304Z",
      "source": "source1",
      "link": "http://www.link1.com",
      "image": "http://www.image1.com",
      "owner": "5e8c030c7b28c5238f2b9b10",
      "__v": 0
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 400
    + **Content:** `{ "message": "err.message" }` 
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____

## Delete Article

Removes article from articles collection, if it's created by the user

  + ### URL:
  /articles/:articleId

  + ### Method:
  DELETE

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  id = article._id

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "message": "Документ удалён."
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 404
    + **Content:** `{ "message": "Карточка с данным id не найдена." }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 
  OR
    + **Code:** 403
    + **Content:** `{ message: 'У вас нет прав на изменение данного документа.' }` 

____

____

## Installing

1. Clone repo:

```
git clone https://github.com/fckXYZ/new-explorer-api.git
cd new-explorer-api
```

2. Install debendencies:

```
npm install
```

3. Choose build:
  + `npm run start` - run server at 3000 port.
  + `npm run dev` - run server at 3000 port with hot-reload enabled.



