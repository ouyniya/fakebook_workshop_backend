🚀 FAKEBOOK Workshop 
===

### env guide 🧭
PORT=  
DATABASE_URL=  
JWT_SECRET=  
CLOUDINARY_NAME=  
CLOUDINARY_API_KEY=  
CLOUDINARY_NAME=  
CLOUDINARY_SECRET=  

### Services 📗
| Path                | Method  | Authenticate | Param | Query | Body  | 
| :------------------ | :------ | :----------- | :---- | :---- | :---- | 
| /auth/register      | POST    | -            | -     | -     | {identity, firstName, lastName, password, confirmPassword} | 
| /auth/login         | POST    | -            | -     | -     | {identity, password} | 
| /auth/me            | GET     | y            | -     | -     | - |
| /post               | GET     | y            | -     | -     | - |
| /post               | POST    | y            | -     | -     | {message, image(file)}
| /post               | PUT     | y            | :id   | -     | {message, image(file)}
| /post               | DELETE  | y            | :id   | -     | -
| /comment            | POST    | y            | -     | -     | {message, postId} 
| /like               | POST    | y            | -     | -     | {postId}
| /like               | DELETE  | y            | :id   | -     | -





## Step 1 
### 1.1. create file `server.js` 

### 1.2 start project
```bash
npm init -y
```

### 1.3 update `package.json`
```js
"scripts": {
    "dev": "nodemon server.js",
    "start": "nodemon server.js"
  },
```

### 1.4 create `.gitignore` file
```js
node_modules/
.env
```

### 1.5 installation
```bash
npm i 
```

### 1.6 git init
```bash
git init 
```
