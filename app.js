const delay = require('delay');
const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const accountSid = 'AC33f5a31bceaa37ff05827d6e1c6b876f'
const authToken = '4c127e632274c589da231c9b4b5c72f6'
const VoiceResponce = twilio.twiml.VoiceResponce;
const callerId = '3143552696';
const mp3url = 'https://api.twilio.com/cowbell.mp3';

const client = twilio(accountSid,authToken);

const app = express();  
/**
* @param {Object} request - POST or GET request that provides the recipient of the call, a phone number or a client
* @param {Object} response - The Response Object for the http request
* @returns {Object} - The Response Object with TwiMl, used to respond to an outgoing call
*/


function calls(request, response) {
  var time = parseInt(request.body.minutes * 1000);
  var message = request.body.message;
  switch (message) {
    case "hospital":
    delay(time).then(() => {
      client.calls.create({
        to: request.body.to,
        from: callerId,
        url: 'https://handler.twilio.com/twiml/EHadc8220e4f19192800dcc7e4d0e5bc93'
      }).then(() => {
        response.sendStatus(200);
      }).catch((err) => {
        response.status(400).send(err.message);
      });
    })
        break;
    case "jail":
    delay(time).then(() => {
      client.calls.create({
        to: request.body.to,
        from: callerId,
        url: "https://handler.twilio.com/twiml/EH5a81b8d43829a4495ea42c036b5563c8"
      }).then(() => {
        response.sendStatus(200);
      }).catch((err) => {
        response.status(400).send(err.message);
      });
    })
        break;
    case "job":
    delay(time).then(() => {
      client.calls.create({
        to: request.body.to,
        from: callerId,
        url: "https://handler.twilio.com/twiml/EHb32b923621f952f05d3351d337b28b27 "
      }).then(() => {
        response.sendStatus(200);
      }).catch((err) => {
        response.status(400).send(err.message);
      });
    })
        break;
    case "mom":
    delay(time).then(() => {
      client.calls.create({
        to: request.body.to,
        from: callerId,
        url: "https://handler.twilio.com/twiml/EH99bea08bedbbe2d2438c022e190debc6"
      }).then(() => {
        response.sendStatus(200);
      }).catch((err) => {
        response.status(400).send(err.message);
      });
    })
        break;
}


  /*
  delay(time).then(() => {
    client.calls.create({
      to: request.body.to,
      from: callerId,
      url: request.body.message
    }).then(() => {
      response.sendStatus(200);
    }).catch((err) => {
      response.status(400).send(err.message);
    });
  })
*/
}

exports.calls = calls;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/calls', function(request, response) {
  calls(request, response);
});


app.post('/calls/play-mp3', (request, response) => {
  const twiml = new VoiceResponce();
  twiml.play({
    loop: 10
}, mp3url);

  response.set('Content-Type', 'text/xml');
  response.send(twiml.toString());
});

app.listen(3000, () => {
  console.log('The app is up and running');
});