define(['pipAPI','pipScorer','underscore'], function(APIConstructor,Scorer, _) {

	/**
	This extension is ased on the BIAT extension written by Yoav Bar-Anan, and on the Go/No-Go Task (GNAT) demo script written by Elad Zlotnik.
	It was edited and adjusted for the GNAT by Sapir Keinan (keinan.sapir@gmail.com)
	**/

	function gnatExtension(options)
	{
		var API = new APIConstructor();
		var scorer = new Scorer();
		var piCurrent = API.getCurrent();
		//Here we set the settings of our task. Read the comments to learn what each means.
		//You can also do that from the outside, with a dedicated jsp file.
		var gnatObj = 
		{
			isTouch:false, //Set whether the task is on a touch device.
			//Set the canvas of the task
			canvas : {
				maxWidth: 725,
				proportions : 0.85,
				background: '#ffffff',
				borderWidth: 5,
				canvasBackground: '#ffffff',
				borderColor: 'lightblue'
			}, 
			
			practiceCategory1 : 
			{
				name : 'Birds', 
				title : {
					media : {word : 'Birds'}, 
					css : {color:'#31b404','font-size':'1.8em'}, 
					height : 4,
					startStimulus : {
						media : {image : 'birds_start.jpg'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 10
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{image: 'ctsduck.jpg'},
                    {image: 'ctsparrot.jpg'},
                    {image: 'ctsrobin.jpg'},
                    {image: 'ctssparrow.jpg'}
				], 
				//Stimulus css
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},
			
			practiceCategory2 : 
			{
				name : 'Mammals', //Will appear in the data.
				title : {
					media : {word : 'Mammals'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
					height : 4, //Height (because we need to know where to put the next item in the title)
					startStimulus : { 
					//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
						media : {image : 'mammals_start.jpg'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 10
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{image: 'ctsbison.jpg'},
                    {image: 'ctsgiraffe.jpg'},
                    {image: 'ctshippo.jpg'},
                    {image: 'ctsrhino.jpg'}
				], 
				//Stimulus css (style of the stimuli)
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},	
			
			categories : [  //the extension is suited for the use of only two categories
				{
					name : 'White People', //Will appear in the data.
					title : {
						media : {word : 'White People'}, //Name of the category presented in the task.
						css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
						height : 4, //Height (because we need to know where to put the next item in the title)
						startStimulus : { 
						//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
							media : {image : 'white_start.jpg'}, 
							css : {color:'#31b404','font-size':'1em'}, 
							height : 10
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
						{image : 'w1.jpg'}, 
						{image : 'w2.jpg'},
						{image : 'w3.jpg'}, 
						{image : 'w4.jpg'}
					], 
					//Stimulus css (style of the stimuli)
					stimulusCss : {color:'#31b404','font-size':'2em'}
				},	
				{
					name : 'Black People', 
					title : {
						media : {word : 'Black People'}, 
						css : {color:'#31b404','font-size':'1.8em'}, 
						height : 4,
						startStimulus : {
							media : {image : 'black_start.jpg'}, 
							css : {color:'#31b404','font-size':'1em'}, 
							height : 10
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
						{image : 'b1.jpg'}, 
						{image : 'b2.jpg'},
						{image : 'b3.jpg'}, 
						{image : 'b4.jpg'}
					], 
					//Stimulus css
					stimulusCss : {color:'#31b404','font-size':'2em'}
				}
			],
			attributes : [  //the extension is suited for the use of only two attributes
			{
				name : 'Pleasant', 
				title : {
					media : {word : 'Pleasant'}, 
					css : {color:'#0000FF','font-size':'1.8em'}, 
					height : 4,
					startStimulus : {
						media : {word : 'Nice, Heaven, Happy, Pleasure'}, 
						css : {color:'#0000FF','font-size':'1em'}, 
						height : 4
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word: 'Nice'},
                    {word: 'Heaven'},
                    {word: 'Happy'},
                    {word: 'Pleasure'}
				], 
				//Stimulus css
				stimulusCss : {color:'#0000FF','font-size':'2em'}
			},	
			{
				name : 'Unpleasant', 
				title : {
					media : {word : 'Unpleasant'}, 
					css : {color:'#0000FF','font-size':'1.8em'}, 
					height : 4,
					startStimulus : {
						media : {word : 'Nasty, Hell, Horrible, Rotten'}, 
						css : {color:'#0000FF','font-size':'1em'}, 
						height : 4
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word: 'Nasty'},
                    {word: 'Hell'},
                    {word: 'Horrible'},
                    {word: 'Rotten'}
				], 
				//Stimulus css
				stimulusCss : {color:'#0000FF','font-size':'2em'} 
			}],

            //practiceTrials are a few trials at the beginning of each block (Sriram & Greenwald recommend 2 trials for each category).
			practiceTrials : //Set number of trials per group in the practice trials at the beginning of the task
			{//Can set 0 to all to remove the practice trials.
				nFocalCat : 0, //Number of trials for the focal category.
				nNonFocalCat : 0, //Number of trials for each non-focal category.  (in a mini block).
				nFocalAtt : 0, //Number of trials for the focal attribute (in a mini block).
				nNonFocalAtt : 0 //Number of trials for the non-focal attribute (in a mini-block). 
			},
			
			//blockTrials are the trials after the practice trials (if we included any)
			//Each block will contain the same number of trials pet category/attribute
			//The default settings are the same as those used by Nosek & Bar-Anan, 2014, who recommend using more focal trials than non-focal trials
			//All trial numbers should be at least 1. 0 will break the task
			//It's possible to have more focal trials than non-focal trials, but there should be the same total n for the category and attribute trials
			blockTrials: 
			{
			    nFocalCat : 3, //Number of trials for the focal category.(in a mini block).
				nNonFocalCat : 2, //Number of trials for each non-focal category.  (in a mini block).
				nFocalAtt : 3, //Number of trials for the focal attribute (in a mini block).
				nNonFocalAtt : 2 //Number of trials for the non-focal attribute (in a mini-block).
			},
			
			//In each block, we can include a number of mini-blocks, to reduce repetition of same group/response.
			nMiniBlocks : 2, //Set to 1 if don't need mini blocks. 0 will break the task.
			
			//Sets what focal attribute we use throughout the task.
			focalAttribute : 'attribute1', // Accepts 'attribute1', 'attribute2' or 'bo'

			//Sets what attribute appears first. Irrelevant if focalAttributes is not 'both'. 
			firstFocalAttribute : 'random', //Accepts 'attribute1', 'attribute2' or 'random'. 
			
			//Whether to start with a practice block.
			practiceBlock : true, 
			nPracticeBlockTrials : 20, //Should be at least 8 trials.

			//Number of blocks per focal category-attribute combination.
			//Don't forget to increase / decrease the number based on how many possible focal attributes you have
			nCategoryAttributeBlocks : 4, 

			//Whether to switch the focal attribute only once in the task (after all the blocks with the first focal attribute), 
			//Or after every exhaustion of all the category-attribute combinations (e.g., twice if nCategoryAttributeBlocks).
			//Relevant only when nCategoryAttributeBlocks>1, 
			//and only if there is more than one focal attribute.
			switchFocalAttributeOnce : true, 

			//focalCategoryOrder can be: 'bySequence', 'random'.
			//If bySequence then we always start with categories[0] as the first focal category.
			focalCategoryOrder : 'random', 
			
			//Whether to show the stimuli of the IN categories at the beginning of the block.
			//This may not work well with touch devices
			showStimuliWithInst : false,
			
			//Location of the error feedback (from the bottom)
			errorBottom : 5, 
			
			//Whether we want to remind participants to be quicker when they do not hit space on a go trial
			remindSpeed : true, 
			
			//Location of the speed feedback (from the bottom)
			speedBottom : 5,
			
			//Whether we want to let participants know they were right for each correct response
			showCorrect : true, 
			
			//Location of the speed feedback (from the bottom)
			correctBottom : 5,
			
			base_url : {//Where are your images?
				image : '/implicit/user/sapirke/gnatex/images/'
			}, 
			ITIDuration : 250, //Duration between trials.
            fontColor : '#000000', //The default color used for printed messages.
			
			//Text and style for key instructions displayed about the category labels.
			InKeyText : "Hit 'space' bar if item belongs", 
			keysCss : {'font-size':'1em', 'font-family':'arial', color:'#000000'},
			InKeyTextTouch : "Touch the right side of the screen if item belongs", 
			//Text and style for the separator between the top and bottom category labels.
			orText : 'or', 
			orCss : {'font-size':'1.8em', color:'#000000'},
			
			instWidth : 99, //The width of the instructions stimulus
			
			finalText : 'Press enter to continue to the next task', 
			finalTouchText : 'Touch the bottom green area to continue to the next task',

			touchMaxStimulusWidth : '30%', 
			touchMaxStimulusHeight : '30%', 
			bottomTouchCss: {              
                        height: '15%'
                    }, //Add any CSS value you want for changing the css of the bottom touch area.
			
			//This is the template for the instructions in the task. 
			// Some variables will be replaced with their values: 
			// blockNum, nBlocks, focalAtt, focalCat.
			// Notice that this is HTML code.
			
			
            //Template for inst - no touch, no correct
            instTemplateNocorrect: '<div><p align="center" style="font-size:20px; font-family:arial"><br/>' +
				'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				"Press the 'space' bar for items that belong to the category " + 
				'<font color="#0000FF">focalAtt</font>, and for items that belong to the category <font color="#31b404">focalCat</font>.<br/>' + 
				'DO NOT press any key for items that do not belong to these categories.<br/><br/>' + 
				'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear.<br>'+
				''+
				'<p align="center">Press <b>enter</b> when you are ready to start.</font></p></div>', 
            
            //Template for inst - no touch, with correct
            instTemplateCorrect: '<div><p align="center" style="font-size:20px; font-family:arial"><br/>' +
				'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				"Press the 'space' bar for items that belong to the category " + 
				'<font color="#0000FF">focalAtt</font>, and for items that belong to the category <font color="#31b404">focalCat</font>.<br/>' + 
				'DO NOT press any key for items that do not belong to these categories.<br/><br/>' + 
				'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear.<br>'+
				'After the correct response, a green <font color="#00FF00"><b>O</b></font> will appear.<br/><br/>'+
				'<p align="center">Press <b>enter</b> when you are ready to start.</font></p></div>', 
            
            //Template for inst - touch, with correct
            instTemplateCorrectTouch: '<div><p align="center" ' +
				'<br/><font color="#000000"><u>Part blockNum of nBlocks </u><br/></p>' + 
				'<p align="left" style="margin-left:5px"> ' +
				"Put a finger on the right green area for items that belong to the category " + 
				'<font color="#0000FF">focalAtt</font>, and for items that belong to the category <font color="#31b404">focalCat</font>.<br/>' + 
				"DO NOT do anything for items that do not belong to these categories.<br>"+
			    'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. <br>'+
			    'After the correct response, a green <font color="#00FF00"><b>O</b></font> will appear.<br/><br/>'+
				'<p align="center">Touch the <b>lower </b> green area to start.</font></p></div>', 
           
            //Template for inst - touch, without correct
            instTemplateNocorrectTouch: '<div><p align="center" ' +
				'<br/><font color="#000000"><u>Part blockNum of nBlocks </u><br/></p>' + 
				'<p align="left" style="margin-left:5px"> ' +
				"Put a finger on the right green area for items that belong to the category " + 
				'<font color="#0000FF">focalAtt</font>, and for items that belong to the category <font color="#31b404">focalCat</font>.<br/>' + 
				"DO NOT do anything for items that do not belong to these categories.<br>"+
			    'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. <br>'+
			    ''+
			    '<p align="center">Touch the <b>lower </b> green area to start.</font></p></div>', 
           
           //The default feedback messages for each cutoff - 
			//You will get a comparison feedback for each 
			//pair, and also single feedback message for each category. 
			//The feedback variable names will be in the format of Cat1vsCat2_FB for comparisons, and Cat1_FB for single category feedback message.
			//CATEGORYA, and CATEGORYB will be replaced with the names of the relevant categories.
			fb_strong_Att1WithCatA_Att2WithCatB : 'Your data suggest strong preference of CATEGORYA over CATEGORYB.',
			fb_moderate_Att1WithCatA_Att2WithCatB : 'Your data suggest moderate preference of CATEGORYA over CATEGORYB.',
			fb_slight_Att1WithCatA_Att2WithCatB : 'Your data suggest slight preference of CATEGORYA over CATEGORYB.',
			fb_equal_CatAvsCatB : 'Your data suggest no preference between CATEGORYA and CATEGORYB.',
			//Feedback for each CATEGORY, separately. Notice that by default, attribute1 is the positive attribute. 
			//CATEGORY is the CATEGORY name. Can also use attribute1 and attribute2 to refer to attribute1.name and attribute2.name.
			fb_strongAssociationForCatWithAtt1 : 'Your data suggest strong positive automatic evaluation of CATEGORY.',
			fb_moderateAssociationForCatWithAtt1 : 'Your data suggest moderate positive automatic evaluation of CATEGORY.',
			fb_slightAssociationForCatWithAtt1 : 'Your data suggest slight positive automatic evaluation of CATEGORY.',
			fb_equalAssociationForCatWithAtts : 'Your data suggest neutral automatic evaluation of CATEGORY.',
			fb_strongAssociationForCatWithAtt2 : 'Your data suggest strong negative automatic evaluation of CATEGORY.',
			fb_moderateAssociationForCatWithAtt2 : 'Your data suggest moderate negative automatic evaluation of CATEGORY.',
			fb_slightAssociationForCatWithAtt2 : 'Your data suggest slight negative automatic evaluation of CATEGORY.',
			
			//Error messages in the feedback
			manyErrors: 'There were too many errors made to determine a result.',
			tooFast: 'There were too many fast trials to determine a result.',
			notEnough: 'There were not enough trials to determine a result.'
		};
		
		// extend the current object with the default
		_.defaults(piCurrent, options, gnatObj);
	    // are we on the touch version
		var isTouch = piCurrent.isTouch;
		// do we show a correct feedback at the end of a correct trial
		var showCorrect = piCurrent.showCorrect;
			
		//We have some variables that we use a lot, so let's read them here
		var practiceCategory1 = piCurrent.practiceCategory1;
		var practiceCategory2 = piCurrent.practiceCategory2;
		var blockTrials = piCurrent.blockTrials;
		var cats = piCurrent.categories;
		var attributes = piCurrent.attributes;
		var attribute1 = attributes[0];
		var attribute2 = attributes[1];
		
		//We set nBlocks with the assumption that there is only one focal attribute
		var nBlocks = cats.length * piCurrent.nCategoryAttributeBlocks; 
		//Set the first focal attribute.
		var focalAttribute = piCurrent.focalAttribute;
		//Set the first focal attribute.
	    if (focalAttribute == 'both')
		{//Showing both attributes.
			nBlocks = nBlocks*2; //The two attributes will be focal, so double the number of blocks.
			focalAttribute = piCurrent.firstFocalAttribute;
			if (focalAttribute == 'random')
			{//Choose the first focal attribute randomly.
				focalAttribute = (Math.random() < 0.5) ? 'attribute1' : 'attribute2';
			}
		}
		//Let's get the first focal attribute's index. We will need to update this if we use both attributes as focal attributes
		//var focalAttIndex = (focalAttribute == 'attribute1' ? 1 : 2);
		//var NonfocalAttIndex = (focalAttribute == 'attribute1' ? 2 : 1);
		
		//Let's create a variable that sums the ntrials per miniblock
		var nTrialMiniblock = Number(blockTrials.nFocalCat) + Number(blockTrials.nNonFocalCat) + Number(blockTrials.nFocalAtt) + Number(blockTrials.nNonFocalAtt);
		
		if (isTouch)
		{
			var maxW = piCurrent.touchMaxStimulusWidth;
			var maxH = piCurrent.touchMaxStimulusHeight;
			attribute1.stimulusCss.maxWidth = maxW;
			attribute2.stimulusCss.maxWidth = maxW;
			cats[0].stimulusCss.maxWidth = maxW;
			cats[1].stimulusCss.maxWidth = maxW;
			practiceCategory1.stimulusCss.maxWidth = maxW;
			practiceCategory2.stimulusCss.maxWidth = maxW;
			attribute1.stimulusCss.maxHeight = maxH;
			attribute2.stimulusCss.maxHeight = maxH;
			cats[0].stimulusCss.maxHeight = maxH;
			cats[1].stimulusCss.maxHeight = maxH;
			practiceCategory1.stimulusCss.maxHeight = maxH;
			practiceCategory2.stimulusCss.maxHeight = maxH;
			
		}
	
		/**
		*Set basic settings.
		*/
		API.addSettings('canvas',piCurrent.canvas);
		API.addSettings('base_url',piCurrent.base_url);
	    var InInput = !isTouch ? {handle:'in',on:'space', stimHandle:'in'} : {handle: 'in',on:'rightTouch', stimHandle:'in'};
		var OutInput = {handle:'out',on:'timeout',duration:1200};
		var proceedInput = !isTouch ? {handle:'enter',on:'enter'} : {handle:'enter',on:'bottomTouch', css:piCurrent.bottomTouchCss};
		
		/**
		 * Create default Trial
		 */
		API.addTrialSets('sort',{
			// by default each trial is correct, this is modified in case of an error
			data: {score:0, parcel:'first'}, //We're using only one parcel for computing the score.
			// set the interface for trials
			input: [
				{handle:'skip1',on:'keypressed', key:27}, //Esc + Enter will skip blocks
				OutInput,
				InInput
			],

			// user interactions
			interactions: [
				// begin trial : display stimulus immediately
				{
					conditions: [{type:'begin'}],
					actions: [
					    {type:'showStim',handle:'targetStim'}
					    ]
				},
				
				// incorrect out - participants did not hit the space until the deadline expired
                {
					conditions: [
						{type:'inputEqualsTrial', property:'corResp',negate:true}, //Not the correct response.
						{type:'inputEquals',value:'out'}	// did not respond
					],
					actions: [
						{type:'removeInput',handle:['in','out']}, //Cannot respond anymore
						{type:'showStim',handle:'speed'},	// show speed reminder
						{type:'log'},						// log this trial
						{type:'setTrialAttr', setter:{score:1}},	// set the score to 1
						{type:'setInput',input:{handle:'end', on:'timeout',duration:piCurrent.ITIDuration}}
					]
				},
				
				// correct out
				{
					conditions: [{type:'inputEqualsTrial', property:'corResp'},
					            {type:'inputEquals', value:'out'}
					],	// check if the input handle is equal to correct response (in the trial's data object)
					actions: [
						{type:'removeInput',handle:['in','out']}, //Cannot respond anymore
						{type:'showStim',handle:'correct'}, //show correct stimulus
						{type:'log'},						// log this trial
						{type:'setInput',input:{handle:'end', on:'timeout',duration:piCurrent.ITIDuration}} // trigger the "end action after ITI"
					]
				},

				// correct in
				{
					conditions: [{type:'inputEqualsTrial', property:'corResp'},
					            {type:'inputEquals', value:'in'}
					],	// check if the input handle is equal to correct response (in the trial's data object)
					actions: [
						{type:'removeInput',handle:['in','out']}, //Cannot respond anymore
						{type:'showStim',handle:'correct'}, //show correct stimulus
						{type:'log'},					// log this trial
						{type:'setInput',input:{handle:'end', on:'timeout',duration:piCurrent.ITIDuration}} // trigger the "end action after ITI"
					]
				},
				
				// error - responded with 'in' when the target was out
				{
					conditions: [
						{type:'inputEqualsTrial', property:'corResp',negate:true}, //Not the correct response.
						{type:'inputEquals',value:'in'}	// responded with 'in'
					],
					actions: [
						{type:'removeInput',handle:['in','out']}, //Cannot respond anymore
						{type:'showStim',handle:'error'},	// show error stimulus
						{type:'log'},						// log this trial
						{type:'setTrialAttr', setter:{score:1}},	// set the score to 1
						{type:'setInput',input:{handle:'end', on:'timeout',duration:piCurrent.ITIDuration}}
					]
				},

				// end after ITI
				{
					conditions: [{type:'inputEquals',value:'end'}],
					actions: [
					    {type:'hideStim', handle: 'All'},// hide everything
						{type:'endTrial'}
					]
				},

				// skip block
				{
					conditions: [{type:'inputEquals',value:'skip1'}],
					actions: [
						{type:'setInput',input:{handle:'skip2', on:'enter'}} // allow skipping if next key is enter.
					]
				},
				// skip block
				{
					conditions: [{type:'inputEquals',value:'skip2'}],
					actions: [
						{type:'goto', destination: 'nextWhere', properties: {blockStart:true}},
						{type:'endTrial'}
					]
				}
			]
		});

		/**
		 * Create default instructions trials
		 */
		API.addTrialSets('instructions', [
			// generic instructions trial, to be inherited by all other inroduction trials
			{
				// set block as generic so we can inherit it later
				data: {blockStart:true},

				// create user interface (just click to move on...)
				input: [
					proceedInput
				],

				interactions: [
					// display instructions
					{
						conditions: [{type:'begin'}],
						actions: [
							{type:'showStim',handle:'All'}
						]
					},
					// space hit, end trial soon
					{
						conditions: [{type:'inputEquals',value:'enter'}],
						actions: [
							{type:'hideStim', handle:'All'},
							{type:'trigger', handle:'endTrial', duration:500}
						]
					},
					{
						conditions: [{type:'inputEquals',value:'endTrial'}],
						actions: [{type:'endTrial'}]
					}
				]
			}
		]);

		/**
		 * All basic trials.
		 */
		 
		//Helper function to create a basic trial for a certain category (or attribute)
		//as an in or out trial
		function createBasicTrialSet(params)
		{//params: side is in or out. stimSet is the name of the stimulus set.
			var set;
			
			if (params.remindSpeed && params.showCorrect)
			{
			    set = [{
				inherit : 'sort', 
				data : {corResp : params.side},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:params.stimSet}},
					{inherit:{set:'error'}},
					{inherit:{set:'speed'}},
					{inherit:{set:'correct'}}
				]
			}];
			}
			
			if (!params.remindSpeed && params.showCorrect)
			{
			    set = [{
				inherit : 'sort', 
				data : {corResp : params.side},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:params.stimSet}},
					{inherit:{set:'error'}},
					{inherit:{set:'correct'}}
				]
			}];
			}
			
			if (!params.remindSpeed && !params.showCorrect)
			{
			    set = [{
				inherit : 'sort', 
				data : {corResp : params.side},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:params.stimSet}},
					{inherit:{set:'error'}}
				]
			}];
			}
			
			if (params.remindSpeed && !params.showCorrect)
			{
			    set = [{
				inherit : 'sort', 
				data : {corResp : params.side},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:params.stimSet}},
					{inherit:{set:'speed'}},
					{inherit:{set:'error'}}
				]
			}];
			}
			
			
			return set;
		}
		
		var basicTrialSets = {};
		for (var iTrialType = 0; iTrialType < cats.length; iTrialType++)
		{
			////We will create a trial for each category as an 'in' and as an 'out' item.  
			////These trials do not have layouts so they can be used in different blocks.

			//out
			basicTrialSets['category'+ (iTrialType+1) + 'out'] = 
				createBasicTrialSet({side:'out', stimSet: 'category'+(iTrialType+1),remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
			//in
			basicTrialSets['category'+ (iTrialType+1) + 'in'] = 
				createBasicTrialSet({side:'in', stimSet: 'category'+(iTrialType+1),remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
		}
		//Four trials for the attributes.
		basicTrialSets.attribute1out = 
			createBasicTrialSet({side:'out', stimSet: 'attribute1',remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
		basicTrialSets.attribute1in = 
			createBasicTrialSet({side:'in', stimSet: 'attribute1',remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
		basicTrialSets.attribute2out = 
			createBasicTrialSet({side:'out', stimSet: 'attribute2',remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
		basicTrialSets.attribute2in = 
			createBasicTrialSet({side:'in', stimSet: 'attribute2',remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
			
		if (piCurrent.practiceBlock)
		{
			basicTrialSets.practiceCat1 = 
				createBasicTrialSet({side:'in', stimSet: 'practiceCat1',remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
			basicTrialSets.practiceCat2 = 
				createBasicTrialSet({side:'out', stimSet: 'practiceCat2',remindSpeed: piCurrent.remindSpeed, showCorrect:piCurrent.showCorrect});
			basicTrialSets.practiceCats = 
			[
				{inherit:{set:'practiceCat1', type:'exRandom'}}, 
				{inherit:{set:'practiceCat2', type:'exRandom'}}
			];
		}

		API.addTrialSets(basicTrialSets);
		
		/**
		 *	Stimulus Sets
		 */

		//Basic stimuli
		API.addStimulusSets({
			// This Default stimulus is inherited by the other stimuli so that we can have a consistent look and change it from one place
			Default: [
				{css:{color:'black','font-size':'2em'}}
			],

			instructions: [
				{css:{'font-size':'1.3em',color:'black', lineHeight:1.2}}
			],

			attribute1 : 
			[{
				data: {alias:attribute1.name, handle:'targetStim'}, 
				inherit : 'Default', 
				css:attribute1.stimulusCss,
				media : {inherit:{type:'exRandom',set:'attribute1'}}
			}],
			attribute2 : 
			[{
				data: {alias:attribute2.name, handle:'targetStim'}, 
				inherit : 'Default', 
				css:attribute2.stimulusCss,
				media : {inherit:{type:'exRandom',set:'attribute2'}}
			}],		
			practiceCat1 : 
			[{
				data: {alias:piCurrent.practiceCategory1.name, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.practiceCategory1.stimulusCss,
				media : {inherit:{type:'exRandom',set:'practiceCat1'}}
			}],
			practiceCat2 : 
			[{
				data: {alias:piCurrent.practiceCategory2.name, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.practiceCategory2.stimulusCss,
				media : {inherit:{type:'exRandom',set:'practiceCat2'}}
			}],	
				
			// this stimulus used for giving feedback, in this case only the error notification
			error : [{
				handle:'error', location: {bottom: piCurrent.errorBottom}, css:{color:'red','font-size':'4em'}, media: {word:'X'}, nolog:true
			}],
			
			// this stimulus used for giving feedback when participant responds correctly
			correct : [{
				handle:'correct', location: {bottom: piCurrent.correctBottom}, css:{color:'green','font-size':'4em'}, media: {word:'O'}, nolog:true
			}],
			
			// this stimulus used for giving feedback, in this case only a notification about being too slow
			speed : [{
				handle:'speed', location: {bottom: piCurrent.speedBottom}, css:{color:'red','font-size':'2em'}, media: {word:'Please respond more quickly!'}, nolog:true
			}]
		});
		
		////Category stimulus sets
		var catStimulusSets = {};
		var iCatStim;
		for (iCatStim = 0; iCatStim < cats.length; iCatStim++)
		{
			catStimulusSets['category'+(iCatStim+1)] = 
			[{
				data: {alias:cats[iCatStim].name, handle:'targetStim'}, 
				inherit : 'Default', 
				css:cats[iCatStim].stimulusCss,
				media : {inherit:{type:'exRandom',set:'category'+(iCatStim+1)}}
			}];
		}
		API.addStimulusSets(catStimulusSets);
		
		/**
		 *	Media Sets
		 */
		API.addMediaSets({
			attribute1 : attribute1.stimulusMedia,
			attribute2 : attribute2.stimulusMedia, 
			practiceCat1 : piCurrent.practiceCategory1.stimulusMedia,
			practiceCat2 : piCurrent.practiceCategory2.stimulusMedia
		});
		
		//For each category
		var catMediaSets = {};
		var iCatMedia;
		for (iCatMedia = 0; iCatMedia < cats.length; iCatMedia++)
		{
			catMediaSets['category'+(iCatMedia+1)] = cats[iCatMedia].stimulusMedia;
		}
		API.addMediaSets(catMediaSets);

		/**
		 *	Create the Task sequence
		 */
		
		//helper Function for getting the instructions HTML.
		function getInstFromTemplate(params)
		{//params: instTemplate, blockNum, nBlocks, focalCat, focalAtt.
			var retText = params.instTemplate.replace(/focalAtt/g, params.focalAttName);
			retText = retText.replace(/focalCat/g, params.focalCatName);
			retText = retText.replace(/blockNum/g, params.blockNum);
			retText = retText.replace(/nBlocks/g, params.nBlocks);
			return (retText);
		}
		
		//Helper function to create the trial's layout
		function getLayout(params)
		{
		    var InText = { word:piCurrent.InKeyText };
		    if (params.isTouch)
    		{
    		    InText = { word:piCurrent.InKeyTextTouch };
    		}
			var layout = [
				
				{
				    location:{top:3}, 
				    media:InText, 
				    css:piCurrent.keysCss,
				    isTouch: isTouch
				}, 
				{
				    location:{top:7}, 
				    media : params.focalCatTitle.media, 
				    css: params.focalCatTitle.css, 
				    isTouch: isTouch
				}
			];
            			
			if (params.showStimuliWithInst && params.isInst)
			{//Show the starting stimuli with the instructions' layout.
				layout = layout.concat([				
					{location:{top:6 + (params.focalCatTitle.height | 3)},
						media:params.focalCatTitle.startStimulus.media, css:params.focalCatTitle.startStimulus.css}, 
					{location:{top:10 + (params.focalCatTitle.height | 3) + (params.focalCatTitle.startStimulus.height | 3)},
						media:{word:'and'}, css:{color:'#000000','font-size':'1.8em'}}, 
					{location:{top:10 + 6 + (params.focalCatTitle.height | 3) + (params.focalCatTitle.startStimulus.height | 3)}, 
					media : params.focalAttTitle.media, css: params.focalAttTitle.css},
					{location:{top:10 + 6 + (params.focalCatTitle.height | 3) + (params.focalCatTitle.startStimulus.height | 3) + (params.focalAttTitle.height | 3)}, 
					media : params.focalAttTitle.startStimulus.media, css: params.focalAttTitle.startStimulus.css}
				]); 
			}
			else
			{
				layout = layout.concat([
					{location:{top:7+ (params.focalCatTitle.height | 3)},
						media:{word:'and'}, css:{color:'#000000','font-size':'1.8em'}}, 
					{location:{top:14 + (params.focalCatTitle.height | 3)}, 
					media : params.focalAttTitle.media, css: params.focalAttTitle.css}
				]); 
			}
			
			return layout;
		}
		
		//Helper to get the block's layout
		function getBlockLayout(params)
		{
			//Get the attribute name and css
			var focalAttTitle = attribute1.title;
			if (params.focalAtt == 'attribute2')
			{
				focalAttTitle = attribute2.title;
			}
			
			return getLayout({
				focalCatTitle : params.focalCatTitle, 
				focalAttTitle : focalAttTitle, 
				showStimuliWithInst : params.showStimuliWithInst, isInst : params.isInst, 
				isTouch:params.isTouch}); 
		}
		
		//helper function for creating an instructions trial
		function getInstTrial(params)
		{
			params.focalAttName = (params.focalAtt == 'attribute2') ? attribute2.name : attribute1.name;
			
			var instParams = {isInst : true};
			_.extend(instParams, params);
			
			var instTrial = {
				inherit : 'instructions', 
				data: {blockStart:true},
				layout : getBlockLayout(instParams), 
				stimuli : [
					{ 
						inherit : 'instructions', 
						media : {html : getInstFromTemplate(params)}, 
						//location : {top:(params.nCats == 2) ? 25 : 27}
						location : {bottom:1}
					}
				]
			};
			return instTrial;
		}
		
		//Helper function to get the block's condition
		function getCondition(params)
		{
			var focalAttName = (params.focalAtt == 'attribute2') ? attribute2.name : attribute1.name;
			var focalCatName = cats[params.focalCatIndex-1].name;
			var condition = focalCatName + '/' + focalAttName;
			return condition;
		}
		
		//Helper function to create a mixer for practice trials
		function getPracticeTrialsMixer(params)
		{
			//Get layout for all the trials.
			var blockLayout = getBlockLayout(params);
			//We will need to know which the non-focal attribute is to create OUT trials for it.
			var nonFocalAtt = (params.focalAtt == 'attribute1') ? 'attribute2' : 'attribute1';
			//All the trials in the block have these two properties.
			var blockData = {block : params.blockNum, condition : getCondition(params) + '_practice'};

			//The mixer's data always has the focal category, non-focal attribute and non-focal category.
			var theMixerData = [
				{//Mixer that repeats all the focal-category trials.
					mixer : 'repeat', 
					times : params.practiceTrials.nFocalCat, 
					data : [
						{
							inherit : 'category'+ params.focalCatIndex + 'in', 
							data : blockData, layout : blockLayout
						}
					]
				}, 
				{//Mixer that repeats all the focal-attribute trials.
					mixer : 'repeat', 
					times : params.practiceTrials.nFocalAtt, 
					data : [
						{
							inherit : params.focalAtt + 'in', 
							data : blockData, layout : blockLayout
						}
					]
				}, 
				{//Mixer that repeats all the non-focal attribute trials
					mixer : 'repeat', 
					times : params.practiceTrials.nNonFocalAtt, 
					data : [
						{
							inherit : nonFocalAtt + 'out', 
							data : blockData, layout : blockLayout
						}
					]
				}
			];
			//Add to the mixer's data all the trials for the non-focal categories.
			var iCatNonFocal;
			for (iCatNonFocal = 1; iCatNonFocal <= cats.length; iCatNonFocal++)
			{
				if (iCatNonFocal != params.focalCatIndex)
				{//If this is not the focal category index, then it is a non-focal category.
					theMixerData.push({
						mixer : 'repeat', 
						times : params.practiceTrials.nNonFocalCat, 
						data : [
							{
								inherit : 'category' + iCatNonFocal + 'out', // for OUT
								data : blockData, layout : blockLayout
							}
						]
					});
				}
			}
			
			var theMixer = {//We use a random mixer to randomize all the practice trials.
				mixer : 'random', 
				data : theMixerData
			};
			
			return theMixer;
		}
		
		//Helper function to create a mixer of trials for a whole block.
		function getBlockMixer(params)
		{
			//Get layout for all the trials.
			var blockLayout = getBlockLayout(params);

			//All the trials in the block have these two properties.
			var blockData = {block : params.blockNum, condition : getCondition(params) };
			//console.log(blockData);

			//Fill the mini-blocks
			var mixerData = [];
			for (var iMini = 0; iMini < params.nMiniBlocks; iMini++)
			{
				//Because of the alternation, we randomize the trial order ourselves.
				var FocalCatSequence = [];
				var FocalAttSequence = [];
				var NonfocalCatSequence = [];
				var NonfocalAttSequence = [];
				var catSequence = [];
				var attSequence = [];
				var iCatMini = 1;
				focalAttribute = params.focalAtt;
				var focalAttIndex = Number(focalAttribute.slice(-1));
				var NonfocalAttIndex = (focalAttribute == 'attribute1' ? 2 : 1);
				//console.log(focalAttribute);
				//console.log(focalAttIndex);
                //console.log(NonfocalAttIndex);

				//We create spaces for each trial we need, separate for each type
				//First for the focal category
				for (var iTimesnFocalCat = 0; iTimesnFocalCat < params.blockTrials.nFocalCat; iTimesnFocalCat++)
				{
				    FocalCatSequence.push(params.focalCatIndex);
				}
				//Then for the focal attribute
				for (var iTimesnFocalAtt = 0; iTimesnFocalAtt < params.blockTrials.nFocalAtt; iTimesnFocalAtt++)
				{
				    FocalAttSequence.push(focalAttIndex);
				}
				//Then for the non-focal attribute
				for (var iTimesnNonFocalAtt = 0; iTimesnNonFocalAtt < params.blockTrials.nNonFocalAtt; iTimesnNonFocalAtt++)
				{
				    NonfocalAttSequence.push(NonfocalAttIndex);
				}
				//Lastly, for the non-focal category
				for (var iTimesnNonFocalCat = 0; iTimesnNonFocalCat < params.blockTrials.nNonFocalCat; iTimesnNonFocalCat++)
				{
				    var otherCat = 0;
					for (var iIters = 0; iIters < 50 && otherCat === 0; iIters++)
					{
						if (iCatMini > params.nCats)
						{
							iCatMini = 1;
						}
						if (iCatMini == params.focalCatIndex)
						{
							iCatMini++;
						}
						else
						{
							otherCat = iCatMini;
						}
					}
					NonfocalCatSequence.push(otherCat);
				}
				attSequence = FocalAttSequence.concat(NonfocalAttSequence);//we create a single sequence for the attributes
				catSequence = FocalCatSequence.concat(NonfocalCatSequence);//we create a single sequence for the categories
				
				//Here is the randomization.
				attSequence = _.shuffle(attSequence);
				catSequence = _.shuffle(catSequence);
				
				//And now fill the mini-block
				for (var iTrial = 0; iTrial < params.nTrialMiniblock/2; iTrial++)
				{
					//Attribute trial
					var att = 'attribute' + attSequence.pop();
					var attSide = (att == params.focalAtt) ? 'in' : 'out';
					mixerData.push({
						inherit : att + attSide, 
							data : blockData, layout : blockLayout
					});
					//Category trial
					var cat = catSequence.pop();
					var catSide = (cat == params.focalCatIndex) ? 'in' : 'out';
					mixerData.push({
						inherit : 'category' + cat + catSide, 
							data : blockData, layout : blockLayout
					});
				}
			}
			
			var theMixer = {//We don't really need a mixer here, so let's just wrap those trials.
				mixer : 'wrapper',
				data : mixerData
			};
			
			return theMixer;
		}
		//Helper function to create a mixer of trials for the practice block.
		function getPracBlockMixer(params)
		{
			//Get layout for all the trials.
			var blockLayout = getBlockLayout(params);

			//All the trials in the block have these two properties.
			var blockData = {block : params.blockNum, condition : "practiceBlock" };

			//Fill the mini-blocks
			var mixer = 
			{
				mixer : 'repeat', 
				times : piCurrent.nPracticeBlockTrials/2, 
				data : [						
					{inherit:{set:'practiceCats', type:'exRandom'}, data:blockData, layout : blockLayout}, 
					{inherit:{set:'practiceAtts', type:'exRandom'}, data:blockData, layout : blockLayout}
				]
			};
			
			return mixer;
		}
		
		////////////////////////////////////////////////////////////////
		////AFTER ALL the helper functions, it is time to create the trial sequence.
		var trialSequence = [];
		
		//reset iBlock
		var iBlock = 1;
		var instTemplateVar;

		//First, push the practice block into the sequence
		if (piCurrent.practiceBlock)
		{
			nBlocks++;
			
			if (isTouch)
			{
			    if (showCorrect)
			    {
			        instTemplateVar = piCurrent.instTemplateCorrectTouch;
			    }
			    else
			    {
			        instTemplateVar = piCurrent.instTemplateNocorrectTouch;
			    }
			}
			if (!isTouch)
			{
			    if (showCorrect)
			    {
			        instTemplateVar = piCurrent.instTemplateCorrect;
			    }
			    else
			    {
			        instTemplateVar = piCurrent.instTemplateNocorrect;
			    }
			}
			
			var pracParams = {
				instTemplate: instTemplateVar, 
				focalAtt:focalAttribute, 
				focalCatName:piCurrent.practiceCategory1.name, 
				focalCatTitle:piCurrent.practiceCategory1.title, 
				nBlocks : nBlocks, 
				showStimuliWithInst : piCurrent.showStimuliWithInst, 
				isTouch: piCurrent.isTouch,
				showCorrect: piCurrent.showCorrect,
				blockNum:1
			};
			//Instruction trial
			trialSequence.push(getInstTrial(pracParams));
			//Create attribute trial set for the practice block
			var nonFocalAttribute = (focalAttribute == 'attribute1' ? 'attribute2' : 'attribute1');
			API.addTrialSets('practiceAtts', 
			[
				{inherit : {set:focalAttribute + 'in', type:'exRandom'}}, 
				{inherit : {set:nonFocalAttribute + 'out', type:'exRandom'}}
			]);
			//Block mixer
			trialSequence.push(getPracBlockMixer(pracParams));
			//Advance block counter
			iBlock++;
		}
		
		//Set the category order: the sequence of focal categories.
		var categoryOrder = [];
		var iCatOrder;
		for (iCatOrder = 1; iCatOrder <= cats.length; iCatOrder++)
		{//We start from 1 because the names of the trial-sets, stimulus-sets and media-sets start with 1.
			categoryOrder.push(iCatOrder);
		}
		if (piCurrent.focalCategoryOrder == 'random')
		{//Shuffle the order of the categories.
			categoryOrder = _.shuffle(categoryOrder);
		}
			
			var blockParams = {
			instTemplate: instTemplateVar, 
			focalAtt:focalAttribute, 
			practiceTrials : piCurrent.practiceTrials,
			blockTrials: piCurrent.blockTrials,
			nMiniBlocks : piCurrent.nMiniBlocks, 
			nTrialMiniblock : nTrialMiniblock,
			nCats : cats.length,
			nBlocks : nBlocks, 
			showStimuliWithInst : piCurrent.showStimuliWithInst, 
			isTouch: piCurrent.isTouch
		};
		var iCycle1Att;
		for (iCycle1Att = 0; iCycle1Att < piCurrent.nCategoryAttributeBlocks; iCycle1Att++)
		{//Each cycle exhausts all the possible focal-category blocks.
			var iCatBlocks;
			for (iCatBlocks = 0; iCatBlocks < cats.length; iCatBlocks++)
			{//One block per category
				//Extend the block's params object with parameters specific for this block.
				var curBlockParams1 = _.extend(blockParams, 
						{blockNum:iBlock, focalCatIndex:categoryOrder[iCatBlocks], 
						focalCatName:cats[categoryOrder[iCatBlocks]-1].name, 
						focalCatTitle:cats[categoryOrder[iCatBlocks]-1].title});
				//Instruction trial
				trialSequence.push(getInstTrial(curBlockParams1));
				//Practice block mixer
				trialSequence.push(getPracticeTrialsMixer(curBlockParams1));
				//Block mixer
				trialSequence.push(getBlockMixer(curBlockParams1));
				//Advance block counter
				iBlock++;
			}
			if (!piCurrent.switchFocalAttributeOnce && 
				piCurrent.focalAttribute == 'both')
			{//Switch attributes each cycle
				focalAttribute = (focalAttribute == 'attribute1') ? 'attribute2' : 'attribute1';
				blockParams.focalAtt = focalAttribute;
				
				var iCatBlocks2;
				for (iCatBlocks2 = 0; iCatBlocks2 < cats.length; iCatBlocks2++)
				{
					//Extend the block's params object with parameters specific for this block.
					var curBlockParams2 = _.extend(blockParams, 
						{blockNum:iBlock, focalCatIndex:categoryOrder[iCatBlocks2], 
						focalCatName:cats[categoryOrder[iCatBlocks2]-1].name, 
						focalCatTitle:cats[categoryOrder[iCatBlocks2]-1].title});
						//Instructions trial
						trialSequence.push(getInstTrial(curBlockParams2));
						//Practice block mixer
						trialSequence.push(getPracticeTrialsMixer(curBlockParams2));
						//Block mixer
						trialSequence.push(getBlockMixer(curBlockParams2));
						//Advance block counter
						iBlock++;
				}
				//Switch the focal attribute back, for the next cycle.
				focalAttribute = (focalAttribute == 'attribute1') ? 'attribute2' : 'attribute1';
			}
		}

		if (piCurrent.switchFocalAttributeOnce && 
			piCurrent.focalAttribute == 'both')
		{//Switch attributes only after all the first attribute's cycles
			focalAttribute = (focalAttribute == 'attribute1') ? 'attribute2' : 'attribute1';
			blockParams.focalAtt = focalAttribute;
			var iCycle2Att;
			for (iCycle2Att = 0; iCycle2Att < piCurrent.nCategoryAttributeBlocks; iCycle2Att++)
			{
				var iCat2Att;
				for (iCat2Att = 0; iCat2Att < cats.length; iCat2Att++)
				{
					var curBlockParams3 = _.extend(blockParams, 
						{blockNum:iBlock, focalCatIndex:categoryOrder[iCat2Att], 
						focalCatName:cats[categoryOrder[iCat2Att]-1].name, 
						focalCatTitle:cats[categoryOrder[iCat2Att]-1].title});
					//Instructions trial
					trialSequence.push(getInstTrial(curBlockParams3));
					//Practice block mixer
					trialSequence.push(getPracticeTrialsMixer(curBlockParams3));
					//Block mixer
					trialSequence.push(getBlockMixer(curBlockParams3));
					//Advance block counter
					iBlock++;
				}
			}
		}
		//Add final trial
		
		trialSequence.push({
			inherit : 'instructions',
			data: {blockStart:true},
			layout : [{media:{word:''}}], 
			stimuli : [
				{ 
					inherit : 'Default', 
					media : {word : (isTouch ? piCurrent.finalTouchText : piCurrent.finalText)}
				}
			]
		});
		
		//Add the trials sequence to the API.
		API.addSequence(trialSequence);
		// We log the results of the mixer into the console (click F12 to Open Developer Tools - in Firefox requires Firebug extension.) </br>
    	// Now you can check to see if the order is what you intend.
    	//* global console */
		//console.log(trialSequence);

		/**
		*Compute scores and feedback messages
		**/
		
		function computeSingleCatFB(inCatIndex)
		{
			//The score is computed such that the score is more positive when the latency of cond2 is smaller (faster).
			//We want to compute a score that is more positive when the category is more strongly associated with attribute1.
			var catName = cats[inCatIndex].name;
			var cond1VarValues = [catName + '/' + attribute2.name];
			var cond2VarValues = [catName + '/' + attribute1.name];
			var iCatScore;
			for (iCatScore = 0; iCatScore < cats.length; iCatScore++)
			{
				if (iCatScore != inCatIndex)
				{
					cond1VarValues.push(cats[iCatScore].name + '/' + attribute1.name);
					cond2VarValues.push(cats[iCatScore].name + '/' + attribute2.name);
				}
			}		
		
			//the Scorer that compute the user feedback
			scorer.addSettings('compute',{
				ErrorVar:'score',
				condVar:"condition",
				cond1VarValues: cond1VarValues, //scoring condition 1
				cond2VarValues: cond2VarValues, //scoring condition 2
				fastRT : 150, //Below this reaction time, the latency is considered extremely fast.
				maxFastTrialsRate : 0.1, //Above this % of extremely fast responses within a condition, the participant is considered too fast.
				minRT : 400, //Not below this latency
				maxRT : 2000, //Not above this
				errorLatency : {use:"latency", penalty:600, useForSTD:true},
				postSettings : {url:"/implicit/scorer"}
			});

			
			var scoreObj = {	
				MessageDef : [
					{ cut:'-0.65', message:piCurrent.fb_strongAssociationForCatWithAtt2}, 
					{ cut:'-0.35', message:piCurrent.fb_moderateAssociationForCatWithAtt2 },
					{ cut:'-0.15', message:piCurrent.fb_slightAssociationForCatWithAtt2 },
					{ cut:'0.15', message:piCurrent.fb_equalAssociationForCatWithAtts },
					{ cut:'0.35', message:piCurrent.fb_slightAssociationForCatWithAtt1 },
					{ cut:'0.65', message:piCurrent.fb_moderateAssociationForCatWithAtt1 },
					{ cut:'105', message:piCurrent.fb_strongAssociationForCatWithAtt1 }
				],
				manyErrors : piCurrent.manyErrors,
				tooFast : piCurrent.tooFast,
				notEnough : piCurrent.notEnough
			};
			
			//Replace CATEGORY, attribute1 and attribute2 in each message, with the names of those categories.
			for (var iCut = 0; iCut < scoreObj.MessageDef.length; iCut++)
			{
				var tmp = scoreObj.MessageDef[iCut].message.replace(/CATEGORY/g, catName);
				tmp = tmp.replace(/attribute1/g, attribute1.name);
				tmp = tmp.replace(/attribute2/g, attribute2.name);
				scoreObj.MessageDef[iCut].message = tmp;
			}
			
			scorer.addSettings('message',scoreObj);
			
			var scored = scorer.computeD();
			
			scored.problem = (
				scored.FBMsg == piCurrent.manyErrors || 
				scored.FBMsg == piCurrent.tooFast || 
				scored.FBMsg == piCurrent.notEnough);
			
			return (scored);
		}
		
		function getPreferenceMessage(params)
		{//params: score1, score2, name1, name2
		
			var diffScore = (params.score2 - params.score1) / 2;

			var messageDefs = [
				{cutoff : -0.65, message : piCurrent.fb_strong_Att1WithCatA_Att2WithCatB}, 
				{cutoff : -0.35, message : piCurrent.fb_moderate_Att1WithCatA_Att2WithCatB}, 
				{cutoff : -0.15, message : piCurrent.fb_slight_Att1WithCatA_Att2WithCatB}, 
				{cutoff : 0.15, message : piCurrent.fb_equal_CatAvsCatB}, 
				{cutoff : 0.35, message : piCurrent.fb_slight_Att1WithCatA_Att2WithCatB}, 
				{cutoff : 0.65, message : piCurrent.fb_moderate_Att1WithCatA_Att2WithCatB}, 
				{cutoff : 1000, message : piCurrent.fb_strong_Att1WithCatA_Att2WithCatB}
			];
			
			var fbMsg = '';
			for (var iCut = 0; iCut < messageDefs.length && fbMsg === ''; iCut++)
			{
				if (diffScore < messageDefs[iCut].cutoff)
				{
					fbMsg = messageDefs[iCut].message;
					if (messageDefs[iCut].cutoff < 0)
					{
						fbMsg = fbMsg.replace(/CATEGORYA/g, params.name1);
						fbMsg = fbMsg.replace(/CATEGORYB/g, params.name2);
					}
					else
					{
						fbMsg = fbMsg.replace(/CATEGORYA/g, params.name2);
						fbMsg = fbMsg.replace(/CATEGORYB/g, params.name1);
					}
					fbMsg = fbMsg.replace(/attribute1/g, attribute1.name);
					fbMsg = fbMsg.replace(/attribute2/g, attribute2.name);
				}
			}
			
			return({fb:fbMsg, score:diffScore});
		}
		
		//What to do at the end of the task.
		API.addSettings('hooks',{
			endTask: function(){
				//Compute and send the score
				
				var scoreObj = {};

				var iCatEnd;
				for (iCatEnd = 0; iCatEnd < cats.length; iCatEnd++)
				{
					var tScoreObj = computeSingleCatFB(iCatEnd);
					scoreObj[cats[iCatEnd].name + '_FB'] = tScoreObj.FBMsg;
					scoreObj[cats[iCatEnd].name + '_score'] = tScoreObj.DScore;
					var iOtherCatEnd;
					for (iOtherCatEnd = 0; iOtherCatEnd < iCatEnd; iOtherCatEnd++) //All the comparisons.
					{
						var prfObj = {};
						if (tScoreObj.problem)
						{//If couldn't compute a score for this category, then can't compute preference
							prfObj = {fb : tScoreObj.FBMsg, score : -9};
						}
						else
						{//Compute preference
							prfObj = getPreferenceMessage({
									score1 : scoreObj[cats[iCatEnd].name + '_score'], 
									score2 : scoreObj[cats[iOtherCatEnd].name + '_score'], 
									name1 : cats[iCatEnd].name, 
									name2 : cats[iOtherCatEnd].name});
						}
						scoreObj[cats[iOtherCatEnd].name + '-versus-' + cats[iCatEnd].name + '_FB'] = prfObj.fb;
						scoreObj[cats[iOtherCatEnd].name + '-versus-' + cats[iCatEnd].name + '_score'] = prfObj.score;
					}
				}
				scoreObj.feedback = scoreObj[cats[0].name + '-versus-' + cats[1].name+ '_FB'];
				
				API.save(scoreObj);
				piCurrent.gnatScoreObj = scoreObj;
				piCurrent.feedback = scoreObj.feedback;
			}
			
			
		});
		
		return API.script;
	}
		
	return gnatExtension;
});


