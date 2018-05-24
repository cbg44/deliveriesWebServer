const mongoose = require('mongoose'),
Delivery = require('./data/delivery_schema'),
conf = require('./config'),
consts = require('../consts');

// mLab connection 
mongoose.connect(consts.MLAB_KEY);  
mongoose.Promise = global.Promise;  
mongoose.connection.on("error", (err) => console.log(`Connection error: ${err}`));
mongoose.connection.on("open",  ()    => console.log(`Connected to Database `));

//error handling
function error(description) {
    console.log(`error: ${description}`);
    conf.JSONError['description'] = description;
    return conf.JSONError;
}


// methods logics, find for "groups", findOne for unique request (id in that case).
module.exports = class DeliveryDAO {
    static getAllDeliveries() {
        return Delivery.find()
                    .catch(() => error(conf.getAllExeption));
    }

    static getDeliveryByID(id) {
        return Delivery.findOne({'delivery.id': id})
                    .catch(() => error(conf.idNotExists));
    }

    static getDeliveriesByRallyPointType(rally_point) {
      return Delivery.find({'delivery.rally_point.type': rally_point})
                    .catch(() => error(conf.rallypointtypenotexist));
    }
};