window.onload = () => {

  getPlaces();
  
};

function getPlaces() {
  axios.get("/api")
  .then( response => {
    console.log('Response.data' , response.data)
    setPlaces(response.data.places);
  })
  .catch(error => {
    console.log(error);
  })
}

function setPlaces(places){
  const markers = []
  const ironhackBCN = {
    lat: -23.5617375, 
    lng: -46.6601331
  };
  
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: ironhackBCN
  });
  

  places.forEach(function(place){
    console.log('Place', place)

    const center = {
      lng: place.location.coordinates[1],
      lat: place.location.coordinates[0]
      // lat: 0,
      // lng: 0
    };

    console.log("Center", center)

    const pin = new google.maps.Marker({
      position: center,
      map: map,
      title: place.name
    });

    markers.push(pin);
    console.log("Markers", markers)
  });
}
