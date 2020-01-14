
const geocoder = new google.maps.Geocoder();
// Ao sair do campo 'address' popula os campos do formulário id='Latitude' e id='Longitude' no formulario

const placeAddress = document.getElementById('placeAddress')
if (placeAddress) {
  placeAddress.addEventListener('focusout', function () {
    geocodeAddress(geocoder);
  });
}

function geocodeAddress(geocoder) {
  let address = document.getElementById('placeAddress').value;

  geocoder.geocode({ 'address': address }, function (results, status) {

    if (status === 'OK') {
      console.log(results)
      document.getElementById('placeLatitude').value = results[0].geometry.location.lat();
      document.getElementById('placeLongitude').value = results[0].geometry.location.lng();
    } else {
      // alert('Geocode was not successful for the following reason: ' + status);
      alert('Digite um endereço válido');
    }
  });
}


const capacitySelect = document.getElementById('exampleFormControlSelect1');
if (capacitySelect) {
  const capacityValue = capacitySelect.data;
  capacitySelect.querySelectorAll('option').forEach((el) => {
    console.log('elValue', el.value)
    console.log('capacityVlaue',  capacityValue)
    if (el.value === capacityValue) el.selected = true;
  })
}
