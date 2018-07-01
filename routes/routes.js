var express = require('express');
var router = express.Router();
var path = require('path');


const TPLSmartDevice = require('tplink-lightbulb');
const light = new TPLSmartDevice('192.168.1.99');


// Home page route.
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname +'./../views/control.html'));

})

router.post('/on', function (req, res) {
  light.power(1).then(response => {
    console.log(response)
  })
  .catch(e => console.error(e))
  return res.sendFile(path.join(__dirname +'./../views/control.html'));

})
router.post('/off', function (req, res) {
  light.power(0).then(response => {
    console.log(response)
  })
  .catch(e => console.error(e))
  return res.sendFile(path.join(__dirname +'./../views/control.html'));

})

router.get('/on/:value', function (req, res) {
  light.send({
    'smartlife.iot.smartbulb.lightingservice': {
      'transition_light_state': {
        'on_off': 1,
        'brightness':JSON.parse(req.params.value)

      }

}})
.then(response => {
  console.log(response)
})
.catch(e => console.error(e))
  return res.sendFile(path.join(__dirname +'./../views/control.html'));


})


module.exports = router;
