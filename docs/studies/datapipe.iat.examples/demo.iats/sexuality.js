define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'], function(APIConstructor, iatExtension){
	var API = new APIConstructor();
	
	//Randomize which of the three possible stimulus sets we are going to use for the gay category
    var gaySet = API.shuffle(['gay','lesbian','general'])[0];
    var gayWords = ['Gay People', 'Homosexual']; //All gay sets have this word
	var gayImages = [];

    //Fill the sets of words and images for the gay categories, based on the gay-set condition
	if (gaySet == 'lesbian')
    {
        gayWords.push('Lesbians');
        gayWords.push('Gay Women');
        gayImages.push('07_lesbian.jpg');
    }
    else if (gaySet == 'gay')
    {
        gayWords.push('Gay');
        gayWords.push('Gay Men');
        gayImages.push('05_gay.jpg');
	}
    else //General: use both men and women images.
    {
        gayWords.push('Gay');
        gayImages.push('07_lesbian.jpg');
        gayImages.push('05_gay.jpg');
	}

    API.addGlobal({
	    gaySet : gaySet,
	    gayWords : gayWords,
	    gayImages : gayImages,
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

	var global = API.getGlobal();

	//Get the stimuli for the gay category
	var gayMedia = []; 
	for(var iImage = 0; iImage < global.gayImages.length; iImage++)
	{
	    gayMedia.push({image:global.gayImages[iImage]});
	}
	for(var iWord = 0; iWord < global.gayWords.length; iWord++)
	{
	    gayMedia.push({word:global.gayWords[iWord]});
	}

	return iatExtension({
    	 attribute1 : {
			name : 'Good', //Will appear in the data.
			title : {
				media : {word : 'Good'}, //Name of the category presented in the task.
				css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
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
			//Stimulus css (style)
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},	
		attribute2 :	{
			name : 'Bad', //Will appear in the data.
			title : {
				media : {word : 'Bad'}, //Name of the category presented in the task.
				css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
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
	    category1 : {
			name : 'Straight people', //Will appear in the data.
			title : {
				media : {word : 'Straight people'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : 
			[ //Stimuli content as PIP's media objects
				{image: '06_hetero.jpg'},
				{word: 'Straight'},
				{word: 'Heterosexual'},
				{word: 'Straight People'}
			], 
			//Stimulus css (style)
			stimulusCss : {color:'#31940F','font-size':'2.3em'}
		},
    	category2 :	{
			name : 'Gay people', //Will appear in the data.
			title : {
				media : {word : 'Gay people'}, //Name of the category presented in the task.
				css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : gayMedia, 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'2.3em'}
		},
		
        base_url : {//Where are your images at?
            image : 'https://baranan.github.io/minno-tasks/studies/datapipe.iat.examples/demo.iats/sex.images/'
        },
        
		isTouch : API.getGlobal().isTouch
    });
});










