function activeCurrent(currentActive){
    var navElements = ['home','publications','products','promotions','logotype','locals','dashboard','promocion'];

    for(let i=0; i<navElements.length; i++){
        if($('#'+navElements[i]).hasClass('active')){
            $('#'+navElements[i]).removeClass('active');
            $('#'+navElements[i]).remove('span');
            $('#'+navElements[i]+'-a').removeClass('border-active');            
        }
    } 
    

    $('#'+currentActive).addClass('active');
    $('#'+currentActive).append(
        `<span class="sr-only">(current)</span>`  
    );
    $('#'+currentActive+' a').addClass('border-active');
}


function hidewhatsUp(i){
    $('#placeholder-8h7gt').css("display","none");
}


function showwhatsUp(value){
    var node = document.getElementById(value);
    htmlContent = node.innerHTML
    if(htmlContent==''){
        $('#placeholder-8h7gt').css("display","block");
        $('#btn-post').addClass('disabled');
        $('#btn-post').attr('disabled',true);
    }else{
        $('#placeholder-8h7gt').css("display","none");
        $('#btn-post').attr('disabled',false);
        $('#btn-post').removeClass('disabled');
    }
}

function loadImagePos(evt) {
    var parent = document.querySelector('#container-image-publication');

    var files = evt.target.files; // FileList object
    if(files.length>4){
      $( "#alert-files-size" ).fadeIn( "slow", function() {
      });
      setTimeout(function(){ 
        $( "#alert-files-size" ).fadeOut( "slow", function() {
        });
      }, 5000);
      return;
    }

    // Cantidad de div
    var divs = parent.querySelectorAll('div');
    var idsElements = [];
    let cont = 1;
    for(var i=0; i<divs.length; i=i+2){
          needElements = divs[i].id.slice(0,-1);
          idsElements.push(needElements+(cont++));
    }

    var cantidad = divs.length;


    if(cantidad==0){
      var addClass = "one-image";
      if(files.length==2){
        addClass = "two-image";
      }else if(files.length==3){
        addClass = "two-image";
      }else if(files.length==4){
        addClass = "four-image";
      }
      writeImageDOM(files, addClass, idsElements,'');
    }else if(cantidad==2){
      if(files.length==1){
        addClass = "two-image";
        writeImageDOM(files, addClass, idsElements,'');
      }else if(files.length==2){
        addClass = "tree-image";
        writeImageDOM(files, addClass, idsElements,'two-image');
      }
    }else if(cantidad==4){
      if(files.length==1){
        addClass = "tree-image";
        writeImageDOM(files, addClass, idsElements,'two-image');
      }else if(files.length==2){
        addClass = "four-image";
        writeImageDOM(files, addClass, idsElements,'');
      }
    }else if(cantidad==6){
      if(files.length==1){
        addClass = "four-image";
        writeImageDOM(files, addClass, idsElements,'');
      }
    }
    else if(cantidad==8){
      $( "#alert-files-size" ).fadeIn( "slow", function() {
      });
      setTimeout(function(){ 
        $( "#alert-files-size" ).fadeOut( "slow", function() {
        });
      }, 5000);
      return;
    }   
  }
  
document.getElementById('image-file').addEventListener('change', loadImagePos, false);

function writeImageDOM(files,addClassImage, idsElements,special){
    if(idsElements.length!=0){
        for(let j=0; j<idsElements.length; j++){
          if(special==''){
            $('#'+ idsElements[j]).removeAttr("class");
            $('#'+ idsElements[j]).addClass(addClassImage);
          }else{
            $('#'+ idsElements[j]).removeAttr("class");
            $('#'+ idsElements[j]).addClass(special);
            special = '';
          }
        }
    }

    // Loop through the FileList and render image files as thumbnails.
    for (var  i=0,j=idsElements.length+1, f; f = files[i]; j++, i++) {
    
      if (!f.type.match('image.*')){
        continue;
      }

      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile,j){
        return function(e){
          // Render thumbnail.
            $('#container-image-publication').append(
              `<div id="image-${j}" class="${addClassImage}" style="background-image: url(${e.target.result})">
                  <div onclick='deleteImagePost("image-${j}")'>
                      <img src="icons/close.svg" alt="" class="delete">
                  </div>
                  <img src="${e.target.result}" class="send-attracted"> 
              </div>`
            )
            if(files.length==3){
              addClassImage = "tree-image";
            }
        };
      })(f,j);
      
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      $('#btn-post').removeClass('disabled');
      $('#btn-post').attr('disabled',false);
      $('#btn-post').attr('onclick','sendElementsNormal()');
    }

}


function deleteImagePost(idRemove){
  $('#'+idRemove).remove();

  var parent = document.querySelector('#container-image-publication');

  var divs = parent.querySelectorAll('div');

  var idsElements = [];
  let contd = 1;
  let contid = 1;
  let contOn = 1;
  for(var i=0; i<divs.length; i=i+2){
    $('#'+divs[i].id).attr('id',`image-${(contd++)}`);
    $(divs[i+1]).attr('onclick',`deleteImagePost("image-${contOn++}")`);
    idsElements.push(`image-${(contid++)}`);
  }

  if(divs.length==0){
    $('#survey').removeClass('disabled');
    $('#survey').attr('onclick','showsurveyElement("placeholder-8h7gt")');
  }else if(divs.length==2){
    let changeClass = 'one-image';
    changeClassImage(changeClass,idsElements,'');
  }else if(divs.length==4){
    let changeClass = 'two-image';
    changeClassImage(changeClass,idsElements,'');
  }else if(divs.length==6){
    let changeClass = 'tree-image';
    changeClassImage(changeClass,idsElements,'two-image');
  }
}

function changeClassImage(changeClass,idsElements, special){
  for(let i=0; i<idsElements.length; i++){
    if(special==''){
    $('#'+idsElements[i]).attr('class',`${changeClass}`);
    }else{
      $('#'+idsElements[i]).attr('class',`${special}`);
      special = '';
    }
  }
}

function hideAlertFiles(){
  $( "#alert-files-size" ).fadeOut( "slow", function() {
  });
}

function showModal(srcImage,iCome,idFather){
  if(iCome=='modal'){
    $('#modal-comments').modal('hide');
    $('#modal-image').modal('show');
    $('#showImage').attr('src',`${srcImage}`);
    $('#btn-close').attr('onclick','returnMeModalComment()')
  }else{
    $('#showImage').attr('src',`${srcImage}`);
  $('#modal-image').modal('show');
  }
}

function returnMeModalComment(){
  console.log("retorne");
  $('#modal-image').modal('hide');
  $('#modal-comments').modal('show');
  $('#btn-close').removeAttr('onclick');
}

function sendElementsNormal(){
  var dataPublicacion = {
    'Description': '',
    'Pictures': '', 
    'Likes': '',
    'Comentarios':''
  }

  var node = document.getElementById('rol-text');
  descriptionPublication = node.innerHTML
  dataPublicacion.Description = descriptionPublication;
  
  var parent = document.querySelector('#container-image-publication');
  var divs = parent.querySelectorAll('div');

  var cont = 1;
  let picturesJSON = {};
  for(var i=0; i<divs.length; i=i+2){
    var elementComplete = `${$('#'+divs[i].id).css("background-image")}`;
    elementComplete = elementComplete.slice(5,-2);
    picturesJSON['image-'+ cont] = elementComplete;
    cont++;
  }

  dataPublicacion.Pictures = picturesJSON;
  dataPublicacion.Likes = 0;
  dataPublicacion.Comentarios = 0;
  child = document.getElementById('container-publications-makes').firstChild; 
  var firstchildCode;
  if(child.id==undefined){
    firstchildCode =0;
  }else{
    diff = child.id.length - 25;
    console.log(diff);
    firstchildCode =  child.id.slice(-diff);
    firstchildCode = parseInt(firstchildCode) + 1;
  }
  
  $('#container-publications-makes').prepend(
    `<div id="information-publications-${firstchildCode}" class="row information-publications">
    <div class="col-xl-1">
        <img src="img/new/logo.jpg" style="border-radius: 50%" width="50px;" alt="">
    </div>
    <div class="col-xl-10">
        <label class="name-company-p">Nissan Company</label><br>
        <label class="email-direction">nissanCompany@gmail.com</label>
        <hr>
    </div>
    <div class="col-xl-1">
        <svg viewBox="0 0 24 24" class="icons-actions"><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>
    </div>
    <div id="description-publication-${firstchildCode}" class="col-lx-12 ">
        ${(dataPublicacion.Description=='')?'':dataPublicacion.Description}
    </div>
    ${comprobatePostImage(dataPublicacion.Pictures,firstchildCode)}
    
    <div class="col-xl-12">
            <span onclick="showCommentPublication('information-publications-${firstchildCode}')"><svg viewBox="0 0 24 24" class="icons-actions"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
            <label class="number-actions">${dataPublicacion.Comentarios}</label></span>
            <svg viewBox="0 0 24 24" class="icons-actions"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
            <label class="number-actions">${dataPublicacion.Likes}</label>
    </div>
    </div>`
  );
  
  $('#rol-text').empty();
  $('#container-image-publication').empty();
  $('#btn-post').attr('disabled',true);
  $('#btn-post').addClass('disabled')
  $('#placeholder-8h7gt').css('display','block');
  $('#survey').removeClass('disabled');
  $('#survey').attr('onclick','showsurveyElement("placeholder-8h7gt")');
}

function getElementByClass(JSONPictures){
  var addClass, special = '';
  var lengthSrc = Object.keys(JSONPictures).length;
  if(lengthSrc==1){
    addClass = 'one-image';
    special = '';
  }else if(lengthSrc==2){
    addClass = 'two-image';
    special = '';
  }else if(lengthSrc==3){
    addClass = 'tree-image';
    special = 'two-image';
  }else if(lengthSrc==4){
    addClass = 'four-image';
    special = '';
  }

  let valuesPictures = Object.values(JSONPictures);
  var acumulateHTML = '';
  for(let i=0; i<valuesPictures.length; i++){
    if(special==''){
      acumulateHTML+= `<div id="addClass" class="${addClass}" onclick="showModal('${valuesPictures[i]}')" style="background-image: url(${valuesPictures[i]})"> 
        </div>`      
    }else{
      acumulateHTML+= `<div id="addClass" class="${special}" onclick="showModal('${valuesPictures[i]}')" style="background-image: url(${valuesPictures[i]})"> 
        </div>`
      special = '';
    }
  }

  return acumulateHTML;

}

function comprobatePostImage(JSONPictures,firstchildCode){
  var yes = '';
  if(Object.keys(JSONPictures).length!=0){
    yes = `<div id="container-image-divs-${firstchildCode}" style='margin-left: 88px;'>
      ${getElementByClass(JSONPictures)}
    </div>`;
  }else{
    yes = '';
  }

  return yes;
}


function showsurveyElement(idChangeText){
  document.getElementById(idChangeText).innerHTML = 'Haz una Pregunta';

  for(var i=0; i<24; i++){
    $('#hours').append(
      `<option value="${i}">${i} Horas</option>`
    );
  }

  for(var i=0; i<60; i++){
    $('#minutes').append(
      `<option value="${i}">${i} Minutos</option>`
    );
  }

  $('#survey-container').addClass('border');
  $('#survey-container').append(
    `<div id="container-element-survey">
      <img src="icons/close-blue.svg" class="delete close-survey" onclick="closeSurvey()" alt="">
      <p class="p-inputs" style="margin-top: 45px;">Opcion 1</p>
      <input type="text" class="inputs-survey form-control rounded-input-text" placeholder='Opcion 1'>

      <p class="p-inputs">Opcion 2</p>
      <input type="text" class="inputs-survey form-control rounded-input-text" placeholder='Opcion 2'><button id="more" class="add-more" onclick="addOneElement('more',2)">+</button>
      <div id="more-option">

      </div>
      <div>
        <label class="p-inputs">Duracion de la Encuesta</label><br>
        <select name="" class='form-control duration-select rounded-input-text' id="days">
            <option value="0">0 Dias</option>
            <option value="1">1 Dias</option>
            <option value="2">2 Dias</option>
            <option value="3">3 Dias</option>
            <option value="4">4 Dias</option>
            <option value="5">5 Dias</option>
            <option value="6">6 Dias</option>
        </select>
        <select name="" class='form-control duration-select rounded-input-text' id="hours">
            <option value="0">0 horas</option>
        </select>
        <select name="" class='form-control duration-select rounded-input-text' id="minutes">
            <option value="0">0 Minutos</option>
        </select>
      </div>
    </div>`
  );

  $('#image-file').attr('disabled',true);
  $('#label-pictures').addClass('disabled');
  $('#label-pictures').attr('onclick',''); 
}


function addOneElement(id, numberNext){
  $('#'+id).remove();
  let forAdd = `<button id="${id}" class="add-more" onclick="addOneElement('${id}',${numberNext+1})">+</button>`
  $('#more-option').append(
    `<p class="p-inputs">Opcion ${numberNext+1}</p>
    <input type="text" class="inputs-survey form-control rounded-input-text" placeholder='Opcion ${numberNext+1}'>${(numberNext+1==4?'':forAdd)}`
  );
}

function closeSurvey(){
  $('#container-element-survey').remove();
  $('#survey-container').removeClass('border');
  $('#label-pictures').attr('onclick','disableOptionSurvey()');
  $('#image-file').attr('disabled',false);
  $('#label-pictures').removeClass('disabled');
  document.getElementById('rol-text').innerHTML = '';
  document.getElementById('placeholder-8h7gt').innerHTML = '¿Qué estás pensando, Jorge Arturo?';
  $('#placeholder-8h7gt').css('display','block');
}

function disableOptionSurvey(){
  $('#survey').attr('onclick','');
  $('#survey').addClass('disabled');
}


function fillListCategory(){
  let categorys = [
    "Arte","Bebes","Libros","Cámaras y Foto","Teléfonos celulares y accesorios",
    "Ropa", "Zapatos y accesorios","Computadoras / Tabletas y Redes","DVD y películas",
    "Salud y Belleza","Joyería","Relojes","Música","Cerámica y vidrio","Bienes raíces",
    "Sellos","Juguetes y pasatiempos","Viajar","Videojuegos", "Consolas"];

    for(let i=0; i<categorys.length; i++){
      $('#list-desordered').append(`
        <li class="item-list">${categorys[i]}</li>
      `);
    }
}

function createFieldsProducts(){
  $('#fields-add-product').append(
      `<div id="fields-add-product">
            <div class="row" style="padding: 50px 25px 0px 25px;">
                    <label class="add-pictures-label">Detalles del Producto</label><br>
                  </div>
                <div class="row" style="padding: 25px 10px 0px 120px;">
                  <div class="col-xl-6" style="padding: 20px 0px;">
                    <p class="p-inputs products">Titulo</p>
                    <input type="text" class="form-control products rounded-input-text" placeholder='Titulo del Producto'>
                    <p class="p-inputs products">Subtitulo</p>
                    <input type="text" class="form-control products rounded-input-text" placeholder='Subtitulo'>
                    <p class="p-inputs products">Marca</p>
                    <input type="text" class="form-control products rounded-input-text" placeholder='Marca'>
                    <p class="p-inputs products">Modelo</p>
                    <input type="text" class="form-control products rounded-input-text" placeholder='Modelo'>
                  </div>
                  <div class="col-xl-6" style='height: 540px;'>
                    <div class="categary-product">
                        <ul id="list-desordered" size="8" tabindex="0" aria-label="Categories" role="listbox">
                        </ul>
                    </div>
                  </div>
                </div>
              <div class="row" style="padding: 0px 25px 15px 25px;">
                <label class="add-pictures-label">Descripcion del Producto</label><br>
              </div>
              <div class="row">
                <div class="col-xl-12">
                    <textarea id="editor1">
                    </textarea>
                </div>
              </div>
              <div class="row" style="padding: 50px 25px 15px 25px;">
                <label class="add-pictures-label">Agregar Fotografias del Producto</label><br>
              </div>
              <div id="products-images-fill" class="row container-images-product">
                <div id="pimage-1" class="col-xl-6 image-products-divs" style="border-right: 1px solid #cfcfcf">
                    <label class="add-photos" for="image-product">Agregar Fotografias</label>
                    <p class="message-limit text-center">Agrege hasta 10 fotografias de su producto, Recuerden una buena imagen, vende su producto.</p>
                </div>
                <span id="container-images-fill" class="col-xl-6" style="padding: 0;">
                    <div id="pimage-2" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-3" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-4" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-5" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-6" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-7" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-8" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-9" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                    <div id="pimage-10" class="col-xl-4 other-images image-products-divs"><i class="far fa-file-image"></i></div>
                </span>
              </div>
        </div>`
    );

  fillListCategory()

  $('html, body').animate({
      scrollTop: $("#fields-add-product").offset().top
      }, 1000);

      CKEDITOR.replace( 'editor1', {
        toolbar: [
          { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
          { name: 'styles', items: [ 'Styles', 'Format' ] },
          { name: 'basicstyles', items: [ 'Bold', 'Italic']},
          { name: 'paragraph', items: [ 'NumberedList', 'BulletedList']}
        ],
        
      } );

      $('#add-remove-fields').empty();
      $('#add-remove-fields').append(
        `<div>
        <button id="more" class="alert-message add-more" onclick="removeFieldsProducts()" style="top: -20.6px;
        left: -393px;">Remover Campos <img src="icons/close-simple.svg" width="20px" alt=""></button>
        </div>`
      );

}


function removeFieldsProducts(){
  $('#add-remove-fields').empty();
  $('#add-remove-fields').append(
      `<button id="more" class="alert-message add-more" onclick="createFieldsProducts()" style="top: -20.6px;
      left: -393px;">Agregar Nuevos Productos +</button>`
      );
  $('#fields-add-product').empty();

  $('html, body').animate({
    scrollTop: $("#add-remove-fields").offset().top
    }, 1000);
}

function addImageFill(evt) {
  var files = evt.target.files; // FileList object
  var parent = document.querySelector('#products-images-fill');
  var divs = parent.querySelectorAll('div');
  var cont = 0;
  // Loop through the FileList and render image files as thumbnails.
  for (let i = 0,j=0; i<10 && j<files.length; i++) {
        
    if($('#'+divs[i].id).css("background-image")=='none'){
      f=files[j];

      // Only process image files.
      if (!f.type.match('image.*')){
        continue;
      }

      var reader = new FileReader();

      reader.onload = (function(theFile){
        return function(e){
        // Render thumbnail.
              $('#'+divs[i].id).empty();
              $('#'+divs[i].id).append(`<img src="icons/close.svg" onclick="refillContainers('${divs[i].id}')" class="delete remove-image-product">`);
              $('#'+divs[i].id).css("background-image",`url(${e.target.result})`);
          };
        })(f);

      // Read in the image file as a data URL.
        reader.readAsDataURL(f);
        j++;
      }
      cont = i;  
    }

  if(cont!=9){
    $('#'+divs[cont+1].id).empty(); 
    $('#'+divs[cont+1].id).append(`<label for="image-product" class="add-photos label-imgother">Agregar Imagen</label>`);
  }

  $('#'+divs[cont].id).addClass('last');
}

document.getElementById('image-product').addEventListener('change', addImageFill, false);

function refillContainers(idelementsRemove){
  $('#'+idelementsRemove).empty();
  $('#'+idelementsRemove).removeAttr("style");

  var parent = document.querySelector('#products-images-fill');
  var divs = parent.querySelectorAll('div'); 
  
  var cont;
  var message = false;
  
  if($('#'+idelementsRemove).hasClass('last')){
    for(var i=0; i<(divs.length-1); i++){
      if(divs[i+1].id==idelementsRemove){
        $('#'+divs[i].id).addClass('last');
        cont = i+1;
        console.log("entro");
        break;
      }
      $('#'+divs[i].id).removeClass('last');
    }
  }else{
    for(var i=0; i<(divs.length); i++){
      if($('#'+divs[i].id).css("background-image")=='none'){
        for(var j=i; j<(divs.length-1); j++){
          if($('#'+divs[j+1].id).css("background-image")!='none'){
            $('#'+divs[j].id).empty();
            $('#'+divs[j].id).append(`<img src="icons/close.svg" onclick="refillContainers('${divs[j].id}')" class="delete remove-image-product">`);
            $('#'+divs[j].id).css("background-image",$('#'+divs[j+1].id).css("background-image"));
            cont = j+1;
          }
        }
        break;   
      }
    }
  }

  

  if(cont == undefined){
    cont=0;
    message =true;
  }else{
    $('#'+divs[cont-1].id).addClass('last');
  }
  
  for(var i=cont,add=true; i<divs.length; i++){
    if(add){
      if(message){
        $('#'+divs[i].id).empty();
        $('#'+divs[i].id).removeAttr("style");
        $('#'+divs[i].id).append(`<label class="add-photos" for="image-product">Agregar Fotografias</label>
        <p class="message-limit text-center">Agrege hasta 10 fotografias de su producto, Recuerden una buena imagen, vende su producto.</p>`);
      add = false;
      }else{
        $('#'+divs[i].id).empty();
        $('#'+divs[i].id).removeAttr("style");
        $('#'+divs[i].id).append(`<label for="image-product" class="add-photos label-imgother">Agregar Imagen</label>`);
        $('#'+divs[i].id).removeClass('last');
        add = false;
      }
    }else{
      $('#'+divs[i].id).empty();
      $('#'+divs[i].id).removeAttr("style");
      $('#'+divs[i].id).append(`<i class="far fa-file-image">`);
      $('#'+divs[i].id).removeClass('last');
    }
  }  
}

function showCommentPublication(idElemetsFather){
  var parent = document.querySelector('#'+idElemetsFather);
  var divs = parent.querySelectorAll('div');
  
  console.log(divs);
  $('#body-modal-images').empty();
  $('#modal-comments').modal('show');
  $('#body-modal-images').append(`
  <div class="row" style="width: 690px;">
    <div class="col-xl-1">
        <img src="img/new/logo.jpg" style="border-radius: 50%" width="50px;" alt="">
    </div>
    <div class="col-xl-11">
        <label class="name-company-p">Nissan Company</label><br>
        <label class="email-direction">nissanCompany@gmail.com</label>
        <hr>
    </div>
  </div>
  <div id="description-publication" class="col-lx-12 ">
        <p>${document.getElementById(divs[3].id).innerHTML}</p>
  </div>
  <div class="row" style="width: 650px;
  padding: 0 0px 0px 66px;">
    <div class="col-xl-12">
    ${changeEventModal(divs[4].id,idElemetsFather)}
    </div>
  </div>
  <div style="padding: 20px 30px;">
  <div class="row comment-row">
  <div class="col-xl-1">
      <img src="img/naruto.jpg" class="rounded-circle thumbails" style="width: 65px; padding-top: 3px;" alt="">
  </div>
  <div class="col-xl-11" style="padding-left: 32px;">
      <label class="name-company-p">Uzumaki Naruto</label><br>
      <label class="email-direction">uzumakiDeKonoha@gmail.com</label>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta iure, et blanditiis, porro dolor aspernatur quia alias pariatur aperiam debitis odit dolorem, necessitatibus officiis.</p>
  </div>
  </div>
    <div class="row" style="padding-left: 90px;">
      <a href="#" style="margin-right: 10px;">Responder</a>
      <a href="#">Me Gusta</a>
    </div>
  </div>
  `);


}

function changeEventModal(idfather,idElemetsFather){
    var parent = document.querySelector('#'+idfather);
    var divs = parent.querySelectorAll('div');
    var acumulateHTML='';
    console.log(divs[0].style.backgroundImage);
    for(var i=0; i<divs.length; i++){
      elementComplete = divs[i].style.backgroundImage;
      elementComplete = elementComplete.slice(5,-2);
      acumulateHTML += `<div id="addClass" class="${divs[i].className}" onclick="showModal('${elementComplete}','modal','${idElemetsFather}')" style="background-image: url(${elementComplete})"> 
      </div>\n`;
    }
    console.log(acumulateHTML);
    return acumulateHTML;
  }


function statePromotion(){
  console.log($('#checkbox-active-promotion').is(':checked'));
  if($('#checkbox-active-promotion').is(':checked')){
    $('#label-promotions').html(`Promocion en Vigencia`);
    $('#details-promotions').modal('show');
    for(var i=0; i<8; i++){
      $('#days').append(`<option value(${i})>${i}</option>`);
    }
  
    for(var i=0; i<24; i++){
      $('#hours').append(`<option value(${i})>${i}</option>`);
    }
  
    for(var i=0; i<60; i++){
      $('#minutes').append(`<option value(${i})>${i}</option>`);
    }
  }else{
    $('#label-promotions').html(`Promocion Desactivada`);
  }
}


function countDown(){
  var end = new Date('9/12/2019 4:30 PM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0){

            clearInterval(timer);
            document.getElementById('countDown-id').innerHTML = 'Expiro';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countDown-id').innerHTML = days + ':';
        document.getElementById('countDown-id').innerHTML += hours + ':';
        document.getElementById('countDown-id').innerHTML += minutes + ':';
        document.getElementById('countDown-id').innerHTML += seconds + ' seg';
    }

    timer = setInterval(showRemaining, 1000);
}
countDown();


function decrement() {
  value = parseInt($('#value-size').val());
  if(1<value){
    $('#value-size').val(value-1);
  }	
}	

function increment() {
  value = parseInt($('#value-size').val());
  if(value<20){
    $('#value-size').val(value+1);
  }
}


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

function hideNotificationProfile(){
  $('#container-left').removeClass('col-9');
  $('#v-pills-home').removeClass('show');
  $('#v-pills-home').removeClass('active');
  $('#show-profile').hide();
  $('#container-left').addClass('container-fluid');
  $('#v-pills-profile').addClass('show');
  $('#v-pills-profile').addClass('active');

  
}

function returnPublication(){
  $('#container-left').removeClass('container-fluid');
  $('#v-pills-profile').removeClass('show');
  $('#v-pills-profile').removeClass('active');
  $('#show-profile').show();
  $('#container-left').addClass('col-9');
  $('#v-pills-home').addClass('show');
  $('#v-pills-home').addClass('active');
}


function createPromotionalSheet(){
  $('#promotional-sheet').modal('show');
}


	


/*divs[i].style.backgroundImage



*/

