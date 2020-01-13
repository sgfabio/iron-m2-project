const mongoose = require("mongoose");
const { Schema, model} = mongoose;

const placeSchema = new Schema({
  name: String,
  description: String,
  neighborhood: String,
  capacity: {
      type: String,
      enum: ["0.5", "1", "1.5", "2"],
      default: "0.5"
    }, 
  address: {
      type: {
      type: String
      },
      coordinates: [Number]
    },
  available: Boolean,
  price: String,
  imgPath: String, //photo
  locatorId: {
      type: Schema.Types.ObjectId, ref: 'User' //locador
    },
  renterId: {
      type: Schema.Types.ObjectId, ref: 'User' //locatário
  }
}, {
  timestamps: true
});

placeSchema.index({ location: "2dsphere" })

const Place = model("Place", placeSchema);

module.exports = Place;