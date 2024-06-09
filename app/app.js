window.appUIState['debug'] = false;

var ArchetypeUI = class {};
//waiting page for loading
window.addEventListener('DOMContentLoaded', function(){
//UIinit();
//UIupdate();




//requestAnimationFrame(UIupdate);

var canvas = document.getElementById('renderCanvas');
window.engine = new BABYLON.Engine(canvas, true);
window.scene = createScene();
window.engine.runRenderLoop(function(){sceneRenderLoop();});
});
window.addEventListener('resize', function(){
window.engine.resize();
});


