function setCameraMode(id)
{
	
	
if (id == 1)
{
window.appUIState['cameraMode']=1;
window.scene.activeCamera = window.scene.getCameraByID('camera1'); 	
window.scene.getMeshByID('cycler_highlight_orbit').setEnabled(true);
window.scene.getMeshByID('SpaceShip').setEnabled(true);
window.scene.getMeshByID('Cabin').setEnabled(false);

document.getElementById('story_elements').style.display='block';
showSlide('0');
window.appUIState['useCustomTime'] = false;
}
	
if (id == 2)
{
window.appUIState['cameraMode']=2;	
window.scene.activeCamera = window.scene.getCameraByID('camera2');
window.scene.getMeshByID('cycler_highlight_orbit').setEnabled(false);
window.scene.getMeshByID('SpaceShip').setEnabled(false);
window.scene.getMeshByID('Cabin').setEnabled(true);
document.getElementById('story_elements').style.display='none';
window.appUIState['useCustomTime'] = false;
}	
	
	
}



function returnData(unixtime) {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let date = new Date(unixtime * 1000); // Convert Unix timestamp to milliseconds
  
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate();
  
  let formattedDate = `${year} ${month} ${day}`;
  
  
  
  return formattedDate;
}











function closeLoader()
{
document.getElementById('loader1').style.display='none';
document.getElementById('loader2').style.display='none';
document.getElementById('loaderBG').style.display='none';

}

function UIinit()
{
//languages
document.getElementById('language_en').addEventListener("click", function(){changeLanguage('en')});
document.getElementById('language_es').addEventListener("click", function(){changeLanguage('es')});
document.getElementById('language_ar').addEventListener("click", function(){changeLanguage('ar')});

//slides
document.getElementById('timelinePoint1').addEventListener("click", function(){showSlide('1')});
document.getElementById('timelinePoint2').addEventListener("click", function(){showSlide('2')});
document.getElementById('timelinePoint3').addEventListener("click", function(){showSlide('3')});
document.getElementById('timelinePoint4').addEventListener("click", function(){showSlide('4')});
document.getElementById('timelinePoint5').addEventListener("click", function(){showSlide('5')});


//
document.getElementById('arrow1').addEventListener("click", function(){arrow_left();});
document.getElementById('arrow2').addEventListener("click", function(){arrow_right();});

document.getElementById('slide0').style.left = '5vw';
document.getElementById('slide1').style.left = '8vw';
document.getElementById('slide2').style.left = '8vw';
document.getElementById('slide3').style.left = '8vw';
document.getElementById('slide4').style.left = '8vw';
document.getElementById('slide5').style.left = '8vw';


document.getElementById('camera1button').addEventListener("click", function(){setCameraMode(1);});
document.getElementById('camera2button').addEventListener("click", function(){setCameraMode(2);});

showSlide(0);
}


function UIupdate()
{
if(window.appUIState['soundPlay'] == true)
{
document.getElementById('soundBG').play();
}
window.requestAnimationFrame(UIupdate);
}


function playAnimation(timeFrom,TimeTo, durationMs, unixTimeStartMs)
{

}



function returnArrayOfValues(x1, x2, totalValues) {
  const values = [];

  for (let i = 0; i < totalValues; i++) {
    const t = i / (totalValues - 1);
    const easedValue = easeInOut(t);
    const interpolatedValue = x1 + easedValue * (x2 - x1);
    values.push(interpolatedValue);
  }

  return values;
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}


function showSlide(id)
{
//alert(id);
if(window.appUIState['allModelsLoaded']==true)window.scene.stopAllAnimations();	
let speedCamera1 = 180;
let animationTotalFrames = 40;

//let animationTotalFrames = 20;
//let speedCamera1 = 60;


document.getElementById('timelinePoint1Big').style.display = 'none';
document.getElementById('timelinePoint2Big').style.display = 'none';
document.getElementById('timelinePoint3Big').style.display = 'none';
document.getElementById('timelinePoint4Big').style.display = 'none';
document.getElementById('timelinePoint5Big').style.display = 'none';
if (id!=0) document.getElementById('timelinePoint' + id + 'Big').style.display = 'block';

if (id==0)
{
    moveCurrentSlide(0);
    moveSlideRight(1);
    moveSlideRight(2);
    moveSlideRight(3);
    moveSlideRight(4);
    moveSlideRight(5);
}

if (id==1)
{
  moveSlideLeft(0);
  moveCurrentSlide(1);
  moveSlideRight(2);
  moveSlideRight(3);
  moveSlideRight(4);
  moveSlideRight(5);
}

if (id==2)
{
  moveSlideLeft(0);
  moveSlideLeft(1);
  moveCurrentSlide(2);
  moveSlideRight(3);
  moveSlideRight(4);
  moveSlideRight(5);
}

if (id==3)
{
  moveSlideLeft(0);
  moveSlideLeft(1);
  moveSlideLeft(2);
  moveCurrentSlide(3);
  moveSlideRight(4);
  moveSlideRight(5);
}

if (id==4)
{
  moveSlideLeft(0);
  moveSlideLeft(1);
  moveSlideLeft(2);
  moveSlideLeft(3);
  moveCurrentSlide(4);
  moveSlideRight(5);
}

if (id==5)
{
  moveSlideLeft(0);
  moveSlideLeft(1);
  moveSlideLeft(2);
  moveSlideLeft(3);
  moveSlideLeft(4);
  moveCurrentSlide(5);
}
window.appUIState['currentSlide'] = id;


if (id==0)
{
window.appUIState['useCustomTime'] = false;
window.appUIState['customTime']=0;

	 
if(window.appUIState['allModelsLoaded']==true){
	
window.scene.stopAllAnimations();	
window.scene.getCameraByID('camera1').spinTo("alpha", -1 * Math.PI/2, 60,360);
window.scene.getCameraByID('camera1').spinTo("beta", -1 * Math.PI/2, 60,360);
window.scene.getCameraByID('camera1').spinTo("target", new BABYLON.Vector3(0, 0, 0), 60,360);
window.scene.getCameraByID('camera1').spinTo("radius", 100, 60,360);
}
}

if (id==1)
{
	
if(window.appUIState['useCustomTime'] == true){
	
window.appUIState['useCustomTime'] = true;	


let keyframeValueArray = returnArrayOfValues(window.appUIState['customTime'], 0, animationTotalFrames);  
  
for(i=0; i<keyframeValueArray.length; i ++)  
{
 let tempKeyframe = keyframeValueArray[i];
 let tempTime = i;
 setTimeout(function(){window.appUIState['customTime']=tempKeyframe}, 16 + 16* tempTime);	
}

}	




	
if(window.appUIState['useCustomTime'] == false){
	
	
	
window.appUIState['useCustomTime'] = true;	

let keyframeValueArray = returnArrayOfValues(window.appUIState['customTimeFake'], 1, animationTotalFrames);  
  
for(i=0; i<keyframeValueArray.length; i ++)  
{
 let tempKeyframe = keyframeValueArray[i];
 let tempTime = i;
if(tempKeyframe!=1) setTimeout(function(){window.appUIState['customTime']=tempKeyframe}, 16 + 16* tempTime);	
if(tempKeyframe==1) setTimeout(function(){window.appUIState['customTime']=0}, 16 + 16* tempTime);	

}

}



window.appUIState['customTime']=0;


//Object { _isDirty: false, _x: "14.391660804703037", _y: 0, _z: "" }
window.scene.stopAllAnimations();
window.scene.getCameraByID('camera1').spinTo("alpha", 0.1898735239445127, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("beta" , 1.5215177373943045, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("target", new BABYLON.Vector3(14.391660804703037, 0, -0.421154193566778), speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("radius", 7, speedCamera1,360);


}

if (id==2)
{
window.appUIState['useCustomTime'] = true;
  //window.appUIState['customTime']=0.01;

let keyframeValueArray = returnArrayOfValues(window.appUIState['customTime'], 0.01, animationTotalFrames);  
  
for(i=0; i<keyframeValueArray.length; i ++)  
{
 let tempKeyframe = keyframeValueArray[i];
 let tempTime = i;
 setTimeout(function(){window.appUIState['customTime']=tempKeyframe}, 16 + 16* tempTime);	
}



window.scene.getCameraByID('camera1').spinTo("alpha", -0.09537452848115872, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("beta" , 1.2897085843358793, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("target", new BABYLON.Vector3(13.31, 0, 6.93), speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("radius", 12.5, speedCamera1, 360);

  
  
  
  //
  //5475
}

if (id==3)
{
  window.appUIState['useCustomTime'] = true;
//  window.appUIState['customTime']=0.02;

let keyframeValueArray = returnArrayOfValues(window.appUIState['customTime'], 0.02, animationTotalFrames);  
  
for(i=0; i<keyframeValueArray.length; i ++)  
{
 let tempKeyframe = keyframeValueArray[i];
 let tempTime = i;
 setTimeout(function(){window.appUIState['customTime']=tempKeyframe}, 16 + 16* tempTime);	
} 
  
  
  
//window.scene.getCameraByID('camera1').spinTo("alpha", -0.6, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("alpha", 0.08020162643914232, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("beta" ,  1.37, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("target", new BABYLON.Vector3(9.467117795276282, 0, 13.536453068133632), speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("radius", 12.5, speedCamera1, 360);  
  

  
  
  
}



if (id==4)
{
  window.appUIState['useCustomTime'] = true;
 // window.appUIState['customTime']=0.03;

let keyframeValueArray = returnArrayOfValues(window.appUIState['customTime'], 0.03, animationTotalFrames);  
  
for(i=0; i<keyframeValueArray.length; i ++)  
{
 let tempKeyframe = keyframeValueArray[i];
 let tempTime = i;
 setTimeout(function(){window.appUIState['customTime']=tempKeyframe}, 16 + 16* tempTime);	
}
 
 

 
//window.scene.getCameraByID('camera1').spinTo("alpha", -0.1132753788350243, speedCamera1,360);
//window.scene.getCameraByID('camera1').spinTo("beta" ,  1.2608743057440162, speedCamera1,360);

window.scene.getCameraByID('camera1').spinTo("alpha", 0.17779758274335256, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("beta" ,  1.1566730983056435, speedCamera1,360);



window.scene.getCameraByID('camera1').spinTo("target", new BABYLON.Vector3(2.2539066037141127, 0, 19.27), speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("radius", 28, speedCamera1, 360);  
 
 
}

if (id==5)
{
  window.appUIState['useCustomTime'] = true;
//  window.appUIState['customTime']=0.040;


let keyframeValueArray = returnArrayOfValues(window.appUIState['customTime'], 0.04, animationTotalFrames);  
  
for(i=0; i<keyframeValueArray.length; i ++)  
{
 let tempKeyframe = keyframeValueArray[i];
 let tempTime = i;
 setTimeout(function(){window.appUIState['customTime']=tempKeyframe}, 16 + 16* tempTime);	
}


 
//window.scene.getCameraByID('camera1').spinTo("alpha", 1.0505431187367296, speedCamera1,360);
//window.scene.getCameraByID('camera1').spinTo("beta" , 1.315482534118974 , speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("beta" ,   1.1443339439199038, speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("alpha",   0.1791361592191667, speedCamera1,360);



window.scene.getCameraByID('camera1').spinTo("target", new BABYLON.Vector3(-8.365232174316773, 0, 22), speedCamera1,360);
window.scene.getCameraByID('camera1').spinTo("radius", 7, speedCamera1, 360);  
 


}



}





function showSlide2(id)
{

if(window.appUIState['currentSlide'] != id)
{
  //back
if(window.appUIState['currentSlide'] > id)
{
let lastId =  window.appUIState['currentSlide'];
//disable current slide
moveSlideLeft(lastId);
moveCurrentSlide(id);
}

if(window.appUIState['currentSlide'] < id)
{
let lastId =  window.appUIState['currentSlide'];
//disable current slide
//moveSlideLeft(lastId);
moveSlideRight(lastId);
moveCurrentSlide(id);
}

setTimeout(function(){window.appUIState['currentSlide'] = id;}, 800);
//alert(id);

}


}


function changeLanguage(id)
{
//disable all

document.getElementById('slide0_div_en').style.display = 'none';
document.getElementById('slide0_div_es').style.display = 'none';
document.getElementById('slide0_div_ar').style.display = 'none';

document.getElementById('slide1_div_en').style.display = 'none';
document.getElementById('slide1_div_es').style.display = 'none';
document.getElementById('slide1_div_ar').style.display = 'none';

document.getElementById('slide2_div_en').style.display = 'none';
document.getElementById('slide2_div_es').style.display = 'none';
document.getElementById('slide2_div_ar').style.display = 'none';

document.getElementById('slide3_div_en').style.display = 'none';
document.getElementById('slide3_div_es').style.display = 'none';
document.getElementById('slide3_div_ar').style.display = 'none';

document.getElementById('slide4_div_en').style.display = 'none';
document.getElementById('slide4_div_es').style.display = 'none';
document.getElementById('slide4_div_ar').style.display = 'none';

document.getElementById('slide5_div_en').style.display = 'none';
document.getElementById('slide5_div_es').style.display = 'none';
document.getElementById('slide5_div_ar').style.display = 'none';


if (id=='en')
{
  document.getElementById('slide0_div_en').style.display = 'block';
  document.getElementById('slide1_div_en').style.display = 'block';
  document.getElementById('slide2_div_en').style.display = 'block';
  document.getElementById('slide3_div_en').style.display = 'block';
  document.getElementById('slide4_div_en').style.display = 'block';
  document.getElementById('slide5_div_en').style.display = 'block';

}


if (id=='es')
{
  document.getElementById('slide0_div_es').style.display = 'block';
  document.getElementById('slide1_div_es').style.display = 'block';
  document.getElementById('slide2_div_es').style.display = 'block';
  document.getElementById('slide3_div_es').style.display = 'block';
  document.getElementById('slide4_div_es').style.display = 'block';
  document.getElementById('slide5_div_es').style.display = 'block';
}

if (id=='ar')
{
  document.getElementById('slide0_div_ar').style.display = 'block';
  document.getElementById('slide1_div_ar').style.display = 'block';
  document.getElementById('slide2_div_ar').style.display = 'block';
  document.getElementById('slide3_div_ar').style.display = 'block';
  document.getElementById('slide4_div_ar').style.display = 'block';
  document.getElementById('slide5_div_ar').style.display = 'block';
}



}








function moveSlideRight(id)
{
  let lastId=id;
//  document.getElementById('slide' + lastId).style.top ='70vh';
  document.getElementById('slide' + lastId).style.left = '8vw';
  document.getElementById('slide' + lastId).style.opacity ='0';
  document.getElementById('slide' + lastId).style.transform = 'rotate3d(1, 1, 1, 90deg)';
  //setTimeout(function(){document.getElementById('slide' + lastId).style.display = 'none';}, 800);
}

function moveSlideLeft(id)
{
  let lastId=id;
//  document.getElementById('slide' + lastId).style.top ='20vh';
  document.getElementById('slide' + lastId).style.left = '-50vw';
  document.getElementById('slide' + lastId).style.opacity ='0';
  document.getElementById('slide' + lastId).style.transform = 'rotate3d(-1, -1, -1, 80deg)';
//  setTimeout(function(){document.getElementById('slide' + lastId).style.display = 'none';}, 800);
}

function moveCurrentSlide(id)
{
  document.getElementById('slide' + id).style.display = 'block';
//  document.getElementById('slide' + id).style.top ='55vh';
  document.getElementById('slide' + id).style.left = '5vw';
  document.getElementById('slide' + id).style.opacity ='1';
  document.getElementById('slide' + id).style.transform = 'rotate3d(0, 0, 0, 90deg)';
}








function appSetDefaultUI()
{}

function singleButtonSwitchConfig(id)
{
//  alert(id);
document.getElementById( id + 'Button').style.borderColor = "#c65f18";
document.getElementById( id + 'InfoButton').classList.add("buttonnInfoOn");
}





function beforeVr()
{
  //alert('vr');
}

function arrow_left(){

if(window.appUIState['currentSlide'] == 1) {showSlide('0');};
if(window.appUIState['currentSlide'] == 2) {showSlide('1');};
if(window.appUIState['currentSlide'] == 3) {showSlide('2');};
if(window.appUIState['currentSlide'] == 4) {showSlide('3');};
if(window.appUIState['currentSlide'] == 5) {showSlide('4');};

}


function arrow_right(){


  if(window.appUIState['currentSlide'] == 5) {showSlide('0'); return true;};

  if(window.appUIState['currentSlide'] == 4) {showSlide('5');};
  if(window.appUIState['currentSlide'] == 3) {showSlide('4');};
  if(window.appUIState['currentSlide'] == 2) {showSlide('3');};
  if(window.appUIState['currentSlide'] == 1) {showSlide('2');};
  if(window.appUIState['currentSlide'] == 0) {showSlide('1');};
  
}


function returnDate(x) {
  const startDate = new Date('2037-11-19'); // Initial date
  const daysToAdd = Math.round(x * 5478); // Calculate days to add based on x
  const resultDate = new Date(startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // Add days to initial date

  // Format the resultDate to 'dd MMM yyyy' format
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = resultDate.toLocaleDateString('en-US', options);

  return formattedDate;
}





