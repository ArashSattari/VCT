var note_cube;

function createNoteCube() {

    var geometry = new THREE.CubeGeometry(2 ,2 ,2);
    var material =  new THREE.MeshPhongMaterial({map:
    THREE.ImageUtils.loadTexture("UI/img/sign_in_icon_blue.png")});
    note_cube = new THREE.Mesh(geometry, material);
    note_cube.position.set(-71.1156, 18.36, 56.5849);
    note_cube.rotation.y -= 0.56;
    scene.add(note_cube);
}

