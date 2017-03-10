var noteCube;
var interval;


function createNoteCube(px, py, pz, scales, ry) {
    var geometry = new THREE.CubeGeometry(scales, scales, scales);
    var material = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("UI/img/note_1.png")});
    noteCube = new THREE.Mesh(geometry, material);
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
    interval = setInterval(spinNoteCube, speed);
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