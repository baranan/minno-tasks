define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    var API = new APIConstructor();
    var global = API.getGlobal();
    
    return iatExtension({
      attribute1 : {
			name : 'Foreign', //Will appear in the data.
			title : {
				media : {word : 'Foreign'}, //Name of the category presented in the task.
				css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{image: 'FOR002.jpg'},
				{image: 'FOR003.jpg'},
				{image: 'FOR006.jpg'},
				{image: 'FOR001.jpg'},
				{image: 'FOR004.jpg'},
				{image: 'FOR005.jpg'}
				
			], 
			//Stimulus css (style)
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},	
		attribute2 :	{
			name : 'American', //Will appear in the data.
			title : {
				media : {word : 'American'}, //Name of the category presented in the task.
				css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{image: 'AME009.jpg'},
				{image: 'AME0016.jpg'},
				{image: 'AME006.jpg'},
				{image: 'AME0012.jpg'},
				{image: 'AME003.jpg'},
				{image: 'AME002.jpg'}
				
			], 
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		category1 : 
		{
			name : 'Asian American', 
			title : {
				media : {word : 'Asian American'}, 
				css : {color:'#31940F','font-size':'1.8em'}, 
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{image: 'AFE851.jpg'},
				{image: 'AFE831.jpg'},
				{image: 'AFE811.jpg'},
				{image: 'AME871.jpg'},
				{image: 'AME831.jpg'},
				{image: 'AME821.jpg'}
				
			], 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'2.3em'} 
		},
		category2 : 
		{
			name : 'European American',
			title : {
				media : {word : 'European American'}, 
				css : {color:'#31940F','font-size':'1.8em'}, 
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{image: 'AME041.jpg'},
				{image: 'AME011.jpg'},
				{image: 'AME021.jpg'},
				{image: 'AFE021.jpg'},
				{image: 'AFE071.jpg'},
				{image: 'AFE081.jpg'}
			], 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'2.3em'}
		},
		base_url : {//Where are your images at?
            image : 'https://baranan.github.io/minno-tasks/studies/datapipe.iat.examples/demo.iats/asian.images/'
        },
		isTouch : global.isTouch,
		
    });
});

