const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware 
app.use(express.static(path.join(__dirname, 'public')));

// Config EJS engine to view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Read data from file JSON
const dataPath = path.join(__dirname, 'data', 'Car.json');

const getCars = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

// Home page
app.get('/', (req, res) => {
    const cars = getCars();
    res.render('index', { cars });
});

// Detail page
app.get('/car/:id', (req, res) => {
    const cars = getCars();
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) {
        return res.status(404).send('Car not found');
    }
    res.render('detail', { car });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
