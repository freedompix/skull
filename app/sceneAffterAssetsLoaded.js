function sceneAffterAssetsLoaded()
{
console.log('All assets loaded');



//window.scene.getMeshByName('Stars').scaling = new BABYLON.Vector3(10.005, 10.005,10.005);

let light2 = new BABYLON.PointLight("light4shadow", new BABYLON.Vector3(7, 30, 15), window.scene);

light2.intensity = 3500;//old
light2.intensity = 2500;//new

light2.shadowMinZ = 10;
light2.shadowMaxZ = 70;
light2.diffuse = new BABYLON.Color3.FromHexString('#FFF5C9');
light2.diffuse = new BABYLON.Color3.FromHexString('#FF0000');








//window.scene.getCameraByID('camera1').spinTo("alpha", -1 * Math.PI/2, 10,1000000);
//window.scene.getCameraByID('camera1').spinTo("beta", 2 * Math.PI/2, 10,1000000);
//window.scene.getCameraByID('camera1').spinTo("target", new BABYLON.Vector3(0, 0, 0), 10,1000000);
//window.scene.getCameraByID('camera1').spinTo("radius", 30, 10, 1000000);

















  var world = new CANNON.World();
		
window.world = world;
		
world.gravity.set(0, -9.82, 0);
//world.allowSleep = true;


        // Create ground
 //var ground = new CANNON.Body({ mass: 0 });
 //ground.addShape(new CANNON.Plane());
 //world.addBody(ground);



var physicsPlugin = new BABYLON.CannonJSPlugin(world);
var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
scene.enablePhysics(gravityVector, physicsPlugin);







        // Apply physics to Babylon.js meshes
let mesh = window.scene.getMeshByName('SkullMesh');
mesh.parent = null;
mesh.position.y=18;
mesh.position.z=0;
		
		
var pinkEmissionColor = new BABYLON.Color3(0.5, 0.0, 0.3); // Use the appropriate RGB values for pink
var pbrMaterialPink = new BABYLON.PBRMaterial("pbrMaterialPink", scene);
pbrMaterialPink.emissiveColor = pinkEmissionColor;

// Assign the material to the skull mesh
mesh.material = pbrMaterialPink;
		
		
		
		
// var groundMesh = new BABYLON.Mesh.CreateGround("ground", 20, 20, 2, scene);
 var groundMesh = new BABYLON.Mesh.CreateGround("ground", {width: 2,height:2}, scene);
		
//		mesh.clone('SkullMesh1');		
//mesh1 = window.scene.getMeshByName('SkullMesh1');



	
var options1 = { 
mass: 0.5	
};



var options = { 

mass: 0.5,
linearDamping: 100,
velocity: 0.1, 
friction: 100, 
angularDamping: 1010,
//angularFactor: 0,
//angularVelocity: {x:0.001,y:0.001,z:0.001}
};



var options3 = { 

mass: 0.5,
linearDamping: 11000,
inertia: {x:0.1,y:0.1,z:0.1},
velocity: 0.1, 
friction: 1000.1, 
angularDamping: 1010,
//angularFactor: 0,
//angularVelocity: {x:0.001,y:0.001,z:0.001}
};


var optionsGround = {
mass: 0, 
velocity: 0.1,
friction: 0.1, 
angularDamping: 100,
//angularFactor: 0,
//angularVelocity: {x:0.1,y:0.1,z:0.1}
};


		
		

		
		
groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(groundMesh, BABYLON.PhysicsImpostor.PlaneImpostor, optionsGround, scene);

let mesh1BoundingInfo = groundMesh.getBoundingInfo();
let mesh1HalfExtents = new CANNON.Vec3(
   200,
   200,
    200
);



let mesh1Body = new CANNON.Body(optionsGround);
mesh1Body.addShape(new CANNON.Box(mesh1HalfExtents));
world.addBody(mesh1Body);



for(i=0; i <300; i++)
{
	let startY = 78;
spawnMesh('SkullMesh', 'SkullMesh' + i, 0, startY  + Math.random()*10, 0);

}

















//appSetDefaultUI();
//sceneUpdate();
closeLoader();
}

function spawnMesh(name, newName, x, y, z)
{
let mesh = window.scene.getMeshByName(name);
mesh.createInstance(newName);
let mesh1 = window.scene.getMeshByName(newName);



let options = { 

mass: 0.5,
linearDamping: 100,
velocity: 0.1, 
friction: 100, 
angularDamping: 1010,
//angularFactor: 0,
//angularVelocity: {x:0.001,y:0.001,z:0.001}
};

mesh1.physicsImpostor = new BABYLON.PhysicsImpostor(mesh1, BABYLON.PhysicsImpostor.BoxImpostor, options, scene);

let mesh1BoundingInfo = mesh1.getBoundingInfo();
let mesh1HalfExtents = new CANNON.Vec3(
    (mesh1BoundingInfo.maximum.x - mesh1BoundingInfo.minimum.x) / 2,
    (mesh1BoundingInfo.maximum.y - mesh1BoundingInfo.minimum.y) / 2,
    (mesh1BoundingInfo.maximum.z - mesh1BoundingInfo.minimum.z) / 2
);



let mesh1Body = new CANNON.Body(options);
mesh1Body.addShape(new CANNON.Box(mesh1HalfExtents));
world.addBody(mesh1Body);

mesh1.position.x=x;
mesh1.position.y=y;
mesh1.position.z=z;
	
}	
		
	