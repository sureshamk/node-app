# Node App
This is based on Express JS api server will run on docker 

### Prerequisites
* **NodeJS => v8.11.3** 
* **Docker**
* **docker-compose**
* **MongoDB**

### Running Data server 
```bash
npm run data 
```
or through docker 
```bash
docker-compose up data_server # for specific server 
docker-compose up  # for all app to up and running 

```


API END point : http://localhost:5000/ 

#### API to fill the db 
* GET `http://localhost:5000/load`


#### Filling data through script 
```bash
 node commands/generateData.js
```

### Running API server 
```bash
npm start
```

or through docker 
```bash
docker-compose up app
```
API END point : http://localhost:3000/ 

#### GET users 
* GET `http://localhost:3000/users`

#### GET user's posts
* GET `http://localhost:3000/users/1/posts`


#### UPDATE user's avatar
* PUT `http://localhost:3000/users/1`
* payload json 
```json
{
    "avatar": "http://my.website.com/my.jpg"
}
```