const express = require("express");
//middlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const validator = require('express-validator');
const sanitas = require("./middlewares/sanitas.js");

const config = require("./config.json");
//routes
const UserRouter = require("./routes/user.router");
const ConferenceRouter = require("./routes/conference.router");
const GuestRouter = require("./routes/guest.router");

const app=express();

// ############# MIDDLEWARES ##################
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json()); //parse ao body para json
app.use(cors()); //cors para Cross Origin Resource Sharinng entre o API e o front-end

// ################ ROUTES ##############################
app.use(UserRouter)
app.use(ConferenceRouter)
app.use(GuestRouter)

app.listen(config.port, () => console.log(config.serverStartMessage, config.host, config.port));