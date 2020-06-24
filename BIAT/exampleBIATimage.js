define(['pipAPI','pipScorer','underscore'], function(APIConstructor,Scorer, _) {

	/**
	A few things that this script does not currently support:
	The extension does not support a practice block with only two categories. 
	All the blocks include stimuli from all the categories and all the attributes.
	If there are more than two categories, the extension always includes all the categories in the block: 
	one as the focal category and all the rest as the non-focal categories. 
	The number of stimuli of the focal category always equals the number of stimuli of the non-focal categories.
	The number of stimuli of the focal attribute always equals the number of stimuli of the non-focal attribute.
	
	By default: there is only one focal attribute (pleasant), and the order of the focal categories is randomized (they switch every block).
	
	To skip a block in the task: press Esc and then Enter. 
	
	The script saves a few feedback messages in the explicit table. 
	The feedback message is always a comparison between the first and the second category. 
	There are also single scores for each category, 
	and the results of specific comparisons between the categories. 
	Run the task in order to learn about the name of these variables, when they are saved at the explicit table.
	
	Created by: Yoav Bar-Anan (baranan@gmail.com).
	**/

	function iatExtension(options)
	{
		var API = new APIConstructor();
		var scorer = new Scorer();
		var piCurrent = API.getCurrent();
		//Here we set the settings of our task. Read the comments to learn what each means.
		//You can also do that from the outside, with a dedicated jsp file.
		var batObj = 
		{
			istouch:false, //Set whether the task is on a touch device.
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
				name : 'Mammals', //Will appear in the data.
				title : {
					media : {word : 'Mammals'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
					height : 4, //Height (because we need to know where to put the next item in the title)
					startStimulus : { 
					//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
						media : {word : 'Dogs, Horses, Cows, Lions'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 2
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word : 'Dogs'}, 
					{word : 'Horses'}, 
					{word : 'Lions'}, 
					{word : 'Cows'}
				], 
				//Stimulus css (style of the stimuli)
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},	
			practiceCategory2 : 
			{
				name : 'Birds', 
				title : {
					media : {word : 'Birds'}, 
					css : {color:'#31b404','font-size':'1.8em'}, 
					height : 4,
					startStimulus : {
						media : {word : 'Pigeons, Swans, Crows, Ravens'}, 
						css : {color:'#31b404','font-size':'1em'}, 
						height : 2
					}
				}, 
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word : 'Pigeons'}, 
					{word : 'Swans'}, 
					{word : 'Crows'}, 
					{word : 'Ravens'}
				], 
				//Stimulus css
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},
			categories : [  //As many categories you need.
				{
					name : 'Black People', //Will appear in the data.
					title : {
						media : {word : 'Black People'}, //Name of the category presented in the task.
						css : {color:'#31b404','font-size':'1.8em'}, //Style of the category title.
						height : 4, //Height (because we need to know where to put the next item in the title)
						startStimulus : { 
						//If you're using a startStimulus, set here. If not, set the parameter showStimuliWithInst to false (see later below)
						media : {image : 'blacks.jpg'}, 
							css : {color:'#31b404','font-size':'1em'}, 
							height : 2
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
					{image : 'black1.jpg'}, 
        			{image : 'black2.jpg'}, 
        			{image : 'black3.jpg'}, 
        			{image : 'black4.jpg'}, 
        			{image : 'black5.jpg'}, 
        			{image : 'black6.jpg'}
					], 
					//Stimulus css (style of the stimuli)
					stimulusCss : {color:'#31b404','font-size':'2em'}
				},	
				{
					name : 'White people', 
					title : {
						media : {word : 'White people'}, 
						css : {color:'#31b404','font-size':'1.8em'}, 
						height : 4,
						startStimulus : {
							media : {image : 'whites.jpg'},  
							css : {color:'#31b404','font-size':'1em'}, 
							height : 2
						}
					}, 
					stimulusMedia : [ //Stimuli content as PIP's media objects
					{image : 'yf1.jpg'}, 
        			{image : 'yf4.jpg'}, 
        			{image : 'yf5.jpg'}, 
        			{image : 'ym2.jpg'}, 
        			{image : 'ym3.jpg'}, 
        			{image : 'ym5.jpg'}
					], 
					//Stimulus css
					stimulusCss : {color:'#31b404','font-size':'2em'}
				}
			],
			base_url : {//Where are your images at?
				image : 'https://baranan.github.io/minno-tasks/images/'
				
			},

			//practiceTrials are a few trials at the beginning of the task (Sriram & Greenwald recommend 2 trials for each category).
			practiceTrials : //Set number of trials per group in the practice trials at the beginning of the task
			{//Can set 0 to all to remove the practice trials.
				nFocalCat : 2, //Number of trials for the focal category.
				nNonFocalCats : 2, //Number of trials for each non-focal category.  (in a mini block).
				nFocalAtt : 0, //Number of trials for the focal attribute (in a mini block).
				nNonFocalAtt : 0 //Number of trials for the non-focal attribute (in a mini-block). 
			},

			//In each block, we can include a number of mini-blocks, to reduce repetition of same group/response.
			nMiniBlocks : 1, //Set to 1 if don't need mini blocks. 0 will break the task.
			nTrialsPerMiniBlock : 16, //50% on the right, 50% left, 50% attributes, 50% categories.

			//Sets whether we use a certain focal attribute throughout the task, or both.
			focalAttribute : 'attribute1', // Accepts 'attribute1', 'attribute2' or 'both', 

			//Sets what attribute appears first. Irrelevant if focalAttributes is not 'both'. 
			firstFocalAttribute : 'random', //Accepts 'attribute1', 'attribute2' or 'random'. 
			
			//Whether to start with a practice block.
			practiceBlock : true, 
			nPracticeBlockTrials : 8, //Should be at least 8 trials.

			//Number of blocks per focal category-attribute combination.
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
			showStimuliWithInst : true, 
			
			//Remind what to do on error, throughout the task
			remindError : true, 
			
			//Location of the error feedback (from the bottom)
			errorBottom : 5, 
			
			remindErrorText : '<p align="center" style="font-size:"0.6em"; font-family:arial">' + 
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
			'Press the other key to continue.<p/>',
	        remindErrorTextTouch : '<p align="center" style="font-size:"1.4em"; font-family:arial">' +
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
			'Touch the other side to continue.<p/>',				
			
			ITIDuration : 250, //Duration between trials.
            fontColor : '#000000', //The default color used for printed messages.
			
			//Text and style for key instructions displayed about the category labels.
			leftKeyText : '"E" for all else', 
			rightKeyText : '"I" if item belongs', 
			keysCss : {'font-size':'0.8em', 'font-family':'courier', color:'#000000'},
			rightKeyTextTouch : 'Left for all else', 
			leftKeyTextTouch : 'Right if item belongs', 
			//Text and style for the separator between the top and bottom category labels.
			orText : 'or', 
			orCss : {'font-size':'1.8em', color:'#000000'},
			
			instWidth : 99, //The width of the instructions stimulus
			
			finalText : 'Press space to continue to the next task', 
			finalTouchText : 'Touch the bottom green area to continue to the next task',

			touchMaxStimulusWidth : '50%', 
			touchMaxStimulusHeight : '50%', 
			bottomTouchCss: {              
                        height: '20%'
                    }, //Add any CSS value you want for changing the css of the bottom touch area.
			//This is the template for the instructions in the task. 
			
			// Some variables will be replaced with their values: 
			// blockNum, nBlocks, focalAtt, focalCat.
			// Notice that this is HTML code.
			instTemplate: '<div><p align="center" style="font-size:20px; font-family:arial"><br/>' +
				'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Put a right finger on the <b>I</b> key for items that belong to the category ' + 
				'<font color="#0000FF">focalAtt</font>, ' + 
				'and for items that belong to the category <font color="#31b404">focalCat</font>.<br/>' + 
				'Put a left finger on the <b>E</b> key for items that do not belong to these categories.<br/><br/>' + 
				'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
				'Press the other key to continue.<br/><br/>' + 
				'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>', 
            instTemplateTouch: '<div><p align="center" ' +
				'<br/><font color="#000000"><u>Part blockNum of nBlocks </u><br/></p>' + 
				'<p align="left" style="margin-left:5px"> ' +
				'Put a right finger on the <b>right</b> green area for items that belong to the category ' + 
				'<font color="#0000FF">focalAtt</font>, ' + 
				'and for items that belong to the category <font color="#31b404">focalCat</font>.<br/>' + 
				'Put a left finger on the <b>left</b> green area for items that do not belong to these categories.<br/>' + 
				'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
				'Press the other key to continue.<br/>' + 
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
		_.defaults(piCurrent, options, batObj);
		_.extend(API.script.settings, options.settings);
		
        /**
        **** For Qualtrics
        */
        API.addSettings('onEnd', window.minnoJS.onEnd);

		//For debugging the logger
		//window.minnoJS.logger = console.log;
		//window.minnoJS.onEnd = console.log;
		
        API.addSettings('logger', {
            // gather logs in array
            onRow: function(logName, log, settings, ctx){
                if (!ctx.logs) ctx.logs = [];
                ctx.logs.push(log);
            },
            // onEnd trigger save (by returning a value)
            onEnd: function(name, settings, ctx){
                return ctx.logs;
            },
            // Transform logs into a string
            // we save as CSV because qualtrics limits to 20K characters and this is more efficient.
            serialize: function (name, logs) {
                var headers = ['block', 'trial', 'cond', 'comp', 'type', 'cat',  'stim', 'resp', 'err', 'rt', 'fb'];
                //console.log(logs);
                var myLogs = [];
                var iLog;
                for (iLog = 0; iLog < logs.length; iLog++)
                {
					
                    if(!hasProperties(logs[iLog], ['trial_id', 'name', 'responseHandle', 'stimuli', 'media', 'latency'])){
                        //console.log('---MISSING PROPERTIY---');
                        //console.log(logs[iLog]);
                        //console.log('---MISSING PROPERTIY---');
                    }
                    else if(!hasProperties(logs[iLog].data, ['block', 'condition', 'score']))
                    {
                        //console.log('---MISSING data PROPERTIY---');
                        //console.log(logs[iLog].data);
                        //console.log('---MISSING data PROPERTIY---');
                    }
                    else
                    {
                        myLogs.push(logs[iLog]);
                    }
                }
                var content = myLogs.map(function (log) { 
                    return [
                        log.data.block, //'block'
                        log.trial_id, //'trial'
                        log.data.condition, //'cond'
                        log.name, //'type'
                        log.stimuli[0], //'cat'
                        log.media[0], //'stim'
                        log.responseHandle, //'resp'
                        log.data.score, //'err'
                        log.latency, //'rt'
                        '' //'fb'
                       
                        ]; });
                //console.log('mapped');
                //Add a line with the feedback, score and block-order condition
                content.push([
                            9, //'block'
                            999, //'trial'
                            'end', //'cond'
                       //     '', //'comp'
                            '', //'type'
                            '', //'cat'
                            '', //'stim'
                            '', //'resp'
                            '', //'err'
                            '', //'rt'
                           
                            piCurrent.feedback //'fb'
                           
                        ]);
                //console.log('added');
                        
                content.unshift(headers);
                return toCsv(content);

                function hasProperties(obj, props) {
                    var iProp;
                    for (iProp = 0; iProp < props.length; iProp++)
                    {
                        if (!obj.hasOwnProperty(props[iProp]))
                        {
                            //console.log('missing ' + props[iProp]);
                            return false;
                        }
                    }
                    return true;
                }
                function toCsv(matrice) { return matrice.map(buildRow).join('\n'); }
                function buildRow(arr) { return arr.map(normalize).join(','); }
                // wrap in double quotes and escape inner double quotes
                function normalize(val) {
                    var quotableRgx = /(\n|,|")/;
                    if (quotableRgx.test(val)) return '"' + val.replace(/"/g, '""') + '"';
                    return val;
                }
            },
            // Set logs into an input (i.e. put them wherever you want)
            send: function(name, serialized){
                window.minnoJS.logger(serialized);
            }
        });
	// are we on the touch version
		var isTouch = piCurrent.isTouch;
		//We use the attribute names a lot, so let's read them here
		var attribute1 = piCurrent.attribute1;
		var attribute2 = piCurrent.attribute2;
		var cats = piCurrent.categories;

		/**
		*Set basic settings.
		*/
		API.addSettings('canvas',piCurrent.canvas);
		API.addSettings('base_url',piCurrent.base_url);
	    var leftInput = !isTouch ? {handle:'left',on:'keypressed',key:'e'} : {handle:'left',on:'click', stimHandle:'left'};
		var rightInput = !isTouch ? {handle:'right',on:'keypressed',key:'i'} : {handle:'right',on:'click', stimHandle:'right'};
		var proceedInput = !isTouch ? {handle:'space',on:'space'} : {handle:'space',on:'bottomTouch', css:piCurrent.bottomTouchCss};
		/**
		 * Create default Trial
		 */
		API.addTrialSets('sort',{
			// by default each trial is correct, this is modified in case of an error
			data: {score:0, parcel:'first'}, //We're using only one parcel for computing the score.
			// set the interface for trials
			input: [
				{handle:'skip1',on:'keypressed', key:27}, //Esc + Enter will skip blocks
				leftInput,
				rightInput
			],

			// user interactions
			interactions: [
				// begin trial : display stimulus immediately
				{
					conditions: [{type:'begin'}],
					actions: [{type:'showStim',handle:'targetStim'}]
				},

				// error
				{
					conditions: [
						{type:'inputEqualsTrial', property:'corResp',negate:true}, //Not the correct response.
						{type:'inputEquals',value:['right','left']}	// responded with one of the two responses
					],
					actions: [
						{type:'showStim',handle:'error'},	// show error stimulus
						{type:'setTrialAttr', setter:{score:1}}	// set the score to 1
					]
				},

				// correct
				{
					conditions: [{type:'inputEqualsTrial', property:'corResp'}],	// check if the input handle is equal to correct response (in the trial's data object)
					actions: [
						{type:'removeInput',handle:['left','right']}, //Cannot respond anymore
						{type:'hideStim', handle: 'All'},											// hide everything
						{type:'log'},																// log this trial
						{type:'setInput',input:{handle:'end', on:'timeout',duration:piCurrent.ITIDuration}} // trigger the "end action after ITI"
					]
				},

				// end after ITI
				{
					conditions: [{type:'inputEquals',value:'end'}],
					actions: [
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
				data: {blockStart:true, condition:'instructions', score:0, block:0},

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
						conditions: [{type:'inputEquals',value:'space'}],
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
		//as an in or out trial (right is in and left is out).
		function createBasicTrialSet(params)
		{//params: side is left or right. stimSet is the name of the stimulus set.
			var set = [{
				inherit : 'sort', 
				data : {corResp : params.side},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:params.stimSet}},
					{inherit:{set:'error'}}
				]
			}];
			return set;
		}
		
		var basicTrialSets = {};
		for (var iTrialType = 0; iTrialType < cats.length; iTrialType++)
		{
			////We will create a trial for each category on the left and on the right. 
			////These trials do not have layouts so they can be used in different blocks.

			//Left
			basicTrialSets['category'+ (iTrialType+1) + 'left'] = 
				createBasicTrialSet({side:'left', stimSet: 'category'+(iTrialType+1)});
			//Right
			basicTrialSets['category'+ (iTrialType+1) + 'right'] = 
				createBasicTrialSet({side:'right', stimSet: 'category'+(iTrialType+1)});
		}
		//Four trials for the attributes.
		basicTrialSets.attribute1left = 
			createBasicTrialSet({side:'left', stimSet: 'attribute1'});
		basicTrialSets.attribute1right = 
			createBasicTrialSet({side:'right', stimSet: 'attribute1'});
		basicTrialSets.attribute2left = 
			createBasicTrialSet({side:'left', stimSet: 'attribute2'});
		basicTrialSets.attribute2right = 
			createBasicTrialSet({side:'right', stimSet: 'attribute2'});
			
		if (piCurrent.practiceBlock)
		{
			basicTrialSets.practiceCat1 = 
				createBasicTrialSet({side:'right', stimSet: 'practiceCat1'});
			basicTrialSets.practiceCat2 = 
				createBasicTrialSet({side:'left', stimSet: 'practiceCat2'});
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
			touchInputStimuli: [
				{media:{html:'<div></div>'}, size:{height:48,width:30},css:{background:'#00FF00', opacity:0.3, zindex:-1}, location:{right:0}, data:{handle:'right'}},
				{media:{html:'<div></div>'}, size:{height:48,width:30},css:{background:'#00FF00', opacity:0.3, zindex:-1}, location:{left:0}, data:{handle:'left'}}
			],	
			// this stimulus used for giving feedback, in this case only the error notification
			error : [{
				handle:'error', location: {bottom: piCurrent.errorBottom}, css:{color:'red','font-size':'4em'}, media: {word:'X'}, nolog:true
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
		    var leftText = { word:piCurrent.leftKeyText };
		    var rightText = { word:piCurrent.rightKeyText };
    		if (params.isTouch)
    		{
    		    leftText = { word:piCurrent.leftKeyTextTouch };
    		    rightText = { word:piCurrent.rightKeyTextTouch };
    		}
			var layout = [
				{
				    location:{left:6,top:1}, media:leftText, 
				    css:piCurrent.keysCss,
				    isTouch: isTouch
				},
				{
				    location:{right:6,top:1}, 
				    media:rightText, 
				    css:piCurrent.keysCss,
				    isTouch: isTouch
				}, 
				{
				    location:{top:1}, 
				    media : params.focalCatTitle.media, 
				    css: params.focalCatTitle.css, 
				    isTouch: isTouch
				}
			];
            if (!params.isInst && params.isTouch){
				layout.push({inherit:{type:'byData', set:'touchInputStimuli', data:{handle:'right'}}});
				layout.push({inherit:{type:'byData', set:'touchInputStimuli', data:{handle:'left'}}});
			}			
			if (params.showStimuliWithInst && params.isInst)
			{//Show the starting stimuli with the instructions' layout.
				layout = layout.concat([				
					{location:{top:1 + (params.focalCatTitle.height | 3)},
						media:params.focalCatTitle.startStimulus.media, css:params.focalCatTitle.startStimulus.css}, 
					{location:{top:1 + (params.focalCatTitle.height | 3) + (params.focalCatTitle.startStimulus.height | 3)},
						media:{word:'and'}, css:{color:'#000000','font-size':'1.8em'}}, 
					{location:{top:5 + 1 + (params.focalCatTitle.height | 3) + (params.focalCatTitle.startStimulus.height | 3)}, 
					media : params.focalAttTitle.media, css: params.focalAttTitle.css},
					{location:{top:5 + 1 + (params.focalCatTitle.height | 3) + (params.focalCatTitle.startStimulus.height | 3) + (params.focalAttTitle.height | 3)}, 
					media : params.focalAttTitle.startStimulus.media, css: params.focalAttTitle.startStimulus.css}
				]); 
			}
			else
			{
				layout = layout.concat([
					{location:{top:1+ (params.focalCatTitle.height | 3)},
						media:{word:'and'}, css:{color:'#000000','font-size':'1.8em'}}, 
					{location:{top:7 + (params.focalCatTitle.height | 3)}, 
					media : params.focalAttTitle.media, css: params.focalAttTitle.css}
				]); 
			}
			
			if (!params.isInst && params.remindError)
			{//Show a reminder about the error throughout the task
    			var htmlText={html: params.remindErrorText};
			    if(params.isTouch)
			    {
			        htmlText={html: params.remindErrorTextTouch};
			    }
				layout.push({
					location:{bottom:1}, css: {color:'#000000','font-size':'1em'}, 
					media : htmlText
				});
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
				remindError : params.remindError, remindErrorText : params.remindErrorText, remindErrorTextTouch : params.remindErrorTextTouch, isTouch:params.isTouch}); 
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
			var focalAttName = (params.focalAtt == 'attribute1') ? 
				attribute1.name : attribute2.name;
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
							inherit : 'category'+ params.focalCatIndex + 'right', //right is for IN
							data : blockData, layout : blockLayout
						}
					]
				}, 
				{//Mixer that repeats all the focal-attribute trials.
					mixer : 'repeat', 
					times : params.practiceTrials.nFocalAtt, 
					data : [
						{
							inherit : params.focalAtt + 'right', //right is for IN
							data : blockData, layout : blockLayout
						}
					]
				}, 
				{//Mixer that repeats all the non-focal attribute trials
					mixer : 'repeat', 
					times : params.practiceTrials.nNonFocalAtt, 
					data : [
						{
							inherit : nonFocalAtt + 'left',  //left is for OUT
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
						times : params.practiceTrials.nNonFocalCats, 
						data : [
							{
								inherit : 'category' + iCatNonFocal + 'left', //left is for OUT
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

			//Fill the mini-blocks
			var mixerData = [];
			for (var iMini = 0; iMini < params.nMiniBlocks; iMini++)
			{
				//Because of the alternation, we randomize the trial order ourselves.
				var attSequence = [];
				var catSequence = [];
				var iCatMini = 1;
				for (var iTimes = 0; iTimes < params.nTrialsPerMiniBlock/4; iTimes++)
				{
					attSequence.push(1);//25% attribute1
					attSequence.push(2);//25% attribute2
					catSequence.push(params.focalCatIndex); //25% focal category
					//25% the other categories
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
					catSequence.push(otherCat); //25% focal category
				}
				//Here is the randomization.
				attSequence = _.shuffle(attSequence);
				catSequence = _.shuffle(catSequence);
				//And now fill the mini-block
				for (var iTrial = 0; iTrial < params.nTrialsPerMiniBlock/2; iTrial++)
				{
					//Attribute trial
					var att = 'attribute' + attSequence.pop();
					var attSide = (att == params.focalAtt) ? 'right' : 'left';
					mixerData.push({
						inherit : att + attSide, 
							data : blockData, layout : blockLayout
					});
					//Category trial
					var cat = catSequence.pop();
					var catSide = (cat == params.focalCatIndex) ? 'right' : 'left';
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
		
		//We set nBlocks with the assumption that there is only one focal attribute
		var nBlocks = cats.length * piCurrent.nCategoryAttributeBlocks; 
		//Set the first focal attribute.
		var focalAttribute = piCurrent.focalAttribute;
		if (focalAttribute == 'both')
		{//Showing both attributes.
			nBlocks = nBlocks*2; //The two attributes will be focal, so double the number of blocks.
			focalAttribute = piCurrent.firstFocalAttribute;
			if (focalAttribute == 'random')
			{//Choose the first focal attribute randomly.
				focalAttribute = (Math.random() < 0.5) ? 'attribute1' : 'attribute2';
			}
		}

		//reset iBlock
		var iBlock = 1;
		var instTemplateVar;

		//First, push the practice block into the sequence
		if (piCurrent.practiceBlock)
		{
			nBlocks++;
			instTemplateVar = isTouch ? piCurrent.instTemplateTouch : piCurrent.instTemplate;
			var pracParams = {
				 instTemplate: instTemplateVar, 
				focalAtt:focalAttribute, 
				focalCatName:piCurrent.practiceCategory1.name, 
				focalCatTitle:piCurrent.practiceCategory1.title, 
				nBlocks : nBlocks, 
				showStimuliWithInst : piCurrent.showStimuliWithInst, 
				remindError : piCurrent.remindError, 
				remindErrorText : piCurrent.remindErrorText, 
				remindErrorTextTouch : piCurrent.remindErrorTextTouch, 
				isTouch: piCurrent.isTouch,
				blockNum:1
			};
			//Instruction trial
			trialSequence.push(getInstTrial(pracParams));
			//Create attribute trial set for the practice block
			var nonFocalAttribute = (focalAttribute == 'attribute1' ? 'attribute2' : 'attribute1');
			API.addTrialSets('practiceAtts', 
			[
				{inherit : {set:focalAttribute + 'right', type:'exRandom'}}, 
				{inherit : {set:nonFocalAttribute + 'left', type:'exRandom'}}
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
		//These parameters are used to create trials.
		instTemplateVar = isTouch ? piCurrent.instTemplateTouch : piCurrent.instTemplate;
		var blockParams = {
			instTemplate: instTemplateVar, 
			focalAtt:focalAttribute, 
			practiceTrials : piCurrent.practiceTrials, 
			nMiniBlocks : piCurrent.nMiniBlocks, 
			nTrialsPerMiniBlock : piCurrent.nTrialsPerMiniBlock,
			nCats : cats.length,
			nBlocks : nBlocks, 
			showStimuliWithInst : piCurrent.showStimuliWithInst, 
			remindError : piCurrent.remindError, 
			remindErrorText : piCurrent.remindErrorText,
			remindErrorTextTouch : piCurrent.remindErrorTextTouch, 
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
				postSettings : {score: "score", msg:"feeedback", url:"/implicit/scorer"}
			});

		// function getFB(inText, categoryA, categoryB)
		// {
		// 	var retText = inText.replace(/attribute1/g, att1.name);
		// 	retText = retText.replace(/attribute2/g, att2.name);
		// 	retText = retText.replace(/categoryA/g, categoryA);
		// 	retText = retText.replace(/categoryB/g, categoryB);
		// 	return retText;
		// }

			
			var scoreObj = {	
				MessageDef : [
					{ cut:'-0.65', message:piCurrent.fb_strongAssociationForCatWithAtt2}, 
					{ cut:'-0.35', message:piCurrent.fb_moderateAssociationForCatWithAtt2 },
					{ cut:'-0.15', message:piCurrent.fb_slightAssociationForCatWithAtt2 },
					{ cut:'0.15', message:piCurrent.fb_equalAssociationForCatWithAtts},
					{ cut:'0.35', message:piCurrent.fb_slightAssociationForCatWithAtt1},
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
				
				//API.save(scoreObj);
				//piCurrent.batScoreObj = scoreObj;
				piCurrent.feedback = scoreObj.feedback;
				window.minnoJS.onEnd();

			}
		});
		
		return API.script;
	}
		
	return iatExtension;
});

