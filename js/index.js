
document.addEventListener("deviceready", init, false);

function init() {	
	document.querySelector("#pickContact").addEventListener("touchend", doContactPicker, false);
}

function doContactPicker() {
	navigator.contacts.pickContact(function(contact){
		console.log('The following contact has been selected:' + JSON.stringify(contact));
		//Build a simple string to display the Contact - would be better in Handlebars
		var s = "";
		

		if(contact.phoneNumbers && contact.phoneNumbers.length) {
			document.getElementById("to").setAttribute('value',+contact.phoneNumbers[0].value);
		}

		document.querySelector("#selectedContact").innerHTML=s;
	},function(err){
		console.log('Error: ' + err);
	});
}

/*
Handles iOS not returning displayName or returning null/""
*/
function getName(c) {
	var name = c.displayName;
	if(!name || name === "") {
		if(c.name.formatted) return c.name.formatted;
		if(c.name.givenName && c.name.familyName) return c.name.givenName +" "+c.name.familyName;
		return "Nameless";
	}
	return name;
}


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}
