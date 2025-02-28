//for maps
maptilersdk.config.apiKey = "NFg6S1LgLFaoz8AWXlOA";
var map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  center: [0, 0],
  zoom: 0,
});

//geojson coordinate container
var coord3 = [];

map.on("load", function () {
  //To initiate map
  var geo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [[0, 0]],
        },
      },
    ],
  };

  geo.features[0].geometry.coordinates = coord3;

  map.addSource("wow", { type: "geojson", data: geo });
  map.addLayer({
    id: "wow",
    type: "line",
    source: "wow",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "red",
      "line-opacity": 1,
      "line-width": 3,
    },
  });
  const droneMarker = new maptilersdk.Marker({ color: "#FF0000" })
    .setLngLat([0, 0])
    .addTo(map);

  //Randomized map location based on starting coordinate (for testing polyline)
  var i = 0;
  var o = 1;

  var timer = function () {
    if (i < o) {
      var reff = app.database().ref();

      reff.on(
        "value",
        function (snapshot) {
          var gps = snapshot.val();
          var x =   gps.LNG;//121.0869 + Math.random() * 0.01; //
          var y =   gps.LAT;//14.692901 - Math.random() * 0.01; //


          console.log(coord3);

          coord3.push([x, y]);
          map.getSource("wow").setData(geo);
          map.jumpTo({ center: [x, y], zoom: 18 });
          droneMarker.setLngLat([x, y]);
          const latitudeElement = document.getElementById("latitude");
          const longitudeElement = document.getElementById("longitude");

          latitudeElement.textContent = y.toFixed(6); // Show 6 decimal places
          longitudeElement.textContent = x.toFixed(6); // Show 6 decimal places
        },

        function (error) {
          console.log("Error: " + error.code);
        }
      );
      i++;
      o++;
    }
  };

  // Function value control
  let isRunning = false;
  let intervalId = null;

  // Function to start the interval
  const startFunction = () => {
    if (!isRunning) {
      intervalId = setInterval(timer, 100); // Run the function every 1 second
      isRunning = true;
      console.log("Function started.");
    }
  };

  // Function to stop the interval
  const stopFunction = () => {
    if (isRunning) {
      clearInterval(intervalId);
      isRunning = false;
      console.log("Function stopped.");
    }
  };

  // Toggle function on button click
  const toggleButton = document.getElementById("action");
  toggleButton.addEventListener("click", () => {
    if (isRunning) {
      stopFunction();
      toggleButton.textContent = "Start Function"; // Update button text
    } else {
      startFunction();
      toggleButton.textContent = "Stop Function"; // Update button text
    }
  });
});
