/**
 * Created by Onur Ozuduru on 23.12.2016.
 */
 //version numbering for .js files. http://stackoverflow.com/questions/2185872/force-browsers-to-get-latest-js-and-css-files-in-asp-net-application

var CST = {};

CST.init = function(scen, cam)
{
    this._scene = scen;
    this._camera = cam;

    // entry point
    this._createBanners();

    //TODO: implement banners navigation

    // TODO: implement banner change url

};

CST._createBanners = function() {
//TODO: this is only for one banner, make it for multiple
    // load the data and use it to display the banners using the code below
    //TODO: create data
    //TODO: get image URLs
    var renderer = new THREE.WebGLRenderer();
    var texture = THREE.ImageUtils.loadTexture("/js/cst/kissa.jpg"); //imgURL
    //texture.needsUpdate = true; // call this after you change the texture url
    var data = {
        'width':5,
        'heigth':5,
        'ix':-73.46322679386216,
        'iy':14,
        'iz':42.52478028242652,
        'irx':2,
        'iry':2,
        'irz':2,
    };
    /*data.width:5,
        data.height:5,
        data.ix:-73.46322679386216,
        data.iy:14,
        data.iz:42.52478028242652,
        data.irx:2,
        data.iry:2,
        data.irz:2*/


    var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide}); //Remove DoubleSide to make banner one sided only.
    var geometry = new THREE.PlaneGeometry(data['width'], data['heigth']);
    var banner = new THREE.Mesh(geometry, material);


    banner.position.x = data['ix']; //|| 0;
    banner.position.y = data['iy']; //|| 0;
    banner.position.z = data['iz']; //|| 0;
    banner.rotation.x = data['irx']; //|| 0;
    banner.rotation.y = data['iry']; //|| 0;
    banner.rotation.z = data['irz']; //|| 0;
    this._scene.add(banner);
    renderer.render(_scene, _camera);
};