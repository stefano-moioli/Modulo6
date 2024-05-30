const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); //Sto creando un'applicazione basata su express
const port = 3001;
const dbName = 'Progetto3' //Scelgo il nome del dabatabase

//Middlewares
app.use(cors()); //Middleware per la gestione del CORS
app.use(express.json()); //Middleware per la gestione del formato JSONS - evita parse e stringify

//Models
//Lo schema è la struttura che deve avere ogni oggetto che salverò nella collection di MongoDB
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
)

//Il model è la comunicazione che faccio a MongoDB per quel che riguarda lo schema e la collection - se la collection 'Users' non esiste, viene creata
const userModel = mongoose.model('Users', userSchema);

//Routes
// CRUD - Create - Read - ReadbyID - Update - Delete

//GETALL
app.get('/users', async (req, res) => {
    const allUsers = await userModel.find(); //Find è un metodo di mongoose che permette di leggere il contenuto della collection
    return res.status(200).json(allUsers); //Ogni endpoint necessita di un ritorno - 200 è status positivo - poi restituico i dati
})


//GETbyID
app.get('/users/:id', async (req, res) => {
    const id = req.params.id; //Mi prendo l'id che viene dal client
    try {
        const user = await userModel.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: 'Utente non trovato', error: error})
    }
})

//GETbyCity - modo per fare query con find
app.get('users/city/:city', async(req, res) => {
    const city = req.params.city;
    try {
        usersCity = await userModel.find({city: city});
        return res.status(200).json(usersCity);
    } catch (error) {
        return res.status(500).json({message: 'Utenti in questa città non trovati', error: error})
    }
})


//Create
app.post('/users', async (req, res) => {
    const obj = req.body //Prendo oggetto che il client ha messo nel body (non serve il json parse per il Cors dichiarato all'inizio)
    try {
        const newUser = userModel(obj);
        const userSave = await newUser.save();
        return res.status(201).json(userSave);
    } catch (error) {
        return res.status(500).json({message: 'Problemi nella creazione di un utente', error: error})
    }
})

//Update
app.put('/users/:id', async (req, res) => {
    const id = req.params.id //Mi prendo l'ID
    const obj = req.body; //Mi prendo il corpo del client, cioè le varie modifiche fatte
    try {
        const editUser = await userModel.findByIdAndUpdate(id, obj); //Utente modificato, con il suo ID e il nuovo corpo
        return res.status(200).json(editUser);
    } catch (error) {
        return res.status(500).json({message: 'Problemi nella modifica di un utente', error: error})
    }
})

//Delete
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await userModel.findByIdAndDelete(id);
        return res.status(200).json({message: 'item removed successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Problemi nella rimozione di un utente', error: error})
    }
})


//Connect to Mongo and start server
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL + dbName);
        app.listen(port, () => console.log(`Server attivo sulla porta ${port}`));

    } catch (error) {
        console.log(error);
    }
}
connect();

/* Metodo alternativo per connettersi al database e far partire il server

mongoose.connect(MONGODB_URL + dbName)
.then (response => app.listen(port , () => console.log("Server attivo ecc")))
.catch(error => console.log(error))*/
