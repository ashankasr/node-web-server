const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 7700;

var app = express();

hbs.registerPartials(path.join(__dirname, "views", "shared", "partials"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });

    next();
});

app.use(express.static(path.join(__dirname, 'views')))

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
    //res.send('Hello Express');
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Hello world',
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
        appName: 'node-server'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});