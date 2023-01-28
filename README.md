# Prices_of_Digital_Currencies

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

First of clone repo:

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



First of all open the terminal or CMD and enter:

```shell
git clone https://github.com/mowbish/shopping-cart.git
```

After that go into the project folder and  create a virtual env


| Windows | Linux |
| --- | --- |
| ``> cd shopping-cart\  `` | ``$ cd shopping-cart/`` |
| ``> python -m venv venv `` | ``$ virtualenv venv`` |
| ``> venv\scripts\activate`` | ``$ source venv/bin/activate`` |

after activating venv now install requirements

```shell
pip install -r requirements.txt
```

Now enter this command:

```bash
python manage.py makemigrations
```

Now migrate all with this command:

```bash
python manage.py migrate
```

At the end you can run project with:

```bash
python manage.py runserver
```
### Also Rout's of project:

first of all go to the:

`http://127.0.0.1:8000/`

after that you can go to this rout's

+ `http://127.0.0.1:8000/`
+ `http://127.0.0.1:8000/signup`

Enjoy it ;)

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
