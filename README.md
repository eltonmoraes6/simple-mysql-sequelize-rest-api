# Simple REST API with Node.js, Express.js, Sequelize and MySQL

SIMPLE REST API : with authentication using: MySQL, Express.js, Node.js, Passport, JWT, Bcrypt, etc.

## Prerequisites

Node.js MySQL and NPM

* [Node.js](https://nodejs.org/en/) - Server Environment
* [MySQL](https://www.mysql.com/) - Database
* [NPM](https://www.npmjs.com/) - Package Manager

## Installing

```
Clone the repo: `git clone git@github.com:eltonmoraes6/simple-mysql-sequelize-rest-api.git`
```

```
Environment variables
```
Create a `.env` file in the root directory of your project, and add the following
environment-specific variables on new lines in the form of `NAME=VALUE`:

```dosini
DB_HOST_NAME=host_name-EX:localhost
DB_DIALECT=mysql
DB_DATABASE=your_db_name-EX:nodejs_tasks
DB_USERNAME=your_db_user-EX:root
DB_PASSWORD=your_db_password
WEB_API_URL=your_api_url-OR-domain-EX_local_URL:http://localhost:3000/api/

```

For more information on how to configure `environment-specific variables` access [dotenv](https://github.com/motdotla/dotenv/).

```
Install dependencies: `npm install`
```

```
Start the server: `npm run dev`
```
## Running the tests
Test your API using [Postman](https://www.getpostman.com) or [Insomnia](https://insomnia.rest/download/).
