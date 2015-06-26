document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    // we will not be doing anything!!
}
 
$(document).on("pageshow", function () {
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
    if ($("#contactsList").length == 1) {
        $("body").addClass('ui-disabled').css("background", "#000");
        $.mobile.loading("show");
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var filter = ["displayName", "phoneNumbers"];
        navigator.contacts.find(filter, onSuccess, onError, options);
    }
});
 
function onSuccess(contacts) {
    var html = "";
    for (var i = 0; i < contacts.length; i++) {
        if ($.trim(contacts[i].displayName).length != 0 || $.trim(contacts[i].nickName).length != 0) {
            if (contacts[i].phoneNumbers) {
               
				document.getElementById("to").setAttribute('value',contacts[i].phoneNumbers[j].value);
        }
    }
    if (contacts.length === 0) {
        html = '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">';
        html += '<h2>No Contacts</h2>';
        html += '<label>No Contacts Listed</label>';
        html += '</li>';
    }
}
 });
function onError(contactError) {
    alert('Oops Something went wrong!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
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
