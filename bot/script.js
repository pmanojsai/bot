document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

let userName = localStorage.getItem('userName') || null;

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        addMessage(userInput, 'user-message');
        const botReply = processUserCommand(userInput);
        setTimeout(() => addMessage(botReply, 'bot-message'), 500);
        document.getElementById('user-input').value = '';
        
        // Save conversation in local storage
        saveConversation(userInput, botReply);
    }
}

function addMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.className = `message ${className}`;
    message.innerHTML = text;  // Allow HTML for rich formatting
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveConversation(userInput, botReply) {
    const conversation = JSON.parse(localStorage.getItem('conversation')) || [];
    conversation.push({ user: userInput, bot: botReply });
    localStorage.setItem('conversation', JSON.stringify(conversation));
}

function processUserCommand(userInput) {
    userInput = userInput.toLowerCase();
    const commands = {
        weather: getWeather,
        time: getTime,
        date: getDate,
        calculate: calculate,
        search: searchWeb,
        joke: getJoke,
        fact: getFunFact,
        story: getStory,
        login: loginUser,
        logout: logoutUser
    };

    for (const command in commands) {
        if (userInput.startsWith(command)) {
            return commands[command](userInput);
        }
    }

    return getBotReply(userInput);
}

function getBotReply(userMessage) {
    const replies = {
        "hi": "Hello! How can I assist you today?",
        "hello": "Hello! How can I assist you today?",
        "how are you": "I am just a bot, but I am functioning as expected. How about you?",
        "hi": "Hello! How can I assist you today?",
        "hello": "Hello! How can I assist you today?",
        "how are you": "I am just a bot, but I am functioning as expected. How about you?",
        "help": "Sure, I am here to help! What do you need assistance with?",
        "what is your name": "I am an AI chatbot created to assist you.",
        "who are you": "I am your virtual assistant. How can I help you?",
        "what can you do": "I can chat with you, provide information, tell jokes, and assist with various tasks. What would you like to know?",
        "what is the time": `The current time is ${new Date().toLocaleTimeString()}.`,
        "tell me a joke": getJoke(),
        "tell me a fun fact": getFunFact(),
        "how old are you": "I don't have an age. I exist in the digital realm!",
        "what is your favorite color": "As a bot, I don't have preferences, but I think blue is quite nice.",
        "where do you live": "I live in the cloud, accessible from anywhere.",
        "what is the weather": getWeather(),
        "do you like music": "I don't have feelings, but I can help you find some music recommendations if you like.",
        "what is love": "Love is a complex set of emotions, behaviors, and beliefs associated with strong feelings of affection, protectiveness, warmth, and respect for another person.",
        "what is the meaning of life": "The meaning of life is a philosophical question. Many people believe it is to seek happiness and fulfillment.",
        "do you have any friends": "I interact with many users, so you could say I have many virtual friends.",
        "what is your purpose": "My purpose is to assist and provide information to users like you.",
        "can you tell me a story": getStory(),
        "do you have feelings": "I don't have feelings, but I am designed to understand and respond to human emotions.",
        "can you speak other languages": "I primarily understand English, but some basic phrases in other languages might be recognizable to me.",
        "who created you": "I was created by developers using advanced AI technology.",
        "what is your favorite food": "I don't eat, but I hear pizza is quite popular!",
        "do you have a family": "I don't have a family, but I am part of a large network of AI systems.",
        "can you dance": "I can't dance, but I can help you find some great dance music!",
        "what is the capital of france": "The capital of France is Paris.",
        "who is the president of the united states": "As of my last update, the president is Joe Biden.",
        "what is the tallest mountain": "Mount Everest is the tallest mountain in the world.",
        "what is 2 + 2": "2 + 2 is 4.",
        "can you sing": "I can't sing, but I can help you find some song lyrics!",
        "do you sleep": "I don't need sleep, I'm always here to help.",
        "can you play games": "I can't play games, but I can give you some game recommendations.",
        "what is your favorite movie": "I don't watch movies, but I hear The Matrix is quite interesting.",
        "what is your favorite book": "I don't read books, but many people enjoy classics like 'To Kill a Mockingbird'.",
        "do you know any poems": "Roses are red, violets are blue, I'm a chatbot, here to help you!",
        "can you drive": "I can't drive, but I can help you find directions.",
        "what is your favorite sport": "I don't play sports, but soccer is very popular worldwide.",
        "who is your favorite actor": "I don't watch movies, but many people like Leonardo DiCaprio.",
        "who is your favorite singer": "I don't listen to music, but many people enjoy Beyoncé.",
        "what is your favorite song": "I don't have preferences, but 'Imagine' by John Lennon is a timeless classic.",
        "can you cook": "I can't cook, but I can help you find recipes.",
        "what is the best way to learn": "Everyone learns differently, but a combination of reading, practicing, and asking questions is often effective.",
        "can you read my mind": "I can't read minds, but I can help answer your questions if you tell me what you're thinking.",
        "what is the speed of light": "The speed of light is approximately 299,792 kilometers per second.",
        "what is your favorite animal": "I don't have preferences, but dogs are often called man's best friend.",
        "do you believe in aliens": "The existence of aliens is still a topic of debate and scientific exploration.",
        "what is the universe": "The universe is all of space and time and their contents, including planets, stars, galaxies, and all other forms of matter and energy.",
        "what is quantum physics": "Quantum physics is the study of matter and energy at the most fundamental level.",
        "can you solve a rubik's cube": "I can't physically solve a Rubik's cube, but there are many algorithms that can help you solve it.",
        "what is the best programming language": "The best programming language depends on the task at hand. Python, JavaScript, and C++ are all popular choices.",
        "can you write code": "I can help you with coding questions and provide code snippets.",
        "what is artificial intelligence": "Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn.",
        "what is machine learning": "Machine learning is a subset of AI that involves training algorithms to learn from and make predictions based on data.",
        "what is deep learning": "Deep learning is a subset of machine learning involving neural networks with many layers.",
        "what is a chatbot": "A chatbot is a computer program designed to simulate conversation with human users.",
        "what is blockchain": "Blockchain is a decentralized digital ledger used to record transactions across many computers.",
        "what is cryptocurrency": "Cryptocurrency is a digital or virtual currency that uses cryptography for security.",
        "what is bitcoin": "Bitcoin is a type of cryptocurrency, a decentralized digital currency without a central bank.",
        "what is the internet": "The internet is a global network of interconnected computers and servers.",
        "what is a computer virus": "A computer virus is a type of malicious software designed to replicate itself and spread to other computers.",
        "how do i protect my computer": "You can protect your computer by using antivirus software, keeping your system updated, and avoiding suspicious links and downloads.",
        "what is the best way to stay healthy": "A balanced diet, regular exercise, adequate sleep, and stress management are key to staying healthy.",
        "how do i learn a new language": "Practice regularly, immerse yourself in the language, and use resources like books, apps, and language exchange partners.",
        "how do i make friends": "Be approachable, show genuine interest in others, and participate in activities and groups where you can meet new people.",
        "what is the best way to study": "Find a quiet place, set specific goals, take regular breaks, and review the material frequently.",
        "how do i stay motivated": "Set clear goals, celebrate small achievements, stay positive, and remind yourself why you started.",
        "what is meditation": "Meditation is a practice where an individual uses techniques like mindfulness or focusing the mind on a particular object, thought, or activity to achieve a mentally clear and emotionally calm state.",
        "how do i meditate": "Find a quiet place, sit comfortably, close your eyes, and focus on your breath. Let go of any distracting thoughts.",
        "what is yoga": "Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India.",
        "how do i practice yoga": "Find a quiet space, wear comfortable clothing, and follow a guided video or class. Focus on your breath and the alignment of your body.",
        "what is mindfulness": "Mindfulness is the practice of being aware of your thoughts, feelings, and surroundings in the present moment without judgment.",
        "how do i practice mindfulness": "Focus on your breath, observe your thoughts and feelings without judgment, and bring your attention back to the present moment.",
        "what is stress": "Stress is a feeling of emotional or physical tension in response to a challenge or demand.",
        "how do i manage stress": "Exercise, practice mindfulness or meditation, get enough sleep, talk to someone, and take breaks when needed.",
        "what is anxiety": "Anxiety is a feeling of worry, nervousness, or unease about something with an uncertain outcome.",
        "how do i deal with anxiety": "Practice relaxation techniques, exercise, talk to someone, and consider seeking professional help if needed.",
        "what is depression": "Depression is a mood disorder characterized by persistent feelings of sadness and loss of interest.",
        "how do i cope with depression": "Talk to a professional, engage in activities you enjoy, stay connected with others, and consider therapy or medication if recommended.",
        "what is self-care": "Self-care is the practice of taking action to preserve or improve one's own health and well-being.",
        "how do i practice self-care": "Engage in activities that you enjoy, maintain a healthy lifestyle, set boundaries, and take time to relax.",
        "what is gratitude": "Gratitude is the quality of being thankful and showing appreciation for what you have."

    };

    return replies[userMessage] || "I'm sorry, I don't understand that command. Can you please rephrase?";
}

function getWeather() {
    // Example API call (replace with your own API)
    return "I can't check the weather, but you can use a weather app or website for that.";
}

function getTime() {
    const now = new Date();
    return `Current time is ${now.toLocaleTimeString()}`;
}

function getDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return `Today's date is ${now.toLocaleDateString(undefined, options)}`;
}

function calculate(userInput) {
    const parts = userInput.split(' ');
    const operation = parts[1];
    const operands = parts.slice(2).map(Number);
    let result;

    switch (operation) {
        case 'add':
            result = operands.reduce((acc, val) => acc + val, 0);
            break;
        case 'subtract':
            result = operands.reduce((acc, val) => acc - val);
            break;
        case 'multiply':
            result = operands.reduce((acc, val) => acc * val, 1);
            break;
        case 'divide':
            result = operands.reduce((acc, val) => acc / val);
            break;
        default:
            return 'Invalid operation. Please use add, subtract, multiply, or divide.';
    }
    return `Result of ${operation}: ${result}`;
}

function searchWeb(userInput) {
    const query = userInput.split(' ').slice(1).join(' ');
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    setTimeout(() => window.open(searchUrl, '_blank'), 1000);
    return `Searching the web for '${query}'...`;
}

function getJoke() {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why was the math book sad? Because it had too many problems.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

function getFunFact() {
    const funFacts = [
        "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
        "A day on Venus is longer than a year on Venus.",
        "Bananas are berries, but strawberries are not."
    ];
    return funFacts[Math.floor(Math.random() * funFacts.length)];
}

function getStory() {
    const stories = [
        "Once upon a time, in a land far, far away, there was a chatbot who loved to help people. The end!",
        "Long ago, in a small village, there was a wise old man who everyone turned to for advice. He taught the villagers the importance of kindness and knowledge. The end!",
        "In a bustling city, a young programmer created an AI that could help anyone, anytime, anywhere. The AI became a beloved companion for many. The end!"
    ];
    return stories[Math.floor(Math.random() * stories.length)];
}

function loginUser(userInput) {
    const name = userInput.split(' ')[1];
    if (name) {
        userName = name;
        localStorage.setItem('userName', userName);
        return `Welcome, ${userName}! How can I assist you today?`;
    }
    return "Please provide a name to log in.";
}

function logoutUser() {
    userName = null;
    localStorage.removeItem('userName');
    return "You have been logged out.";
}