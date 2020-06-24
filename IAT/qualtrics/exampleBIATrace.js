define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/qbiat6.js'], function(APIConstructor, iatExtension){
  var API = new APIConstructor();

	
	return iatExtension({
		practiceCategory1 : 
			{
				name : 'Mammals', //Will appear in the data.
				title : {
					media : {word : 'Mammals'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
					height : 4, //Height (because we need to know where to put the next item in the title)
					startStimulus : { 
					//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
						media : {word : 'Dogs, Horses, Cows, Lions'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 2
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word : 'Dogs'}, 
					{word : 'Horses'}, 
					{word : 'Lions'}, 
					{word : 'Cows'}
				], 
				//Stimulus css (style of the stimuli)
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},	
			practiceCategory2 : 
			{
				name : 'Birds', 
				title : {
					media : {word : 'Birds'}, 
					css : {color:'#31b404','font-size':'1.8em'}, 
					height : 4,
					startStimulus : {
						media : {word : 'Pigeons, Swans, Crows, Ravens'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 2
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word : 'Pigeons'}, 
					{word : 'Swans'}, 
					{word : 'Crows'}, 
					{word : 'Ravens'}
				], 
				//Stimulus css
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},
				categories : [  //As many categories you need.
				{
					name : 'Black people', //Will appear in the data.
					title : {
						media : {word : 'Black people'}, //Name of the category presented in the task.
						css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
						height : 4, //Height (because we need to know where to put the next item in the title)
						startStimulus : { 
						//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
							media : {word : 'Tyron, Malik, Terrell, Jazmin, Tiara, Shanice'}, 
							css : {color:'#31b404','font-size':'1em'}, 
							height : 2
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
                    {word: 'Tyron'},
					{word: 'Malik'},
					{word: 'Terrell'},
					{word: 'Jazmin'},
					{word: 'Tiara'},
					{word: 'Shanice'}
					], 
					//Stimulus css (style of the stimuli)
					stimulusCss : {color:'#31b404','font-size':'2em'}
				},	
				{
					name : 'White people', 
					title : {
						media : {word : 'White people'}, 
						css : {color:'#31b404','font-size':'1.8em'}, 
						height : 4,
						startStimulus : {
							media : {word : 'Jake, Connor, Bradley, Alison,Emma, Emily'}, 
							css : {color:'#31b404','font-size':'1em'}, 
							height : 2
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
                    {word: 'Jake'},
					{word: 'Connor'},
					{word: 'Bradley'},
					{word: 'Allison'},
					{word: 'Emma'},
					{word: 'Emily'}
					], 
					//Stimulus css
					stimulusCss : {color:'#31b404','font-size':'2em'}
				}
			
			],
			base_url : {//Where are your images at?
				image : 'https://baranan.github.io/minno-tasks/images/'
			} 
	});
});




