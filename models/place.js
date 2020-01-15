const mongoose = require("mongoose");
const { Schema, model} = mongoose;

const placeSchema = new Schema({
  name: String,
  description: String,
  neighborhood: String,
  address: String,
  zip: String,
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
  capacity: {
      type: String,
      enum: ["0.5", "1", "1.5", "2"],
      default: "0.5"
    }, 
  available: Boolean,
  price: String,
  imgPath: {
    type: String,
    default: "https://res.cloudinary.com/dunep2wdb/image/upload/v1579093011/folder-name/Screen_Shot_2020-01-15_at_09.56.28_hckfcg.png"
  },
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