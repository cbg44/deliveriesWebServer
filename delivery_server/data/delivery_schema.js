const mongoose       = require('mongoose'),
      Schema         = mongoose.Schema,
      deliverySchema    = new Schema({
          delivery:
          {
            id:{type: Number, index: 1, required: true},
            properties: {weight_in_pounds: Number, state_of_matter: String},
            rally_point:{type: String,adress: String},
            sender:{type: String}
          },
          owner:{id:{type: Number, index: 1, required: true}, name:String,adress:String}
      }, {collection: 'deliveries'});

const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
