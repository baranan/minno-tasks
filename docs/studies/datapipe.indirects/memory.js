define(['questAPI'], function(quest){
	var API = new quest();

	/**
	Questions
	**/
	API.addQuestionsSet('basicSelect', 
	{
		type: 'selectOne',
		autoSubmit:true, 
		numericValues:true, 
        required:true
	});
	API.addQuestionsSet('role', 
	{
        inherit:'basicSelect',
        stem:'In the game you just played, what most accurately describes the role of the word <b></b>?',
        name:'memory.',
        answers:[
            'It ended the presentation of positive visions', 
            'It ended the presentation of negative visions',
            'It appeared with positive visions',
            'It appeared with negative visions',
            'It initiated positive visions',
            'It initiated negative visions',
            "I don't know/can't recall"]
	});

	API.addQuestionsSet({
	    roles : [
	        {
	            inherit:'role',
	            data:{word:'global.enderPos', role:'endPos'}
	        },
	        {
	            inherit:'role',
	            data:{word:'global.enderNeg', role:'endNeg'}
	        }
	    ]
	}
    );

	/**
	* Page prototype
	*/
	API.addPagesSet('basicPage',{
		noSubmit:false, 
		decline: true,
		numbered: false,
		progressBar: 'Page <%= pagesMeta.number %> out of 3'
	});

	/**
	Sequence
	**/
	API.addSequence(
	[
        {
    		header: 'Memory questions',
    		numbered: false,
    	    submitText:'Continue',
    	    text:"<br/><p style='margin-left: 10px;margin-right: 10px; font-size:18px'>" + 
            'In the next page, we will ask you questions about the game that you played at the beginning of this study. ' + 
            'In that game, you watched fictional ("magic") words that ended pleasant or unpleasant visions. ' + 
            'We are interested to know whether you are able to recall the role of each word in the game. </p>'
    	},
        {
	        inherit : 'basicPage', 
	        questions : [
	            {
	                mixer:'random',
	                data: [
	                    {inherit:{set:'roles', type:'exRandom'}} 
	                ]
	            }
	       ]
        },
       {
	        inherit : 'basicPage', 
	        questions : [
	            {
	                mixer:'random',
	                data: [
	                    {inherit:{set:'roles', type:'exRandom'}} 
	                ]
	            }

	       ]
        }
	]);
	
	return API.script;
});





