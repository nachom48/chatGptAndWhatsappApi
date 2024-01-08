

const express = require('express');
const router = express.Router();

const whatsappController = require('../controllers/whatsappController.js');

router.get('/', whatsappController.VerifyToken)
      .post('/', whatsappController.ReceivedMessage);

//para verificar el token si o si get y para recibir los mensajes post


module.exports = router;