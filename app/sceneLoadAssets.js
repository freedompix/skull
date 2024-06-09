window.modelsLoaded = false;
window.modelsLoadingStatuses = [];

function sceneLoadAssets()
{
var modelsLoadingStatuses=[];
var modelsLoaded=false;
ArchetypeUI.load3DModelByPath("./models/", "skull.glb",  "skull");


}


function sceneIfAssetsLoadedCheck()
{

let status = true;

for (let i = 0; i < window.modelsLoadIndexes.length; i++) {
let meshName = window.modelsLoadIndexes[i];
//console.log(meshName + ' ' + window.modelsLoadingStatuses[meshName]);

if (window.modelsLoadingStatuses[meshName] == false) status = false;
//console.log(status);

}


//console.log(window.modelsLoadIndexes.length);
//console.log(status);

if (status == true) sceneAffterAssetsLoaded();
if (status == true) window.appUIState['allModelsLoaded'] = true;
}





ArchetypeUI.load3DModelByPath=function(importModelFilePath,importModelFileName, importedNewName) {
window.modelsLoadingStatuses[importedNewName]=false;

window.modelsLoadIndexes.push(importedNewName);


console.log(window.modelsLoadIndexes.length);
//console.log(window.modelsLoadingStatuses);



console.log('Start loading: ' + importedNewName + ' ' + importModelFilePath+importModelFileName);
var sceneTemp = window.scene;

var arr2=BABYLON.SceneLoader.ImportMesh("", importModelFilePath, importModelFileName, sceneTemp, function (importedMeshes) {

importedMeshes[0].name = importedNewName;
importedMeshes[0].id   = importedNewName;
window.modelsLoadingStatuses[importedNewName]=true;






console.log('Asset loaded: ' + importedNewName);
sceneIfAssetsLoadedCheck();
});
}
