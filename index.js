const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

//Middlewares
app.use(cors)
app.use(express.json())

app.listen(port, () => {
    console.log("Este es un pasito que le gusta a los turro baila pegaito a la pare olright", port)
})