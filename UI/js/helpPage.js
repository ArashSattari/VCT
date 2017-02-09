$("#helpPage").hide();
//the current help step (page)
var helpStepTracker = 0 ;    

// Click handler for 'NEXT' button on the help page.
$(".help .footer .nextStep").click(function(){
    if (helpStepTracker < 3) {
        ++helpStepTracker;
        updateHelpPage();
    }
})

// Click handler for 'PREVIOUS' button on the help page.
$(".help .footer .previousStep").click(function(){
    if (helpStepTracker > 0) {
        --helpStepTracker;
        updateHelpPage();
    }
})

// Update help page with respect to the 'helpStepTracker'
function updateHelpPage() {
    switch (helpStepTracker) {
        case 0:
            $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_1.png");
            // disable PREVIOUS button
            $(".help .footer .previousStep").css({"border": "2px solid #BBBBBB", "color": "#AAAAAA", "background-color": "#FFFFFF"});
            break;
        case 1:
            $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_2.png");
            // enable PREVIOUS button
            $(".help .footer .previousStep").css({"border": "2px solid #AAAAAA", "color": "#FFFFFF", "background-color": "#222222"});
            $(".help .body").empty();
            break;
        case 2:
            $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_3.png");
            // enable NEXT button
            $(".help .footer .nextStep").css({"border": "2px solid #AAAAAA", "color": "#FFFFFF", "background-color": "#222222"});
            break;
        case 3:
            $(".help .footer .stepsBar").attr("src", "UI/img/helpSteps_4.png");
            // disable NEXT button
            $(".help .footer .nextStep").css({"border": "2px solid #BBBBBB", "color": "#AAAAAA", "background-color": "#FFFFFF"});
            break;
    }
}
