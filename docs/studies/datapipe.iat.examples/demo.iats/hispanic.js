define(['pipAPI','/implicit/common/all/js/pip/piscripts/iat/iat10.js'], function(APIConstructor, iatExtension){
	var API = new APIConstructor();

	API.addGlobal({
		posWords: API.shuffle([
            'Love', 'Cheer', 'Friend', 'Pleasure',
            'Adore', 'Cheerful', 'Friendship', 'Joyful',
            'Smiling', 'Cherish', 'Excellent', 'Glad',
            'Joyous', 'Spectacular', 'Appealing', 'Delight',
            'Excitement', 'Laughing', 'Attractive', 'Delightful',
            'Fabulous', 'Glorious', 'Pleasing', 'Beautiful',
            'Fantastic', 'Happy', 'Lovely', 'Terrific',
            'Celebrate', 'Enjoy', 'Magnificent', 'Triumph'
        ]),
        negWords: API.shuffle([
            'Abuse', 'Grief', 'Poison', 'Sadness',
            'Pain', 'Despise', 'Failure', 'Nasty',
            'Angry', 'Detest', 'Horrible', 'Negative',
            'Ugly', 'Dirty', 'Gross', 'Evil',
            'Rotten', 'Annoy', 'Disaster', 'Horrific',
            'Scorn', 'Awful', 'Disgust', 'Hate',
            'Humiliate', 'Selfish', 'Tragic', 'Bothersome',
            'Hatred', 'Hurtful', 'Sickening', 'Yucky'
        ]),
        nonhispWords: API.shuffle([
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
            'Miller', 'Davis', 'Wilson', 'Anderson', 'Thomas',
            'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson',
            'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 
            'Young', 'Allen', 'King', 'Wright', 'Scott', 'Nguyen', 
            'Hill', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 
            'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Phillips', 
            'Evans', 'Turner', 'Parker', 'Edwards', 'Collins', 
            'Stewart', 'Morris', 'Murphy', 'Cook', 'Rogers', 'Morgan',
            'Cooper', 'Peterson', 'Bailey','Reed', 'Kelly', 'Howard', 
            'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 
            'Wood', 'James', 'Bennett', 'Gray', 'Hughes', 'Price', 
            'Sanders', 'Patel', 'Myers', 'Ross', 'Long', 'Foster'
        ]),
        hispWords: API.shuffle([
            'Garcia', 'Rodriguez', 'Martinez','Hernandez',
            'Lopez', 'Gonzalez', 'Perez', 'Sanchez', 'Ramirez',
            'Torres', 'Flores', 'Rivera', 'Gomez', 'Diaz', 'Cruz',
            'Reyes', 'Morales', 'Gutierrez', 'Ortiz', 'Ramos',
            'Chavez', 'Mendoza', 'Ruiz', 'Alvarez', 'Castillo'
        ])
	});
    
    var global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : 'Hispanic people', //Will appear in the data.
            title : {
                media : {word : 'Hispanic people'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.hispWords[0]},
				{word: global.hispWords[1]},
				{word: global.hispWords[2]},
				{word: global.hispWords[3]},
				{word: global.hispWords[4]},
				{word: global.hispWords[5]},
				{word: global.hispWords[6]},
				{word: global.hispWords[7]}     
    	    ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 :    {
            name : 'Non-Hispanic people', //Will appear in the data.
            title : {
                media : {word : 'Non-Hispanic people'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.nonhispWords[0]},
				{word: global.nonhispWords[1]},
				{word: global.nonhispWords[2]},
				{word: global.nonhispWords[3]},
				{word: global.nonhispWords[4]},
				{word: global.nonhispWords[5]},
				{word: global.nonhispWords[6]},
				{word: global.nonhispWords[7]}
            ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
		attribute1 :
		{
			name : 'Bad words',
			title : {
				media : {word : 'Bad words'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: global.negWords[0]},
				{word: global.negWords[1]},
				{word: global.negWords[2]},
				{word: global.negWords[3]},
				{word: global.negWords[4]},
				{word: global.negWords[5]},
				{word: global.negWords[6]},
				{word: global.negWords[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		attribute2 :
		{
			name : 'Good words',
			title : {
				media : {word : 'Good words'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: global.posWords[0]},
				{word: global.posWords[1]},
				{word: global.posWords[2]},
				{word: global.posWords[3]},
				{word: global.posWords[4]},
				{word: global.posWords[5]},
				{word: global.posWords[6]},
				{word: global.posWords[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
        base_url : {//Where are your images at?
            image : global.baseURL
        },
		isTouch : global.isTouch
    });
});
