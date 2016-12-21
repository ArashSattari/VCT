var Util = {}

Util.qs = function (name)
{
    var url = window.location.href.toLowerCase();
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase(); // This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
	
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}