// This sample uses the Place Autocomplete widget requesting only a place
// ID to allow the user to search for and locate a place. The sample
// then reverse geocodes the place ID and displays an info window
// containing the place ID and other information about the place that the
// user has selected.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(
      input, {placeIdOnly: true});

  var geocoder = new google.maps.Geocoder;

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();

    if (!place.place_id) {
      return;
    }
    geocoder.geocode({'placeId': place.place_id}, function(results, status) {

      if (status !== 'OK') {
        window.alert('Geocoder failed due to: ' + status);
        return;
      }
      console.log("Place Id => ", place.place_id);
      console.log("Address of location => ", place.name);
      document.getElementById('place-id').value = place.place_id;
    });
  });
}
