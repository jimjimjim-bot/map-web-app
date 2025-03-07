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
      console.log("Error accessing the webcam:", error);
    });
} else {
  console.error("Media Devices API not supported in this browser.");
}