var cube = document.querySelector('.cube');
var radioGroup = document.querySelector('.radio-group');
var currentClass = '';

var leftHalf = document.querySelector('.leftHalf');
var rightHalf = document.querySelector('.rightHalf');

var cubeFaces = cube.getElementsByClassName('cubeFace');
var openOrClose = false;
// console.log("radio-group = "+radioGroup);
var faceText = document.getElementsByClassName('face-text');

var previousFaceId = null;

function changeSide() {
  if (null !== previousFaceId && openOrClose) {
    closeFace();
    // setTimeout(showBoxFaceOnFaceChange, 1000);
    setTimeout(faceChange, 1000);
  } else if (null !== previousFaceId && !openOrClose) {
    // setTimeout(faceChange, 1000);
    faceChange();
  }
  else {
    faceChange();
  }
}

function faceChange() {

  // console.log("changing face");

  if(radioGroup.querySelector(':checked')){
    // console.log("inside facechange");
    var checkedRadio = radioGroup.querySelector(':checked');
    // console.log("checked radio = "+checkedRadio.value);
    var showClass = 'show-' + checkedRadio.value;
    if ( currentClass ) {
      cube.classList.remove( currentClass );
    }
    cube.classList.add( showClass );
    currentClass = showClass;
  }
}
// set initial side
// changeSide();

function clickFaceToChangeSide(faceId) {
  var radioButtons = radioGroup.getElementsByTagName("input");
  for(var i=0;i<radioButtons.length;i++){
    // console.log("radioButtons[i].textContent = " + radioButtons[i].value);
    if (radioButtons[i].value === faceId){
      // radioGroup.getElementById(faceId).checked = true;
      radioButtons[i].checked = true;
    } else radioButtons[i].checked = false;
  }

  // console.log("faceid inside click side to change face = " + faceId);
  changeSide();
}

function showAllBoxFaceOnFaceChange() {

  // console.log("showing face");

  for (var i = 0; i < cubeFaces.length; i++) {
    if (cubeFaces[i].style.display === "none")
      cubeFaces[i].style.display = "inline";
  }

  // setTimeout(faceChange, 3000);
  // var idElement = document.getElementById(currentFaceId);
  // if (idElement.style.display === "none"){
  //   idElement.style.display = "inline";
  // }
}

function hideOrShowBoxFaceOnFaceClick(faceId) {
  if(currentClass !== "") {
    var idElement = document.getElementById(faceId);
    if (!openOrClose) {
      if (idElement.style.display === "none") {
        idElement.style.display = "inline";
      } else {
        idElement.style.display = "none";
      }
    }
  }
}

function openFace(faceId) {

  // cube.classList.remove("to-initial");
  // cube.classList.add("to-center");

    leftHalf.style.display = "inline";
    rightHalf.style.display = "inline";

    setTimeout(function () {
      leftHalf.classList.remove('close');
      rightHalf.classList.remove('close');
      leftHalf.classList.add('open');
      rightHalf.classList.add('open');
    }, 1);

  openOrClose = true;
}

function closeFace(faceId) {

  console.log("previousID = "+previousFaceId);
  console.log("faceid = " + faceId);

  leftHalf.classList.remove('open');
  rightHalf.classList.remove('open');
  leftHalf.classList.add('close');
  rightHalf.classList.add('close');

  setTimeout(function () {
    leftHalf.style.display = "none";
    rightHalf.style.display = "none";
  }, 1000);

  openOrClose = false;

  setTimeout(showAllBoxFaceOnFaceChange, 1000);
  // setTimeout(showBoxFaceOnFaceChange, 5000);
  if (faceId !== undefined) setTimeout(function () { clickFaceToChangeSide(faceId);}, 1000);

  // cube.classList.remove("to-center");
  // cube.classList.add("to-initial");
}

function operateOnFace(faceId){

  // if (!openOrClose) {
  //   console.log(cubeFaces);

  hideOrShowBoxFaceOnFaceClick(faceId);

    if (!openOrClose) {
      if (currentClass !== "") {
        openFace(faceId);
      } else{
        clickFaceToChangeSide(faceId);
      }
    } else {
      closeFace(faceId);
    }

    // console.log(openOrClose);
    previousFaceId = faceId;
  // }
}

radioGroup.addEventListener( 'change', changeSide );
