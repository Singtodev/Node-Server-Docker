const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const os = require('os');
const port = 8000

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: "db",
        user: "root",
        password: "root",
        database: "tutorial"
    })
}

app.get('/' , (req , res) => {
    res.send("Hello World");
});


app.get('/users' , async (req, res) => {
    try{
        const [ results ] = await conn.query("select * from users");
        return res.json({
            data: results,
            msg: "send by " + os.hostname
        });
    }catch(err){
        return res.json(err);
    }
})

app.listen(port,()=> {
    initMySQL();
    console.log(`Server is running on port ${port}`)
})