/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	//Get information for profile
	
	var activity1 = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:17 },
  		text: 'Exercise',
  		top: '170dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  	
  	var activity2 = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:17 },
  		text: 'Exercise',
  		top: '200dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	var levelLabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:25 },
  		text: 'Current Level:',
  		top: '25dp',
 	 	left: '125dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});

  		
  	var pb2=Titanium.UI.createProgressBar({
    	top:'50dp',
    	left:'125dp',
    	width:'175dp',
    	height:'auto',
    	min:0,
    	max:400,
    	value:25,
    	color:'#fff',
    	font:{fontSize:20, color:'white,'},
    	style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
	});
  	 
	
	var profileReq = Titanium.Network.createHTTPClient();

	profileReq.onload = function() {
		//Parse JSON file
		var profileJSON = JSON.parse(this.responseText);
		//Use values to generate progress bar and labels for current level and recent activities
		userPoints = profileJSON[0].points;
		pb2.setValue(userPoints);
		userLevel = 'Current Level: ';
		userLevel = userLevel+profileJSON[0].level;
		var activity1string = '';
		activity1string = activity1string+profileJSON[0].acts[0].name+' for '+profileJSON[0].acts[0].newpoints+' points on '+profileJSON[0].acts[0].month+'/'+profileJSON[0].acts[0].day+'/'+profileJSON[0].acts[0].year;
		var activity2string = '';
		activity2string = activity2string+profileJSON[0].acts[1].name+' for '+profileJSON[0].acts[1].newpoints+' points on '+profileJSON[0].acts[1].month+'/'+profileJSON[0].acts[1].day+'/'+profileJSON[0].acts[1].year;
		activity1.setText(activity1string);
		activity2.setText(activity2string);
		levelLabel.setText(userLevel);
		
	};
    
    function profileUpdate(){
    	profileReq.open("POST","http://owlympics.ecg.rice.edu:81/mobile/profile");  
        var params = {
            uuid: Titanium.Platform.id,
        };  
        profileReq.send(params);
    }
    
	if(Ti.App.Properties.hasProperty('loggedBefore')) {
    	profileUpdate();
	};
	
	/* Set up profile window */
	
	
	var win1 = Titanium.UI.createWindow({
    	title:'Log Exercises',
    	backgroundColor:'#2C2B3D',
    	backgroundImage:'images/triangular.png',
		backgroundRepeat:true,
	});
	
	var profileWin = Titanium.UI.createWindow({
		title:'Profile',
		backgroundColor:'#2C2B3D',
		backgroundColor:'#2C2B3D',
    	backgroundImage:'images/triangular.png',
		backgroundRepeat:true,
	});
	
	profileWin.add(activity1);
	profileWin.add(activity2);
	profileWin.add(pb2);
	profileWin.add(levelLabel);
	
	var mainTabGroup = Titanium.UI.createTabGroup({
	});
	
	var win1Tab = Titanium.UI.createTab({
		window:win1,
		title:'Log'
	});
	
	var profileWinTab = Titanium.UI.createTab({
		window:profileWin,
		title:'Profile'
	});
	
	/* Add profile and win1 Tabs to the mainTabGroup */
	
	mainTabGroup.addTab(win1Tab);
	mainTabGroup.addTab(profileWinTab);
	
	/* Set up fields for submission */
	
	var email = Ti.UI.createTextField({height: '40dp',
		width: '200dp',
		top: '20dp',
		left: '110dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_EMAIL});
	
	
	var password = Ti.UI.createTextField({height: '40dp',
		width: '200dp',
		top: '70dp',
		left: '110dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		passwordMask: 'True'});
		
	var exercise = Ti.UI.createTextField({height: '40dp',
		width: '200dp',
		top: '20dp',
		left: '110dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED});
		
	var lowIntensityTime = Ti.UI.createTextField({height: '40dp',
		width: '50dp',
		top: '100dp',
		left: '110dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION});
		
	var mediumIntensityTime = Ti.UI.createTextField({height: '40dp',
		width: '50dp',
		top: '100dp',
		left: '185dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION});
		
	var highIntensityTime = Ti.UI.createTextField({height: '40dp',
		width: '50dp',
		top: '100dp',
		left: '260dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});
		
	var numberOfFriends = Ti.UI.createTextField({height: '40dp',
		width: '50dp',
		top: '150dp',
		left: '260dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});
	
	win1.add(numberOfFriends);
	
	var friendLabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Number of Participants:',
  		top: '150dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	win1.add(friendLabel);
  	
  	var ratingLabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Rating (1-5 scale):',
  		top: '200dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  	
  	win1.add(ratingLabel);
  	
  	var numberRating = Ti.UI.createTextField({height: '40dp',
		width: '50dp',
		top: '200dp',
		left: '260dp',
		color: '#222',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});
	
	win1.add(numberRating);
		
	
	var changeDateWin = Titanium.UI.createWindow({
    	title:'Change Date',
    	backgroundColor:'#2C2B3D',
    	backgroundImage:'images/triangular.png',
		backgroundRepeat:true,
	});
	
	var datebtn = Ti.UI.createButton({
		title : "Change Date",
		top:'300dp',
		left:'150dp',
		});

	var doneButton = Ti.UI.createButton({
		title : "Done",
		top:'350dp'
		});

	var _date = Ti.UI.createPicker({
    	type:Ti.UI.PICKER_TYPE_DATE,
    	minDate : new Date,
		});
		
	doneButton.addEventListener('click',function(e){changeDateWin.close();mainTabGroup.show();alert(_date.value);});
	
	datebtn.addEventListener('click',function(e){
		changeDateWin.open();
		mainTabGroup.hide();
	});
		
	
		
	changeDateWin.add(_date);
	changeDateWin.add(doneButton);
	win1.add(datebtn);
	
	
  		
  	var recentLabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:25 },
  		text: 'Recent Activities:',
  		top: '125dp',
 	 	left: '5dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  	
  	profileWin.add(recentLabel);
  	
	
	
	
	
	
	var refresh = Ti.UI.createButton({
		top:'300dp',
		left:'70dp',
		title: 'Refresh',	
	});
	
	refresh.addEventListener('click',function(e)  
    {
    	profileUpdate();
    }); 
	
	profileWin.add(refresh);
			
	var submit = Ti.UI.createButton({
		top:'300dp',
		left:'70dp',
		title: 'Submit',	
	});
	
	var submitReq = Titanium.Network.createHTTPClient();  
	
	submitReq.onload = function()  
    {   
        if (this.responseText == 'Activity submission succeeded')  
        {  
            alert("Your exercise has been submitted!");  
        }  
        else  
        {  
            alert(this.responseText);  
        }  
    };  
	
    submit.addEventListener('click',function(e)  
    {  
        if (exercise.value != '' && time.value != '' && time.value > 0)  
        {  
            alert();
            submitReq.open("POST","http://owlympics.ecg.rice.edu/mobile/submit");  
            var params = {  
                exercise: exercise.value, 
                lowintensity: lowIntensityTime.value,
                mediumintensity: mediumIntensityTime.value,
                highintensity: highIntensityTime.value,
                partners: numberOfFriends.value,
                rating: numberRating.value,
                date: _date.value,
                uuid: Titanium.Platform.id
            };  
            submitReq.send(params);  
        }  
        else  
        {  
            alert("Please fill all fields. Time cannot be zero.");  
        }  
    });  
	
	
	
	var image = Ti.UI.createImageView({
  		image:'/images/myimage.png',
  		height:'100dp',
  		width:'100dp',
  		top:'5dp',
  		left:'5dp',
	});
	
	profileWin.add(image);
	
	
	var deauth = Ti.UI.createButton({
		top:'300dp',
		left:'150dp',
		title: 'Deauthorize',	
	});
	
	var deauthReq = Titanium.Network.createHTTPClient();  
	
	deauthReq.onload = function()  
    {    
        if (this.responseText == 'Deauthorization succeeded')  
        {  
            alert("Phone successfully deauthorized.");
            Ti.App.Properties.removeProperty('loggedBefore');
            win2.open();
            mainTabGroup.hide();
        }  
        else  
        {  
            alert(this.responseText);  
        }  
    };
	
    deauth.addEventListener('click',function(e)  
    {  
            deauthReq.open("POST","http://owlympics.ecg.rice.edu/mobile/detach");  
            var params = {  
                uuid: Titanium.Platform.id  
            };
            deauthReq.send(params);
    });
    
    profileWin.add(deauth);
    
    /* Set up labels */
	
	var emaillabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Username',
  		top: '25dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	var passwordlabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Password',
  		top: '75dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	var exerciselabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Exercise',
  		top: '25dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	var timelabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Time (Min)',
  		top: '105dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	var intensitylabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Intensity:',
  		top: '70dp',
 	 	left: '10dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	var lowlabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Low',
  		top: '70dp',
 	 	left: '115dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  	
  	var medlabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'Med.',
  		top: '70dp',
 	 	left: '190dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
  		
  	var highlabel = Ti.UI.createLabel({
  		color: 'white',
  		font: { fontSize:20 },
  		text: 'High',
  		top: '70dp',
 	 	left: '265dp',
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE});
	
	var win2 = Titanium.UI.createWindow({
    	title:'Register Phone',
    	backgroundColor:'#2C2B3D',
    	backgroundImage:'images/triangular.png',
		backgroundRepeat:true,
	});
    
	/* Add labels to windows */
	
    win2.add(emaillabel);
    win2.add(passwordlabel);
    win2.add(password);
    win2.add(email);
    
    
    win1.add(exercise);
    
    win1.add(exerciselabel);
    win1.add(timelabel);
    win1.add(intensitylabel);
    win1.add(exercise);
    win1.add(lowIntensityTime);
    win1.add(lowlabel);
    win1.add(mediumIntensityTime);
    win1.add(medlabel);
    win1.add(highIntensityTime);
    win1.add(highlabel);
    win1.add(submit);
    
    var register = Ti.UI.createButton({
		top:'300dp',
		title: 'register',	
	});
	
	win2.add(register);
	
	var registerReq = Titanium.Network.createHTTPClient(); 
	
	registerReq.onload = function()  
    {  
          
        if (this.responseText == 'Authentication succeeded')  
        {  
            alert("Account successfully registered.");
            mainTabGroup.show();
            win2.close();
            Ti.App.Properties.setInt('loggedBefore', 1);
             
        }  
        else  
        {  
            alert(this.responseText);  
        }  
    };
	 
    register.addEventListener('click',function(e)  
    {  
        if (email.value != '' && password.value != '')  
        {  
            registerReq.open("POST","http://owlympics.ecg.rice.edu:81/mobile/register");  
            var params = {  
                username: email.value,  
                password: password.value,
                uuid: Titanium.Platform.id
            };  
            registerReq.send(params);  
        }  
        else  
        {  
            alert("Username/Password are required");  
        }  
    });  
	
	if(Ti.App.Properties.hasProperty('loggedBefore')) {
    mainTabGroup.open();
	} else{win2.open();}


	})();
