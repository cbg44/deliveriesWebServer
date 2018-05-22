const express        = require('express'),
      bodyParser     = require('body-parser'),
      deliveryDAO = require('./delivery_server/deliveryDAO'),
      app            = express(),
      port           = process.env.PORT || 3000;

//POST request parser
app.use(bodyParser.urlencoded({extended: true}));  
app.use('/assets', express.static(`${__dirname}/public`));
app.use(express.static(__dirname + '/public'));


app.use(
    (req,res,next) => {
        res.set("Content-Type", "application/json");
        next();
    });


app.all('/', (req, res) => res.sendFile(`assets/`));

app.get('/getAllDeliveries', (req, res) => {
    deliveryDAO.getAllDeliveries()
                  .then(  data => res.json(data))

});

app.post('/getDeliveryByID', (req, res) => {
    deliveryDAO.getDeliveryByID(+req.body.delivery.id)
                  .then( data => res.json(data));
});

app.get('/getDeliveriesByRallyPointType', (req, res) => {
    deliveryDAO.getDeliveriesByRallyPointType(req.query.rallypoint)
                  .then( data => res.json(data));          
});


app.all('*', (req, res) => res.redirect('/assets/error.html'));

app.listen(port, () => console.log(`Server is listening on ${port}`));