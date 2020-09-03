define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat9.js'], function(APIConstructor, iatExtension){

	var baseURL = 'https://baranan.github.io/minno-tasks/images/';
	return iatExtension({
        category2 : {
            name : 'Black Americans', //Will appear in the data.
            title : {
                media : {word : 'Black Americans'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'bf14.jpg'},
                {image: 'bf23.jpg'},
                {image: 'bf56.jpg'},
				        {image: 'bm14.jpg'},
                {image: 'bm23.jpg'},                 
				        {image: 'bm56.jpg'}   
    	    ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category1 :    {
            name : 'White Americans', //Will appear in the data.
            title : {
                media : {word : 'White Americans'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'wf2.jpg'},
                {image: 'wf3.jpg'},
                {image: 'wf6.jpg'},
				        {image: 'wm1.jpg'},
                {image: 'wm4.jpg'},
                {image: 'wm6.jpg'}
            ],
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
		attribute2 :
		{
			name : 'Weapons',
			title : {
				media : {word : 'Weapons'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{image: 'wgrenade.jpg'},
        {image: 'waxe.jpg'},
        {image: 'wcannon.jpg'},
				{image: 'wmace.jpg'},
        {image: 'wrevolver.jpg'},
        {image: 'wrifle.jpg'},
        {image: 'wsword.jpg'}
              
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		attribute1 :
		{
			name : 'Harmless Objects',
			title : {
				media : {word : 'Harmless Objects'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{image: 'hbottle.jpg'},
        {image: 'hcamera.jpg'},
        {image: 'hcoke.jpg'},
				{image: 'hice_cream.jpg'},
        {image: 'hphone.jpg'},
        {image: 'hwalkman.jpg'},
        {image: 'hwallet.jpg'}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
        base_url : {//Where are your images at?
            image : baseURL
        },
				
			fb_strong_Att1WithCatA_Att2WithCatB : 'Your data suggest a strong automatic association for attribute1 with categoryA and attribute2 with categoryB.',
			fb_moderate_Att1WithCatA_Att2WithCatB : 'Your data suggest a moderate automatic association for attribute1 with categoryA and attribute2 with categoryB.',
			fb_slight_Att1WithCatA_Att2WithCatB : 'Your data suggest a slight automatic association for attribute1 with categoryA and attribute2 with categoryB.',
			fb_equal_CatAvsCatB : 'Your data suggest little or no automatic association between attribute2 and attribute1 with categoryA and categoryB.'
    });
});
