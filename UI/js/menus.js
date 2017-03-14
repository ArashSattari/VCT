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
}
var user = {
    id: "",
    userName: "",
    pass: "",
    companyName : "",
    signs: []
}
var userName ="" ;
var pass = "" ;
var validPass = "";
var userShopsList = [];
var selectedShop;
var userPassStatus = "";
var cube; // for signs' highlight

$("#updateMenu").hide();
$("#noteMenu").hide();
$("#helpPage").hide();
$("#updateMenu .body .selectNewSign input").hide();
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
    selectedIndex: 0});
    //by default firs row of combobox is allocated to selectedShop
    selectedShop = userShopsList[0];
    $('#shopsComboBox').bind('select', function (event) {
    var args = event.args;
    var item = $('#shopsComboBox').jqxComboBox('getItem', args.index);
    var selectedShop = item.label;
    });
}

//select a shop from combo
 $("#shopsComboBox").on('change', function (event) {
    selectedShop = event.args.item.label;
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
}

//close (slide) update header
function closeUpdateHeader(){
    $("#updateMenu .header .headerIcon").attr("src", "UI/img/update_icon_grey.png");
    $("#updateMenu .header").animate({right: "-=250px",}, 700 );
    update.menuHeader = "close";
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
    if (update.status != "signSelecting"){
        update.status = "signSelecting";
        //base on sign number update.currentSignIndex data :
        // set camera position and rotation
        yawObject.position.set(-80, 14, 74);
        yawObject.rotation.y -= 0.51;
        // create the Cube
        cube = new THREE.Mesh( new THREE.CubeGeometry(1, 1, 1), new THREE.MeshNormalMaterial() );
        cube.scale.set(4.8, 0.88, 0.3);
        cube.position.set(-74.75879, 18.36, 54.300894);
        cube.rotation.y -= 0.56;
        scene.add(cube);
    }
    else{
        update.currentSignIndex++;
        //base on sign number update.currentSignIndex data :
        // set camera position and rotation
        // set cube size, position and rotation
    }



}

function selectPreviousSign () {

    // not completed !!
    cube.scale.set(3.5, 0.88, 0.3);
    cube.position.set(-71.1156, 18.36, 56.5849);
    //cube.rotation.y -= 0.56;



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
$("#updateMenu .body .selectNewSign .add").mouseover(function(){
   if (update.status!="signSelected") {$("#updateMenu .body .selectNewSign .add").attr("src", "UI/img/add_blue.png");}
});
$("#updateMenu .body .selectNewSign .add").mouseout(function(){
    if (update.status!="signSelected") {$("#updateMenu .body .selectNewSign .add").attr("src", "UI/img/add_grey.png");}
});

change_banner = function(sign_id, data) {
    //Determine the banner in question.
    filepath = '/img/vompatti.jpg' //POISTA
    sign_id = parseInt(sign_id);
    var banner = scene.getObjectByName(sign_id);
    console.log(typeof data);

    //Image URL.
    image_url = data.split(":").pop();
    image_url = image_url.replace("}", '');
    image_url = image_url.replace(/"/g, '');

    //Change the image and update the texture to the scene.
    banner.material.map = THREE.ImageUtils.loadTexture(image_url);
    banner.material.map.needsUpdate = true;
}

//update button click handler
$("#data").submit(function(){

    var formData = new FormData($(this)[0]);
    //Change sign_id to numeric
    var sign_id = "10"; //TODO get sign id


    formData.append("sign_id", sign_id);

    $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            console.log(data)
            change_banner(sign_id, data); //Update the banner with new texture.
        },
        cache: false,
        contentType: false,
        processData: false
    });

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

//click handler for update sign button
//$(document).on("click", "#updateMenu .body button", updateSign);
//function updateSign () {

    // get uploaded image URI
    // $.getJSON("api/upload", function(data){
    //     var data_values = data.objects[0];
    //     var test = data_values.filepath;
    //
    //     alert(test);
    // //-------------------------------------------------
    //
    // });

    // for finding the position of a sign (for test)
    //cube.position.x += .1 * Math.cos(cube.rotation.y);
    //cube.position.z -= .1 * Math.sin(cube.rotation.y);
    //alert("x: " + cube.position.x + "   z: " + cube.position.z);

    //cube.position.x += .1 * Math.cos(cube.rotation.y + 90 * Math.PI/180);
    //cube.position.z -= .1 * Math.sin(cube.rotation.y + 90 * Math.PI/180);
    //alert("x: " + cube.position.x + "   z: " + cube.position.z);

    //cube.position.y -= 0.02;
    //alert("y: " + cube.position.y);

    //cube.rotation.y -= 0.56;
//}

//highlight update sign button when mouse moves on it
// $("#updateMenu .body button").mouseover(function(){
//     $("#updateMenu .body button").css("color", "#226AFF");
// });
// $("#updateMenu .body button").mouseout(function(){
//     $("#updateMenu .body button").css("color", "#AAAAAA");
// });

//click handler for note icon (header icon)
$(document).on("click", "#noteMenu .header .headerIcon", noteIconClickHandler);
function noteIconClickHandler () {
    if (note.menu == "close"){
        $("#noteMenu .header .headerIcon").attr("src", "UI/img/note_blue.png");
        note.menu = "open";
        showNoteCubes();
    }
    else {
        $("#noteMenu .header .headerIcon").attr("src", "UI/img/note_grey.png");
        note.menu = "close";
        hideNoteCubes();
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