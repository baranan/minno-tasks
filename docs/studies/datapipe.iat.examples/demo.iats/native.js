define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'], 
function(APIConstructor, iatExtension){
	var API = new APIConstructor();

	API.addGlobal({
		presentStimuli : ['Alive', 'Current', 'Living', 'Present', 'Now', 'New', 'Modern', 'Contemporary'],
		pastStimuli : ['Deceased', 'Vanished', 'Dead', 'Extinct', 'Ancient', 'Historic', 'Past', 'Old'],
		whiteLastNames :  API.shuffle(['Adams', 'Allen', 'Baker', 'Clark', 'Hall', 'Nelson', 'Scott', 'Wright', 'Anderson', 'Thompson', 'Campbell', 'Bennett', 'Mitchell']),
		nativeLastNames : API.shuffle(['Awiakta', 'Wahchumwah', 'Chippewa', 'Suwake', 'Tsosie', 'Akiwenzie', 'Ojibway', 'Pewaush', 'Apache', 'Chosa', 'Kiatta', 'Homma', 'Pappan'])
	});

    var global = API.getGlobal();
    
    return iatExtension({
        category1 : {
            name : 'White Americans', //Will appear in the data.
            title : {
                media : {word : 'White Americans'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: global.whiteLastNames[0]},
				{word: global.whiteLastNames[1]},
				{word: global.whiteLastNames[2]},
				{word: global.whiteLastNames[3]},
				{word: global.whiteLastNames[4]},
				{word: global.whiteLastNames[5]},
				{word: global.whiteLastNames[6]},
				{word: global.whiteLastNames[7]}   
    	    ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 :    {
            name : 'Native Americans', //Will appear in the data.
            title : {
                media : {word : 'Native Americans'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: global.nativeLastNames[0]},
				{word: global.nativeLastNames[1]},
				{word: global.nativeLastNames[2]},
				{word: global.nativeLastNames[3]},
				{word: global.nativeLastNames[4]},
				{word: global.nativeLastNames[5]},
				{word: global.nativeLastNames[6]},
				{word: global.nativeLastNames[7]}
            ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
		attribute1 :
		{
			name : 'Past',
			title : {
				media : {word : 'Past'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: global.pastStimuli[0]},
				{word: global.pastStimuli[1]},
				{word: global.pastStimuli[2]},
				{word: global.pastStimuli[3]},
				{word: global.pastStimuli[4]},
				{word: global.pastStimuli[5]},
				{word: global.pastStimuli[6]},					
				{word: global.pastStimuli[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		attribute2 :
		{
			name : 'Present',
			title : {
				media : {word : 'Present'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: global.presentStimuli[0]},
				{word: global.presentStimuli[1]},
				{word: global.presentStimuli[2]},
				{word: global.presentStimuli[3]},
				{word: global.presentStimuli[4]},
				{word: global.presentStimuli[5]},
				{word: global.presentStimuli[6]},					
				{word: global.presentStimuli[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		isTouch : global.isTouch
	});
});




