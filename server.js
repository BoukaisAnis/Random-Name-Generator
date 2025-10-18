const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load names from JSON file
const namesData = JSON.parse(fs.readFileSync('./names.json', 'utf8'));
const names = namesData.names;

// API endpoint to get a random name
app.get('/api/random-name', (req, res) => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    res.json({ name: randomName });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Random Name Generator server running on http://localhost:${PORT}`);
});