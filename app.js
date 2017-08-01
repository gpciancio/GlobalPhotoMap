
var latitude = null;
var longitude = null;
var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.446,
      lng: -94.570
    },
    zoom: 4,
    scrollwheel: false,
});

  function placeMarker(location) {
      var marker = new google.maps.Marker({
          position: location,
          map: map
      });
  }

  map.addListener("click", function(event) {
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();

    var photosElement = document.getElementById('photos');
    var requestUrl = `https://gp-flickr.herokuapp.com/services/rest/?method=flickr.photos.search&lat=${latitude}&lon=${longitude}&format=json&nojsoncallback=1`;

    $.get(requestUrl, function(result) {
      var farmId;
      var serverId;
      var secret;
      var imageUrl;
      var photoArray;
      var randomPhoto

      if (result.photos.photo.length > 0) {
        placeMarker(event.latLng);
        photoArray = result.photos.photo;
        randomPhoto = photoArray[Math.floor(Math.random() * photoArray.length)]
        farmId = randomPhoto.farm;
        serverId = randomPhoto.server;
        id = randomPhoto.id;
        secret = randomPhoto.secret;
        imageUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`

        var img = document.createElement("IMG");
        img.setAttribute('src', imageUrl);
        img.setAttribute('width', '200px');
        img.setAttribute('height', '200px');
        img.className = "image"
        photosElement.appendChild(img);
      };

    });

  });

};
