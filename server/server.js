const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const app = express();

//Requiring the model.js that will connect to the DB with constructor
require('./src/models/model');

//Defining required configuration and variables
let config = require('./src/config/config');
let route = require('./src/routing/route')
let port = config.port
let url = config.url
let name = config.name


//Cors(cross origin request) options are set here
const corsOptions={
    credentials: true, 
    origin:"*",
    //
    //credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus:200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use("/public",express.static('public/temp'))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', route)

//Default Loading for the Server    
app.use('/', (req, res) => {
    res.send({ 
        status: 200,
        message: 'Server Loaded Successfully',
        Description: name+' For a MERN Application Project',
        Port: port,
        BaseUrl: url+port
    });
})




app.post('/detect-license', (req, res) => {
  const filePath = './WhatsApp Image 2024-03-24 at 20.34.48.jpeg';
  
  // Prepare the form data
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath), {
    filename: 'why-are-number-plates-yellow-and-white.jpg',
    contentType: 'image/jpeg',
  });

  // Axios API call configuration
  const config = {
    method: 'post',
    url: 'http://43.204.212.57/detect-license-plates/?location=local',
    headers: { 
      ...form.getHeaders(),
      'accept': 'application/json',
    },
    data: form,
  };

  // Make the API call
  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error detecting license plate');
    });
});





app.listen(port, function(){
    console.log(`listening on port ${port}`);
})

module.exports = app;