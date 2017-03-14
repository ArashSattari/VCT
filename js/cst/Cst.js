/**
 * Created by Onur Ozuduru on 23.12.2016.
 */
 //version numbering for .js files. http://stackoverflow.com/questions/2185872/force-browsers-to-get-latest-js-and-css-files-in-asp-net-application


var CST = {};

//This function creates an array of banners for _createBanner function.
CST.createBannerVariables = function(data, callback) {
        var i, single_banner, banner_data, number_of_banners, sign_id_list;
        sign_id_list = [];

        //Determine the number of banners in database.
        number_of_banners = data.num_results;

        //Fetch all the banners and store their relevant image information into a separate array.
        banner_data = [];
        var ix, iz, iy, crx, cry, iry, height, width, img_url, sign_id;
        for (i=0; i<number_of_banners; i++) {
            //Different measurements: coordinates, rotation, width, height and location in /data
            ix = data.objects[i].ix;
            iz = data.objects[i].iy;
            iy = data.objects[i].iz;
            crx = data.objects[i].crx;
            cry = data.objects[i].cry;
            iry = data.objects[i].iry;
            height = data.objects[i].ih;
            width = data.objects[i].iw;
            image_url = data.objects[i].img_url;
            sign_id = data.objects[i].id;

            //Push the banner to the banner_data array.
            single_banner = {'ix' : ix, 'iz' : iz, 'iy' : iy, 'crx' : crx, 'cry' : cry, 'iry': iry, 'height' : height, 'width' : width, 'image_url' : image_url};
            banner_data.push(single_banner);

            //Push sign ids to list.
            sign_id_list.push(sign_id);
            };

        callback(banner_data, sign_id_list);
};

//Creates all of the banners, which information is in the database.
CST._createBanners = function(banner_data, sign_id_list) {
    var banner, i;

    number_of_banners = sign_id_list.length;

    //For each loop add a single banner to the scene.
    for (i=0; i<number_of_banners; i++) {
        //Create the banner texture and shape.
        var texture = THREE.ImageUtils.loadTexture(banner_data[i]['image_url']);
        var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide}); //Remove DoubleSide to make banner one sided only.
        var geometry = new THREE.PlaneGeometry(banner_data[i]['width'], banner_data[i]['height']);
        var banner = new THREE.Mesh(geometry, material);

        //Name the banner (by their corresponding sign id).
        banner.name = sign_id_list[i];

        //Give location for the banner.
        banner.position.x = banner_data[i]['ix']; //|| 0;
        banner.position.y = banner_data[i]['iz']; //|| 0;
        banner.position.z = banner_data[i]['iy']; //|| 0;
        banner.rotation.x = banner_data[i]['crx']; //|| 0;
        banner.rotation.y = banner_data[i]['cry']; //|| 0;
        banner.rotation.z = banner_data[i]['iry']; //|| 0;
        this._scene.add(banner);
        console.log(scene.getObjectByName(sign_id_list[i]));

    };

};

//Here is the cst initialization function.
CST.init = function(scen, cam) {
    this._scene = scen;
    this._camera = cam;

    $.getJSON("api/v1.0/sign", function(data) {
        //Creating necessary variables for _createBanners function.
        CST.createBannerVariables(data, function(banner_data, number_of_banners) {
            //Adding the banners to the scene.
            CST._createBanners(banner_data, number_of_banners);
        });
    });
};