define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat8.js'], function(APIConstructor, iatExtension){
    var API = new APIConstructor();

	return iatExtension({

		category1 : {
			name : 'Career', //Will appear in the data.
			title : {
				media : {word : 'Career'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
            {word: 'Career'},
				{word: 'Corporation'},
				{word: 'Salary'},
				{word: 'Office'},
				{word: 'Professional'},
				{word: 'Management'},
				{word: 'Business'}
			], 
			//Stimulus css (style)
			stimulusCss : {color:'#31940F','font-size':'1.8em'}
		},	
		category2 :	{
			name : 'Family', //Will appear in the data.
			title : {
				media : {word : 'Family'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
           	{word: 'Wedding'},
				{word: 'Marriage'},
				{word: 'Parents'},
				{word: 'Relatives'},
				{word: 'Family'},
				{word: 'Home'}, 
				{word: 'Children'}
			], 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'1.8em'}
		},
		attribute1 :
		{
			name : 'Male',
			title : {
				media : {word : 'Male'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
            	{word: 'Ben'},
				{word: 'Paul'},
				{word: 'Daniel'},
				{word: 'John'},
				{word: 'Jeffrey'}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		attribute2 :
		{
			name : 'Female',
			title : {
				media : {word : 'Female'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
          {word: 'Rebecca'},
				{word: 'Michelle'},
				{word: 'Emily'},
				{word: 'Julia'},
				{word: 'Anna'}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},

		base_url : {//Where are your images at?
			image : 'https://galmaimon.github.io/iatage'
		} 
	});
});
