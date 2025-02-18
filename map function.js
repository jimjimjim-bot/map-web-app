//VIDEO STUFF
//MINSAN UNG CAM NG LAPTOP AND PINIPILI AT HINDI UNG WEBCAM
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}

//for maps
maptilersdk.config.apiKey = "NFg6S1LgLFaoz8AWXlOA";
var map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  zoom: 0,
});

//Initial Map Location
var locx = 121.422706;
var locy = 14.470196;
var coord1 = [];
var coord2 = [];

//geojson coordinate container
var coord3 = [];

map.on("load", function () {
  var geo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [[locx, locy]],
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
    paint: {
      "line-color": "red",
      "line-opacity": 1,
      "line-width": 5,
    },
  });

  //Randomized map location based on starting coordinate (for testing polyline)
  var i = 0;
  var o = 1;
  var timer = window.setInterval(function () {
    if (i < o) {
      var center = [[0, 0]];



      //babaguhin para malagay ung data from firebase to the map
      var radius = 0.01;
      var x = Math.random() * radius + locx; //121.412640
      //  console.log(x+"x");
      var y = Math.random() * radius + locy; //14.470193//long, lat. Basically baliktad siya sa gmaps na coordinates
      //   console.log(y+"y");





      coord3.push([x, y]);
      console.log(y);
      map.jumpTo({ center: [x, y], zoom: 15 });
      map.setPitch(30);
      map.getSource("wow").setData(geo);
      i++;
      o++;
    } else {
      window.clearInterval(timer);
    }
  }, 500);
});

//function newP(){
//   var radius = 0.01;
//  var x = (Math.random() * radius) + locx;//121.412640
//  console.log(x+"x");
//  var y = (Math.random() * radius) + locy; //14.470193//long, lat. Basically baliktad siya sa gmaps na coordinates
//  console.log(y+"y");
//  var marker = new tt.Marker().setLngLat([x,y]).addTo(map);
//  }

//  setInterval(newP, 1000);
