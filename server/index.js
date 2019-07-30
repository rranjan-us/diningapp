const axios = require('axios');

const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.post('/dev/order', (req, res) => {

  let body = '';
   req.on('data', chunk => {
       body += chunk.toString(); // convert Buffer to string
   });
   req.on('end', () => {
       console.log(body);
       console.log("before aws call");
       axios
       .post('https://ecf94txm1m.execute-api.us-east-1.amazonaws.com/dev/order', body,{
         headers: {
                 'Content-Type': 'application/json'
               }
      })
       .then(function (response) {
         console.log(response);
         res.setHeader('Content-Type', 'application/json');
         res.status(200).send(response.data);
       })
       .catch(function (error) {
         console.log("=================Error================");
         console.log(error);
         if(typeof error.response !== 'undefined'){
           console.log();
           res.status(error.response.status).send(error.response.message);
         } else {
           res.status(500).send("Internal server error");
         }
       });

   });




});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
