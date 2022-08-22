const express = require('express');
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

const path =  require ('path');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use (require('./routes/index'));
app.use(express.static(path.join(__dirname,'public')));

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


//Cors
app.use(cors({origin: '*', credentials: true, optionSuccessStatus:200}))
const port = process.env.PORT || 3030
app.listen(port, () =>{
    console.log(`Server Up port ${port}`);
});