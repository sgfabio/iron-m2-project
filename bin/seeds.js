const mongoose = require('mongoose');
const Place = require("../models/place");

const dbName = 'project-2';
mongoose.connect(`mongodb://localhost/${dbName}`);

const places = [
  {
    name: "Simple Garage",
    description: "Clean garage, dry, no bugs! Perfect for you.",
    neighborhood: "Santa Cecília",
    capacity: "1",
    address: "Rua Helvetia, 980",
    available: true,
    price: "$100,00",
    imgPath: "https://img.olx.com.br/images/47/477812100834356.jpg"
  }, 
  {
    name: "Safe locker",
    description: "Small locker for your unused documents",
    neighborhood: "Jardim Paulista",
    capacity: "0.5",
    address: "Alameda Jau, 1301",
    available: true,
    price: "$50,00",
    imgPath: "http://www.wintech.nicsmine.com/wp-content/uploads/2019/01/2-3.jpg"
  }, 
  {
    name: "Shelving System",
    description: "Bring your stuffs! We'll take care of it ",
    neighborhood: "Cerqueira César",
    capacity: "1.5",
    address: "R. da Consolação, 3122 ",
    available: true,
    price: "$90,00",
    imgPath: "http://www.wintech.nicsmine.com/wp-content/uploads/2019/01/4-2.jpg"
  }, 
  {
    name: "Storage",
    description: "Running Out Of Space? Here you will find what you need",
    neighborhood: "Pinheiros",
    capacity: "2",
    address: "R. dos Pinheiros, 1037 ",
    available: true,
    price: "$180,00",
    imgPath: "https://s3.amazonaws.com/southfloridareporter/wp-content/uploads/2019/10/27183033/self-storage-640x384.jpg"
  }, 
  {
    name: "Climate Storage",
    description: "Climate controlled storage removes dust and foreign matter from the air and keeps your items cleaner fresher. ",
    neighborhood: "Vila Andrade",
    capacity: "2",
    address: "R. Áureliano Guimarães, 201",
    available: true,
    price: "$200,00",
    imgPath: "https://uploads.website.storedge.com/a0756a77-5ab9-4c50-b715-fd5a68030d77/climate-controlled-storage-1.jpg"
  }, 
  {
    name: "Empty Closet",
    description: "A clean, cool and totally empty closet just for you! Friendly price!!",
    neighborhood: "Republica",
    capacity: "1",
    address: " R. Dom José de Barros, 31",
    available: true,
    price: "$30,00",
    imgPath: "https://http2.mlstatic.com/guarda-roupa-modulado-casal-solteiro-closet-mdf-2-x-23-x35p-D_NQ_NP_680456-MLB27443381206_052018-O.webp"
  }, 
];

Place.create(places, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${places.length} places`)
  mongoose.connection.close();
});