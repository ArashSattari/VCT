$(function() 
{
    
    
    $("#info_UI").hide()
     
       .text("YOLO") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"1", 
	  "position":"absolute", "top":"100px", "right":"250px"
	})
//_________________________________________    
     
 
     ;// adds CSS
//__________________Help dialog____________________________
      $("#Help_Dialog")
	.css( 
	{
	   "background":"rgba(255,255,255,0.5)"
	})
	.dialog({ autoOpen: false, 
		show: { effect: 'fade', duration: 500 },
		hide: { effect: 'fade', duration: 500 },
        resizable: false,
        height: 250,
        width: 500,
	})
      
      ;
	  $("#Achievments_List")
	.css( 
	{
	   "background":"rgba(255,255,255,0.5)"
	})
	.dialog({ autoOpen: false, 
		show: { effect: 'fade', duration: 500 },
		hide: { effect: 'fade', duration: 500 },
        resizable: false,
        height: 250,
        width: 500,
	});
//_________Achievments_______________  
	 $("#Achievments").show()
     
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9", 
	  "position":"absolute", "top":"100px", "right":"4px"
	}) // adds CSS
   .append("<img width = 243 ; height='112' src='img/Achive.png'/>")
    .button()
	.click( 
		function() 
		{ 
			$("#Achievments_List").dialog("open");
		})
 
     ;
    
//_________Sound_______________       
  /*   $("#Sound").show()
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9", 
	  "position":"absolute", "top":"4px", "right":"130px"
	}) // adds CSS
    .append("<img width= 92 height= 95 src='img/Sound.png'/>")
     .button()*/
//_________Map_borders_______________   
      
//_________Help_______________     
      $("#Help").show()
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9", 
	  "position":"absolute", "top":"4px", "right":"40px"
	}) // adds CSS
    .append("<img width =92 height=95 src='img/Help.png'/>")
     .button()
	.click( 
		function() 
		{ 
			$("#Help_Dialog").dialog("open");
		});
//_________Score_______________  
      $("#Score").show()
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9", 
	  "position":"absolute", "top":"222px", "right":"4px"
	}) // adds CSS
    .append("<img width= 249 height='112' src='img/Score.png'/>")
});
