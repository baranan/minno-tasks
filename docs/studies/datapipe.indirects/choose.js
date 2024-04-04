define(['questAPI'], function(Quest){
	var API = new Quest();


	API.addQuestionsSet('basicQ',{
		decline: false,
		type:'selectOne',
		numericValues:'true'
	});
	
	/**
	* Page prototype
	*/
	API.addPagesSet('basicPage',{
	    header: 'Choose a task',
		noSubmit:false, 
		decline: false,
		numbered: false
	});

	// ### Sequence
		API.addSequence([
            {
                inherit:'basicPage', 
                questions : [
                    {
                        inherit:'basicQ',
                        stem:'Please choose a task to experience', 
                        name:'choice',
                        answers : [
                			{text:'Affect Misattribution Procedure (AMP) - Positive/Negative photos', value:'ampiaps'},
                			{text:'Affect Misattribution Procedure (AMP) - Black/White people', value:'amprace'},
                			{text:'Affect Misattribution Procedure (AMP) - Black/White people (continuous)', value:'amprace7'},
                            {text:'Implicit Association Test (IAT) - Black/White people', value:'iatrace'},
                            {text:'Sorting paired features (SPF) task - Black/White people', value:'spfrace'},
                            {text:'Single-Target IAT (ST-IAT) - Black people', value:'stiatblk'},
                            {text:'Brief IAT (BIAT) - Black/White people', value:'biatrace'},
                            {text:'Multi-Category IAT (MC-IAT) - Black/White people', value:'mciatrace'},
                            {text:'Evaluative Priming - Black/White people', value:'eprace'}
                        ]
                    }
                ]
            }
    ]);

	return API.script;
});



