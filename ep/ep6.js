define(['pipAPI','pipScorer','underscore'], function(APIConstructor, Scorer, _) {

	/**
	You can modify most of what you need to modify in the settings 
	defined in epObj below. Or use an external script to call the epExtension function.
	**/

	/**
	Created by: Yoav Bar-Anan (baranan@gmail.com). 
	 * @param  {Object} options Options that replace the defaults...
	 * @return {Object}         PIP script
	**/

	function epExtension(options)
	{
		var API = new APIConstructor();
		var scorer = new Scorer();
		var piCurrent = API.getCurrent();

		//Here we set the settings of our task. Read the comments to learn what means.
		//You can also do that from the outside, with a dedicated jsp file.
		var epObj =
		{
			//The CSS for all the prime stimuli.
			primeStimulusCSS : {color:'#0000FF','font-size':'2.3em'},
			//The prime categories.
			primeCats :  [
				{
					name : 'prime1',  //Will be used in the logging
					//An array of all media objects for this category.
					mediaArray : [{word : 'prime1Stim1'}, {word : 'prime1Stim2'}]
				}, 
				{
					name : 'prime2', 
					mediaArray : [{word : 'prime2Stim2'}, {word : 'prime2Stim2'}]
				}
			],	
			//The two target categories.
			targetCats : {
				rightAttTargets: {
					name : 'Pleasant', 
					title : {
						media : {word : 'Pleasant'}, //Name of the attribute presented in the task.
						css : {color:'#0000FF','font-size':'3em'} //Style of the attribute title.
					}, 
					mediaArray : [
						{word: 'Paradise'},
						{word: 'Pleasure'},
						{word: 'Cheer'},
						{word: 'Friend'},
						{word: 'Splendid'},
						{word: 'Love'},
						{word: 'Glee'},
						{word: 'Smile'},
						{word: 'Enjoy'},
						{word: 'Delight'},
						{word: 'Beautiful'},
						{word: 'Attractive'},
						{word: 'Likeable'},
						{word: 'Wonderful'}
					], 
					stimulusCSS : {color:'#0000FF','font-size':'2em'}
				}, 
				leftAttTargets : {
					name : 'Unpleasant', 
					title : {
						media : {word : 'Unpleasant'}, //Name of the attribute presented in the task.
						css : {color:'#0000FF','font-size':'3em'} //Style of the attribute title.
					}, 
					mediaArray : [
						{word: 'Bomb'},
						{word: 'Abuse'},
						{word: 'Sadness'},
						{word: 'Pain'},
						{word: 'Poison'},
						{word: 'Grief'},
						{word: 'Ugly'},
						{word: 'Dirty'},
						{word: 'Stink'},
						{word: 'Noxious'},
						{word: 'Humiliate'},
						{word: 'Annoying'},
						{word: 'Disgusting'},
						{word: 'Offensive'}
					],
					stimulusCSS : {color:'#0000FF','font-size':'2em'}
				}
			},
			
			nTrialsPerPrimeTargetPair:15, //How many trials in a block, per prime-target combination (always three blocks).
			nBlocks : 3,
			
			//If separateStimulusSelection is 'complete', it means that for each prime-target combination, the program will exhuast all the prime-target stimulus combinations 
			//before repeating a stimulus-stimulus again combination again. 
			//If separateStimulusSelection is 'partial', it means that the program will select the prime and targe stimuli randomly without repetition for each prime-target combination until exhuastion
			//If separateStimulusSelection is 'none' it means that the program will select the stimuli randomly without repetition for the whole task.
			//
			//For example, if a prime category has the items A, B, and C = random selection without repetition will not select the same stimulus twice until the other stimuli are selected. 
			//If this parameter is set 'partial', after selecting the prime stimulus A with a target of the category 'positive', 'A' will not be selected again in trials with 'positive' targets, 
			//until B and C are also selected. However, 'A' might appear as prime for other target because their selection is separate. 
			//If this parameter is set to 'none', then 'A' will not be selected in any trial, until 'B' and 'C' are also selected.
			//If this parameter is set to 'complete', then 'partial' would apply, but, the selection would also make sure that no stimulus-stimulus 
			//combination will repeat within the same prime-target category combination, until all the other combinations have been selected.

			separateStimulusSelection : 'partial', 
			
			//Instructions template for each block. 
			//If you enter blockNum, nBlocks, posAttribute and negAttribute they will be replaced with 
			//the number of the current block, nBlocks, rightAttTargets.name and leftAttTargets.name
			instructions : {
				//Block 1
				firstBlock : '<div><p style="font-size:1.3em; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
				'Put your middle or index fingers on the <b>E</b> and <b>I</b> keys of your keyboard. ' + 
				'Pairs of items (words and images) will appear one after another. ' + 
				'For each pair of items, ignore the first item and categorize the second item as posAttribute'  + 
				' or negAttribute.<br/><br/>' + 
				'When the second item you see belongs to the category "negAttribute", press <b>E</b>; ' + 
				'when the item belongs to the category "posAttribute", press <b>I</b>. ' + 
				'If you make an error, an </color> <font color="#ff0000"><b>X</b></font> will appear.<br/><br/>' + 
				'This is a timed sorting task. <b>GO AS FAST AS YOU CAN</b> while making as few mistakes as possible.' + 
				'</color></p><p style="font-size:14px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
				'press SPACE to begin</p><p style="font-size:12px; text-align:center; font-family:arial">' + 
				'<color="000000">[Round 1 of nBlocks]</p></div>', 
				//Block 2
				middleBlock : '<div><p style="font-size:1.3em; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
				'Press SPACE to continue with the same task.<br/><br/>' + 
				'Ignore the first item and categorize the second item.<br/><br/>' + 
				'Press <b>E</b> if the second item is negAttribute.<br/>' + 
				'Press <b>I</b> if the second item is posAttribute.</p><br/><br/>' + 
				'<p style="font-size:12px; text-align:center; font-family:arial">' + 
				'<color="000000">[Round blockNum of nBlocks]</p></div>', 
				//Block 3
				lastBlock : '<div><p style="font-size:1.3em; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
				'This task can be a little exhausting. ' + 
				'Try to challenge yourself to respond as quickly as you can without making mistakes.<br/><br/>' + 
				'Press SPACE for the final round.</p><br/><br/>' + 
				'<p style="font-size:12px; text-align:center; font-family:arial">' + 
				'<color="000000">[Round nBlocks of nBlocks]</p></div>'
			},
			
			//The canvas object. 
			canvas : {
				maxWidth: 775,
				proportions : 0.85,
				background: '#ffffff',
				borderWidth: 5,
				canvasBackground: '#ffffff',
				borderColor: 'lightblue'
			}, 
			//Set the image folder here.
			base_url : {
				image : '/implicit/user/yba/pipexample/epmulti/images/'
			}, 
			primeDuration : 200, //Default prime duration
			fixationDuration : 0, //No fixation by default
			//Change the fixation stimulus here
			fixationStimulus : {
				css : {color:'black', 'font-size':'3em'}, 
				media : {word:'+'}
			}, 
			deadlineDuration : 0, //0 means no response deadline: we wait until response.
			//Change the deadline message stimulus here
			deadlineStimulus : {
				css : {color:'red', 'font-size':'2.5em'}, 
				media : {word:'!!!PLEASE RESPOND FASTER!!!'}, 
				location: {bottom:10}
			}, 
			deadlineMsgDuration : 750, 
			errorFBDuration : 750, 
			targetDuration : 0, //0 means until response.
			ITIDuration : 300, 
			
			//The task can show a mask at the end of the target, if the target duration is larger than 0.
			useMask : false, 
			maskStimulus : {
				css : {color:'black', 'font-size':'2.5em'}, 
				media : {word:'BBBBBBBB'}
			}, 

			//The feedback messages for each cutoff - 
			//You will get a comparison feedback for each 
			//pair, and also single feedback message for each category. 
			//The feedback variable names will be in the format of Cat1vsCat2_FB for comparisons, 
			// and Cat1_FB for single category feedback message.
			//CATEGORYA, and CATEGORYB will be replaced with the names of the relevant categories.
			fb_rightAttWithCatA_leftAttWithCatB : 'Your data suggest automatic preference of CATEGORYA over CATEGORYB.',
			fb_equal_CatAvsCatB : 'Your data suggest no preference between CATEGORYA and CATEGORYB.',
			//Feedback for each CATEGORY, separately. Notice that by default, attribute1 is the positive attribute. 
			//CATEGORY is the CATEGORY name. Can also use attribute1 and attribute2 to refer to attribute1.name and attribute2.name.
			fb_CatWithRightAtt : 'Your data suggest positive automatic evaluation of CATEGORY.',
			fb_catWithBoth : 'Your data suggest neutral automatic evaluation of CATEGORY.',
			fb_CatWithLeftAtt : 'Your data suggest negative automatic evaluation of CATEGORY.',
			
			//Error messages in the feedback
			manyErrors: 'There were too many errors made to determine a result.',
			tooFast: 'There were too many fast trials to determine a result.',
			notEnough: 'There were not enough trials to determine a result.'
		};
		
		// extend the current object with the default
		_.defaults(piCurrent, options, epObj);
	
		var primeCats = piCurrent.primeCats;
		var targetCats = piCurrent.targetCats;

		//Set the size of the screen
		API.addSettings('canvas',piCurrent.canvas);

		//the source of the images
		API.addSettings('base_url',piCurrent.base_url);

		//API.addGlobal({deadlineDuration:piCurrent.deadlineDuration});
		
		//Define the basic trial (the prsentation of the images and words)
		API.addTrialSets({
			basicTrial: [{
				data : {score:0},// by default each trial is crrect, this is modified in case of an error
				//Layout defines what will be presented in the trial. It is like a background display.
				layout: [
					{location:{left:2,top:1},media:{word:'key: e'}, css:{color:'#000000','font-size':'1em'}},
					{location:{right:2,top:1},media:{word:'key: i'}, css:{color:'#000000','font-size':'1em'}},
					{location:{left:2,top:4},media:targetCats.leftAttTargets.title.media, css:targetCats.leftAttTargets.title.css},
					{location:{right:2,top:4},media:targetCats.rightAttTargets.title.media, css:targetCats.rightAttTargets.title.css}
				],
				//Inputs for two possible responses.
				input: [
					{handle:'skip1',on:'keypressed', key:27} //hit esc-enter to skip blocks
				],
				//Set what to do.
				interactions: [
					{//If no fixation duration, then start with the prime
						conditions: [{type:'begin'}, {type:'currentEquals',property:'fixationDuration', value:0}],
						actions: [{type:'trigger', handle:'showPrime'}]
					},
					{//If fixation duration is not 0, then start with the fixation
						conditions: [
							{type:'begin'}, 
							{type:'currentEquals',property:'fixationDuration', value:0, negate:true}
						],
						actions: [
							{type:'showStim',handle:'fixation'},// display the fixation
							{type:'setInput',input:{handle:'fixationOut',on:'timeout',duration:piCurrent.fixationDuration}}
						]
					},
					{
						conditions: [{type:'inputEquals',value:'fixationOut'}], // fixation ended
						actions: [
							{type:'hideStim',handle:'fixation'},// hide fixation
							{type:'trigger', handle:'showPrime'}
						]
					},
					{
						conditions: [{type:'inputEquals',value:'showPrime'}], // show the prime stimulus
						actions: [
							{type:'showStim',handle:'primeStim'},// display the first stimulus
							{type:'setInput',input:{handle:'primeOut',on:'timeout', duration:piCurrent.primeDuration}}
						]
					},
					{
						conditions: [{type:'inputEquals',value:'primeOut'}], // on time out
						actions: [
							{type:'hideStim',handle:'primeStim'}, // hide the first stimulus
							{type:'showStim',handle:'targetStim'}, // and show the second one
							{type:'resetTimer'},
							//Set the possible key inputs.
							{type:'setInput',input:{handle:targetCats.leftAttTargets.name, on: 'keypressed', key:'e'}},
							{type:'setInput',input:{handle:targetCats.rightAttTargets.name, on: 'keypressed', key:'i'}},
							{type:'setInput',input:{handle:'hideTarget',on:'timeout', duration:piCurrent.targetDuration}},
							{type:'setInput',input:{handle:'targetTimeout',on:'timeout', duration:piCurrent.deadlineDuration}}
						]
					},
					{
						conditions: [
							{type:'inputEquals',value:'hideTarget'}, 
							{type:'currentEquals',property:'targetDuration', value:0, negate:true} //if deadline duration is 0, then there is no deadline.
						], // on time out
						actions: [
							{type:'hideStim',handle:'targetStim'}, // did not respond on time
							{type:'trigger', handle:'showMask'}
						]
					},
					{
						conditions: [
							{type:'inputEquals',value:'showMask'}, 
							{type:'currentEquals',property:'useMask', value:true} 
						], 
						actions: [
							{type:'showStim',handle:'mask'}
						]
					},
					{
						conditions: [
							{type:'inputEquals',value:'targetTimeout'}, 
							{type:'currentEquals',property:'deadlineDuration', value:0, negate:true} //if deadline duration is 0, then there is no deadline.
						], // on time out
						actions: [
							{type:'showStim',handle:'deadline'}, // did not respond on time
							{type:'setTrialAttr', setter:{score:2}}, //2 is for timeout
							{type:'log'}, // here we call the log action. 
							{type:'removeInput', handle:'All'},
							{type:'trigger', handle:'goBlank', duration:piCurrent.deadlineMsgDuration}
						]
					},
					// Handle correct response: when the reponse equals the category of the target word?
					{
						conditions: [
							{type:'inputEqualsStim',property:'wordCategory'}],
						actions: [
                            {type:'removeInput', handle:'All'},
							{type:'log'}, // here we call the log action. This is because we want to record the latency of this input (the latency of the response)
							{type:'trigger', handle:'goBlank'}
						]
					},

					// handle incorrect response.
					{
						conditions: [
							{type:'inputEqualsStim',property:'wordCategory', negate:true},
							{type:'inputEquals',value:[targetCats.rightAttTargets.name,targetCats.leftAttTargets.name]} //Pressed one of the keys.
						],
						actions: [
                            {type:'removeInput', handle:'All'},
							{type:'setTrialAttr', setter:{score:1}}, //1 for incorrect response
							{type:'log'}, // here we call the log action. This is because we want to record the latency of this input (the latency of the response)
							{type:'showStim',handle:'errorFB'}, //show error feedback
							{type:'setInput',input:{handle:'goBlank', on:'timeout',duration:piCurrent.errorFBDuration}} //End the trial in 250ms (show the x until then)
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

		function inheritBasic(inPrimeCat, inTargetCat)
		{
		    if (piCurrent.separateStimulusSelection == 'complete')
		    {
		        return(inheritBasic2(inPrimeCat, inTargetCat));
		    }
		    else
		    {
		        var inPrimeCatName = inPrimeCat.name;
		        var inTargetCatName = inTargetCat.name;
    		    var cond = inPrimeCat + "/" + inTargetCat;
    			return ({
    				data: {condition: cond},
    				inherit:{set: 'basicTrial'},
    				stimuli: [
                        {//The prime stimulus
    			        	data : {alias:inPrimeCatName, handle:'primeStim'},
    				        inherit:'Default',
    				        media: {inherit: piCurrent.separateStimulusSelection=='partial' ? //Should we select the prime stimulus for each target category separately?
    				        {type:'exRandom', set:inPrimeCatName, seed:cond+'p'} : {type:'exRandom', set:inPrimeCatName} }, //Inherit the prime media items for each condition, separately.
    				        css : piCurrent.primeStimulusCSS
    			        },
                		{
                			data : {wordCategory:inTargetCatName, alias:inTargetCatName, handle:'targetStim'},
                			inherit:'Default',
    				        media: {inherit: piCurrent.separateStimulusSelection=='partial' ? //Should we select the target stimulus for each target category separately?
    				        {type:'exRandom', set:inTargetCatName, seed:cond+'t'} : {type:'exRandom', set:inTargetCatName} }, //Inherit the prime media items for each condition, separately.
                			css : inTargetCat.stimulusCSS
                		},					
                		{ inherit: 'fixation', data : {handle:'fixation'}, nolog: true},
    					{ inherit: 'errorFB', nolog: true},
    					{ inherit: 'deadline', data : {handle:'deadline'}, nolog: true},
    					{ inherit: 'mask', data : {handle:'mask'}, nolog: true},
    					{ inherit: 'blankScreen', nolog: true}
    				]
    			});
		    }
		}
		
		//Create an array of all the prime-target media combinations
		function inheritBasic2(inPrimeCat, inTargetCat)
		{
		    var cond = inPrimeCat.name + "/" + inTargetCat.name;
		    var basicTrial = {
				data: {condition: cond},
				inherit:{set: 'basicTrial'},
				stimuli: [
                    {//The prime stimulus
			        	data : {alias:inPrimeCat.name, handle:'primeStim'},
				        inherit:'Default',
				        css : piCurrent.primeStimulusCSS
			        },
            		{
            			data : {wordCategory:inTargetCat.name, alias:inTargetCat.name, handle:'targetStim'},
            			inherit:'Default',
            			css : inTargetCat.stimulusCSS
            		},					
            		{ inherit: 'fixation', data : {handle:'fixation'}, nolog: true},
					{ inherit: 'errorFB', nolog: true},
					{ inherit: 'deadline', data : {handle:'deadline'}, nolog: true},
					{ inherit: 'mask', data : {handle:'mask'}, nolog: true},
					{ inherit: 'blankScreen', nolog: true}
				]
			};
			//Now add one basic trial for each prime-target media combination.
			var iPrimeMedia, iTargetMedia;
			var trials = [];
		    for (iPrimeMedia = 0; iPrimeMedia < inPrimeCat.mediaArray.length; iPrimeMedia++)
		    {
    		    for (iTargetMedia = 0; iTargetMedia < inTargetCat.mediaArray.length; iTargetMedia++)
    		    {
    		        var newTrial = JSON.parse(JSON.stringify(basicTrial));
    		        newTrial.stimuli[0].media = inPrimeCat.mediaArray[iPrimeMedia];
    		        newTrial.stimuli[1].media = inTargetCat.mediaArray[iTargetMedia];
    		        trials.push(newTrial);
    		    }
		    }
			return (trials);
		}

		//Create a few of the basic stimuli
		API.addStimulusSets({
		//These are the different types of stimuli.
			// This Default stimulus is inherited by the other stimuli so that we can have a consistent look and change it from one place
			Default: [
				{css:piCurrent.primeStimulusCSS}
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
			fixation : [//fixation stimulus
				piCurrent.fixationStimulus
			],
			deadline : [//deadline stimulus
				piCurrent.deadlineStimulus
			],
			mask : [//deadline stimulus
				piCurrent.maskStimulus
			],
			blankScreen : [//blankScreen  stimulus (in between the trials)
				{
					data : {handle:'blankScreen'},
					media: {word:' '},//can be replace with '+'
					nolog:true
				}
			]
		});

		//Use the basic trial to create all the prime-target trial types, their stimulus sets, media sets, and a trial set that includes all of them.
		var sortingTrialsArray = [];
		for (var iCat=0; iCat < primeCats.length; iCat++)
		{
			//API.addTrialSets(primeCats[iCat].name+ '+' + targetCats.rightAttTargets.name,[inheritBasic(primeCats[iCat].name, targetCats.rightAttTargets.name)]);
			API.addTrialSets(primeCats[iCat].name+ '+' + targetCats.rightAttTargets.name, inheritBasic(primeCats[iCat], targetCats.rightAttTargets)); 
			sortingTrialsArray.push({inherit:{set:primeCats[iCat].name+ '+' + targetCats.rightAttTargets.name, type:'exRandom'}});
			//API.addTrialSets(primeCats[iCat].name+ '+' + targetCats.leftAttTargets.name,[inheritBasic(primeCats[iCat].name, targetCats.leftAttTargets.name)]);
			API.addTrialSets(primeCats[iCat].name+ '+' + targetCats.leftAttTargets.name,inheritBasic(primeCats[iCat], targetCats.leftAttTargets)); 
			sortingTrialsArray.push({inherit:{set:primeCats[iCat].name+ '+' + targetCats.leftAttTargets.name, type:'exRandom'}});
			API.addMediaSets(primeCats[iCat].name, primeCats[iCat].mediaArray);
		}

		API.addMediaSets(targetCats.rightAttTargets.name, targetCats.rightAttTargets.mediaArray);
		API.addMediaSets(targetCats.leftAttTargets.name, targetCats.leftAttTargets.mediaArray);

		API.addTrialSets('sortingTrial', sortingTrialsArray);
		
		//Define the instructions trial
		API.addTrialSets('inst',{
			input: [
				{handle:'space',on:'space'} //Will handle a SPACEBAR reponse
			],
			layout: [
				{location:{left:2,top:1},media:{word:'key: e'}, css:{color:'#000000','font-size':'1em'}},
				{location:{right:2,top:1},media:{word:'key: i'}, css:{color:'#000000','font-size':'1em'}},
				{location:{left:2,top:4},media:targetCats.leftAttTargets.title.media, css:targetCats.leftAttTargets.title.css},
				{location:{right:2,top:4},media:targetCats.rightAttTargets.title.media, css:targetCats.rightAttTargets.title.css}
			],
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
		/***    SEQUENCE   ***/
		/*********************/
		
		//Helper to prepare the instructions html.
		function getInstHTML(inText, inBlock)
		{
			var retText = inText.replace(/blockNum/g, inBlock);
			retText = retText.replace(/nBlocks/g, piCurrent.nBlocks);
			retText = retText.replace(/negAttribute/g, targetCats.leftAttTargets.name);
			retText = retText.replace(/posAttribute/g, targetCats.rightAttTargets.name);
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
							location:{bottom:1, left:1}
						}
					]
				},
				{ //The sorting trials
					mixer: 'repeat',
					times : piCurrent.nTrialsPerPrimeTargetPair*primeCats.length*2, 
					data : [{inherit: {set: 'sortingTrial',type:'exRandom'}, data:{block:iBlock}}]
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
						media:{html:'<div><p style="font-size:28px;text-align:center;"><color="#000000">' + 
						'You have completed this task<br/><br/>Press SPACE to continue.</p></div>'},
						size:{width:100}
					}
				]
			}
		);
		API.addSequence(theSequence);

		function computeFB(inPrimeCatName)
		{
			//the Scorer that compute the user feedback
			scorer.addSettings('compute',{
				ErrorVar:'score',
				condVar:"condition",
				cond1VarValues: [inPrimeCatName + "/" + targetCats.leftAttTargets.name], //scoring condition 1
				cond2VarValues: [inPrimeCatName + "/" + targetCats.rightAttTargets.name], //scoring condition 2
				fastRT : 150, //Below this reaction time, the latency is considered extremely fast.
				maxFastTrialsRate : 0.1, //Above this % of extremely fast responses within a condition, the participant is considered too fast.
				minRT : 150, //Not below this latency
				maxRT : 5000, //Not above this
				errorLatency : {use:"false", penalty:600, useForSTD:false}, //ignore error response
				postSettings : {url:"/implicit/scorer"}
			});

			//Feedback for each CATEGORY, separately. Notice that by default, attribute1 is the positive attribute. 
			//CATEGORY is the CATEGORY name. Can also use attribute1 and attribute2 to refer to attribute1.name and attribute2.name.
			scorer.addSettings('message',{
				MessageDef: [
					{ cut:'-0.2', message:piCurrent.fb_CatWithLeftAtt.replace(/CATEGORY/g, inPrimeCatName)}, //D < -0.2
					{ cut:'0.2', message:piCurrent.fb_catWithBoth.replace(/CATEGORY/g, inPrimeCatName) },// -0.2 <= D <= 0.2
					{ cut:'105', message:piCurrent.fb_CatWithRightAtt.replace(/CATEGORY/g, inPrimeCatName) }// D > 0.2 (and D<=105)
				],
				manyErrors : piCurrent.manyErrors,
				tooFast : piCurrent.tooFast,
				notEnough : piCurrent.notEnough		
			});
			
			var scored = scorer.computeD();
			scored.problem = (
				scored.FBMsg == piCurrent.manyErrors || 
				scored.FBMsg == piCurrent.tooFast || 
				scored.FBMsg == piCurrent.notEnough);

			return (scored);
		}
		//Helper to replace text in the feedback messages
		function replaceCats(inText, catAname, catBname)
		{
			var retText= inText.replace(/CATEGORYA/g, catAname);  
			retText = retText.replace(/CATEGORYB/g, catBname);
			return(retText);
		}
		function getPreferenceMessage(params)
		{//params: score1, score2, name1, name2
			var message = replaceCats(piCurrent.fb_equal_CatAvsCatB, params.name1, params.name2);
			var diffScore = params.score2 - params.score1;
			if (diffScore > 0.2)
			{
				message = replaceCats(piCurrent.fb_rightAttWithCatA_leftAttWithCatB, params.name2, params.name1);
			}
			else if (diffScore < -0.2)
			{
				message = replaceCats(piCurrent.fb_rightAttWithCatA_leftAttWithCatB, params.name1, params.name2);
			}
			return({fb:message, score:diffScore});
		}
		
		//What to do at the end of the task.
		API.addSettings('hooks',{
			endTask: function(){
				//Compute and send the score
				
				var scoreObj = {};
				var savedFeedback = false;
				for (var iCat = 0; iCat < primeCats.length; iCat++)
				{
					var tScoreObj = computeFB(primeCats[iCat].name);
					var catName = primeCats[iCat].name.replace(/\s+/g, ''); //Remove white space from the name.
					scoreObj[catName + '_FB'] = tScoreObj.FBMsg;
					scoreObj[catName + '_score'] = tScoreObj.DScore;
					for (var iOtherCat = 0; iOtherCat < iCat; iOtherCat++) //All the comparisons.
					{
						//console.log('iOtherCat=' + iOtherCat + ' iCat=' + iCat);
						var otherCatName = primeCats[iOtherCat].name.replace(/\s+/g, ''); //Remove white space from the name.
						var prfObj = {};
						if (tScoreObj.problem)
						{//If couldn't compute a score for this category, then can't compute preference
							prfObj = {fb : tScoreObj.FBMsg, score : -9};
						}
						else
						{//Compute preference
							prfObj = getPreferenceMessage({
								score1 : scoreObj[catName + '_score'], 
								score2 : scoreObj[otherCatName + '_score'], 
								name1 : primeCats[iCat].name, 
								name2 : primeCats[iOtherCat].name});
						}
						//console.log(primeCats[iOtherCat].name + '-versus-' + primeCats[iCat].name + '_FB=' + prfObj.fb);
						scoreObj[otherCatName + '-versus-' + catName + '_FB'] = prfObj.fb;
						scoreObj[otherCatName + '-versus-' + catName + '_score'] = prfObj.score;
						if (!savedFeedback)
						{//Save the first two categories compared as the general feedback of this task (for the session only).
							savedFeedback = true;
							piCurrent.feedback = prfObj.fb;
						}
					}
				}
				//Save all those scores for the session data.
				piCurrent.scoreObj = scoreObj;
				//Record also in the database.
				API.save(scoreObj);
			}
		});
		
		return API.script;
	}
	
	return epExtension;
});


