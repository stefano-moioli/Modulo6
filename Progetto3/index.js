const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');

const app = express(); //Sto creando un'applicazione basata su express
const port = 3001;
const dbName = 'Progetto3' //Scelgo il nome del dabatabase

//Middlewares
app.use(cors()); //Middleware per la gestione del CORS
app.use(express.json()); //Middleware per la gestione del formato JSONS - evita parse e stringify

//Models


//Routes


//Connect to Mongo and start server
async function connect(){
    try {
        await mongoose.connect('mongodb+srv://StefanoM:PASS@cluster0.csj3q0k.mongodb.net/'+dbName);
        app.listen(port, () => console.log(`Server attivo sulla porta ${port}`));

    } catch (error) {
        console.log(error);
    }
}


connect();