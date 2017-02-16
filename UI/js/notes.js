var noteCube
var interval;
var raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;
var container, stats;

function createNoteCube(px, py, pz, scales, ry) {
    var geometry = new THREE.CubeGeometry( scales, scales, scales);
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture("UI/img/note_1.png") } );
    noteCube = new THREE.Mesh(geometry, material );
    noteCube.position.set(px, py, pz);
    noteCube.rotation.y -= ry;
    scene.add(noteCube);
}

function spinNoteCube() {
    noteCube.rotation.y -= 0.02;
}

function spinNoteCubeStop(){
    clearInterval(interval);
}

function spinNoteCubeStart(speed){
    setInterval(spinNoteCube, speed);
}

function noteCubeMouseOverEnable(){
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, yawObject );
    stats = new Stats();
    document.addEventListener('mouseover', onDocumentMove, false);
    window.addEventListener( 'resize', onWindowResize, false );

    // find intersections
    container.appendChild( stats.dom );
    stats.update();

    var intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
        alert("mouse over");
        if ( INTERSECTED != intersects[ 0 ].object ) {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
            alert("mouse over");
        }
    } else {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
    }
}

function onWindowResize() {
    yawObject.aspect = window.innerWidth / window.innerHeight;
    yawObject.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMove(event) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


/*
class cube {
    constructor(px, py, pz, scales, ry) {
    this.px = px;
    this.py = py;
    this.pz =pz;
    this.scales = scales;
    this.ry =ry;
  }

  create(){
    var geometry = new THREE.CubeGeometry( this.scales, this.scales, this.scales);
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture("UI/img/note_1.png") } );
    var noteCube = new THREE.Mesh(geometry, material );
    noteCube.position.set(this.px, this.py, this.pz);
    noteCube.rotation.y -= this.ry;
    scene.add(noteCube);
  }

}
*/