const express = require('express');
const mongoose = require('mongoose');
const SortHistory = require('./models/SortHistory');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bubblesort', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/save-sort-result', async (req, res) => {
    try {
        const { sortedArray } = req.body;
        const sortHistory = new SortHistory({ sortedArray });
        await sortHistory.save();
        res.status(200).json({ message: 'Sort result saved successfully' });
    } catch (error) {
        console.error('Error saving sort result:', error);
        res.status(500).json({ message: 'Error saving sort result' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
