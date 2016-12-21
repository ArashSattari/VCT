var Loader = {}

Loader.init = function()
{
	this.complete = false;
	this._numLoaded = 0;
	//this.completeFunc = null;
	
	$("#ThreeJS").hide();
}

Loader.updateLoadProgress = function()
{
	if (++this._numLoaded == 3) // done loading
	{
		setTimeout(function()
		{
			$("#loading").hide();
			$("#ThreeJS").show();
			
			if (Loader.completeFunc)
				Loader.completeFunc();
			
			Loader.complete = true;
		}, 1000);
	}
}