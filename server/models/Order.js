const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  artworks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artwork'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
