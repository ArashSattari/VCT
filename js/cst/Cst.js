/**
 * Created by Onur Ozuduru on 23.12.2016.
 */
var CST = {}

CST.init = function(scen, cam)
{
    this._scene = scen;
    this._camera = cam;

    // entry point
    this._createBanners();

    //TODO: implement banners navigation

    // TODO: implement banner change url

}

CST._createBanners = function() {
//TODO: this is only for one banner, make it for multiple
    // load the data and use it to display the banners using the code below
    //TODO: create data
    //TODO: get image URLs
    var texture = THREE.ImageUtils.loadTexture(imgUrl);
    //texture.needsUpdate = true; // call this after you change the texture url
    var mat = new THREE.MeshBasicMaterial({map: texture});
    var geom = new THREE.PlaneGeometry(data.w, data.h);
    var banner = new THREE.Mesh(geom, mat);
    banner.position.x = data.ix || 0;
    banner.position.y = data.iy || 0;
    banner.position.z = -5;
    banner.rotation.x = data.irx || 0;
    banner.rotation.y = data.iry || 0;
    banner.rotation.z = data.irz || 0;
    this._scene.add(banner);
}