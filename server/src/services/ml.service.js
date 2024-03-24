// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');

// // Endpoint to receive a request and forward it to the license plate detection API
// app.post('/detect-license', (req, res) => {
//   const filePath = './WhatsApp Image 2024-03-24 at 20.34.48.jpeg';
  
//   // Prepare the form data
//   const form = new FormData();
//   form.append('file', fs.createReadStream(filePath), {
//     filename: 'why-are-number-plates-yellow-and-white.jpg',
//     contentType: 'image/jpeg',
//   });

//   // Axios API call configuration
//   const config = {
//     method: 'post',
//     url: 'http://13.126.103.17/detect-license-plates/?location=local',
//     headers: { 
//       ...form.getHeaders(),
//       'accept': 'application/json',
//     },
//     data: form,
//   };

//   // Make the API call
//   axios(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//       res.send(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Error detecting license plate');
//     });
// });
