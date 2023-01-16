// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({

  // Override the service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'my-service-name',

  // Use if APM Server requires a secret token
  // secretToken: '',

  // Set the custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://192.168.68.241:8200',

  // Set the service environment
  environment: 'my-environment'
})

const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database');
const emailValid = require('./EmailValidation');
const md5 = require('md5');

//cors allows to use localhost:3000 and localhost:5000 together
app.use(cors());
app.use(express.json())  // req.body => to access json data body


app.get("/users", async(req,res) => {

  try {

    const getUsers = await db.query("SELECT * from users;");
    return res.json(getUsers.rows);

  } catch (error) {

    console.log(error.message);
    res.json({asd:"sad"});

  }
})

//To Insert new user
app.post("/users", async(req,res) => {
  return res.json({asd:"asd"})

  try {

    //database'e gidecek veriler tanımlanıyor..
    const name = req.body.name;
    const email = req.body.email;
    const academic = req.body.academic;
    const password = req.body.parola;
    const cryptedPassword = md5(password);
    const validAcademic = emailValid(email, academic); 
    //newUser() database query ile insert yapmayı sağlıyor [name, email, academic] değişkenleri ile
    // const newUser = await db.query(
    //   "INSERT INTO kullanici_liste (name, email, academic, password) VALUES ($1, $2, $3, $4) RETURNING *", 
    //   [name, email, validAcademic, cryptedPassword]
    // );
    //respond new user 'rows' as json (to see on postman)
    res.json({asd:"asd"});
  } catch(err) {
    return res.json({asd:"asd"})
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
