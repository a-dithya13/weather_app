const express =require('express');
const axios =require('axios');
const path = require('path');
const app =express();

app.set("view engine","ejs");//validates the use of ejs

app.set("views",path.join(__dirname,"../views"));

app.use(express.urlencoded({extended:true}));//external apis can be used omnly after including this

app.use(express.static(path.join(__dirname,"../public")));

app.use(express.static("public"));//due to this we can use /style.css

app.get('/',(req,res) => {
    res.render("index");
})

app.post('/weather',async(req,res) =>{//async function waits for user to enter something
        try{
            const city = req.body.city;

            const apikey ="51140ab5b402bbbf3040fc5033764634";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`// what the hell  is this ?
            const result =  await axios.get(url)
            res.render("index",{weather:result.data})
        }
        catch(error){
            res.render("index",{weather:null,error:"JAGAH NAHI MALUM"})
        }
})

 module.exports = app
