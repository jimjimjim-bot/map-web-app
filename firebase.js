const firebaseConfig = {
    apiKey: "AIzaSyB9ATjteo1Q6PRNzaICCsf6j8voQkKTwh8",
    authDomain: "gps-data-12896.firebaseapp.com",
    databaseURL:
      "https://gps-data-12896-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gps-data-12896",
    storageBucket: "gps-data-12896.firebasestorage.app",
    messagingSenderId: "270489369272",
    appId: "1:270489369272:web:b8331db8b2aeb89c7b924d",
  };
  const app = firebase.initializeApp(firebaseConfig);
  //reff.on("value", function (snapshot) {
  //    var gps = snapshot.val();
  //    console.log(gps.LAT);
  //    console.log(gps.LNG);
  //  },
  //  function (error) {
  //    console.log("Error: " + error.code);
  //  }
  //);