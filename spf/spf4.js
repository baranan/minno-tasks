define(['pipAPI','pipScorer','underscore'], function(APIConstructor, Scorer, _) {

	function spfExtension(options)
	{

		var API = new APIConstructor();
		var scorer = new Scorer();
		var piCurrent = API.getCurrent();

		/**
		You can modify most of what you need to modify in the settings 
		defined in spfObj
		
		**/
		var spfObj = 
		{
			//Set the canvas of the task
			canvas : {
				maxWidth: 725,
				proportions : 0.85,
				background: '#ffffff',
				borderWidth: 5,
				canvasBackground: '#ffffff',
				borderColor: 'lightblue'
			}, 
			//The two categories.
			objectCat1 :  
			{
				name : 'Mammals', //Will appear in the data.
				title : {
					media : {word : 'Mammals'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 8 //Height (because we need to know where to put the next item in the title)
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
			objectCat2 :  
			{
				name : 'Birds', //Will appear in the data.
				title : {
					media : {word : 'Birds'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 8 //Height (because we need to know where to put the next item in the title)
				},
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word : 'Pigeons'}, 
					{word : 'Swans'}, 
					{word : 'Crows'}, 
					{word : 'Ravens'}
				], 
				//Stimulus css (style of the stimuli)
				stimulusCss : {color:'#31b404','font-size':'2em'}
			},
			attribute1 :  
			{
				name : 'Unpleasant', //Will appear in the data.
				title : {
					media : {word : 'Unpleasant'}, //Name of the category presented in the task.
					css : {color:'#0000FF','font-size':'2em'}, //Style of the category title.
					height : 8 //Height (because we need to know where to put the next item in the title)
				},
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word: 'Bomb'},
					{word: 'Abuse'},
					{word: 'Sadness'},
					{word: 'Pain'},
					{word: 'Poison'},
					{word: 'Grief'}
				], 
				//Stimulus css (style of the stimuli)
				stimulusCss : {color:'#0000FF','font-size':'2em'}
			},
			attribute2 :  
			{
				name : 'Pleasant', //Will appear in the data.
				title : {
					media : {word : 'Pleasant'}, //Name of the category presented in the task.
					css : {color:'#0000FF','font-size':'2em'}, //Style of the category title.
					height : 8 //Height (because we need to know where to put the next item in the title)
				},
				stimulusMedia : [ //Stimuli content as PIP's media objects
					{word: 'Paradise'},
					{word: 'Pleasure'},
					{word: 'Cheer'},
					{word: 'Wonderful'},
					{word: 'Splendid'},
					{word: 'Love'}
				], 
				//Stimulus css (style of the stimuli)
				stimulusCss : {color:'#0000FF','font-size':'2em'}
			},
			
			//Vertical location (top) of the attribute stimuli
			attributeTop : 35, 
			categoryTop : 'center', //Change to a number for a number
			instTop:'center',//Change to a number for a number
			
			//Procedural features
			ITIDuration : 250, 	
			nTrialsPerPrimeTargetPair:10, //How many trials in a block, per prime-target combination (always three blocks).
			nBlocks : 3, //Number of blocks
			randomCategoryLocation : true, //Whether to randomly select which category is on top. If false, then objectCat1 is on top.
			randomAttributeLocation : false, //Whether to randomly select which attribute is on the left. If false, objectAtt1 is on the left.
			
			keyTopLeft: 'E', 
			keyTopRight: 'I',
			keyBottomLeft: 'C',
			keyBottomRight: 'N',
			
			keyHeight:4, //Used to compute the bottom and top locations of the attribute label, above and below the key labels.
			
			//Instructions by block. 
			instructions : 
			{
				firstBlock : 
					'<div><p style="font-size:18px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
					'Put your left middle and index finger on the <b>keyTopLeft</b> and <b>keyBottomLeft</b> keys. ' + 
					'Put your right middle and index finger on the <b>keyTopRight</b> and <b>keyBottomRight</b> keys. ' + 
					'Pairs of stimuli will appear in the middle of the screen. '  + 
					'Four pairs of categories will appear in the corners of the screen. ' + 
					'Sort each pair of items to the corner in which their two categories appear. ' + 
					'If you make an error, an <font color="#FF0000"><b>X</b></font> will appear until you hit the correct key. ' + 
					'This is a timed sorting task. <b>GO AS FAST AS YOU CAN</b> while making as few mistakes as possible.' + 
					'</color></p><p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
					'press SPACE to begin</p><p style="font-size:14px; text-align:center; font-family:arial">' + 
					'<color="000000">[Round 1 of nBlocks]</p></div>', 

				//All the blocks in the middle will have these instructions, changing only the number of the round.
				middleBlock : 
					'<div><p style="font-size:18px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
					'Press SPACE to continue with the same task.<br/><br/>' + 
					'Sort each pair of items to the corner in which their two categories appear. ' + 
					'If you make an error, an <font color="#FF0000"><b>X</b></font> will appear until you hit the correct key. ' + 
					'This is a timed sorting task. <b>GO AS FAST AS YOU CAN</b> while making as few mistakes as possible.</p>' + 
					'<p style="font-size:14px; text-align:center; font-family:arial">' + 
					'<color="000000">[Round blockNum of nBlocks]</p></div>', 

				//Final block
				lastBlock : 
				'<div><p style="font-size:18px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
				'This task can be a little exhausting. ' + 
				'Try to challenge yourself to respond as quickly as you can without making mistakes.<br/><br/>' + 
				'Press SPACE for the final round.</p><br/><br/>' + 
				'<p style="font-size:14px; text-align:center; font-family:arial">' + 
				'<color="000000">[Round nBlocks of nBlocks]</p></div>'
			},
			
			//The default feedback messages for each cutoff - 
			//CATEGORYA, and CATEGORYB will be replaced with the names of the relevant categories.
			fb_strong_Att1WithCatA_Att2WithCatB : 'Your data suggest strong preference of CATEGORYA over CATEGORYB.',
			fb_moderate_Att1WithCatA_Att2WithCatB : 'Your data suggest moderate preference of CATEGORYA over CATEGORYB.',
			fb_slight_Att1WithCatA_Att2WithCatB : 'Your data suggest slight preference of CATEGORYA over CATEGORYB.',
			fb_equal_CatAvsCatB : 'Your data suggest no preference between CATEGORYA and CATEGORYB.',

			//Error messages in the feedback
			manyErrors: 'There were too many errors made to determine a result.',
			tooFast: 'There were too many fast trials to determine a result.',
			notEnough: 'There were not enough trials to determine a result.',
			
			//Set the image folder here.
			base_url : {
				image : '/implicit/user/yba/pipexample/spf/images/'
			}
		};
			
		// extend the current object with the default
		_.defaults(piCurrent, options, spfObj);

		var attribute1 = piCurrent.attribute1;
		var attribute2 = piCurrent.attribute2;
		var objectCat1 = piCurrent.objectCat1;
		var objectCat2 = piCurrent.objectCat2;
		if (piCurrent.randomCategoryLocation && Math.random() > 0.5)
		{
			objectCat1 = piCurrent.objectCat2;
			objectCat2 = piCurrent.objectCat1;
		}
		if (piCurrent.randomAttributeLocation && Math.random() > 0.5)
		{
			attribute1 = piCurrent.attribute2;
			attribute2 = piCurrent.attribute1;
		}
		
		//Set the size of the screen
		API.addSettings('canvas',piCurrent.canvas);

		//the source of the images
		API.addSettings('base_url',piCurrent.base_url);

		/*********************/
		/***    TRIALS    ***/
		/*********************/
		
		console.log('piCurrent.keyTopLeft='+piCurrent.keyTopLeft);
		var trialLayout = 
		[
			//Keys
			{location:{left:2,top:1},media:{word:'key: ' + piCurrent.keyTopLeft}, css:{color:'#000000','font-size':'1em'}},
			{location:{left:2,top:piCurrent.keyHeight},media:attribute1.title.media, css:attribute1.title.css},
			{location:{left:2,top:piCurrent.keyHeight+attribute1.title.height},media:objectCat1.title.media, css:objectCat1.title.css},
			
			{location:{right:2,top:1},media:{word:'key: ' + piCurrent.keyTopRight}, css:{color:'#000000','font-size':'1em'}},
			{location:{right:2,top:piCurrent.keyHeight},media:attribute2.title.media, css:attribute2.title.css},
			{location:{right:2,top:piCurrent.keyHeight+attribute2.title.height},media:objectCat1.title.media, css:objectCat1.title.css},
			
			{location:{left:2,bottom:1},media:{word:'key: ' + piCurrent.keyBottomLeft}, css:{color:'#000000','font-size':'1em'}},
			{location:{left:2,bottom:piCurrent.keyHeight},media:objectCat2.title.media, css:objectCat2.title.css},
			{location:{left:2,bottom:piCurrent.keyHeight+objectCat2.title.height},media:attribute1.title.media, css:attribute1.title.css},
			
			{location:{right:2,bottom:1},media:{word:'key: ' + piCurrent.keyBottomRight}, css:{color:'#000000','font-size':'1em'}},
			{location:{right:2,bottom:piCurrent.keyHeight},media:objectCat2.title.media, css:objectCat2.title.css},
			{location:{right:2,bottom:piCurrent.keyHeight+objectCat2.title.height},media:attribute2.title.media, css:attribute2.title.css}
			//Category labels
		];

        var resps = '';		
        API.addSettings('logger', 
            {
                logger: function(trialData, inputData, actionData,logStack)
                {
                    // time v0.3
                    if (this._stimulus_collection) {
                        var stimList = this._stimulus_collection.get_stimlist();
                        var mediaList = this._stimulus_collection.get_medialist();

                        return {
                            log_serial : logStack.length,
                            trial_id: this.counter,
                            name: this.name(),
                            responseHandle: resps,
                            latency: Math.floor(inputData.latency),
                            stimuli: stimList,
                            media: mediaList,
                            data: trialData
                        };
                    }

                    // time v0.5
                    var trial = arguments[2];
                    var global = window.piGlobal;
                    var fullpath = _.get(trial, 'settings.logger.fullpath', false);
                    inputData = arguments[1];
                    trialData = trial.data;
                    logStack = global.current.logs;
                    stimList = trial.stimulusCollection.getStimlist();
                    mediaList = trial.stimulusCollection.getMedialist({fullpath:fullpath});

                    return {
                        log_serial : logStack.length,
                        trial_id: trial.counter,
                        name: trial.name(),
                        responseHandle: inputData.handle,
                        latency: Math.floor(inputData.latency),
                        stimuli: stimList,
                        media: mediaList,
                        data: trialData
                    };
                }
            }
        );

		//Define the basic trial
		API.addTrialSets({
			basicTrial: [{
				data : {score:0},// by default each trial is crrect, this is modified in case of an error
				//Layout defines what will be presented in the trial. It is like a background display.
				layout: trialLayout,
				//Inputs for two possible responses.
				input: [
					{handle:'skip1',on:'keypressed', key:27}, //hit esc-enter to skip blocks
					{handle:'left-top',on:'keypressed',key:piCurrent.keyTopLeft.toLowerCase()},
					{handle:'left-bot',on:'keypressed',key:piCurrent.keyBottomLeft.toLowerCase()},
					{handle:'right-top',on:'keypressed',key:piCurrent.keyTopRight.toLowerCase()},
					{handle:'right-bot',on:'keypressed',key:piCurrent.keyBottomRight.toLowerCase()}
				],
				//Set what to do.
				interactions: [
					{//If no fixation duration, then start with the prime
						conditions: [{type:'begin'}],
						actions: [
							{type:'custom',fn:function(options,eventData)
							    {
							        resps = '';
							    }
							},
							{type:'showStim', handle:'attributeStim'}, 
							{type:'showStim', handle:'objectStim'} 
						]
					},
					// Handle correct response: when the reponse equals the category of the target word?
					{
						conditions: [
							{type:'inputEqualsTrial',property:'correctResp'}],
						actions: [
							{type:'custom',fn:function(options,eventData)
							    {
							        resps = resps + '|' + eventData.handle;
							        //console.log(eventData);
							    }
							},
							{type:'log'}, // here we call the log action. This is because we want to record the latency of this input (the latency of the response)
							{type:'removeInput',handle:['All']},//only one response is possible
							{type:'trigger', handle:'goBlank'}
						]
					},
					// handle incorrect response.
					{
						conditions: [
							{type:'inputEqualsTrial',property:'correctResp', negate:true},
							{type:'inputEquals',value:['left-top','right-top', 'left-bot','right-bot']} //Pressed one of the keys.
						],
						actions: [
							{type:'setTrialAttr', setter:{score:1}}, //1 for incorrect response
							{type:'custom',fn:function(options,eventData)
							    {
							        resps = resps + '|' + eventData.handle;
							        //console.log(eventData);
							    }
							},
							{type:'showStim',handle:'errorFB'} //show error feedback
						]
					},
					{
						conditions: [{type:'inputEquals',value:'goBlank'}], //What to do when endTrial is called.
						actions: [
							{type:'hideStim',handle:'All'},
							{type:'showStim',handle:'blankScreen'}, //show blankScreen
							{type:'setInput',input:{handle:'endTrial', on:'timeout', duration:piCurrent.ITIDuration}} // randomly select from within a range
						]
					},
					// skip block -> if you press 'enter' after pressing 'escape'.
					{
						conditions: [{type:'inputEquals',value:'skip1'}],
						actions: [
							{type:'setInput',input:{handle:"skip2",on: 'enter'}}
						]
					},
					// skip block -> if you press 'enter' after pressing 'escape'.
					{
						conditions: [{type:'inputEquals',value:'skip2'}],
						actions: [
							{type:'goto', destination: 'nextWhere', properties: {blockStart:true}},
							{type:'endTrial'}
						]
					},
					{
						conditions: [{type:'inputEquals',value:'endTrial'}], //What to do when endTrial is called.
						actions: [{type:'endTrial'}]
					}
				] // end interactions
			}] // end basic trial
		}); // end trialsets

		/***Helpers to create a trial for each object-attribute combination.***/
		//Get the correct response according to the current pair categories.
		function getCorrResp(inObjectName, inAttName)
		{
			var corrResp = 'some-kind-of-error';
			if (inObjectName == objectCat1.name)
			{
				if (inAttName == attribute1.name)
				{ 
					corrResp = 'left-top';
				}
				else if (inAttName == attribute2.name)
				{ 
					corrResp = 'right-top';
				}
			}
			if (inObjectName == objectCat2.name)
			{
				if (inAttName == attribute1.name)
				{ 
					corrResp = 'left-bot';
				}
				else if (inAttName == attribute2.name)
				{ 
					corrResp = 'right-bot';
				}
			}
			return (corrResp);
		}
		//Inherit the basic trial with specific target pair stimuli.
		function inheritBasic(inObjectName, inAttName)
		{
			return ({
				data: 
				{
					condition: inAttName + "+" + inObjectName, 
					correctResp : getCorrResp(inObjectName, inAttName)
				},
				inherit:{set: 'basicTrial'},
				stimuli: [
					{ inherit: {set: inObjectName, type:'exRandom'}, data : {handle:'objectStim'},
					    location : {top:piCurrent.categoryTop}
					},
					{ inherit: {set: inAttName, type:'exRandom'}, data : {handle:'attributeStim'}, 
					location : {top:piCurrent.attributeTop}},
					{ inherit: 'errorFB', nolog: true},
					{ inherit: 'blankScreen', nolog: true}
				]
			});
		}

		//Create the four possible trials.
		API.addTrialSets(attribute1.name+ '+' + objectCat1.name,
			inheritBasic(objectCat1.name, attribute1.name)); 
		API.addTrialSets(attribute2.name+ '+' + objectCat1.name,
			inheritBasic(objectCat1.name, attribute2.name)); 
		API.addTrialSets(attribute1.name+ '+' + objectCat2.name,
			inheritBasic(objectCat2.name, attribute1.name)); 
		API.addTrialSets(attribute2.name+ '+' + objectCat2.name,
			inheritBasic(objectCat2.name, attribute2.name)); 
		
			//Define the instructions trial
		API.addTrialSets('inst',{
			input: [
				{handle:'space',on:'space'} //Will handle a SPACEBAR reponse
			],
			layout: trialLayout, 
			interactions: [
				{ // begin trial
					conditions: [{type:'begin'}],
					actions: [{type:'showStim',handle:'All'}] //Show the instructions
				},
				{
					conditions: [{type:'inputEquals',value:'space'}], //What to do when space is pressed
					actions: [
						{type:'hideStim',handle:'All'}, //Hide the instructions
						{type:'setInput',input:{handle:'endTrial', on:'timeout',duration:500}} //In 500ms: end the trial. In the mean time, we get a blank screen.
					]
				},
				{
					conditions: [{type:'inputEquals',value:'endTrial'}], //What to do when endTrial is called.
					actions: [
						{type:'endTrial'} //End the trial
					]
				}
			]
		});

		/*********************/
		/***    STIMULI    ***/
		/*********************/
		
		//Create the basic stimuli
		API.addStimulusSets({
		//These are the different types of stimuli.
			// This Default stimulus is inherited by the other stimuli so that we can have a consistent look and change it from one place
			Default: [
				{css:{color:'#31b404','font-size':'2.3em'}}
			],
			errorFB : [//Error feedback stimulus
				{
					data : {handle:'errorFB'},
					size: {height:15,width:15},
					location: {bottom:10},
					css:{color:'red','font-size':'3em'},
					media: {word:'X'},
					nolog:true
				}
			],
			blankScreen : [//blankScreen  stimulus (in between the trials)
				{
					data : {handle:'blankScreen'},
					media: {word:' '},//can be replace with '+'
					nolog:true
				}
			]
		});

		API.addStimulusSets(attribute1.name, {
			data : {alias:attribute1.name},
			inherit:'Default',
			css:attribute1.stimulusCss,
			media: {inherit:{type:'exRandom',set:attribute1.name}} 
		});
		API.addStimulusSets(attribute2.name, {
			data : {alias:attribute2.name},
			inherit:'Default',
			css:attribute2.stimulusCss,
			media: {inherit:{type:'exRandom',set:attribute2.name}} 
		});
		API.addStimulusSets(objectCat1.name, {
			data : {alias:objectCat1.name},
			inherit:'Default',
			css:objectCat1.stimulusCss,
			media: {inherit:{type:'exRandom',set:objectCat1.name}} 
		});
		API.addStimulusSets(objectCat2.name, {
			data : {alias:objectCat2.name},
			inherit:'Default',
			css:objectCat2.stimulusCss,
			media: {inherit:{type:'exRandom',set:objectCat2.name}} 
		});

		/*********************/
		/***    MEDIA    ***/
		/*********************/

		API.addMediaSets(attribute1.name, attribute1.stimulusMedia);
		API.addMediaSets(attribute2.name, attribute2.stimulusMedia);
		API.addMediaSets(objectCat1.name, objectCat1.stimulusMedia);
		API.addMediaSets(objectCat2.name, objectCat2.stimulusMedia);

		/*********************/
		/***    SEQUENCE   ***/
		/*********************/
		
		//Helper to prepare the instructions html.
		function getInstHTML(inText, inBlock)
		{
			var retText = inText.replace(/blockNum/g, inBlock);
			retText = retText.replace(/nBlocks/g, piCurrent.nBlocks);
			retText = retText.replace(/keyTopLeft/g, piCurrent.keyTopLeft.toUpperCase());
			retText = retText.replace(/keyTopRight/g, piCurrent.keyTopRight.toUpperCase());
			retText = retText.replace(/keyBottomLeft/g, piCurrent.keyBottomLeft.toUpperCase());
			retText = retText.replace(/keyBottomRight/g, piCurrent.keyBottomRight.toUpperCase());
			return (retText);
		}
		
		//Defines the sequence of trials.
		var theSequence = [];
		for (var iBlock = 1; iBlock <= piCurrent.nBlocks; iBlock++)
		{
			//Set the block's raw instructions text.
			var blockInst = piCurrent.instructions.middleBlock;
			if (iBlock == 1)
			{
				blockInst = piCurrent.instructions.firstBlock;
			}
			else if (iBlock == piCurrent.nBlocks)
			{
				blockInst = piCurrent.instructions.lastBlock;
			}
			theSequence.push(
				{ //Instructions trial
					data: {blockStart:true},
					inherit : "inst",
					stimuli: [
						{//The instructions stimulus
							//the instructions that will be shown on the screen
							media:{html:getInstHTML(blockInst, iBlock)},
							location:{top:piCurrent.instTop}
						}
					]
				},
				{ //The sorting trials
					mixer: 'random',
					data : [{
						mixer : 'repeat', 
						times : piCurrent.nTrialsPerPrimeTargetPair, 
						data : 
						[
							{inherit: attribute1.name+ '+' + objectCat1.name, data:{block:iBlock}}, 
							{inherit: attribute1.name+ '+' + objectCat2.name, data:{block:iBlock}}, 
							{inherit: attribute2.name+ '+' + objectCat1.name, data:{block:iBlock}}, 
							{inherit: attribute2.name+ '+' + objectCat2.name, data:{block:iBlock}} 
						]
					}]
				}
			);
		}
		
		//Last trial
		theSequence.push(
			{ //Instructions trial, the end of the task, instruction what to do next
				data: {blockStart:true},
				inherit : "inst",
				layout: [{media:{word:''}}],
			stimuli: [
					{//The instructions stimulus
						data : {'handle':'instStim'},
						media:{html:'<div><p style="font-size:28px"><color="#000000">' + 
						'You have completed this task<br/><br/>Press SPACE to continue.</p></div>'}
					}
				]
			}
		);
		API.addSequence(theSequence);

		////Helpers for computing the feedback at the end.
		function getFB(inText, inCatA, inCatB, inAtt1, inAtt2)
		{
			var retText = inText.replace(/CATEGORYA/g, inCatA);
			retText = retText.replace(/CATEGORYB/g, inCatB);
			retText = retText.replace(/ATTRIBUTE1/g, inAtt1);
			retText = retText.replace(/ATTRIBUTE2/g, inAtt2);
			return (retText);
		}
		
		function computeFB()
		{
			//the Scorer that compute the user feedback
			scorer.addSettings('compute',{
				ErrorVar:'score',
				condVar:"condition",
				cond1VarValues: [attribute1.name + '+' + objectCat1.name, attribute2.name + '+' + objectCat2.name], //scoring condition 1
				cond2VarValues: [attribute1.name + '+' + objectCat2.name, attribute2.name + '+' + objectCat1.name], //scoring condition 2
				fastRT : 150, //Below this reaction time, the latency is considered extremely fast.
				maxFastTrialsRate : 0.1, //Above this % of extremely fast responses within a condition, the participant is considered too fast.
				minRT : 150, //Not below this latency
				maxRT : 5000, //Not above this
				errorLatency : {use:"false", penalty:600, useForSTD:false}, //ignore error response
				postSettings : {url:"/implicit/scorer"}
			});

			var messageDefs = [
				{cut : -0.65, message : getFB(
					piCurrent.fb_strong_Att1WithCatA_Att2WithCatB, 
					objectCat1.name, objectCat2.name, attribute1.name, attribute2.name)}, 
				{cut : -0.35, message : getFB(
					piCurrent.fb_moderate_Att1WithCatA_Att2WithCatB, 
					objectCat1.name, objectCat2.name, attribute1.name, attribute2.name)}, 
				{cut : -0.15, message : getFB(
					piCurrent.fb_slight_Att1WithCatA_Att2WithCatB, 
					objectCat1.name, objectCat2.name, attribute1.name, attribute2.name)}, 
				{cut : 0.15, message : getFB(
					piCurrent.fb_equal_CatAvsCatB, 
					objectCat2.name, objectCat1.name, attribute2.name, attribute1.name)}, 
				{cut : 0.35, message : getFB(
					piCurrent.fb_slight_Att1WithCatA_Att2WithCatB, 
					objectCat2.name, objectCat1.name, attribute2.name, attribute1.name)}, 
				{cut : 0.65, message : getFB(
					piCurrent.fb_moderate_Att1WithCatA_Att2WithCatB, 
					objectCat2.name, objectCat1.name, attribute2.name, attribute1.name)}, 
				{cut : 1000, message : getFB(
					piCurrent.fb_strong_Att1WithCatA_Att2WithCatB, 
					objectCat2.name, objectCat1.name, attribute2.name, attribute1.name)}
			];

			scorer.addSettings('message',{
				MessageDef: messageDefs, 
				manyErrors : piCurrent.manyErrors,
				tooFast : piCurrent.tooFast,
				notEnough : piCurrent.notEnough			
			});
			
			return (scorer.computeD());
		}
			
		//What to do at the end of the task.
		API.addSettings('hooks',{
			endTask: function(){
			//Compute and send the score
			
			var scoreObj = computeFB();
			piCurrent.feedback = scoreObj.FBMsg;
			API.save({feedback : scoreObj.FBMsg, score : scoreObj.DScore, 
			    topCategory:objectCat1.name, leftAttribute:attribute1.name});
		}});

		return API.script;
	}

	return spfExtension;
});
