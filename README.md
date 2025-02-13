🚀 FAKEBOOK Workshop 
===

### Env guide 🧭
`environment variables`:  
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

