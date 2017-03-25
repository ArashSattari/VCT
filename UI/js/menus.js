//variables
var help = {
    menu: "close"
};
var signIn = {
    status: "sign-out",
    menuHeader: "close",
    menuBody: "close"
};
var update = {
    menuHeader: "close",
    menuBody: "close",
    status: "",
    currentSignIndex: 0
};
var note ={
    menu: "close"
};
var user = {
    id: "",
    userName: "",
    pass: "",
    companyName : "",
    signs: []
};
var sign_id = 0;
var userName ="" ;
var pass = "" ;
var validPass = "";
var userShopsList = [];
var selectedShop;
var userPassStatus = "";
var currentSignURL;
var aSignIsUpdated = false;
var banner;
var cube = new THREE.Mesh( new THREE.CubeGeometry(1, 1, 1), new THREE.MeshNormalMaterial() ); // for signs' highlight
cube.rotation.y -= 0.56;

$("#updateMenu").hide();
$("#noteMenu").hide();
$("#helpPage").hide();
$("#updateMenu .body .selectNewSign input").hide();
$("#noteMenu .note").hide();
//hide select shop section
//$("#updateMenu .selectShop").hide();
//$("#selectShopFieldTitle").hide();

// close help page
function closeHelpPage() {
    $("#helpPage").hide();
    $("#helpMenu .header .headerIcon").attr("src", "UI/img/help_icon_grey.png");
    help.menu = "close";
}

//open help page
function openHelpPage() {
    $("#helpPage").show();
    $("#helpMenu .header .headerIcon").attr("src", "UI/img/help_icon_blue.png");
    help.menu = "open";
}

//click handler for help icon (header icon)
$(document).on("click", "#helpMenu .header .headerIcon", helpIconClickHandler);
function helpIconClickHandler () {
    if (help.menu == "close"){
        if (signIn.menuHeader == "open"){
            signInClickHandler();
            setTimeout(openHelpPage,800); 
        }
        else if (update.menuHeader == "open"){
            updateClickHandler();
            setTimeout(openHelpPage,800); 
        }
        else {openHelpPage();}
    }
    else {closeHelpPage();}
    
}

//open (slide) sign-in header
function openSignInHeader(){
    $("#signInMenu .header").animate({right: "+=250px"}, 700 );
    signIn.menuHeader = "open"
}

//open (slide) sign-in body 
function openSignInBody(){
    $("#signInMenu .body").animate({right: "+=290px"}, 700);
    signIn.menuBody ="open";
}

//close (slide) sign-in header
function closeSignInHeader(){
    $("#signInMenu .header").animate({right: "-=250px",}, 700 );
        signIn.menuHeader = "close";
}

//close (slide) sign-in body 
function closeSginInBody(){
    $("#signInMenu .body").animate({right: "-=290px"}, 700);
            signIn.menuBody = "close";
}

//click handler for sign-in icon (header icon)
$(document).on("click", "#signInMenu .header .headerIcon", signInClickHandler);
function signInClickHandler() {
    if (help.menu == "open") closeHelpPage();
    if (signIn.menuHeader == "close"){
        openSignInHeader();
        if (signIn.status == "sign-out"){openSignInBody();}
    }
    else{
        closeSignInHeader();
        if (signIn.menuBody == "open"){closeSginInBody();}
    }   
} 


//click handler for sign-in button
$(document).on("click", "#signInMenu .body button", signInButtonClickHandler)
function signInButtonClickHandler(){
    userName = $("#signInMenu .body .userNameInput").val();
    pass =$("#signInMenu .body .passwordInput").val();
    // get user's data and checking user name an password validity
    $.getJSON("api/v1.0/user?q="+'{"filters":[{"name":"user_name","op":"eq","val":"'+userName+'"}]}', function(data){
        //console.log(JSON.stringify(data));
        if(data.num_results) {
            console.log(data);
            var data_values = data.objects[0];
            user.pass = data_values.password;
            user.id = data_values.id;
            user.signs = data_values.signs;
            user.companyName = data_values.company.company_name;
            //alert(user.signs[0].id);
            if (pass == user.pass) {
                update.menuHeader = "close";
                userPassStatus ="valid";
            }
            else{userPassStatus = "invalid";}
        }
        else{userPassStatus = "invalid";}
    //-------------------------------------------------
        checkSignInStatusAndUpdateMenus();
    })
        .error(function () {alert("error");});
}

function checkSignInStatusAndUpdateMenus(){
    if (userPassStatus=="valid"){
        signIn.status = "sign-in";
        closeSignInHeader();
        closeSginInBody();
        //wait until sign in menu be closed then show update menu and sign out button (text)
        setTimeout(function(){
            $("#updateMenu").show();
            $("#noteMenu").show();
            $("#signInMenu .header .text").text("SIGN OUT");
            $("#signInMenu .header .text").css("text-decoration", "underline");
            $("#signInMenu .header .headerIcon").attr("src", "UI/img/sign_in_icon_blue.png");
        },800);
        loadShopsComboBox();
    }
    else{
        signIn.status = "sign-out";
        alert("The username or password you entered is incorrect.");
        $("#signInMenu .header .headerIcon").attr("UI/src", "img/sign_in_icon_grey.png");
    }
    $("#signInMenu .body .userNameInput").val("");
    $("#signInMenu .body .passwordInput").val("");
}

//load shops combobox
function loadShopsComboBox() {
    userShopsList.push(user.companyName);
    $("#shopsComboBox").jqxComboBox({
    source: userShopsList,
    width: '200px',
    height: '25px',
    autoDropDownHeight: true,
    displayMember: 'text',
    selectedIndex: null});
}

//select a shop from combo
 $("#shopsComboBox").on('change', function (event) {
    //selectedShop = event.args.item.label;

    // set camera position and rotation
    update.currentSignIndex = 0;
    yawObject.position.set(-80, 14, 74);
    yawObject.rotation.y -= 0.51;

    sign_id = user.signs[update.currentSignIndex].id;
    currentSignURL = user.signs[update.currentSignIndex].img_url;
    $("#updateMenu .body .selectSign .signIcon").attr("src", currentSignURL);

});

//click handeler for sign out button (text)
$(document).on("click", "#signInMenu .header .text", signOutClickHandler)
function signOutClickHandler(){
    signIn.status = "sign-out";
    closeSignInHeader();
    setTimeout(function(){
            $("#updateMenu").hide();
            $("#noteMenu").hide();
            $("#signInMenu .header .text").text("SIGN IN");
            $("#signInMenu .header .text").css("color", "#AAAAAA");
            $("#signInMenu .header .text").css("text-decoration", "none");
            $("#signInMenu .header .headerIcon").attr("src", "UI/img/sign_in_icon_grey.png");
        },800);
}

//highlight sign-in button when mouse moves on it
$("#signInMenu .body button").mouseover(function(){
    if(signIn.status=="sign-out"){$("#signInMenu .body button").css("color", "#226AFF");}
});
$("#signInMenu .body button").mouseout(function(){
    if(signIn.status=="sign-out"){$("#signInMenu .body button").css("color", "#AAAAAA");}
});

//highlight sign out button (text) when mouse moves on it
$("#signInMenu .header .text").mouseover(function(){
    if(signIn.status=="sign-in"){$("#signInMenu .header .text").css("color", "#226AFF");}
});
$("#signInMenu .header .text").mouseout(function(){
    if(signIn.status=="sign-in"){$("#signInMenu .header .text").css("color", "#AAAAAA");}
});



//open (slide) update header
function openUpdateHeader(){
    $("#updateMenu .header .headerIcon").attr("src", "UI/img/update_icon_blue.png");
    $("#updateMenu .header").animate({right: "+=250px"}, 700 );
    update.menuHeader = "open"
}

//open (slide) update body 
function openUpdateBody(){
    $("#updateMenu .body").animate({right: "+=290px"}, 700);
    update.menuBody ="open";
    //create highlight for signs
    scene.add(cube);
}

//close (slide) update header
function closeUpdateHeader(){
    $("#updateMenu .header .headerIcon").attr("src", "UI/img/update_icon_grey.png");
    $("#updateMenu .header").animate({right: "-=250px"}, 700 );
    update.menuHeader = "close";

    //remove signs' highlight
    scene.remove(cube);
    render();
}

//close (slide) update body 
function closeUpdateBody(){
    $("#updateMenu .body").animate({right: "-=290px"}, 700);
    update.menuBody = "close";
}

//click handler for update icon (header icon)
$(document).on("click", "#updateMenu .header .headerIcon", updateClickHandler);
function updateClickHandler() {
    if (help.menu == "open") closeHelpPage();
    if (update.menuHeader == "close"){
        $("#updateMenu .body .selectNewSign .add").attr("src", "UI/img/add_grey.png");
        openUpdateHeader();
        openUpdateBody();
    }
    else {
        closeUpdateHeader();
        closeUpdateBody();
    }
} 

//click handler for sign selector button (forward/backward)
$(document).on("click", "#updateMenu .body .selectSign .forwardArrow", selectNextSign);
$(document).on("click", "#updateMenu .body .selectSign .backwardArrow", selectPreviousSign);
function selectNextSign () {
    //console.log(JSON.stringify(user.signs.length));

    if (update.currentSignIndex < (user.signs.length - 1)){
        ++update.currentSignIndex;
        sign_id = user.signs[update.currentSignIndex].id;
        currentSignURL = user.signs[update.currentSignIndex].img_url;
        $("#updateMenu .body .selectSign .signIcon").attr("src", currentSignURL);
    }

    // create the highlights (it's not completed, we should have highlights' dimensions to database.)
    // if (update.currentSignIndex == 0){
    //     cube.scale.set(4.8, 0.88, 0.3);
    //     cube.position.set(-74.75879, 18.36, 54.300894);
    //
    // }
    // if (update.currentSignIndex == 1){
    //     cube.scale.set(3.5, 0.88, 0.3);
    //     cube.position.set(-71.1156, 18.36, 56.5849);
    // }

}

function selectPreviousSign () {
    if (update.currentSignIndex > 0){
        --update.currentSignIndex;
        sign_id = user.signs[update.currentSignIndex].id;
        currentSignURL = user.signs[update.currentSignIndex].img_url;
        $("#updateMenu .body .selectSign .signIcon").attr("src", currentSignURL);
    }

    // create the highlights (it's not completed, we should have highlights' dimensions to database.)
    // if (update.currentSignIndex == 0){
    //     cube.scale.set(4.8, 0.88, 0.3);
    //     cube.position.set(-74.75879, 18.36, 54.300894);
    // }
    // if (update.currentSignIndex == 1){
    //     cube.scale.set(3.5, 0.88, 0.3);
    //     cube.position.set(-71.1156, 18.36, 56.5849);
    // }
}

//highlight sign selector buttons (forward/backward) when mouse moves on it
$("#updateMenu .body .selectSign .forwardArrow").mouseover(function(){
    $("#updateMenu .body .selectSign .forwardArrow").attr("src", "UI/img/ForwardArrow_blue.png");
});
$("#updateMenu .body .selectSign .forwardArrow").mouseout(function(){
    $("#updateMenu .body .selectSign .forwardArrow").attr("src", "UI/img/ForwardArrow_grey.png");
});
$("#updateMenu .body .selectSign .backwardArrow").mouseover(function(){
    $("#updateMenu .body .selectSign .backwardArrow").attr("src", "UI/img/BackwardArrow_blue.png");
});
$("#updateMenu .body .selectSign .backwardArrow").mouseout(function(){
    $("#updateMenu .body .selectSign .backwardArrow").attr("src", "UI/img/BackwardArrow_grey.png");
});

//highlight add new sign  when mouse moves on it
$("#updateMenu .body .selectNewSign label .add").mouseover(function(){
   if (update.status!="signSelected") {$("#updateMenu .body .selectNewSign .add").attr("src", "UI/img/add_blue.png");}
});
$("#updateMenu .body .selectNewSign label .add").mouseout(function(){
    if (update.status!="signSelected") {$("#updateMenu .body .selectNewSign .add").attr("src", "UI/img/add_grey.png");}
});

change_banner = function(sign_id, data) {
    //Determine the banner in question.
    filepath = '/img/vompatti.jpg';//POISTA
    sign_id = parseInt(sign_id);
    banner = scene.getObjectByName(sign_id);
    console.log(typeof data);

    //Image URL.
    image_url = data.split(":").pop();
    image_url = image_url.replace("}", '');
    image_url = image_url.replace(/"/g, '');

    //Change the image and update the texture to the scene.
    banner.material.map = THREE.ImageUtils.loadTexture(image_url);
    banner.material.map.needsUpdate = true;
};


//update button click handler
$("#data").submit(function(){

    var formData = new FormData($(this)[0]);
        formData.append("sign_id", sign_id);

    $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            //console.log(data)
            change_banner(sign_id, data); //Update the banner with new texture.
        },
        cache: false,
        contentType: false,
        processData: false
    });

    //close update menu
    updateClickHandler();

    //update signs' data
    $.getJSON("api/v1.0/user?q="+'{"filters":[{"name":"user_name","op":"eq","val":"'+userName+'"}]}', function(data){
        //console.log(JSON.stringify(data));
            var data_values = data.objects[0];
            user.signs = data_values.signs;
            update.currentSignIndex = 0;
            sign_id = user.signs[update.currentSignIndex].id;
            currentSignURL = user.signs[update.currentSignIndex].img_url;
            $("#updateMenu .body .selectSign .signIcon").attr("src", currentSignURL);
    }).error(function () {alert("error");});

    aSignIsUpdated = true;


    return false;
});

//highlight update sign button when mouse moves on it
$("#updateMenu .body .updateButton").mouseover(function(){
    $("#updateMenu .body .updateButton").attr("src", "UI/img/update_blue.png");
});
$("#updateMenu .body .updateButton").mouseout(function(){
    $("#updateMenu .body .updateButton").attr("src", "UI/img/update_grey.png");
});

//show selected image in update menu before uploading it
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#updateMenu .body .selectNewSign .add').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$("#browse").change(function(){
    readURL(this);
    update.status="signSelected";
});


//click handler for note icon (header icon)
$(document).on("click", "#noteMenu .header .headerIcon", noteIconClickHandler);
function noteIconClickHandler () {
    if (note.menu == "close"){
        $("#noteMenu .header .headerIcon").attr("src", "UI/img/note_blue.png");
        note.menu = "open";
        showNoteCubes();
        $("#noteMenu .note").show();
        $("#noteMenu .note").focus();
    }
    else {
        $("#noteMenu .header .headerIcon").attr("src", "UI/img/note_grey.png");
        note.menu = "close";
        hideNoteCubes();
        $("#noteMenu .note").hide();
    }
}

function showNoteCubes() {
    //for test
    createNoteCube(-75.82862, 16.1, 53.748101, 1.5, 0.56);
    spinNoteCubeStart(50);
}

function hideNoteCubes() {
    spinNoteCubeStop();
    scene.remove(noteCube);
    render();
}

$("#noteMenu .note button").click(function () {
    $("#noteMenu .note textarea").val("");
    $("#noteMenu .note #plateNumber").val("");
    $("#noteMenu .note").hide();
    noteIconClickHandler();
});

// align signs manually to find correct coordination
$(document).keypress(function (event) {
    if ((update.menuHeader == "open") &&(aSignIsUpdated)) {
        switch (event.which) {
            case 108: // L
                //move the banner recently updated to right
                banner.position.x += .1 * Math.cos(banner.rotation.y);
                banner.position.z -= .1 * Math.sin(banner.rotation.y);
                break;
            case 106: // J
                //move the banner recently updated to left
                banner.position.x -= .05 * Math.cos(banner.rotation.y);
                banner.position.z += .05 * Math.sin(banner.rotation.y);
                break;
            case 105: // I
                //move the banner recently updated to inside
                banner.position.x += .05 * Math.cos(banner.rotation.y + 90 * Math.PI/180);
                banner.position.z -= .05 * Math.sin(banner.rotation.y + 90 * Math.PI/180);
                break;
            case 107: // K
                //move the banner recently updated to outside
                banner.position.x -= .05 * Math.cos(banner.rotation.y + 90 * Math.PI/180);
                banner.position.z += .05 * Math.sin(banner.rotation.y + 90 * Math.PI/180);
                break;
            case 111: // O
                //move the banner recently updated up
                banner.position.y += 0.02;
                break;
            case 112: // P
                //move the banner recently updated down
                banner.position.y -= 0.02;
                break;
            case 44: // ","
                //rotate the banner recently updated to right
                banner.rotation.y -= 0.005;
                break;
            case 46: // "."
                //rotate the banner recently updated to left
                banner.rotation.y += 0.005;
                break;
            case 13: // Enter
                alert("Position:  " + "\n" +
                    "X =  " + banner.position.x + "\n" +
                    "Y =  " + banner.position.y + "\n" +
                    "Z =  " + banner.position.z + "\n\n" +
                    "Rotation.Y:  " + banner.rotation.y);
                break;
        }
    }
});
