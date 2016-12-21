$(function() 
{
	 $("#Score")
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9", 
	  "position":"absolute", "top":"250px", "right":"4px"
	}) // adds CSS
    .append("<img width='200' height='120' src='images/Score.png'/>")
    
	/*.click( 
		function() 
		{ 
			setFlyMode(!flyMode);
		});*/
});