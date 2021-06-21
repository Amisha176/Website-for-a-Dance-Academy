const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser") ;
mongoose.connect('mongodb://localhost:27017/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    phone: String,
    age: String,
    address: String
  });

  const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) 
app.use(express.urlencoded())

app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views')) 
 
app.get('/', (req, res)=>{
    const params = {} 
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {} 
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});