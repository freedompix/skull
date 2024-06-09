function updateSceneCoordinates()
{

}


function angleBetweenTwoPoints222(x1,z1,x2,z2)
{
//let x1 = /* your first x coordinate */;
//let z1 = /* your first z coordinate */;
//let x2 = /* your second x coordinate */;
//let z2 = /* your second z coordinate */;

// Calculate the direction vectors from the origin to each point
let vector1 = new BABYLON.Vector3(x1, 0, z1);
let vector2 = new BABYLON.Vector3(x2, 0, z2);

// Calculate the angle between the y-axis and the vectors
let angleRadians1 = Math.atan2(vector1.z, vector1.x);
let angleRadians2 = Math.atan2(vector2.z, vector2.x);

// Find the absolute difference between the angles
let angleDifference = Math.abs(angleRadians2 - angleRadians1);

// Convert the angle from radians to degrees
let angleDegrees = angleDifference * (180 / Math.PI);

//console.log("Angle between the y-axis and the two points:", angleDegrees, "degrees");
//console.log("Angle between the y-axis and the two points:", angleDifference, "angleDifference");

return angleDegrees;
}

function detectAngleBetweenTwoPoints(x1,y1,x2,y2) {
  // Calculate the difference in x and y coordinates
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // Use Math.atan2 to find the angle in radians
  const angle = Math.atan2(deltaY, deltaX);

  return angle;
}





function sceneRenderLoop(){

if(window.appUIState['allModelsLoaded']==true){
window.world.step(1 / 60);	

}

window.scene.render();
}
