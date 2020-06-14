define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat8.js'], function(APIConstructor, iatExtension){
    var API = new APIConstructor();
var posWords = API.shuffle([
    'Love', 'Cheer', 'Friend', 'Pleasure', 
    'Adore', 'Cheerful', 'Friendship', 'Joyful', 
    'Smiling','Cherish', 'Excellent', 'Glad', 
    'Joyous', 'Spectacular', 'Appealing', 'Delight', 
    'Excitement', 'Laughing', 'Attractive','Delightful', 
    'Fabulous', 'Glorious', 'Pleasing', 'Beautiful', 
    'Fantastic', 'Happy', 'Lovely', 'Terrific', 
    'Celebrate', 'Enjoy', 'Magnificent', 'Triumph']);
var negWords = API.shuffle([
    'Abuse', 'Grief', 'Poison', 'Sadness', 
    'Pain', 'Despise', 'Failure', 'Nasty', 
    'Angry', 'Detest', 'Horrible', 'Negative', 
    'Ugly', 'Dirty', 'Gross', 'Evil', 
    'Rotten','Annoy', 'Disaster', 'Horrific',  
    'Scorn', 'Awful', 'Disgust', 'Hate', 
    'Humiliate', 'Selfish', 'Tragic', 'Bothersome', 
    'Hatred', 'Hurtful', 'Sickening', 'Yucky']);
    religonSet = API.shuffle(['1','2','3'])[0];
    switch(religonSet){
        case '1':
            return iatExtension({

                category1 : {
                    name : 'Christian', //Will appear in the data.
                    title : {
                        media : {word : 'Christian'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'christianity.jpg'},
                        {word: 'Church'},
			    {word: 'Bible'},
			    {word: 'Christian'},
			    {word: 'Christianity'},
			    {word: 'Christianity'}
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Islam', //Will appear in the data.
                    title : {
                        media : {word : 'Islam'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
            {image: 'islam.jpg'},
                       {word: 'Mosque'},
			    {word: 'Bible'},
			    {word: 'Koran'},
			    {word: 'Muslim'},
			    {word: 'Islam'}	
                    ], 
                    //Stimulus css
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
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
				{word: negWords[0]},
				{word: negWords[1]},
				{word: negWords[2]},
				{word: negWords[3]},
				{word: negWords[4]},
				{word: negWords[5]},
				{word: negWords[6]},
				{word: negWords[7]}
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
				{word: posWords[0]},
				{word: posWords[1]},
				{word: posWords[2]},
				{word: posWords[3]},
				{word: posWords[4]},
				{word: posWords[5]},
				{word: posWords[6]},
				{word: posWords[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},

                base_url : {//Where are your images at?
                    image : 'https://galmaimon.github.io/iatage'
                } 
            });
            break;
        case '2':
          return iatExtension({

                category2 : {
                    name : 'Christian', //Will appear in the data.
                    title : {
                        media : {word : 'Christian'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'christianity.jpg'},
                        {word: 'Church'},
			    {word: 'Bible'},
			    {word: 'Christian'},
			    {word: 'Christianity'},
			    {word: 'Christianity'}
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category1 :	{
                    name : 'Judaism', //Will appear in the data.
                    title : {
                        media : {word : 'Judaism'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
            {image: 'judaism.jpg'},
                       {word: 'Synagogue'},
			    {word: 'Torah'},
			    {word: 'Jew'},
			    {word: 'Judaism'}	
                    ], 
                    //Stimulus css
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
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
				{word: negWords[0]},
				{word: negWords[1]},
				{word: negWords[2]},
				{word: negWords[3]},
				{word: negWords[4]},
				{word: negWords[5]},
				{word: negWords[6]},
				{word: negWords[7]}
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
				{word: posWords[0]},
				{word: posWords[1]},
				{word: posWords[2]},
				{word: posWords[3]},
				{word: posWords[4]},
				{word: posWords[5]},
				{word: posWords[6]},
				{word: posWords[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},

                base_url : {//Where are your images at?
                    image : 'https://galmaimon.github.io/iatage'
                } 
            });
            break;
        case '3':
           return iatExtension({

                category2 : {
                     name : 'Judaism', //Will appear in the data.
                    title : {
                        media : {word : 'Judaism'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
            {image: 'judaism.jpg'},
                       {word: 'Synagogue'},
			    {word: 'Torah'},
			    {word: 'Jew'},
			    {word: 'Judaism'}	
                    ], 
                    //Stimulus css
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },
                category1 :	{
                    name : 'Islam', //Will appear in the data.
                    title : {
                        media : {word : 'Islam'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
            {image: 'islam.jpg'},
                       {word: 'Mosque'},
			    {word: 'Bible'},
			    {word: 'Koran'},
			    {word: 'Muslim'},
			    {word: 'Islam'}	
                    ], 
                    //Stimulus css
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
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
				{word: negWords[0]},
				{word: negWords[1]},
				{word: negWords[2]},
				{word: negWords[3]},
				{word: negWords[4]},
				{word: negWords[5]},
				{word: negWords[6]},
				{word: negWords[7]}
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
				{word: posWords[0]},
				{word: posWords[1]},
				{word: posWords[2]},
				{word: posWords[3]},
				{word: posWords[4]},
				{word: posWords[5]},
				{word: posWords[6]},
				{word: posWords[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},

                base_url : {//Where are your images at?
                    image : 'https://github.com/baranan/minno-tasks/tree/master/docs/images'
                } 
            });
            break;
       

    }

	});
