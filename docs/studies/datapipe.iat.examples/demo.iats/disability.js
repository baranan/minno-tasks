define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    var API = new APIConstructor();

    API.addGlobal({
        //Based on Axt, Feng, & Bar-Anan (2021).
        posWords : API.shuffle([
            'Love', 'Cheer', 'Friend', 'Pleasure',
            'Adore', 'Cheerful', 'Friendship', 'Joyful', 
            'Smiling','Cherish', 'Excellent', 'Glad', 
            'Joyous', 'Spectacular', 'Appealing', 'Delight', 
            'Excitement', 'Laughing', 'Attractive','Delightful', 
            'Fabulous', 'Glorious', 'Pleasing', 'Beautiful', 
            'Fantastic', 'Happy', 'Lovely', 'Terrific', 
            'Celebrate', 'Enjoy', 'Magnificent', 'Triumph'
        ]), 
        negWords : API.shuffle([
            'Abuse', 'Grief', 'Poison', 'Sadness', 
            'Pain', 'Despise', 'Failure', 'Nasty', 
            'Angry', 'Detest', 'Horrible', 'Negative', 
            'Ugly', 'Dirty', 'Gross', 'Evil', 
            'Rotten','Annoy', 'Disaster', 'Horrific',  
            'Scorn', 'Awful', 'Disgust', 'Hate', 
            'Humiliate', 'Selfish', 'Tragic', 'Bothersome', 
            'Hatred', 'Hurtful', 'Sickening', 'Yucky'
        ])
    });

    let global = API.getGlobal();
    
    return iatExtension({
        category1 : {
            name : 'Physically Disabled People', //Will appear in the data.
            title : {
                media : {word : 'Physically Disabled People'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'disabled1.png'},
                {image: 'disabled2.png'},
                {image: 'disabled3.png'},
				{image: 'disabled4.png'},
				{image: 'disabled5.png'},
				{image: 'disabled6.png'}
    	    ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 :    {
            name : 'Physically Abled People', //Will appear in the data.
            title : {
                media : {word : 'Physically Abled People'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'abled1.png'},
                {image: 'abled2.png'},
                {image: 'abled3.png'},
				{image: 'abled4.png'},
				{image: 'abled5.png'},
				{image: 'abled6.png'}				
            ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
		attribute1 :
		{
			name : 'Bad',
			title : {
				media : {word : 'Bad'},
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
			name : 'Good',
			title : {
				media : {word : 'Good'},
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
            image : 'https://baranan.github.io/minno-tasks/studies/datapipe.iat.examples/demo.iats/disability.images/'
        },
		isTouch : global.isTouch
    });
});



