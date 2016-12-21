var EditControls = {}

EditControls.init = function(count)
{
	this._lastIndex = count - 1 || 0; // last portal index
	this._currIndex = 0;
	this._debugPortal = null;
	this.enabled = false;
}

EditControls.enable = function(index)
{
	this.enabled = true;
	
	// clamp index
	this._currIndex = Math.max(index || 0, 0);
	this._currIndex = Math.min(this._currIndex, this._lastIndex);
	
	if (this._debugPortal != PortalManager.getCurrentPortal())
		this._debugPortal.targetImage.visible = false;
	
	this._debugPortal = PortalManager.getPortalAt(this._currIndex);
	this._debugPortal.targetImage.material.opacity = 1;
	this._debugPortal.targetImage.visible = true;
	
	// move camera to portal position and look at targetImage
	yawObject.position.x = this._debugPortal.position.x;
	yawObject.position.z = this._debugPortal.position.z;
	yawObject.rotation.y = this._debugPortal.targetImage.d.cry;
	pitchObject.rotation.x = this._debugPortal.targetImage.d.crx;
	
	window.addEventListener('keydown', this._onKeyDown, false);
}

EditControls.disable = function()
{
	this.enabled = false;
	
	window.removeEventListener('keydown', this._onKeyDown, false);
}

EditControls._onKeyDown = function(e)
{
	switch (e.keyCode)
	{
		case 107: // +
			if (!PortalManager.isInsidePortal())
				EditControls.enable(EditControls._currIndex+1);
			break;
		
		case 109: // -
			if (!PortalManager.isInsidePortal())
				EditControls.enable(EditControls._currIndex-1);
			break;
		
		case 70: // F
			EditControls._debugPortal.targetImage.position.x -= .2 * Math.cos(yawObject.rotation.y);
			EditControls._debugPortal.targetImage.position.z += .2 * Math.sin(yawObject.rotation.y);
			break;
		
		case 72: // H
			EditControls._debugPortal.targetImage.position.x += .2 * Math.cos(yawObject.rotation.y);
			EditControls._debugPortal.targetImage.position.z -= .2 * Math.sin(yawObject.rotation.y);
			break;
		
		case 84: // T
			EditControls._debugPortal.targetImage.position.x += .2 * Math.cos(yawObject.rotation.y + 90 * Math.PI/180);
			EditControls._debugPortal.targetImage.position.z -= .2 * Math.sin(yawObject.rotation.y + 90 * Math.PI/180);
			
			break;
		
		case 71: // G
			EditControls._debugPortal.targetImage.position.x -= .2 * Math.cos(yawObject.rotation.y + 90 * Math.PI/180);
			EditControls._debugPortal.targetImage.position.z += .2 * Math.sin(yawObject.rotation.y + 90 * Math.PI/180);
			break;
		
		case 82: // R
			EditControls._debugPortal.targetImage.rotation.y += .02;
			break;
		
		case 89: // Y
			EditControls._debugPortal.targetImage.rotation.y -= .02;
			break;
		
		case 85: // U
			EditControls._debugPortal.targetImage.scale.x = EditControls._debugPortal.targetImage.scale.x + .02;
			EditControls._debugPortal.targetImage.scale.y = EditControls._debugPortal.targetImage.scale.y + .02;
			break;
		
		case 74: // J
			EditControls._debugPortal.targetImage.scale.x = EditControls._debugPortal.targetImage.scale.x - .02;
			EditControls._debugPortal.targetImage.scale.y = EditControls._debugPortal.targetImage.scale.y - .02;
			break;
		
		case 73: // I
			EditControls._debugPortal.targetImage.position.y += .2;
			break;
		
		case 75: // K
			EditControls._debugPortal.targetImage.position.y -= .2;
			break;
		
		case 101: // 5
			EditControls._debugPortal.position.x += .2 * Math.cos(yawObject.rotation.y + 90 * Math.PI/180);
			EditControls._debugPortal.position.z -= .2 * Math.sin(yawObject.rotation.y + 90 * Math.PI/180);
			break;
		
		case 98: // 2
			EditControls._debugPortal.position.x -= .2 * Math.cos(yawObject.rotation.y + 90 * Math.PI/180);
			EditControls._debugPortal.position.z += .2 * Math.sin(yawObject.rotation.y + 90 * Math.PI/180);
			break;
		
		case 97: // 1
			EditControls._debugPortal.position.x -= .2 * Math.cos(yawObject.rotation.y);
			EditControls._debugPortal.position.z += .2 * Math.sin(yawObject.rotation.y);
			break;
		
		case 99: // 3
			EditControls._debugPortal.position.x += .2 * Math.cos(yawObject.rotation.y);
			EditControls._debugPortal.position.z -= .2 * Math.sin(yawObject.rotation.y);
			break;
			
		case 88: // x
			EditControls._debugPortal.targetImage.visible = !EditControls._debugPortal.targetImage.visible;
			break;
		
		case 67: // c
			EditControls._debugPortal.position.x = yawObject.position.x;
			EditControls._debugPortal.position.z = yawObject.position.z;
			break;
		
		case 90: // Z
			var template = '{"url":"{url}","px":{px},"pz":{pz},"ix":{ix},"iy":{iy},"iz":{iz},"iry":{iry},"iw":{iw},"ih":{ih},"cx":{cx},"cz":{cz},"crx":{crx},"cry":{cry}, "desc":{desc}}';
			var img = EditControls._debugPortal.targetImage;
			
			console.log(
				template.replace("{url}", img.d.url)
						.replace("{px}", +EditControls._debugPortal.position.x.toFixed(3))
						.replace("{pz}", +EditControls._debugPortal.position.z.toFixed(3))
						.replace("{ix}", +img.position.x.toFixed(3))
						.replace("{iy}", +img.position.y.toFixed(3))
						.replace("{iz}", +img.position.z.toFixed(3))
						.replace("{iry}", +img.rotation.y.toFixed(3))
						.replace("{iw}", +(img.geometry.width * img.scale.x).toFixed(3))
						.replace("{ih}", +(img.geometry.height * img.scale.y).toFixed(3))
						.replace("{cx}", +yawObject.position.x.toFixed(3))
						.replace("{cz}", +yawObject.position.z.toFixed(3))
						.replace("{crx}", +pitchObject.rotation.x.toFixed(3))
						.replace("{cry}", +yawObject.rotation.y.toFixed(3))
						.replace("{desc}", '"' + img.d.desc + '"')
			);
	}
}