const express = require('express'); //Importo express
const cors = require ('cors');
const mongoose = require ('mongoose');
const app = express(); //Lo eseguo
const port = 3001;

//Middleware
app.use(cors());
app.use(express.json()); //Trasforma in json l'oggetto - senza fare json stringify o json parse

async function start(){
    try {
        await mongoose.connect('mongodb+srv://StefanoM:PASS@cluster0.csj3q0k.mongodb.net/');
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`); //Lo accendo
        })
    } catch (err) {
        console.error(err)
    }
}

start()

 // mongoose.connect('mongodb+srv://StefanoM:PASS@cluster0.csj3q0k.mongodb.net/'); //Oggetto capace di connettere le due cose (database e server - credo)


app.get('/home', (req, res) =>{    //Endpoint che verrà richiamato dal client
    res.send('Ciao, benvenuto')
}) 

/* app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); //Lo accendo
})*/

