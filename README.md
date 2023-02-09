# shopping-cart

[![python](https://img.icons8.com/color/48/000000/python.png)](https://www.python.org/)
[![django](https://img.icons8.com/color/48/000000/django.png)](https://www.djangoproject.com/)
[![Docker](https://img.icons8.com/color/48/000000/docker.png)](https://www.docker.com/)
[![DRF](https://img.icons8.com/color/48/000000/api.png)](https://www.django-rest-framework.org/)
[![Nginx](https://img.icons8.com/color/48/000000/nginx.png)](https://www.nginx.com/)
[![NextJS](https://img.icons8.com/color/48/000000/nextjs.png)](https://nextjs.org/)
[![HTML](https://img.icons8.com/color/48/000000/html.png)](https://html.com/)
[![CSS](https://img.icons8.com/color/48/000000/css.png)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JS](https://img.icons8.com/color/48/000000/js.png)](https://www.javascript.com/)


## Installation
---

### Docker

First of all clone repo:

```shell
git clone https://github.com/mowbish/shopping-cart.git
```

next step: cd to cloned project in terminal or cmd:

| Windows | Linux |
| --- | --- |
| ``> cd shopping-cart\  `` | ``$ cd shopping-cart/`` |

now you should enter this command (you should install docker and docker-compose before):

```shell
sudo docker-compose up --build
```

Wait a few minutes

well done! :D

you can see project in this route:

+ `http://127.0.0.1:8000/`

notic: Only the first time you need to hit `--build` in `docker-compose` command and after the first time it is no longer necessary

---

### Custom - if you don't want Docker

clone repo:

```shell
git clone https://github.com/mowbish/shopping-cart.git
```
<br>
<br>

### Back-end

Now, if you haven't installed ‍‍‍`Python virtualenv`, you should install it
After that go into the project folder and create a virtual env


| Windows | Linux |
| --- | --- |
| ``> cd shopping-cart\back-end\src  `` | ``$ cd shopping-cart/back-end/src`` |
| ``> python -m venv venv `` | ``$ virtualenv venv`` |
| ``> venv\scripts\activate`` | ``$ source venv/bin/activate`` |
| ``> pip install -r ..\requirements.txt`` | ``$ pip3 install -r ../requirements.txt`` |
| ``> python manage.py makemigrations`` | ``$ python3 manage.py makemigrations`` |
| ``> python manage.py migrate`` | ``$ python3 manage.py migrate`` |
| ``> python manage.py runserver`` | ``$ python3 manage.py runserver`` |
<br>
<br>
### Front-end
First install [Node.js](https://nodejs.org/en/download/) to use NPM.

| Then install the dependencies |
| --- |
| ``> cd shopping-cart\front-end  `` |
| ``> npm install `` |

| then build and run the website |
| --- |
| ``> npm run build`` |
| ``> npm start`` |

| Or run it for development purpose |
| --- |
| ``> npm run dev`` |

<br>
<br>

### Also Rout's of project:

+ `http://127.0.0.1:8000/`
+ `http://127.0.0.1:8000/swagger/`
+ `http://127.0.0.1:3000/`(front)

Enjoy it ;)
<br>

#### Project Structure
---

```shell
├── back-end
│   ├── Dockerfile
│   ├── requirements.txt
│   └── src
│       ├── accounts
│       │   ├── admin.py
│       │   ├── api
│       │   │   ├── permissions.py
│       │   │   ├── serializers.py
│       │   │   ├── urls.py
│       │   │   └── views.py
│       │   │
│       │   ├── apps.py
│       │   ├── __init__.py
│       │   ├── migrations
│       │   │   └── __init__.py
│       │   │
│       │   ├── models.py
│       │   ├── tests.py
│       │   └── views.py
│       │
│       ├── common
│       │   ├── basemodels.py
│       │   └── utils.py
│       │
│       ├── conf
│       │   ├── asgi.py
│       │   ├── __init__.py
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── wsgi.py
│       │
│       ├── manage.py
│       │
│       ├── orders
│       │   ├── admin.py
│       │   ├── api
│       │   │   └── urls.py
│       │   ├── apps.py
│       │   ├── choices.py
│       │   ├── __init__.py
│       │   ├── migrations
│       │   │   └── __init__.py
│       │   ├── models.py
│       │   ├── test.py
│       │   └── views.py
│       │
│       └── products
│           ├── admin.py
│           ├── api
│           │   ├── serializers.py
│           │   ├── urls.py
│           │   └── views.py
│           │
│           ├── apps.py
│           ├── choices.py
│           ├── __init__.py
│           ├── managers.py
│           ├── migrations
│           │   └── __init__.py
│           │
│           ├── models.py
│           ├── test.py
│           └── views.py
│ 
├── front-end
│   ├── components
│   │   ├── globals.scss
│   │   ├── Header
│   │   │   ├── Header.js
│   │   │   └── Header.module.scss
│   │   └── input.js
│   ├── data
│   │   ├── allStore.js
│   │   ├── compare.js
│   │   ├── user.js
│   │   └── window.js
│   ├── Dockerfile
│   ├── functions
│   │   ├── addAddress.js
│   │   ├── lengthCheck.js
│   │   ├── login.js
│   │   ├── refresher.js
│   │   └── signup.js
│   ├── next.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── pages
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js
│   │   └── profile
│   │       ├── address
│   │       │   └── index.js
│   │       ├── index.js
│   │       ├── login.js
│   │       └── sign-up.js
│   └── public
│       ├── account.svg
│       ├── favicon.ico
│       ├── Untitled.png
│       └── vercel.svg
├── docker-compose.yml
└── README.md

```

#### Project Detail:

This project on `Agile` method

Agile is an iterative approach to project management and software development that helps teams deliver value to their customers faster and with fewer headaches. Instead of betting everything on a "big bang" launch, an agile team delivers work in small, but consumable, increments

#### WEBSITE USAGE:

- check corporation description / contact info
- check account information
- compare two or more products
- check product price / pictures / details
- filter products
- buy products

#### SUBPAGES:

- home
- profile
- cart
- search
- product
- compare
