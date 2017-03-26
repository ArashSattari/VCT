$("#helpPage").hide();
//the current help step (page)
var helpStepTracker = 0 ;    
updateHelpPage();

// Click handler for 'NEXT' button on the help page.
$(".help .footer .nextStep").click(function(){
    if (helpStepTracker < 2) {
        ++helpStepTracker;
        updateHelpPage();
    }
});

// Click handler for 'PREVIOUS' button on the help page.
$(".help .footer .previousStep").click(function(){
    if (helpStepTracker > 0) {
        --helpStepTracker;
        updateHelpPage();
    };
});

// Update help page with respect to the 'helpStepTracker'
function updateHelpPage() {
    switch (helpStepTracker) {
        case 0:
            $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_1.png");
            // disable PREVIOUS button
            $(".help .footer .previousStep").css({"border": "2px solid #BBBBBB", "color": "#AAAAAA", "background-color": "#FFFFFF"});
            // fill the page with related image and
            $(".help .header .text").text("Navigating in Virtual Oulu");
            $(".help .body img").attr("src", "UI/img/Help_1.png");
            $(".help .body #description").html("<b style= 'font-size:15px'>Keyboard:</b>" +
                "<p></p>" +
                "<span style = 'color: #666666'>Right arrow key:</span> Move to the right<br />" +
                "<span style = 'color: #666666'>Left arrow key:</span> Move to the left<br />" +
                "<span style = 'color: #666666'>Up arrow key:</span> Move forward<br />" +
                "<span style = 'color: #666666'>Down arrow key:</span> Move backward<br />" +
                "<p></p>" +
                "<b style= 'font-size:15px;'>Mouse:</b>" +
                "<p></p>" +
                "<span style = 'color: #666666'>Left click and move the mouse forward:</span> Tilt the camera up<br />" +
                "<span style = 'color: #666666'>Left click and move the mouse backward:</span> Tilt the camera down<br />" +
                "<span style = 'color: #666666'>Left click and move the mouse to the right:</span> Pan the camera to the right<br />" +
                "<span style = 'color: #666666'>Left click and move the mouse to the left:</span><br /> Pan the camera to the left<br />" );
            break;

        case 1:
            $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_2.png");
            // enable PREVIOUS button
            $(".help .footer .previousStep").css({"border": "2px solid #AAAAAA", "color": "#FFFFFF", "background-color": "#222222"});
            // fill the page with related image and
            $(".help .header .text").text("Updating a Sign");
            $(".help .body img").attr("src", "UI/img/Help_2.png");
            $(".help .body #description").html("<b style= 'font-size:15px'>To update a sign follow the steps below :</b>" +
                "<br /><br />" +
                "<span style = 'color: #666666'>1. </span> Select your shop from the list.<br /><br/>" +
                "<span style = 'color: #666666'>2. </span> Click on the forward and backward button to select the sign you want to update it<br /><br/>" +
                "<span style = 'color: #666666'>3. </span> Select an image (png, jpg, etc.) from your local machine as a new sign<br /><br/>" +
                "<span style = 'color: #666666'>4. </span> Click UPDATE button.<br /><br/>" +
                "<span>It might take a few seconds that the 3D world be updated by the new sign</span>" );
            break;

        case 2:
            $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_3.png");
            // enable NEXT button
            $(".help .footer .nextStep").css({"border": "2px solid #AAAAAA", "color": "#FFFFFF", "background-color": "#222222"});
            // fill the page with related image and
            $(".help .header .text").text("Giving a Comment");
            $(".help .body img").attr("src", "UI/img/Help_3.png");
            $(".help .body #description").html("<b style= 'font-size:15px'> To post a comment or suggest changes about of any shops' signs " +
                "follow the steps below:</b>" +
                "<br /><br />" +
                "<span style = 'color: #666666'>1. </span> Click on &quot;!&quot; icon<br /><br/>" +
                "<span style = 'color: #666666'>2. </span> Write the building's number which you want to write a comment for it." +
                " (Buildings' numbers are on a spinning cube next to the each building)<br /><br />" +
                "<span style = 'color: #666666'>3. </span> Write your comment.<br /><br/>" +
                "<span style = 'color: #666666'>4. </span> Click on SUBMIT button.<br /><br/>" );
            break;

        // case 3:
        //     $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_4.png");
        //     // disable NEXT button
        //     $(".help .footer .nextStep").css({"border": "2px solid #BBBBBB", "color": "#AAAAAA", "background-color": "#FFFFFF"});
        //     $(".help .header .text").text("About Virtual Oulu");
        //     $(".help .body img").attr("src", "UI/img/blank.png");
        //     $(".help .body #description").html("");
        //     break;
    }
}
