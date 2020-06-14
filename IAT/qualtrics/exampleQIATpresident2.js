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
    presidentSet = API.shuffle(['obama','bush','clinton','jefferson','kennedy','lincoln','nixon','reagan','recent','roosevelt'])[0];
    switch(presidentSet){
        case 'obama':
            return iatExtension({

                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
            {image: 'trump1.jpg'},
                {image: 'trump2.jpg'},
                {image: 'trump3.jpg'},
                {image: 'trump4.jpg'},
                {image: 'trump5.jpg'},
                {image: 'trump6.jpg'}
                
        ], 
                    //Stimulus css
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category1 :	{
                    name : 'Barack Obama', //Will appear in the data.
                    title : {
                        media : {word : 'Barack Obama'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
            {image: 'obama7.jpg'},
                        {image: 'obama8.jpg'},
                        {image: 'obama9.jpg'},
                        {image: 'obama10.jpg'},   
                        {image: 'obama11.jpg'},
                        {image: 'obama12.jpg'}	
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

        case 'bush':
            return iatExtension({

                category1 : {
                    name : 'bush', //Will appear in the data.
                    title : {
                        media : {word : 'George W. Bush'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'bush7.jpg'},
                        {image: 'bush8.jpg'},
                        {image: 'bush9.jpg'},
                        {image: 'bush10.jpg'},
                        {image: 'bush11.jpg'},
                        {image: 'bush12.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}
        		
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
        case 'clinton':
            return iatExtension({

                category1 : {
                    name : 'clinton', //Will appear in the data.
                    title : {
                        media : {word : 'Bill Clinton'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'clinton1.jpg'},
                        {image: 'clinton2.jpg'},
                        {image: 'clinton3.jpg'},
                        {image: 'clinton4.jpg'},
                        {image: 'clinton5.jpg'},
                        {image: 'clinton6.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}	
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

        case 'jefferson':
            return iatExtension({

                category1 : {
                    name : 'jefferson', //Will appear in the data.
                    title : {
                        media : {word : 'Thomas Jefferson'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'jefferson1.jpg'},
                        {image: 'jefferson2.jpg'},
                        {image: 'jefferson3.jpg'},
                        {image: 'jefferson4.jpg'},
                        {image: 'jefferson5.jpg'},
                        {image: 'jefferson6.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}
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

        case 'kennedy':
            
            return iatExtension({

                category1 : {
                    name : 'kennedy', //Will appear in the data.
                    title : {
                        media : {word : 'John F. Kennedy'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'kennedy1.jpg'},
                        {image: 'kennedy2.jpg'},
                        {image: 'kennedy3.jpg'},
                        {image: 'kennedy4.jpg'},
                        {image: 'kennedy5.jpg'},
                        {image: 'kennedy6.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}	
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

        case 'lincoln':
            
            return iatExtension({

                category1 : {
                    name : 'lincoln', //Will appear in the data.
                    title : {
                        media : {word : 'Abraham Lincoln'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'lincolnp1.jpg'},
                        {image: 'lincolnp2.jpg'},
                        {image: 'lincolnp3.jpg'},
                        {image: 'lincolnp4.jpg'},
                        {image: 'lincolnp5.jpg'},
                        {image: 'lincolnp6.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}
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

        case 'nixon':
            
            return iatExtension({

                category1 : {
                    name : 'nixon', //Will appear in the data.
                    title : {
                        media : {word : 'Richard Nixon'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'nixon1.jpg'},
                        {image: 'nixon2.jpg'},
                        {image: 'nixon3.jpg'},
                        {image: 'nixon4.jpg'},
                        {image: 'nixon5.jpg'},
                        {image: 'nixon6.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}	
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

        case 'reagan':
            
            return iatExtension({

                category1 : {
                    name : 'reagan', //Will appear in the data.
                    title : {
                        media : {word : 'Ronald Reagan'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'reagan1.jpg'},
                        {image: 'reagan2.jpg'},
                        {image: 'reagan3.jpg'},
                        {image: 'reagan4.jpg'},
                        {image: 'reagan5.jpg'},
                        {image: 'reagan6.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}	
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

        case 'recent':
            
            return iatExtension({

                category1 : {
                    name : 'recent', //Will appear in the data.
                    title : {
                        media : {word : 'Recent Presidents'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'recent3.jpg'},
                        {image: 'recent4.jpg'},
                        {image: 'recent5.jpg'},
                        {image: 'recent6.jpg'},
                        {image: 'recent7.jpg'},
                        {image: 'recent8.jpg'},
                        {image: 'recent9.jpg'},
                        {image: 'recent10.jpg'},
                        {image: 'recent11.jpg'},
                        {image: 'recent12.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}
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

        case 'roosevelt':
            
            return iatExtension({

                category1 : {
                    name : 'roosevelt', //Will appear in the data.
                    title : {
                        media : {word : 'Franklin D. Roosevelt'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'roosevelt1.jpg'},
                        {image: 'roosevelt2.jpg'},
                        {image: 'roosevelt3.jpg'},
                        {image: 'roosevelt4.jpg'},
                        {image: 'roosevelt5.jpg'},
                        {image: 'roosevelt6.jpg'}
                       
                    ], 
                    //Stimulus css (style)
                    stimulusCss : {color:'#31940F','font-size':'1.8em'}
                },	
                category2 :	{
                    name : 'Donald Trump', //Will appear in the data.
                    title : {
                        media : {word : 'Donald Trump'}, //Name of the category presented in the task.
                        css : {color:'#31940F','font-size':'2em'}, //Style of the category title.
                        height : 4 //Used to position the "Or" in the combined block.
                    }, 
                    stimulusMedia : [ //Stimuli content as PIP's media objects
           	{image: 'trump1.jpg'},
        		{image: 'trump2.jpg'},
        		{image: 'trump3.jpg'},
        		{image: 'trump4.jpg'},
        		{image: 'trump5.jpg'},
        		{image: 'trump6.jpg'}
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


    }

	});
