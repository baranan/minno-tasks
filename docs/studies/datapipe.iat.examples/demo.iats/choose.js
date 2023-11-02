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
                			{text:'Black/White Evaluative', value:'race'},
                			{text:'Age', value:'age'},
                			{text:'Disability', value:'disability'},
                            {text:'Native Americans', value:'native'},
                            {text:'Gender science', value:'genderscience'},
                            {text:'Asian Americans', value:'asian'},
                            {text:'Arab Americans', value:'arab'},
                            {text:'Sexuality', value:'sexuality'},
                            {text:'Weight', value:'weight'}
                        ]
                    }
                ]
            }
    ]);

	return API.script;
});




