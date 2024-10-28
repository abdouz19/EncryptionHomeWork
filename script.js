function handleMessage() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const encryptionMethod = document.getElementById('encryption-method').value;
    const message = userInput.value.trim();

    if (message === "") return;

    // Display user's message in the chat
    displayMessage('you', message);

    // Encrypt and display bot's message
    const encryptedMessage = encryptMessage(encryptionMethod, message);
    setTimeout(() => displayMessage('bot', `Encrypted Message: ${encryptedMessage}`), 500);

    // Clear user input
    userInput.value = "";
}

function displayMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElem = document.createElement('div');
    messageElem.classList.add('message', sender);
    const textElem = document.createElement('p');
    textElem.textContent = text;
    messageElem.appendChild(textElem);
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function encryptMessage(method, message) {
    switch (method) {
        case 'mirror':
            return message.split("").reverse().join("");
        case 'affine':
            return affineCipher(message, 5, 8); // Example: a = 5, b = 8
        case 'shift':
            return shiftCipher(message, 3); // Example shift of 3
        case 'caesar':
            return caesarCipher(message, 3); // Shift by 3
        default:
            return message;
    }
}

// Encryption functions
function affineCipher(message, a, b) {
    return message
        .split("")
        .map(char => {
            const x = char.toUpperCase().charCodeAt(0) - 65;
            return String.fromCharCode(((a * x + b) % 26) + 65);
        })
        .join("");
}

function shiftCipher(message, shift) {
    return message
        .split("")
        .map(char => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
            }
            return char;
        })
        .join("");
}

function caesarCipher(message, shift) {
    return shiftCipher(message, shift);
}
