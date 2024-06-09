var createScene = function()
{
var scene = new BABYLON.Scene(window.engine);
var canvas = document.getElementById('renderCanvas');


//debugLayer
if (window.appUIState['debug']==true)
{
scene.debugLayer.show();

}

scene.useRightHandedSystem = true;

var cameraType=2;











//var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
//.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.AmmoJSPlugin());




































//CAMERA
//var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, -5,-25), scene);
var camera = new BABYLON.ArcRotateCamera("camera1", 1.57, 0.8, 72, BABYLON.Vector3.Zero(), scene);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));
camera.minZ = 0.01;
//camera.minZ=0.0000001;

camera.attachControl(canvas, false);
camera.inputs.remove(camera.inputs.attached.keyboard);
camera.panningSensibility = 0;

camera.lowerRadiusLimit=1.49;
camera.upperRadiusLimit=350;

//camera.wheelDeltaPercentage = 7;
camera.wheelPrecision = 55;


//camera.limits
//x
//camera.upperAlphaLimit = 3.14/1.9 - 3.14/2 ;
//camera.lowerAlphaLimit = 3.14/-1.9 - 3.14/2 ;

//y
//camera.upperBetaLimit = 3.14/2; //doen
//camera.lowerBetaLimit = 3.14/-1.5; // up












function objToString (obj) {
    return Object.entries(obj).reduce((str, [p, val]) => {
        return `${str}${p}::${val}\n`;
    }, '');
}

var startingPoint;

































//var camera2 = new BABYLON.FreeCamera("camera2", new BABYLON.Vector3(0, 1.5, 4.5), scene);
//camera2.setTarget(new BABYLON.Vector3(0, 1.5, -2.5));
//camera2.fov=1.4;


//scene.createDefaultEnvironment();

//SCENE COLORS

//scene.clearColor = new BABYLON.Color4(0.95, 0.95, 0.95, 0);
//scene.clearColor = new BABYLON.Color3(0.8627450980392157, 0.9058823529411765, 0.9333333333333333);
scene.clearColor = new BABYLON.Color3.FromHexString('#000000');


//scene.autoClear = false;
scene.autoClear = true;

var light1 = new BABYLON.HemisphericLight('light_sky', new BABYLON.Vector3(0, 1, -100), scene);
//var light1 = new BABYLON.HemisphericLight('light_sky', new BABYLON.Vector3(0,4,4), scene);
light1.intensity=1;

light1.diffuse = new BABYLON.Color3(1, 0.7294117647058823, 0.42745098039215684);
light1.diffuse = new BABYLON.Color3.FromHexString('#FFF4D0');


//window.scene.getLightByName('light_sky').diffuse

//window.shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);



//LIGHTS

 // var light2 = new BABYLON.PointLight("light_point_2", new BABYLON.Vector3(10, 3, -2), scene);
 // light2.intensity=40;
 // light2.diffuse=new BABYLON.Color3(1,1,1);
//
// var light4 = new BABYLON.PointLight("light_point_4", new BABYLON.Vector3(-10, 3, -2), scene);
// light4.intensity=20;
// light4.diffuse=new BABYLON.Color3(1,1,1);


// var light3 = new BABYLON.PointLight("light_point_3", new BABYLON.Vector3(6, 6, -5), scene);
// light3.intensity=0.5;
// light3.diffuse=new BABYLON.Color3(1,1,1);


// var light5 = new BABYLON.PointLight("light_point_5", new BABYLON.Vector3(-6, 6, -5), scene);
// light5.intensity=0.5;
// light5.diffuse=new BABYLON.Color3(1,1,1);


// var light4 = new BABYLON.PointLight("light_point_neon", new BABYLON.Vector3(-10, -20, 0), scene);
// light4.intensity=400;
// light4.diffuse=new BABYLON.Color3(0,0.5,1);

// var light5 = new BABYLON.PointLight("light_point_green", new BABYLON.Vector3(-10, -10, 50), scene);
// light5.intensity=400;
// light5.diffuse=new BABYLON.Color3(0,1,0);



//scene.createDefaultEnvironment();
//var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("models/environmentSpecular.env", scene);
//scene.environmentTexture = hdrTexture;

///





//environmentS

var envTexture = new BABYLON.CubeTexture("models/environmentSpecular.env", scene);
//var envTexture = new BABYLON.CubeTexture("models/skybox/skybox", scene);
//var envTexture = new BABYLON.HDRCubeTexture("models/spaichingen_hill_1k.hdr", scene, 512);
//var envTexture = new BABYLON.CubeTexture("models/env/env", scene);

//var envTexture = new BABYLON.CubeTexture("models/Runyon_Canyon_A_2k_cube_specular.dds", scene);


//var envTexture = new BABYLON.CubeTexture("models/country.env", scene);

envTexture.rotationY = 0;
var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
hdrSkyboxMaterial.backFaceCulling = false;
hdrSkyboxMaterial.reflectionTexture = envTexture.clone();
hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
hdrSkyboxMaterial.microSurface = 0.7;
hdrSkyboxMaterial.alpha = 0.3;
hdrSkyboxMaterial.disableLighting = true;
hdrSkybox.material = hdrSkyboxMaterial;
scene.environmentTexture = envTexture;
scene.environmentIntensity=0.5;

//window.scene.getMeshByName('hdrSkyBox').setEnabled(false);
hdrSkybox.setEnabled(false);

//scene.environmentIntensity = 0.55;





var glowLayer = new BABYLON.GlowLayer("glow", scene,{   blurKernelSize: 48});
glowLayer.intensity = 0.35;


  //  var postProcess = new BABYLON.ImageProcessingPostProcess("processing", 1.0, camera);
  //  postProcess.contrast = 2.5;
   // postProcess.exposure = 0.7;

scene.imageProcessingConfiguration.contrast = 1.5;
scene.imageProcessingConfiguration.exposure = 0.9;


        // Set up new rendering pipeline
var pipeline = new BABYLON.DefaultRenderingPipeline("FX", true, scene);


        // Bloom
pipeline.bloomEnabled = true;
pipeline.bloomThreshold = 0.44;
pipeline.bloomThreshold = 0.31;
pipeline.bloomWeight = 0.35;
pipeline.bloomKernel = 25;
pipeline.bloomScale = .75;


pipeline.grainEnabled = true;
pipeline.grain.intensity = 7.2;
pipeline.grain.animated = true;


//abberation

//var lensEffect = new BABYLON.LensRenderingPipeline('lensEffects', {edge_blur: 5.0,  chromatic_aberration: 2.0,  distortion: 0.3}, scene, 1.0, scene.cameras);
//scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline('lensEffects', scene.cameras);





//var xrHelper = scene.createDefaultXRExperienceAsync();





// var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});



// vrHelper.onAfterEnteringVRObservable.add(()=>{
        // if(scene.activeCamera === vrHelper.vrDeviceOrientationCamera){

            // BABYLON.FreeCameraDeviceOrientationInput.WaitForOrientationChangeAsync(1000).then(()=>{
            // }).catch(()=>{
                // alert("Device orientation camera is being used but no sensor is found, prompt user to enable in safari settings");
            // })
        // }
// });






sceneLoadAssets();
return scene;
};



function setUVForPlane(id, x1, y1, x2, y2)
{
  let uvs = window.scene.getMeshByName(id).getVerticesData(BABYLON.VertexBuffer.UVKind);
  let faceUV = new BABYLON.Vector4(x2, y2, x1, y1);


  uvs[0] = faceUV.z;
  uvs[1] = faceUV.w;
  uvs[2] = faceUV.x;
  uvs[3] = faceUV.w;
  uvs[4] = faceUV.x;
  uvs[5] = faceUV.y;
  uvs[6] = faceUV.z;
  uvs[7] = faceUV.y;

  uvs[8] = faceUV.z;
  uvs[9] = faceUV.w;
  uvs[10] = faceUV.x;
  uvs[11] = faceUV.w;
  uvs[12] = faceUV.x;
  uvs[13] = faceUV.y;
  uvs[14] = faceUV.z;
  uvs[15] = faceUV.y;


  window.scene.getMeshByName(id).setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
}

function setUVForBox(id, x1, y1, x2, y2)
{
  let uvs = window.scene.getMeshByName(id).getVerticesData(BABYLON.VertexBuffer.UVKind);
  let faceUV = new BABYLON.Vector4(x2, y2, x1, y1);

for(let i=0; i <=6; i++){
  uvs[0+i] = faceUV.z;
  uvs[1+i] = faceUV.w;
  uvs[2+i] = faceUV.x;
  uvs[3+i] = faceUV.w;
  uvs[4+i] = faceUV.x;
  uvs[5+i] = faceUV.y;
  uvs[6+i] = faceUV.z;
  uvs[7+i] = faceUV.y;

  uvs[8+i] = faceUV.z;
  uvs[9+i] = faceUV.w;
  uvs[10+i] = faceUV.x;
  uvs[11+i] = faceUV.w;
  uvs[12+i] = faceUV.x;
  uvs[13+i] = faceUV.y;
  uvs[14+i] = faceUV.z;
  uvs[15+i] = faceUV.y;
}


  window.scene.getMeshByName(id).setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
}

function setUVForPlaneInvert(id, x1, y1, x2, y2)
{
  let uvs = window.scene.getMeshByName(id).getVerticesData(BABYLON.VertexBuffer.UVKind);
  let faceUV = new BABYLON.Vector4(x1, y1, x2, y2);


  uvs[0] = faceUV.z;
  uvs[1] = faceUV.w;
  uvs[2] = faceUV.x;
  uvs[3] = faceUV.w;
  uvs[4] = faceUV.x;
  uvs[5] = faceUV.y;
  uvs[6] = faceUV.z;
  uvs[7] = faceUV.y;

  uvs[8] = faceUV.z;
  uvs[9] = faceUV.w;
  uvs[10] = faceUV.x;
  uvs[11] = faceUV.w;
  uvs[12] = faceUV.x;
  uvs[13] = faceUV.y;
  uvs[14] = faceUV.z;
  uvs[15] = faceUV.y;


  window.scene.getMeshByName(id).setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
}



function setUVForPlaneInvertY(id, x1, y1, x2, y2)
{
  let uvs = window.scene.getMeshByName(id).getVerticesData(BABYLON.VertexBuffer.UVKind);
  let faceUV = new BABYLON.Vector4(x1, y2, x2, y1);


  uvs[0] = faceUV.z;
  uvs[1] = faceUV.w;
  uvs[2] = faceUV.x;
  uvs[3] = faceUV.w;
  uvs[4] = faceUV.x;
  uvs[5] = faceUV.y;
  uvs[6] = faceUV.z;
  uvs[7] = faceUV.y;

  uvs[8] = faceUV.z;
  uvs[9] = faceUV.w;
  uvs[10] = faceUV.x;
  uvs[11] = faceUV.w;
  uvs[12] = faceUV.x;
  uvs[13] = faceUV.y;
  uvs[14] = faceUV.z;
  uvs[15] = faceUV.y;


  window.scene.getMeshByName(id).setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
}



BABYLON.Mesh.prototype.flipFaces = function(flipNormals) {
	var vertex_data = BABYLON.VertexData.ExtractFromMesh(this);

	if (flipNormals) {
		var normals = this.getVertexBuffer(BABYLON.VertexBuffer.NormalKind);
		for (var i = 0; i < vertex_data.normals.length; i++) {
			vertex_data.normals[i] *= -1;
		}
	}

	var temp;
	for (var i = 0; i < vertex_data.indices.length; i += 3) {
		// reassign indices
		temp = vertex_data.indices[i + 1];
		vertex_data.indices[i + 1] = vertex_data.indices[i + 2];
		vertex_data.indices[i + 2] = temp;



	}

	vertex_data.applyToMesh(this);
}

function cutByShape(sourceID, cutShapeID, newID)
{
window.scene.getMeshByName(cutShapeID).setEnabled(true);
window.scene.getMeshByName(sourceID).setEnabled(true);

if (window.scene.getMeshByName(newID) != null) window.scene.getMeshByName(newID).dispose();
if (window.scene.getMeshByName('wallTempClone') != null) window.scene.getMeshByName('wallTempClone').dispose();




window.scene.getMeshByName(sourceID).clone('wallTempClone');
//window.scene.getMeshByName('wallTempClone').makeGeometryUnique();
//window.scene.getMeshByName('wallTempClone').bakeCurrentTransformIntoVertices();


let aCSG = BABYLON.CSG.FromMesh(window.scene.getMeshByName(cutShapeID));
let bCSG = BABYLON.CSG.FromMesh(window.scene.getMeshByName('wallTempClone'));
let subCSG  = bCSG.subtract(aCSG);
let newMesh = subCSG.toMesh(newID, window.scene.getMeshByName(sourceID).material, window.scene);

//newMesh.flipFaces(false);

window.scene.getMeshByName(cutShapeID).setEnabled(false);
window.scene.getMeshByName(sourceID).setEnabled(false);

if (window.scene.getMeshByName('wallTempClone') != null) window.scene.getMeshByName('wallTempClone').dispose();

//window.scene.getMeshByName(newID).flipFaces(true);
//window.scene.getMeshByName(newID).flipNormalsOnly();

}

function cloneAndFlipX(sourceID, newID)
{
  window.scene.getMeshByName(sourceID).clone(newID);
  window.scene.getMeshByName(newID).makeGeometryUnique();
  window.scene.getMeshByName(newID).scaling.x=-1;
  window.scene.getMeshByName(newID).flipFaces(true);
  window.scene.getMeshByName(newID).bakeCurrentTransformIntoVertices();

}

function cloneAndFlipX1(sourceID, newID)
{
  window.scene.getMeshByName(sourceID).clone(newID);
  window.scene.getMeshByName(newID).makeGeometryUnique();
  window.scene.getMeshByName(newID).scaling.x=-1;
//  window.scene.getMeshByName(newID).flipFaces(false);
  window.scene.getMeshByName(newID).bakeCurrentTransformIntoVertices();

}





BABYLON.ArcRotateCamera.prototype.spinTo = function (whichprop, targetval, speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation('at4', this, whichprop, speed, 120, this[whichprop], targetval, 0, ease);
}





BABYLON.Mesh.prototype.flipNormalsOnly = function()
{
var vertex_data = BABYLON.VertexData.ExtractFromMesh(this);
var normals = this.getVertexBuffer(BABYLON.VertexBuffer.NormalKind);
	for (var i = 0; i < vertex_data.normals.length; i++) {
			vertex_data.normals[i] *= -1;
	}

}
