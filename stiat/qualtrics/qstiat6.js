define(['pipAPI','pipScorer','underscore'], function(APIConstructor, Scorer, _) {

	function stiatExtension(options)
	{
		var API = new APIConstructor();
		var scorer = new Scorer();
		var piCurrent = API.getCurrent();

		var stiatObj = 
		{
			//Set the canvas of the task
			canvas : {
				maxWidth: 725,
				proportions : 0.7,
				background: '#ffffff',
				borderWidth: 5,
				canvasBackground: '#ffffff',
				borderColor: 'lightblue'
			}, 
			//Define the category.
			category :  
			{
				name : 'Black People', //Category name to be used for feedback and logging.
				title : {
					media : {word : 'Black People'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 4 //Used to position the "Or" in the combined block.
				}, 
				media : [ //Stimuli
					{word: 'Tyron'},
					{word: 'Malik'},
					{word: 'Terrell'},
					{word: 'Jazmin'},
					{word: 'Tiara'},
					{word: 'Shanice'}
				],
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'2em'}
			},	
			attribute1 : 
			{
				name : 'Unpleasant', //Attribute name to be used for feedback and logging
				title : {
					media : {word : 'Unpleasant'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 4 //Used to position the "Or" in the combined block.
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
				css : {color:'#31b404','font-size':'2em'}
			},
			attribute2 : 
			{
				name : 'Pleasant', //Attribute name to be used for feedback and logging
				title : {
					media : {word : 'Pleasant'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 4 //Used to position the "Or" in the combined block.
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
				css : {color:'#31b404','font-size':'2em'}
			},	
			trialsByBlock : 
			[//Each object in this array defines a block
				{
					instHTML : '', //Empty means we will create the inst from the instTemplate variable further below. 
					block : 1, //The block variable is not used later, but could help the user. 
					//In each block, we can include a number of mini-blocks, to reduce repetition of same group/response.
					miniBlocks : 1, //Set to 1 if don't need mini blocks. 0 will break the task.
					singleAttTrials : 10, //Number of trials of the attribute that does not share key with the category (in a mini block).
					sharedAttTrials : 10, //Number of trials of the attribute that shares key with the category (in a mini block).
					categoryTrials : 0 // Number of trials of the category (in a mini-block). If 0, the label does not appear.
					//Note: if no category trials, then attribute1, the one on the left, is considered the single attribute.
				}, 
				{ 
					instHTML : '', 
					block : 2, 
					miniBlocks : 2, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 3, 
					miniBlocks : 2, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 4, 
					miniBlocks : 2, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 5, 
					miniBlocks : 2, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}
			],
			//All blocks show attribute1 on the left and attribute2 on the right. 
			//blockOrder can be: 'startRight', 'startLeft', and 'random'
			blockOrder : 'random', 
			//Change to 'startRight' if you want to start with category on the right in the first block. 
			//Change to 'startLeft' if you want to start with category on the left in the first block. 
			//Change to 'random' if you want to randomize whether the category starts on the left or on the right.
			//NOTICE: to know what the block-order condition is, we save the pairing definition of the second block, 
			//into the explicit table, under the variable name block2Condition.

			//If the switch parameter is 0 or smaller, we switch the side of the category every block. 
			//If it is larger than 0, then we switch the category side only once, in the block specified in switchSideBlock.
			switchSideBlock : 4, //By default, we switch on block 4 (i.e., after blocks 2 and 3 showed the first pairing condition).

			base_url : {//Where are your images?
				image : '/implicit/user/yba/pipexample/stiat/images/'
			}, 
			ITIDuration : 250, //Duration between trials.
			
			fontColor : '#000000', //The color of messages and key reminders. 
			
			//Text and style for key instructions displayed about the category labels.
			leftKeyText : 'Press "E" for', 
			rightKeyText : 'Press "I" for', 
			keysCss : {'font-size':'0.8em', 'font-family':'courier', color:'#000000'},
			//Text and style for the separator between the top and bottom category labels.
			orText : 'or', 
			orCss : {'font-size':'1.8em', color:'#000000'},

			//Will appear at the bottom of the screen during trials.
			remindErrorText : '<p align="center" style="font-size:"0.6em"; font-family:arial">' +
			'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
			'Press the other key to continue.<p/>',
			
			finalText: 'You have completed this task<br/><br/>Press SPACE to continue.', 

			//These are templates for the instructions in the task. 
			//If you want more specific instructions for different blocks, 
			// use the instHTML variables above. 
			// The following variables in the instructions text will be replaced: 
			// blockNum, nBlocks, attribute1, attribute2, and thecategory.
			// Notice that this is HTML text.
			instTemplatePractice : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>Part blockNum of nBlocks</u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Put a left finger on the <b>E</b> key for items that belong to the category ' + 
				'<font color="#31b404">attribute1</font>.<br/>' + 
				'Put a right finger on the <b>I</b> key for items that belong to the category ' + 
				'<font color="#31b404">attribute2</font>.<br/>' + 
				'Items will appear one at a time.<br/><br/>' + 
				'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
				'Press the other key to continue.<br/><br/>' + 
				'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>', 
			instTemplateCategoryRight : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Put a left finger on the <b>E</b> key for items that belong to the category ' + 
				'<font color="#31b404">attribute1</font>.<br/>' + 
				'Put a right finger on the <b>I</b> key for items that belong to the category ' + 
				'<font color="#31b404">attribute2</font> ' +
				'and for items that belong to the category <font color="#31b404">thecategory</font>.<br/>' + 
				'Items will appear one at a time.<br/><br/>' + 
				'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
				'Press the other key to continue.<br/><br/>' + 
				'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>', 
			instTemplateCategoryLeft : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Put a left finger on the <b>E</b> key for items that belong to the category ' + 
				'<font color="#31b404">attribute1</font> ' +
				'and for items that belong to the category <font color="#31b404">thecategory</font>.<br/>' + 
				'Put a right finger on the <b>I</b> key for items that belong to the category ' + 
				'<font color="#31b404">attribute2</font>.<br/>' + 
				'Items will appear one at a time.<br/><br/>' + 
				'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' + 
				'Press the other key to continue.<br/><br/>' + 
				'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>', 
			
			//The default feedback messages for each cutoff. 
			//If you put attribute1, attribute2 and category here, 
			//these will be replaced with the names of attribute1, attribute2 and category.
			fb_strongAssociationWithAttribute2 : 'Your data suggest a strong positive automatic attitude toward thecategory.',
			fb_moderateAssociationWithAttribute2 : 'Your data suggest a moderate positive automatic attitude toward thecategory.',
			fb_weakAssociationWithAttribute2 : 'Your data suggest a weak positive automatic attitude toward thecategory.',
			fb_neutralAssociation : 'Your data suggest a neutral automatic attitude toward thecategory.',
			fb_weakAssociationWithAttribute1 : 'Your data suggest a weak negative automatic attitude toward thecategory.' ,
			fb_moderateAssociationWithAttribute1 : 'Your data suggest a moderate negative automatic attitude toward thecategory.' ,
			fb_strongAssociationWithAttribute1 : 'Your data suggest a strong negative automatic attitude toward thecategory.', 
			
			//Error messages in the scorer. If empty then we use the scorer's default messages.
			manyErrors: '',
			tooFast: '',
			notEnough: '' //Usually relevant only if skipped the task.
		};

		// extend the current object with the default
		_.extend(piCurrent, _.defaults(options, stiatObj));

		
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
                var headers = ['block', 'trial', 'cond', 'type', 'cat',  'stim', 'resp', 'err', 'rt', 'd', 'fb', 'bOrd'];
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
                        //log.data, //'comp'
                        log.name, //'type'
                        log.stimuli[0], //'cat'
                        log.media[0], //'stim'
                        log.responseHandle, //'resp'
                        log.data.score, //'err'
                        log.latency, //'rt'
                        '', //'d'
                        '', //'fb'
                        '' //'bOrd'
                        ]; });
                //console.log('mapped');
                //Add a line with the feedback, score and block-order condition
                content.push([
                            9, //'block'
                            999, //'trial'
                            'end', //'cond'
                            //'', //'comp'
                            '', //'type'
                            '', //'cat'
                            '', //'stim'
                            '', //'resp'
                            '', //'err'
                            '', //'rt'
                            piCurrent.d, //'d'
                            piCurrent.feedback, //'fb'
                            block2Condition //'bOrd'
                        ]);
                //console.log(content);
                        
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

		/***********************************************************************************
		*
		* Here starts the script. You might not need to change anything in the actual script.
		*
		************************************************************************************/
		
		var attribute1 = piCurrent.attribute1.name;
		var attribute2 = piCurrent.attribute2.name;
		var category = piCurrent.category.name;

		//This is our block-order condition. We will save it in the explicit table.
		var block2Condition;
		
		// layout object for the trials where category on left
		var leftLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			{location:{left:6,top:4+(piCurrent.attribute1.title.height|3)}, media:{word:piCurrent.orText}, css:piCurrent.orCss},
			{location:{left:6,top:11+(piCurrent.attribute1.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
		];
		// layout object for the trials where category on right
		var rightLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			{location:{right:6,top:4+(piCurrent.attribute2.title.height|3)},media:{word:piCurrent.orText}, css:piCurrent.orCss},
			{location:{right:6,top:11+(piCurrent.attribute2.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
		];
		// layout object for practice blocks (no category)
		var pracLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css}
		];
		
		var reminderStimulus = 	{location:{bottom:1}, css: {color:piCurrent.fontColor,'font-size':'1em'}, media : {html: piCurrent.remindErrorText}};

		API.addSettings('canvas',piCurrent.canvas);
		API.addSettings('base_url',piCurrent.base_url);

		/**
		 * Create default Trial
		 */
		API.addTrialSets('sort',{
			// by default each trial is correct, this is modified in case of an error
			data: {score:0, parcel:'first'},
			// set the interface for trials
			input: [
				{handle:'skip1',on:'keypressed', key:27}, //Esc + Enter will skip blocks
				{handle:'left',on:'keypressed',key:'e'},
				{handle:'right',on:'keypressed',key:'i'}
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
				data: {blockStart:true, block:0, condition:'inst', score:0},

				// create user interface (just click to move on...)
				input: [
					{handle:'space',on:'space'}
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
							{type:'log'},
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
		 * The four basic trials.
		 */
		API.addTrialSets({
			leftAtt1: [{
				inherit : 'sort', 
				data : {corResp : 'left'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'attribute1'}},
					{inherit:{set:'error'}}
				]
			}],
			rightAtt2: [{
				inherit : 'sort', 
				data : {corResp : 'right'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'attribute2'}},
					{inherit:{set:'error'}}
				]
			}],
			leftCat: [{
				inherit : 'sort', 
				data : {corResp : 'left'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'category'}},
					{inherit:{set:'error'}}
				]
			}],
			rightCat: [{
				inherit : 'sort', 
				data : {corResp : 'right'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'category'}},
					{inherit:{set:'error'}}
				]
			}]	
		});

		/**
		 *	Stimulus Sets
		 */
		API.addStimulusSets({
			// This Default stimulus is inherited by the other stimuli so that we can have a consistent look and change it from one place
			Default: [
				{css:{color:'white','font-size':'2em'}}
			],

			instructions: [
				{css:{'font-size':'1.4em',color:'black', lineHeight:1.2}, nolog:true, location:{bottom:1}}
			],

			attribute1 : 
			[{
				data: {alias:attribute1, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.attribute1.css,
				media : {inherit:{type:'exRandom',set:'attribute1'}}
			}],
			attribute2 : 
			[{
				data: {alias:attribute2, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.attribute2.css,
				media : {inherit:{type:'exRandom',set:'attribute2'}}
			}],
			category : 
			[{
				data: {alias:category, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.category.css,
				media : {inherit:{type:'exRandom',set:'category'}}
			}],			
			// this stimulus used for giving feedback, in this case only the error notification
			error : [{
				data:{handle:'error'}, location: {top: 70}, css:{color:'red','font-size':'4em'}, media: {word:'X'}, nolog:true
			}], 			
			dummyForLog : [{
				data:{name:'dummyForLog', alias:'dummyForLog'}, 
				location:{left:99}, media:{word:' '}
			}]
		});

		/**
		 *	Media Sets
		 */
		API.addMediaSets({
			attribute1 : piCurrent.attribute1.media,
			attribute2: piCurrent.attribute2.media,
			category: piCurrent.category.media
		});

		/**
		 *	Create the Task sequence
		 */
		//helper Function for getting the instructions HTML.
		function getInstFromTemplate(inText, blockNum, nBlocks)
		{
			var retText = inText.replace(/attribute1/g, attribute1);
			retText = retText.replace(/attribute2/g, attribute2);
			retText = retText.replace(/thecategory/g, category);
			retText = retText.replace(/blockNum/g, blockNum);
			retText = retText.replace(/nBlocks/g, nBlocks);
			return (retText);
		}
		//helper function for getting the instructions HTML.
		function getInstHTML(params)
		{
			var instHTML = '';
			if (params.isPractice)
			{
				instHTML = getInstFromTemplate(piCurrent.instTemplatePractice, params.blockNum, params.nBlocks);
			}
			else if (params.categorySide == 'rightCat')
			{
				instHTML = getInstFromTemplate(piCurrent.instTemplateCategoryRight, params.blockNum, params.nBlocks);
			}
			else if (params.categorySide == 'leftCat')
			{
				instHTML = getInstFromTemplate(piCurrent.instTemplateCategoryLeft, params.blockNum, params.nBlocks);
			}
			return (instHTML);
		}
		
		//This is the tricky part. We will create the trial sequence with js code, for flexibility.
		var trialSequence = [];
		
		////Set the block order
		var firstCatSide = 'leftCat';
		if (piCurrent.blockOrder == 'startRight')
		{
			firstCatSide = 'rightCat';
		}
		else if (piCurrent.blockOrder == 'random')
		{
			firstCatSide = (Math.random() < 0.5) ? 'rightCat' : 'leftCat';
		}
		
		var catSide = '';
		for (var iBlock = 1; iBlock <= piCurrent.trialsByBlock.length; iBlock++)
		{//For each block

			var isPrac = false;
			var currentCondition = '';
			var blockLayout;
			if (piCurrent.trialsByBlock[iBlock-1].categoryTrials === 0)
			{//There are no category trials, so this is a practice block because.
				isPrac = true;
			}
			else if (catSide != 'rightCat' && catSide != 'leftCat' )
			{//This is not practice, and we should not switch sides, but the category side has has never been set.
				catSide = firstCatSide;
			}
			else if (piCurrent.switchSideBlock == iBlock  //Switch category once, on this block
			|| piCurrent.switchSideBlock <= 0 //Switch layout every block
			)
			{//Switch layout
				if (catSide == 'rightCat')
				{
					catSide = 'leftCat';
				}
				else if (catSide == 'leftCat')
				{
					catSide = 'rightCat';
				}
			}

			//According to the catSide
			if (isPrac)
			{
				blockLayout = pracLayout;
				currentCondition = attribute1 + ',' + attribute2;
			}
			else if (catSide == 'leftCat')
			{
				blockLayout =  leftLayout;
				singleAttribute = 'rightAtt2';
				catAttribute = 'leftAtt1';
				currentCondition = category + '/' + attribute1 + ',' + attribute2;
			}
			else if (catSide == 'rightCat')
			{
				blockLayout =  rightLayout;
				singleAttribute = 'leftAtt1';
				catAttribute = 'rightAtt2';
				currentCondition = attribute1 + ',' + attribute2 + '/' + category;
			}

			if (iBlock === 2)
			{//Set the block2Condition variable. That is our block order condition.
				block2Condition = currentCondition;
			}
			//Which is the single attribute? The one that is on the other side of the category.
			var singleAttribute = (catSide == 'rightCat') ? 'leftAtt1' : 'rightAtt2';
			//And the category's attribute? The other side, of course.
			var catAttribute = (singleAttribute == 'leftAtt1') ? 'rightAtt2' : 'leftAtt1';
		
			//Set the instructions html.
			var instHTML = piCurrent.trialsByBlock[iBlock-1].instHTML; 
			//Users can set the instHTML of each block, or use the instructions templates.
			if (instHTML === '') 
			{//Did not use the instHTML of each block, so let's use the instructions templates.
				instHTML = getInstHTML({
					blockNum : iBlock, 
					nBlocks : piCurrent.trialsByBlock.length, 
					isPractice : isPrac, categorySide : catSide
				});
			}
			//Add the block's instructions sequence
			trialSequence.push(
				{
					inherit : 'instructions', 
					data: {blockStart:true},
					layout : blockLayout, 
					stimuli : [
						{ 
							inherit : 'instructions', 
							media : {html : instHTML}
						},
						{
							data : {handle:'dummy', alias:'dummy'},
							media : {word:' '}, 
							location : {top:1}
						}
					]
				}
			);
			
			//We separate each block to mini blocks to reduce repetition of categories and responses.
			for (var iMini = 1; iMini <= piCurrent.trialsByBlock[iBlock-1].miniBlocks; iMini++)
			{//For each mini block
				var mixer = 
				{//This mixer will randomize the trials of all the three groups.
					mixer : 'random', 
					data : 
					[
						{//The single attribute trials
							mixer : 'repeat', 
							times : piCurrent.trialsByBlock[iBlock-1].singleAttTrials,
							data : 
							[{
								inherit : singleAttribute, 
								data : {condition : currentCondition, block : iBlock}, 
								layout : blockLayout.concat(reminderStimulus)
							}]
						}, 
						{//The key-shared attribute trials
							mixer : 'repeat', 
							times : piCurrent.trialsByBlock[iBlock-1].sharedAttTrials,
							data : 
							[{
								inherit : catAttribute, 
								data : {condition : currentCondition, block : iBlock}, 
								layout : blockLayout.concat(reminderStimulus)
							}]
						} 
					]
				};
				if (!isPrac) //If it is not a practice block, then
				{//Add the category trials to mixer's data
					mixer.data.push(
						{//The key-shared attribute trials
							mixer : 'repeat', 
							times : piCurrent.trialsByBlock[iBlock-1].categoryTrials,
							data : 
							[{
								inherit : catSide, 
								data : {condition : currentCondition, block : iBlock}, 
								layout : blockLayout.concat(reminderStimulus)
							}]
						}
					);
				}
				trialSequence.push(mixer);
			}
		}
		//Add the final goodbye trial.
		trialSequence.push({
			inherit : 'instructions', 
			data: {blockStart:true},
			layout : [{media:{word:''}}], 
			stimuli : [
				{ 
					inherit : 'instructions', 
					css : {color:piCurrent.fontColor}, 
					media:{html:'<div><p style="font-size:28px"><color="#000000">' + 
					piCurrent.finalText + '</p></div>'}
				},
				{
					data : {handle:'dummy', alias:'dummy'},
					media : {word:' '}, 
					location : {top:1}
				}			
			]
		});
		//Now add the trials sequence to the API.
		API.addSequence(trialSequence);
		
		/**
		Compute the Feedback.
		**/
		
		//Settings for the score computation.
		scorer.addSettings('compute',{
			ErrorVar:'score',
			condVar:'condition',
			//condition 1
			cond1VarValues: [
				category + '/' + attribute1 + ',' + attribute2
				//attribute1 + ',' + attribute2 + '/' + category
			],
			//condition 2
			cond2VarValues: [ 
				attribute1 + ',' + attribute2 + '/' + category
				//attribute1 + '/' + category + ',' + attribute2
			],
			parcelVar : "parcel", //We use only one parcel because it is probably not less reliable.
			parcelValue : ['first'],
			fastRT : 150, //Below this reaction time, the latency is considered extremely fast.
			maxFastTrialsRate : 0.1, //Above this % of extremely fast responses within a condition, the participant is considered too fast.
			minRT : 400, //Below this latency
			maxRT : 10000, //above this
			errorLatency : {use:"latency", penalty:600, useForSTD:true},
			postSettings : {score:"score",msg:"feedback",url:"/implicit/scorer"}
		});

		//Helper function to set the feedback messages.
		function getFBFromTemplate(inText)
		{
			var retText = inText.replace(/attribute1/g, attribute1);
			retText = retText.replace(/attribute2/g, attribute2);
			retText = retText.replace(/thecategory/g, category);
			return (retText);
		}
		//Set the feedback messages.
		var messageDef = [
				{ cut:'-0.65', message : getFBFromTemplate(piCurrent.fb_strongAssociationWithAttribute1) },
				{ cut:'-0.35', message : getFBFromTemplate(piCurrent.fb_moderateAssociationWithAttribute1) },
				{ cut:'-0.15', message : getFBFromTemplate(piCurrent.fb_weakAssociationWithAttribute1) },
				{ cut:'0.15', message : getFBFromTemplate(piCurrent.fb_neutralAssociation) },
				{ cut:'0.35', message : getFBFromTemplate(piCurrent.fb_weakAssociationWithAttribute2) },
				{ cut:'0.65', message : getFBFromTemplate(piCurrent.fb_moderateAssociationWithAttribute2) },
				{ cut:'5', message : getFBFromTemplate(piCurrent.fb_strongAssociationWithAttribute2) }
		];
		var scoreMessageObject = { MessageDef : messageDef };
		if (piCurrent.manyErrors !== '')
		{
			scoreMessageObject.manyErrors = piCurrent.manyErrors;
		}
		if (piCurrent.tooFast !== '')
		{
			scoreMessageObject.tooFast = piCurrent.tooFast;
		}
		if (piCurrent.notEnough !== '')
		{
			scoreMessageObject.notEnough = piCurrent.notEnough;
		}
		//Set messages to the scorer.
		scorer.addSettings('message',scoreMessageObject);

		//What to do at the end of the task.
		API.addSettings('hooks',{
			endTask: function(){
				//Compute score
				var DScoreObj = scorer.computeD();
				//Save for the task's session.
				piCurrent.feedback = DScoreObj.FBMsg;
				piCurrent.d = DScoreObj.DScore;
				//Save to server
				//API.save({block2Condition:block2Condition, feedback:DScoreObj.FBMsg, d: DScoreObj.DScore});
				window.minnoJS.onEnd();

			}
		});

		return API.script;
	}
	
	return stiatExtension;
});
