/**
 * Created by Onur Ozuduru on 23.12.2016.
 */
 //version numbering for .js files. http://stackoverflow.com/questions/2185872/force-browsers-to-get-latest-js-and-css-files-in-asp-net-application


var CST = {};

//This function creates an array of banners for _createBanner function.
CST.createBannerVariables = function(data, callback) {
        var i, single_banner, banner_data, number_of_banners;

        //Determine the number of banners in database.
        number_of_banners = data.num_results;

        //Fetch all the banners and store their relevant image information into a separate array.
        banner_data = [];
        var ix, iz, iy, crx, cry, iry, height, width, img_url;
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

            //Push the banner to the banner_data array.
            single_banner = {'ix' : ix, 'iz' : iz, 'iy' : iy, 'crx' : crx, 'cry' : cry, 'iry': iry, 'height' : height, 'width' : width, 'image_url' : image_url};
            banner_data.push(single_banner);
            console.log(banner_data);
            };

        callback(banner_data, number_of_banners);
};

//Creates all of the banners, which information is in the database.
CST._createBanners = function(banner_data, number_of_banners) {
    var banner, i;

    //For each loop add a single banner to the scene.
    for (i=0; i<number_of_banners; i++) {
        //Creating the banner texture and shape.
        var texture = THREE.ImageUtils.loadTexture(banner_data[i]['image_url']);
        var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide}); //Remove DoubleSide to make banner one sided only.
        var geometry = new THREE.PlaneGeometry(banner_data[i]['width'], banner_data[i]['height']);
        var banner = new THREE.Mesh(geometry, material);

        //Giving location for the banner.
        banner.position.x = banner_data[i]['ix']; //|| 0;
        banner.position.y = banner_data[i]['iz']; //|| 0;
        banner.position.z = banner_data[i]['iy']; //|| 0;
        banner.rotation.x = banner_data[i]['crx']; //|| 0;
        banner.rotation.y = banner_data[i]['cry']; //|| 0;
        banner.rotation.z = banner_data[i]['iry']; //|| 0;
        this._scene.add(banner);
    };

};

//Here is the cst initialization function.
CST.init = function(scen, cam) {
    this._scene = scen;
    this._camera = cam;

    //Guide for Arrash: make all the stuff you want to have synchronous into function and call use them similarly as below. If you need the
    //values the previous function used call them as in row #72 and #74. createBannerVariables returns banner_data and number_of_banners
    //for CST._createBanners. Additionally add line e.g. "callback(banner_data, number_of_banners);" as the last line of the previous
    //function AND "callback" must be argument for the functions to be ran. That "callback" variable is defined in the functions and
    //it must be written to the "main" just like below. Give the callback argument as function like: function(arguments){next_function(arguments)});.
    //Fetching data from api/v1.0/sign.
    $.getJSON("api/v1.0/sign", function(data) {
        //Creating necessary variables for _createBanners function.
        CST.createBannerVariables(data, function(banner_data, number_of_banners) {
            //Adding the banners to the scene.
            CST._createBanners(banner_data, number_of_banners);
        });
    });
};