define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/Priming/priming2.js'], function(APIConstructor, epExtension){
	var API = new APIConstructor();
	var global = API.getGlobal();
	return epExtension(
	{
			//The prime categories.
			primeCats :  [
				{
					name : 'Black people', //Will appear in the data.
					//An array of all media objects for this category.
					mediaArray : [
    				    {image : 'b01.jpg'}, 
    					{image : 'b02.jpg'}, 
    					{image : 'b03.jpg'}, 
    					{image : 'b04.jpg'}, 
    					{image : 'b05.jpg'}, 
    					{image : 'b06.jpg'}, 
    					{image : 'b07.jpg'}, 
    					{image : 'b08.jpg'}, 
    					{image : 'b09.jpg'}, 
    					{image : 'b10.jpg'}, 
    					{image : 'b11.jpg'}, 
    					{image : 'b12.jpg'}
				    ]
				}, 
				{
					name : 'White people', //Will appear in the data.
					//An array of all media objects for this category.
					mediaArray : [
    					{image : 'w01.jpg'}, 
    					{image : 'w02.jpg'}, 
    					{image : 'w03.jpg'}, 
    					{image : 'w04.jpg'}, 
    					{image : 'w05.jpg'}, 
    					{image : 'w06.jpg'}, 
    					{image : 'w07.jpg'}, 
    					{image : 'w08.jpg'}, 
    					{image : 'w09.jpg'}, 
    					{image : 'w10.jpg'}, 
    					{image : 'w11.jpg'}, 
    					{image : 'w12.jpg'}
    				]
				}
			],	

			nTrialsPerPrimeTargetPair:15, //How many trials in a block, per prime-target combination (always three blocks).
			fixationDuration : 500, 
			errorFBDuration : 1500, 
			ITIDuration : 500,

			//Set the image folder here.
			base_url : {
				image : "https://baranan.github.io/minno-tasks/images/"
			}
	});
});
