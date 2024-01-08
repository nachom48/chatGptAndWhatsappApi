

const whatsappModel = require('./whatsappModel');
const whatsappService = require('./../services/whatsappService');
const chatGptService = require('./../services/chatgpt-service')



const process = async (textUser,number) =>{
    console.log("entro aca al service de process")
    textUser = textUser.toLowerCase();
    var models = [];


    //#region sin chatgpt
    //hola que tal
    // if(textUser.includes("hola")){
    //     //Saludar
    //     var model = whatsappModel.messageText("Hola,un gusto saludarte",number);
    //     models.push(model);
    //     console.log("en realida aca deberia hacer algo tambien y mandar la lista")
    //     var modelList = whatsappModel.messageList(number);
    //     models.push(modelList)
    // }
    // else if (textUser.includes("Gracias")){
    //     //agradecimiento
    //     var model = whatsappModel.messageText("Gracias a ti por escribirme",number);
    //     models.push(model);
    // }
    // else if (textUser.includes("adios") || textUser.includes("adios") || textUser.includes("bye") || textUser.includes("me voy")){
    //     //se despide
    //     var model = whatsappModel.messageText("Ve con cuidado",number);
    //     models.push(model);
    // }
    // else if (textUser.includes("comprar")){
    //     //com,prar
    //     var model = whatsappModel.messageButton(number);
    //     models.push(model);
    // }
    // else if (textUser.includes("vender")){
    //     //vender
    //     var model = whatsappModel.messageText("Registrate en el siguiente formulario para poder evaluarte",number);
    //     models.push(model);
    // }
    // else{
    //     //No entiendes.
    //     var model = whatsappModel.messageText("No entiendo lo que dices",number);
    // }
    //#endregion

    //#region con chatgpt
    const resultChatGpt = await chatGptService.getMessageChatGpt(textUser);

    console.log("esto contestesta chat" ,resultChatGpt)

    if(resultChatGpt != null){
        var model = whatsappModel.messageText(resultChatGpt,number);
        models.push(model);
    }
    else{
        var model = whatsappModel.messageText('Lo sietno algo salio mal, intentalo mas tarde',number);
        models.push(model)
    }
    //#endregion
    models.forEach(element => {
        whatsappService.sendMessageWhatsapp(element);  
    });
}

module.exports = {
    process
}