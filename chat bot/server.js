const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    const botReply = generateReply(userMessage);
    res.json({ reply: botReply });
});

function generateReply(message) {
    // Simple logic for generating a reply
    const responses = {
        "hello": "Hi there!",
        "how are you": "I'm a bot, so I don't have feelings, but I'm here to help!",
        "bye": "Goodbye!"
    };

    return responses[message.toLowerCase()] || "I don't understand that.";
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
