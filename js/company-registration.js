var map;
function initMap(){
    var options = {
       zoom: 7,
       center: {lat:42.3601, lng:-71.0589}
   }

   var mapCompany = new google.maps.Map(document.getElementById('map'), options);
}

function putBannerBackground(evt) {
    var files = evt.target.files; // FileList object
    
    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {
      console.log(i);
      // Only process image files.
      if (!f.type.match('image.*')){
        continue;
      }

      var reader = new FileReader();
      document.getElementById('div-message-publicity').style.display = 'none';

      if(i==0){
        $('#ol-indicators').append(`
        <li data-target="#banner" data-slide-to="${i}" class="active"></li>`);
      }else{
        $('#ol-indicators').append(`
        <li data-target="#banner" data-slide-to="${i}"></li>`);
      }
      
      if(i==0){
        // Closure to capture the file information.
          reader.onload = (function(theFile){
          return function(e){
            // Render thumbnail.  
            
            $('#carousel-image').append(
              `<div class="carousel-item container-wallpaper active position-carousel">
              <img src="${e.target.result}" class="d-block w-100">
            </div>`
            ); 
          };
        })(f);
        }else{
         // Closure to capture the file information.
         reader.onload = (function(theFile){
          return function(e){
            // Render thumbnail.  
            $('#carousel-image').append(
              `<div class="carousel-item container-wallpaper position-carousel">
              <img src="${e.target.result}" class="d-block w-100">
             </div>`
            ); 
          };
        })(f);
      }

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
}


function putLogotypeBackground(evt) {
  var files = evt.target.files; // FileList object
  
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    
    console.log(f);
    // Only process image files.
    if (!f.type.match('image.*')){
      continue;
    }

    var reader = new FileReader();
    
    // Closure to capture the file information.
    reader.onload = (function(theFile){
      console.log(theFile);
      return function(e){
        // Render thumbnail.

        $('#logotype-image').attr('src',`${e.target.result}`);
        
        
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

$(document).ready(function () {
  $('#show-password').click(function () {
    console.log("Llamado Correcto");
    if ($('#show-password').is(':checked')) {
      $('#password-one').attr('type', 'text');
      $('#password-two').attr('type', 'text');
    } else {
      $('#password-one').attr('type', 'password');
      $('#password-two').attr('type', 'password');
    }
  });
});





document.getElementById('file-banner').addEventListener('change', putBannerBackground, false);
document.getElementById('file-logotype').addEventListener('change', putLogotypeBackground, false);