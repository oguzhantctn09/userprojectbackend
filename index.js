const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database');
const emailValid = require('./EmailValidation');
const md5 = require('md5');

//cors allows to use localhost:3000 and localhost:5000 together
app.use(cors());
app.use(express.json())  // req.body => to access json data body


// To get all Users
app.get("/users", async(req,res) => {
  try {
    //query tüm elemanları çağırır
    const getUsers = await db.query("SELECT * from kullanici_liste;")
    res.json(getUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
})

//To Insert new user
app.post("/users", async(req,res) => {
  try {

    //database'e gidecek veriler tanımlanıyor..
    const name = req.body.name;
    const email = req.body.email;
    const academic = req.body.academic;
    const password = req.body.parola;
    const cryptedPassword = md5(password);
    const validAcademic = emailValid(email, academic); 
    //newUser() database query ile insert yapmayı sağlıyor [name, email, academic] değişkenleri ile
    const newUser = await db.query(
      "INSERT INTO kullanici_liste (name, email, academic, password) VALUES ($1, $2, $3, $4) RETURNING *", 
      [name, email, validAcademic, cryptedPassword]
    );
    //respond new user 'rows' as json (to see on postman)
    res.json(newUser.rows[0]);
  } catch(err) {
    console.error(err.message)
  }
});

// To delete a user

app.delete("/users/:id", async(req,res) => {
  try {
    const {id} = req.params;
    const deleteUser = await db.query("DELETE FROM kullanici_liste WHERE user_id = $1;",[id]);
    res.json("Kullanıcı başarıyla silindi.");
  } catch (error) {
    console.log(error.message);
  }
})


// listens the port using express
app.listen(5000, () => {
  console.log('   ~~~ server is working on port 5000 ~~~');
});
