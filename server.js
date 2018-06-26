const express = require('express');
const path = require('path');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(path.join(__dirname, "views", "shared", "partials"));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
    //res.send('Hello Express');
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Hello world',
        currentYear: new Date().getFullYear(),
        appName: 'node-server'
    });
});

app.get('/version', (req, res) => {
    res.send({ releaseDate: new Date(), number: '1.0.0' });
});

app.get('/about', (req, res) => {
    // res.send('<h1>About Us</h1><p>About my self</p>');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear(),
        appName: 'node-server'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

var port = 7700;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});