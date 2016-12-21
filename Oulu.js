/* -*- js-indent-level: 8 -*- */
/*jslint white: true */
/*
	OuluThreeJS
	Author: Playsign
	Date: 2013
*/

// MAIN

var container, scene, flyCamera, renderer, controls, flyControls, stats, directionalLight;
var flyMode = true;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var oulu, colliderBuildings, colliderGround;
var debugMode = false;

// FUNCTIONS 		
function init()
{
	scene = new THREE.Scene();
	
	var SCREEN_WIDTH = window.innerWidth,
		SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45,
		ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
		NEAR = 0.1,
		FAR = 20000;
	
	// FLY CAMERA
	flyCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	
	//flyCamera = new THREE.OrthographicCamera(
    //window.innerWidth / -3,		// Left
    //window.innerWidth / 3,		// Right
    //window.innerHeight / 3,		// Top
    //window.innerHeight / -3,	// Bottom
    //-100,            			// Near 
    //1500);           			// Far 
	//scene.add(flyCamera);
	
	flyCamera.position.set(0, 0, 0); // don't touch this! modify freelook.js --> yawObject.position instead
	
	//scene.add( sphere );
	
	// RENDERER
	if (Detector.webgl)
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
	else
		renderer = new THREE.CanvasRenderer();
	
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	$( window ).resize(function()
	{
		THREEx.WindowResize(renderer, flyCamera);
	});
	
	// For shadows
	// renderer.shadowMapEnabled = true;
	// renderer.shadowMapSoft = true;

	// renderer.shadowCameraNear = 3;
	// renderer.shadowCameraFar = camera.far;
	// renderer.shadowCameraFov = 50;

	// renderer.shadowMapBias = 0.0039;
	// renderer.shadowMapDarkness = 0.5;
	// renderer.shadowMapWidth = 1024;
	// renderer.shadowMapHeight = 1024;

	container = document.getElementById('ThreeJS');
	container.appendChild(renderer.domElement);
	// EVENTS

	THREEx.FullScreen.bindKey({
		charCode: 'm'.charCodeAt(0)
	});

	// FLY CONTROLS
	// flyControls = new THREE.FlyControls(camera);
	// flyControls.movementSpeed = 1000;
	// flyControls.domElement = renderer.domElement;
	// flyControls.rollSpeed = Math.PI / 12; // Math.PI / 24
	// flyControls.autoForward = false;
	// flyControls.dragToLook = true;
	flyControls = new THREE.FreeLookControls(flyCamera, renderer.domElement);
	flyControls.enabled = true;
	scene.add(flyControls.getObject());
	
	// STATS
	//stats = new Stats();
	//stats.domElement.style.position = 'absolute';
	//stats.domElement.style.bottom = '0px';
	//stats.domElement.style.zIndex = 100;
	//container.appendChild(stats.domElement);
	
	// White directional light at half intensity shining from the top.
	//directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	//directionalLight.position.set(100, 100, 100);
	//directionalLight.castShadow = true;
	//scene.add(directionalLight);

	////////////
	// CUSTOM //
	////////////
	
	// Note: if imported model appears too dark,
	//   add an ambient light in this file
	//   and increase values in model's exported .js file
	//    to e.g. "colorAmbient" : [0.75, 0.75, 0.75]
	
	Loader.init();
	Loader.completeFunc = function()
	{
		HOulu.init(scene, flyCamera);
	}
	
	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load("Masterscene.js", function(geometry, material) {
		addModelToScene(geometry, material, "oulu");
		Loader.updateLoadProgress();
	});
	jsonLoader.load("ColliderBuildings.js", function(geometry, material) {
		addModelToScene(geometry, material, "colliderbuildings");
		Loader.updateLoadProgress();
	});
	jsonLoader.load("ColliderGround.js", function(geometry, material) {
		addModelToScene(geometry, material, "colliderground");
		Loader.updateLoadProgress();
	});
	// addModelToScene function is called back after model has loaded

	var ambientLight = new THREE.AmbientLight(0x6b6b6b);
	scene.add(ambientLight);

	// mouse lock
	document.body.requestPointerLock = document.body.requestPointerLock ||
								document.body.mozRequestPointerLock ||
								document.body.webkitRequestPointerLock;
	document.body.requestPointerLock();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0X000000);
	renderer.autoClear = false;
	
	animate();
}

var texcache = {};
var useTexcache = false;
var allMaterials = [];
var allGeometries = [];
var unloadTextures = null;

function addModelToScene(geometry, materials, type, path) {
	if(path === undefined){
		path = "./images/";
	}

	var material, newMesh;
	var basicMaterial;
	allGeometries.push(geometry);
	if (type == "oulu" && debugMode === false) {
		var newMaterials = [];

		for (var i = 0; i < materials.length; i++) {
			if (materials[i].map) {
				//  JPG TO DDS
				//console.log( materials[i].map);
				var ddsName = materials[i].map.sourceFile.substr(0, materials[i].map.sourceFile.lastIndexOf(".")) + ".dds";
				// console.log("ddsName: " + ddsName);
				var texpath = path + ddsName;
				if (useTexcache && texcache.hasOwnProperty(texpath)) {
					map = texcache[texpath];
					console.log("tex cache hit: " + texpath);
				} else {
					map = texcache[texpath] = THREE.ImageUtils.loadCompressedTexture(texpath);
					map.wrapS = map.wrapT = THREE.RepeatWrapping; // for dds only
					map.repeat.set(1, 1); // for dds only
					// map = THREE.ImageUtils.loadCompressedTexture( materials[i].map.sourceFile + ".dds" );
					map.minFilter = map.magFilter = THREE.LinearFilter;
					map.anisotropy = 4;
				}
				basicMaterial = new THREE.MeshBasicMaterial({
					map: map
				})
				newMaterials.push(basicMaterial);
				allMaterials.push(basicMaterial);
			} else {
				newMaterials.push(materials[i]);
				allMaterials.push(materials[i]);
				// console.log("png: " + i);
			}
		}
		unloadTextures = function () {
			console.log("unloading textures");
			for (var i = 0; i < allMaterials.length; i++)
				allMaterials[i].dispose();
			for (var i = 0; i < allGeometries.length; i++)
				allGeometries[i].dispose();
			for (var key in texcache)
				if (texcache.hasOwnProperty(key))
					texcache[key].dispose();
			console.log("done");
		}
		material = new THREE.MeshFaceMaterial(newMaterials);
		newMesh = new THREE.Mesh(geometry, material);
		oulu = newMesh;
		// oulu.castShadow = true;
		// oulu.receiveShadow = true;

	} else if (type == "colliderbuildings") {
		material = new THREE.MeshFaceMaterial(materials);
		newMesh = new THREE.Mesh(geometry, material);
		if (debugMode == false) {
			newMesh.visible = false;
		}
		colliderBuildings = newMesh;
	} else if (type == "colliderground") {
		material = new THREE.MeshFaceMaterial(materials);
		newMesh = new THREE.Mesh(geometry, material);
		if (debugMode == false) {
			newMesh.visible = false;
		}
		colliderGround = newMesh;
	}

	newMesh.scale.set(1.5, 1.5, 1.5);

	scene.add(newMesh);
}


function animate() {
	requestAnimationFrame(animate);
	render();
	update();
}

function setFlyMode(flying) {
	if (flying === true || flying === false) {
		flyMode = flying;
		flyControls.dragging = false;
		flyControls.enabled = flying;
		flying === true ? THREEx.WindowResize(renderer, flyCamera) : THREEx.WindowResize(renderer, carCamera);
	} else {
		console.log("setFlyMode illegal parameter")
	}
}

function update() {
	var delta = clock.getDelta(); // seconds.

	flyControls.update(delta * 1000);
	HOulu.update();
	//stats.update();
}

function render()
{
	var w = window.innerWidth, h = window.innerHeight;
	
	renderer.setViewport( 0, 0, w, h );
    renderer.render(scene, flyCamera);
   //renderer.autoClear = true;
}