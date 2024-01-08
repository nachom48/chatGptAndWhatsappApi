
const messageText = (textResponse, number) => {

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "text",
        "text": {
            "preview_url":true,
            "body": textResponse
        }
    });

    return data;

}

const messageList = (number) => {

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive":{
            "type": "list",
            "header": {
              "type": "text",
              "text": "your-header-content"
            },
            "body": {
              "text": "your-text-message-content"
            },
            "footer": {
              "text": "your-footer-content"
            },
            "action": {
              "button": "cta-button-content",
              "sections":[
                {
                  "title":"your-section-title-content",
                  "rows": [
                    {
                      "id":"unique-row-identifier",
                      "title": "row-title-content",
                      "description": "row-description-content",           
                    }
                  ]
                },
                {
                  "title":"your-section-title-content",
                  "rows": [
                    {
                      "id":"unique-row-identifier",
                      "title": "row-title-content",
                      "description": "row-description-content",           
                    }
                  ]
                }
              ]
            }
          }
    });

    return data;

}

const messageButton = (number) => {

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "Selecciona uno de los productos"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Laptop"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-computadora",
                            "title": "Computadora"
                        }
                    }
                ]
            }
        }
    });

    return data;

}



module.exports ={
    messageText,
    messageList,
    messageButton
}