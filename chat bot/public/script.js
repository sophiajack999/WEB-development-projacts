document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    displayMessage('You', userInput);
    document.getElementById('user-input').value = '';

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        displayMessage('Bot', data.reply);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayMessage(sender, message) {
    const output = document.getElementById('output');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight;
}
