define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/biat6.js'], function(APIConstructor, batExtension){
    var API = new APIConstructor();
	var global = API.getGlobal();

	return batExtension({
		categories : [  
			{
				name : 'Black People',
				title : {
					media : {word : 'Black People'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 8, //Used to position the "Or" in the combined block.
					startStimulus : {
						media : {image : 'blacks.jpg'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 13
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
        		    {image : 'black1.jpg'}, 
        			{image : 'black2.jpg'}, 
        			{image : 'black3.jpg'}, 
        			{image : 'black4.jpg'}, 
        			{image : 'black5.jpg'}, 
        			{image : 'black6.jpg'}
				], 
				//Stimulus css
				stimulusCss : {color:'#33FF33','font-size':'2em'}
			},	
			{
				name : 'White people', //Category label.
				title : {
					media : {word : 'White people'}, 
					css : {color:'#31b404','font-size':'2em'}, 
					height : 8,
					startStimulus : {
						media : {image : 'whites.jpg'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 13
					}
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
			{
    			name : 'Asian American', 
				title : {
					media : {word : 'Asian People'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 8, //Used to position the "Or" in the combined block.
					startStimulus : {
						media : {word : 'asians or whatever'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 13
					}
				}, 
    			stimulusMedia : [ //Stimuli content as PIP's media objects
    				{image: 'AFE851.jpg'},
    				{image: 'AFE831.jpg'},
    				{image: 'AFE811.jpg'},
    				{image: 'AME831.jpg'},
    				{image: 'AME821.jpg'}
    				
    			], 
    			//Stimulus css
    			stimulusCss : {color:'#31940F','font-size':'2.3em'} 
    		}
		], 
		
		practiceBlock : true, 
		base_url : {//Where are your images?
			image : global.mediaURL
		}
	});
});