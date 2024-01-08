const { Configuration, OpenAIApi } = require("openai")


async function getMessageChatGpt(text) {
    const configuration = new Configuration({
        apiKey: "ADD YOUR KEY HERE"
    })


    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:text,
        max_tokens:100
    });

    console.log("esto responde chatgpt",response)
    if(response.status === 200 && response.data.choices.length>0)
        return response.data.choices[0].text;

        return null;
    

}


module.exports = {
    getMessageChatGpt
}