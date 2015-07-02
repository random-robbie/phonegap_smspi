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
$(document).ready(function(){
	 $("#submit").click(function(){	
		  username=$("#txtf").val();
		  password=$("#txts").val();
		  $.ajax({
		   type: "POST",
		   url: "http://www.smspi.co.uk/login.app.php",
		   data: "username="+username+"&password="+password,
		   success: function(data){    
				$(".error").html(data);
				var obj = data[0];
				console.log(obj.message);
				if(obj.error === false)
				{
					setCookie("batman",obj.message,"90");
					window.location="sendsms.html";
				} else {
					document.getElementById("error").innerHTML="<p>" + obj.message + "</p>";
				}
		   }
		  });
		return false;
	});
});



