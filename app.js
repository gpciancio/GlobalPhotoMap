// set up our variables
var latitude = null;
var longitude = null;

// google map is initialized and laoded with preset config -- center and zoom
var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.446,
      lng: -94.570
    },
    zoom: 4
  });

  function placeMarker(location) {
      var marker = new google.maps.Marker({
          position: location,
          map: map
      });
  }

  // click event listening for a click on the map
  map.addListener("click", function(event) {
    // set the lat and lon of the click coordinates
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();

    // find the '#photos' element in our html in order to update if photos are loaded
    var photosElement = document.getElementById('photos');

    // set up requestUrl with lat and lon variables and API key variable
    var requestUrl = `https://gp-flickr.herokuapp.com/services/rest/?method=flickr.photos.search&lat=${latitude}&lon=${longitude}&format=json&nojsoncallback=1`;

    // make request to Flicker using requestUrl to get photos by lat and lon
    $.get(requestUrl, function(result) {
      // TODO -- loop through the result.photos.photo array to get all the photos
      var farmId;
      var serverId;
      var secret;
      var imageUrl;
      var photoArray;
      var randomPhoto

      // set variables to be used to build the image url to display the images
      if (result.photos.photo.length > 0) {
        placeMarker(event.latLng);

        photoArray = result.photos.photo;
        randomPhoto = photoArray[Math.floor(Math.random() * photoArray.length)]
        farmId = randomPhoto.farm;
        serverId = randomPhoto.server;
        id = randomPhoto.id;
        secret = randomPhoto.secret;

        // imageUrl that will be used to display the image in the html below the map
        imageUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`

        // create the image element so it can be appended to the #below element -- 'elem'
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
