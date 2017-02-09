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
    menuBody: "close"
};
var userName ="" ;
var pass = "" ;
var userShopsList;
var selectedShop;

$("#updateMenu").hide();
$("#helpPage").hide();
$("#updateMenu .selectNewSign input").hide();

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

//checking user name an password validity (NOT COMPLETED)
function userPassValidityCheck(){
    userName = $("#signInMenu .body .userNameInput").val();
    pass =$("#signInMenu .body .passwordInput").val();
    //-----userName and pass have to send to the server
    //-----server send back "valid" or "invalid"
    if ((userName=="Arash") && (pass=="2443377")){
        return "valid";
    }
    else{
        return "invalid";
    }
    //-------------------------------------------------
}

//click handler for sign-in button
$(document).on("click", "#signInMenu .body button", signInButtonClickHandler)
function signInButtonClickHandler(){
    var userPassStatus = userPassValidityCheck();
    if (userPassStatus=="valid"){
        signIn.status = "sign-in";
        closeSignInHeader();
        closeSginInBody();
        //wait unill sign in menu be closed then show update menu and sign out button (text)
        setTimeout(function(){
            $("#updateMenu").show();
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
    //!!! this list is just for test. It has to be gotten from server
    userShopsList = [
        "Op-Isonkadun konttori",
        "Op-Pohjola",
        "Op-Kaakkurin konttori",
        "Op-Ritaharjun konttori"];
    $("#shopsComboBox").jqxComboBox({
    source: userShopsList,
    width: '200px',
    height: '25px',
    autoDropDownHeight: true,
    displayMember: 'text',
    selectedIndex: 0});
    //by defult firs row of combobox is allocated to selectedShop
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
    else{
        closeUpdateHeader();
        closeUpdateBody();
    }   
} 

//click handler for sign selector button (forward/backward)
$(document).on("click", "#updateMenu .body .selectSign .forwardArrow", selectNextSign);
$(document).on("click", "#updateMenu .body .selectSign .backwardArrow", selectPreviousSign);
function selectNextSign () {
    alert("Next Sign");
}
function selectPreviousSign () {
    alert("Previous Sign");
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

//click handler for add new sign 


//highlight add new sign  when mouse moves on it
$("#updateMenu .body .selectNewSign .add").mouseover(function(){
    $("#updateMenu .body .selectNewSign .add").attr("src", "UI/img/add_blue.png");
});
$("#updateMenu .body .selectNewSign .add").mouseout(function(){
    $("#updateMenu .body .selectNewSign .add").attr("src", "UI/img/add_grey.png");
});

//click handler for update sign button
$(document).on("click", "#updateMenu .body button", updateSign);
function updateSign () {
    alert("UPDATE SIGN");
}

//highlight update sign button when mouse moves on it
$("#updateMenu .body button").mouseover(function(){
    $("#updateMenu .body button").css("color", "#226AFF");
});
$("#updateMenu .body button").mouseout(function(){
    $("#updateMenu .body button").css("color", "#AAAAAA");
});