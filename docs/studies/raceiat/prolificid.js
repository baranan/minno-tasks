define(['questAPI'], function(Quest){
	var API = new Quest();
	

    API.addQuestionsSet('basicQ',{
		autoSubmit:true,
		decline: true, 
		required: true,
		help: '<%= pagesMeta.number < 3 %>'
	});
	
	API.addQuestionsSet('basicSelect', 
	{
		inherit:'basicQ',
		type:'text'
	});

	// ### Questions-pp list 4 likes
	API.addQuestionsSet({
		id : [{
		    inherit: 'basicSelect',
			stem: 'Please enter your Prolific ID',
			name:'prolificID',
			required: true
		}]
	});

    /**
	    Pages
	**/
	API.addPagesSet('basicPage',{
		noSubmit:false, 
		decline: false
		//progressBar: 'Page <%= pagesMeta.number %> out of 8',
        //pageValidationText:'Typo: the item should be typed exactly the same in both times.'
	});
	
	
	// ### Sequence
	API.addSequence(
	[
        {
            inherit:'basicPage', 
            questions: [
                {inherit:'id'}
                        ]
         }
    ]);
	/**
	Return the script to piquest's god, or something of that sort.
	**/
	return API.script;
});
