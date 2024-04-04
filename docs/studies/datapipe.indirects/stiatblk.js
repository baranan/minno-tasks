define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/stiat6.js'], function(APIConstructor, stiatExtension){

    var API = new APIConstructor();
	var global = API.getGlobal();

	return stiatExtension(
		{			
			/*remindErrorText : '<p align="center" style="font-size:"4em"; font-family:arial">' +
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
			'Press the other key to continue.<p/>',**/
			
			//Define the category.
			category :  
			{
				name : 'Black people', //Category label.
				title : {
					media : {word : 'Black people'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 7 //Used to position the "Or" in the combined block.
				}, 
				media : [ //Stimuli
    		    {image : 'black1.jpg'}, 
    			{image : 'black2.jpg'}, 
    			{image : 'black3.jpg'}, 
    			{image : 'black4.jpg'}, 
    			{image : 'black5.jpg'}, 
    			{image : 'black6.jpg'}
				],
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'3em'}
			},
			attribute1 : 
			{
				name : 'Unpleasant', //Attribute label
				title : {
					media : {word : 'Negative'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 7 //Used to position the "Or" in the combined block.
				}, 
				media : [ //Stimuli
					{word: 'Bomb'},
					{word: 'Abuse'},
					{word: 'Sadness'},
					{word: 'Pain'},
					{word: 'Poison'},
					{word: 'Grief'}
				], 
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'3em'}
			},
			attribute2 : 
			{
				name : 'Pleasant', //Attribute label
				title : {
					media : {word : 'Positive'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 7 //Used to position the "Or" in the combined block.
				}, 
				media : [ //Stimuli
					{word: 'Paradise'},
					{word: 'Pleasure'},
					{word: 'Cheer'},
					{word: 'Wonderful'},
					{word: 'Splendid'},
					{word: 'Love'}
				], 
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'3em'}
			}, 
			
			base_url : {
			    image : global.mediaURL
		    }

		}
	);
});
