const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload")
const barang = require("./controller/barangController");

const app = express();

const port = 3000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(fileupload())
app.use(express.static('public'))
app.use('/barang', barang)

app.listen(port, (req, res) => {
    console.log('server jalan di '+ port)
})
