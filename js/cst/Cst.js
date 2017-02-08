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
    this.fetchData();

    //TODO: implement banners navigation

    // TODO: implement banner change url

};
CST.fetchData = function() {
    //Fetches the sign data

    $.getJSON("api/v1.0/sign", function(data) {
        var data_values;

        // data_values contains all the relevant data under /api/v1.0/'sign'
        data_values = data.objects[0];
        // Uncomment next line to see the it nicely in console:
        console.log(JSON.stringify(data_values));

        // company_Data contains all the data of the company.
        company_data = data_values.company;
        // Uncomment next line to see the it nicely in console:
        console.log(JSON.stringify(company_data));
        });


        };


CST._createBanners = function() {
    var banners;
//TODO: this is only for one banner, make it for multiple
    // load the data and use it to display the banners using the code below
    //TODO: create data
    //TODO: get image URLs


    // Fetching multiple banner.

    // Goes through the whole database and fetches all of the banner ID's. Returns a ?list? with all of the banner ID's?.
    // How is the loading area per time handled?
        //This is for HTML table
        // data_rows = data.getElementById(tableId).getElementsByTagName("tr").length;
    /*
        for (i=0; i < data_rows; i++) {
            // List containing all of the banners data: width, heigth etc.
            // This line separates data_rows
            banners = data[i] // Or push?
            for (j=0; j < r
            banners = data_rows[i];


        }
    */




    //for (i = 0; i < "database length here: data.length"; i++)



    // Creates a single banner.
    var texture = THREE.ImageUtils.loadTexture("/data/banners/kissa.jpg"); //imgURL
    //texture.needsUpdate = true; // call this after you change the texture url
    var test_data = {
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
    var geometry = new THREE.PlaneGeometry(test_data['width'], test_data['heigth']);
    var banner = new THREE.Mesh(geometry, material);


    banner.position.x = test_data['ix']; //|| 0;
    banner.position.y = test_data['iy']; //|| 0;
    banner.position.z = test_data['iz']; //|| 0;
    banner.rotation.x = test_data['irx']; //|| 0;
    banner.rotation.y = test_data['iry']; //|| 0;
    banner.rotation.z = test_data['irz']; //|| 0;
    this._scene.add(banner);
};