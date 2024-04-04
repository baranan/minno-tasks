define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/spf/spf4.js'], function(APIConstructor, spfExtension){

    var API = new APIConstructor();
	var global = API.getGlobal();

	return spfExtension({
		//The two categories.
		objectCat1 :  
		{
			name : 'Black people', //Will appear in the data.
			title : {
				media : {word : 'Black people'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 8 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [
    		    {image : 'black1.jpg'}, 
    			{image : 'black2.jpg'}, 
    			{image : 'black3.jpg'}, 
    			{image : 'black4.jpg'}, 
    			{image : 'black5.jpg'}, 
    			{image : 'black6.jpg'}
			], 
			//Stimulus css (style)
			stimulusCss : {color:'#31b404','font-size':'2em'}
		},
		objectCat2 :  
		{
			name : 'White people', //Will appear in the data.
			title : {
				media : {word : 'White people'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 8 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
    		    {image : 'yf1.jpg'}, 
    			{image : 'yf4.jpg'}, 
    			{image : 'yf5.jpg'}, 
    			{image : 'ym2.jpg'}, 
    			{image : 'ym3.jpg'}, 
    			{image : 'ym5.jpg'}
			], 
			//Stimulus css
			stimulusCss : {color:'#31b404','font-size':'2em'}
		}, 
		
		base_url : {
			image : global.mediaURL
		}

	});
});





























