 	 var jsReady = false;
     function isReady() {
         return jsReady;
     }
     function pageInit() {
         jsReady = true;
     }
     function thisMovie(movieName) {
         if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
         } else {
             return document[movieName];
         }
     }
     function sendToActionScript(key,value) {
         thisMovie("main").sendToActionScript(key,value);
     }
