const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "mydatabase",
  port: 3306
});

const app = express();
app.use(cors())
app.use(express.json())
app.post("/create", (req, res) => {
  console.log("Got the response")
  const name = req.body.name;
  const age = req.body.age;
  const quot = req.body.quote;
  db.query("INSERT INTO myquo (name,age,quot) VALUES (?,?,?)", 
  [name, age, quot],(err,result)=> {
    if(err){
        console.log(err);
    }
    else{
        res.send("value Inserted").status(200);
    }
  }
  );
});

app.get('/quote', (req,res) => {
  db.query('SELECT * FROM myquo',(err,result) => {
    if (err){
      console.log(err);
    }
    else{
      console.log(result);
      res.send(result);
    }
  })
})

app.listen(3001, () => {
  console.log("It's running on 3001");
});