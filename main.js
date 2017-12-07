$(document).ready(function () {
  $.getJSON("data.json", function (data) {
    for (var i = 0; i < data.length; i++) {
      $('#top-spots tbody').append(
        `<tr>
                <td>${data[i].name}</td>
                <td>${data[i].description}</td>
                <td><a href= "https://www.google.com/maps?q=${data[i].location}">Open in Google Map</a></td>
            </tr>`
      );
    }
  });
});

var googleMap, currentWindow;
/*
function initMap() {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.709029, lng: -117.154239},
    zoom: 6
  });
  currentWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      currentWindow.setPosition(pos);
      currentWindow.setContent('You are Here');
      currentWindow.open(googleMap);
      googleMap.setCenter(pos);
    }, function() {
      handleLocationError(true, currentWindow, googleMap.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, currentWindow, googleMap.getCenter());
  }
}
/*
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
*/


function initMap() {
    googleMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(32.709029,-117.154239),
    mapTypeId: 'terrain',
  });
  currentWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  function currenctionLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        currentWindow.setPosition(pos);
        currentWindow.setContent('You are Here');
        currentWindow.open(googleMap);
        googleMap.setCenter(pos);
      }, function() {
        handleLocationError(true, currentWindow, googleMap.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, currentWindow, googleMap.getCenter());
    }
}
currenctionLocation();
  $.getJSON('data.json', (data) => {
    data.map(location => {
      let markerPosition ={
        lat:location.location[0],
        lng:location.location[1]
        //console.log(markerPosition)
      }
      let marker = new google.maps.Marker({
        position  : markerPosition,
        map       : googleMap
      }); 
      let inforCaption  = '<h2>' + location.name + '</h2>' +'<p>' + location.description + '</p>';
      let infoWindow    = new google.maps.InfoWindow({
        content: inforCaption
      });
      marker.addListener('click', function (){
        infoWindow.open(googleMap, marker);
       })
    });
});
}