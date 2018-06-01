const express = require('express');
const fs = require('fs');

const hbs = require('hbs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
   let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err => {
        if (err) {
            console.log("unable to append file log");
        }
    }));
    next();
    
});

app.use((req, res, next) => {
   res.render('maintenance.hbs'); 
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt', (text) => {
   
   return text.toUpperCase(); 
});

app.get('/', (req, res)=> {
   
    res.render('home.hbs', {
       welcomeMessage : 'Hi running handlebars with express',
        pageTitle : 'HomePage',
        currentYear : new Date().getFullYear()
        
    });
    
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
    });
});


app.get('/bad', (req, res)=> {
    res.send({
        errorMessage : "Bad request"
    });
});


app.listen(3000, ()=> {
    console.log("Server is up on port 3000");
});