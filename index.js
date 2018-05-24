const express        = require('express'),
      bodyParser     = require('body-parser'),
      deliveryDAO = require('./delivery_server/deliveryDAO'),
      app            = express(),
      port           = process.env.PORT || 3030;

//POST request parser
app.use(bodyParser.urlencoded({extended: true}));  
app.use('/assets', express.static(`${__dirname}/public`));
app.use(express.static(__dirname + '/public'));


//define middleware 
app.use((req,res,next) => {
        res.set("Content-Type", "application/json");
        next();
    });

app.all('/', (req, res) =>
    res.sendFile(`assets/`));

//get all deliveries from mlab DB.
app.get('/getAllDeliveries', (req, res) => {
    deliveryDAO.getAllDeliveries()
                  .then(data => res.json(data))
});

//get specific delivery by ID.
app.post('/getDeliveryByID', (req, res) => {
    deliveryDAO.getDeliveryByID(+req.body.delivery.id)
                  .then(data => res.json(data));
});

//get group of deliveries (or one) specified by their rally point type.
app.get('/getDeliveriesByRallyPointType', (req, res) => {
    deliveryDAO.getDeliveriesByRallyPointType(req.query.rallypoint)
                  .then(data => res.json(data));          
});

//redirect here in case of an error (for example, when getDeliveryByID request-url is only pressed and not handled right as POST method demands.)
app.all('*', (req, res) => res.redirect('/assets/error.html'));

//finding avialble port 
app.listen(port, () => console.log(`Server is listening on ${port}`));