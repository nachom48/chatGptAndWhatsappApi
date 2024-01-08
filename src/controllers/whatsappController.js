//verificar token y recibir mensajes de whatsapp

const fs = require('fs')
const processMesage = require('./../shared/processMessage')

//con esto puedo almacenar los logs en un txt.
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"))

const VerifyToken = (req,res) =>{
    //Req lo q envia y Res lo q podemos responder

    try {
        var accessToken = '98193183maikdansduna';
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];
        if(challenge != null && token != null && token ===accessToken){
            //Segun lad ocumentacion,si me enviaste el token correcot,tengo que devolver el challenge 
            res.send(challenge);
        }else{
            //Si no esta bien el token devuelvo un status 400.
            res.status(400).send()
        }

    } catch (error) {
        res.status(400).send();
    }

    res.send('Hola verifyToken');
}

const ReceivedMessage = async(req,res) =>{

    try {
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];

        var messageObject = value["messages"];
        if(typeof messageObject != "undefined"){
            var message = messageObject[0];
            var text = getTextUser(message);
            var number = message["from"];
            number = number.replace('549', '54');

            if(text !== ""){
                console.log("entro aca xq teine algo",text)
                await processMesage.process(text,number)
            }
            // else if(text === 'image'){
            //     var data = samples.sampleImage(number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
            // else if(text === 'video'){
            //     var data = samples.sampleVideo(number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
            // else if(text === 'audio'){
            //     var data = samples.sampleAudio(number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
            // else if(text === 'document'){
            //     var data = samples.sampleDocument(number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
            // else if(text === 'button'){
            //     var data = samples.sampleButtons(number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
            // else if(text === 'list'){
            //     var data = samples.sampleList(number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
            // else if(text === 'location'){
            //     var data = samples.sampleLocation(number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
            // else {
            //     var data = samples.sampleText("No entiendo",number)
            //     whatsappService.sendMessageWhatsapp(data)
            // }
        }
        res.send("EVENT_RECEIVED")

    
    } catch (error) {
        myConsole.log(error);
        //Si whatsapp no escucha eso, nos va a volver a reenviar el mensaje y se va a convertir en un bucle . 
        res.send("EVENT_RECEIVED")
    }
}

const getTextUser = (messages) => {
    var text = "";
    var typeMessage = messages["type"];
    if (typeMessage === "text") {
        text = (messages['text'])["body"];
    } else if (typeMessage === "interactive") {
        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];
        if (typeInteractive === "button_reply") {
            text = (interactiveObject["button_reply"]["title"]);
        } else if (typeInteractive === "list_replay") {
            text = (interactiveObject["list_replay"])["title"];
        } else {
            myConsole.log("sin mensaje");
        }
    } else {
        myConsole.log("sin mensaje");
    }
    return text;
}



module.exports = {
    VerifyToken,
    ReceivedMessage
}

// con el myConsole.log puedo guardar en el log creaod con FS lo q necesite.