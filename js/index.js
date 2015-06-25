var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.testZone = {};
    },

    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
		document.addEventListener("online", onOnline, false);


    },

    onDeviceReady: function() {
        console.log("Ready");
        app.testZone = document.getElementById("test-zone");
        app.getDeviceInfo();
        app.getConnectionInfo();
        app.runNotificationChain();
    },
    
    getDeviceInfo: function() {
    	app.testZone.innerHTML += 'Device Name: '     + device.name     + '<br />' + 
                            	'Device Cordova: '  + device.cordova  + '<br />' + 
                            	'Device Platform: ' + device.platform + '<br />' + 
                            	'Device UUID: '     + device.uuid     + '<br />' + 
                            	'Device Version: '  + device.version  + '<br />';
    },
    
    getConnectionInfo: function() {
    	var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        
        app.testZone.innerHTML += "Connection type: " + states[networkState];
    },
    
    runNotificationChain: function() {
    	app.testZone.innerHTML += "<br /><br />Starting chain";
    	navigator.notification.alert(
    		'This is an alert message!',  // message
    		app.alertDismissed,         // callback
    		'Alert Box',            // title
    		'See next notification'                  // buttonName
		);
    },
    alertDismissed: function() {
    	navigator.notification.confirm(
        	'Do you want beeps and vibrations?',  // message
        	app.onConfirm,              // callback to invoke with index of button pressed
        	'Confirm Box',            // title
        	'Yes,No'          // buttonLabels
    	);
    },
    onConfirm: function(index) {
    	if(index==2){
    		alert('You selected NO');
    	}else{
    		navigator.notification.beep(2);
    		navigator.notification.vibrate(2500);
    	}
    }
	
	function onOnline() {
    app.testZone.innerHTML += "Connection type: " + states[networkState];
}
};
