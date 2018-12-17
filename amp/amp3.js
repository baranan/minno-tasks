define(['pipAPI','underscore'], function(APIConstructor, _) {
	/**
	You can modify most of what you need to modify in the settings 
	defined in epObj below. Or use an external script to call the epExtension function.
	**/

	/**
	Created by: Yoav Bar-Anan (baranan@gmail.com). 
	 * @param  {Object} options Options that replace the defaults...
	 * @return {Object}         PIP script
	**/

	function ampExtension(options)
	{
		var API = new APIConstructor();
		var piCurrent = API.getCurrent();

		//Here we set the settings of our task. Read the comments to learn what means.
		//You can also do that from the outside, with a dedicated jsp file.
		var ampObj = 
		{
			//Set the canvas of the task
			canvas : {
				maxWidth: 700,
				proportions : 0.85,
				background: '#ffffff',
				borderWidth: 5,
				canvasBackground: '#ffffff',
				borderColor: 'lightblue'
			}, 
			//The CSS for all the prime stimuli.
			primeStimulusCSS : {color:'#0000FF','font-size':'2.3em'},
			//The prime categories.
			primeCats :  [
				{
					nameForFeedback : 'positive words',  //Will be used in the user feedback 
					nameForLogging : 'positive', //Will be used in the logging
					//An array of all media objects for this category.
					mediaArray : [{word : 'Wonderful'}, {word : 'Great'}]
				}, 
				{
					nameForFeedback : 'negative words',  //Will be used in the user feedback 
					nameForLogging : 'negative', //Will be used in the logging
					mediaArray : [{word : 'Awful'}, {word : 'Horrible'}]
				}
			],
			examplePrimeStimulus : 
			{
				nameForLogging : 'examplePrime', //Will be used in the logging
				//An array of all media objects for this category.
				mediaArray : [{word : 'Table'}, {word : 'Chair'}]
			},
			//The CSS for all the target stimuli (usually irrelevant because the targets are Chinese pictographs.
			targetStimulusCSS : {color:'#0000FF','font-size':'2.3em'},
			//The prime categories.
			targetCats :  [
				{
					nameForLogging : 'chinese',  //Will be used in the logging
					//An array of all media objects for this category. The default is pic1-pic200.jpg
					mediaArray : [
						{image : 'pic1.jpg'}, {image : 'pic2.jpg'}, {image : 'pic3.jpg'}, {image : 'pic4.jpg'}, {image : 'pic5.jpg'}, {image : 'pic6.jpg'}, {image : 'pic7.jpg'}, {image : 'pic8.jpg'}, {image : 'pic9.jpg'}, 
						{image : 'pic10.jpg'}, {image : 'pic11.jpg'}, {image : 'pic12.jpg'}, {image : 'pic13.jpg'}, {image : 'pic14.jpg'}, {image : 'pic15.jpg'}, {image : 'pic16.jpg'}, {image : 'pic17.jpg'}, {image : 'pic18.jpg'}, {image : 'pic19.jpg'}, 
						{image : 'pic20.jpg'}, {image : 'pic21.jpg'}, {image : 'pic22.jpg'}, {image : 'pic23.jpg'}, {image : 'pic24.jpg'}, {image : 'pic25.jpg'}, {image : 'pic26.jpg'}, {image : 'pic27.jpg'}, {image : 'pic28.jpg'}, {image : 'pic29.jpg'}, 
						{image : 'pic30.jpg'}, {image : 'pic31.jpg'}, {image : 'pic32.jpg'}, {image : 'pic33.jpg'}, {image : 'pic34.jpg'}, {image : 'pic35.jpg'}, {image : 'pic36.jpg'}, {image : 'pic37.jpg'}, {image : 'pic38.jpg'}, {image : 'pic39.jpg'}, 
						{image : 'pic40.jpg'}, {image : 'pic41.jpg'}, {image : 'pic42.jpg'}, {image : 'pic43.jpg'}, {image : 'pic44.jpg'}, {image : 'pic45.jpg'}, {image : 'pic46.jpg'}, {image : 'pic47.jpg'}, {image : 'pic48.jpg'}, {image : 'pic49.jpg'}, 
						{image : 'pic50.jpg'}, {image : 'pic51.jpg'}, {image : 'pic52.jpg'}, {image : 'pic53.jpg'}, {image : 'pic54.jpg'}, {image : 'pic55.jpg'}, {image : 'pic56.jpg'}, {image : 'pic57.jpg'}, {image : 'pic58.jpg'}, {image : 'pic59.jpg'}, 
						{image : 'pic60.jpg'}, {image : 'pic61.jpg'}, {image : 'pic62.jpg'}, {image : 'pic63.jpg'}, {image : 'pic64.jpg'}, {image : 'pic65.jpg'}, {image : 'pic66.jpg'}, {image : 'pic67.jpg'}, {image : 'pic68.jpg'}, {image : 'pic69.jpg'}, 
						{image : 'pic70.jpg'}, {image : 'pic71.jpg'}, {image : 'pic72.jpg'}, {image : 'pic73.jpg'}, {image : 'pic74.jpg'}, {image : 'pic75.jpg'}, {image : 'pic76.jpg'}, {image : 'pic77.jpg'}, {image : 'pic78.jpg'}, {image : 'pic79.jpg'}, 
						{image : 'pic80.jpg'}, {image : 'pic81.jpg'}, {image : 'pic82.jpg'}, {image : 'pic83.jpg'}, {image : 'pic84.jpg'}, {image : 'pic85.jpg'}, {image : 'pic86.jpg'}, {image : 'pic87.jpg'}, {image : 'pic88.jpg'}, {image : 'pic89.jpg'}, 
						{image : 'pic90.jpg'}, {image : 'pic91.jpg'}, {image : 'pic92.jpg'}, {image : 'pic93.jpg'}, {image : 'pic94.jpg'}, {image : 'pic95.jpg'}, {image : 'pic96.jpg'}, {image : 'pic97.jpg'}, {image : 'pic98.jpg'}, {image : 'pic99.jpg'}, 
						{image : 'pic110.jpg'}, {image : 'pic111.jpg'}, {image : 'pic112.jpg'}, {image : 'pic113.jpg'}, {image : 'pic114.jpg'}, {image : 'pic115.jpg'}, {image : 'pic116.jpg'}, {image : 'pic117.jpg'}, {image : 'pic118.jpg'}, {image : 'pic119.jpg'}, 
						{image : 'pic120.jpg'}, {image : 'pic121.jpg'}, {image : 'pic122.jpg'}, {image : 'pic123.jpg'}, {image : 'pic124.jpg'}, {image : 'pic125.jpg'}, {image : 'pic126.jpg'}, {image : 'pic127.jpg'}, {image : 'pic128.jpg'}, {image : 'pic129.jpg'}, 
						{image : 'pic130.jpg'}, {image : 'pic131.jpg'}, {image : 'pic132.jpg'}, {image : 'pic133.jpg'}, {image : 'pic134.jpg'}, {image : 'pic135.jpg'}, {image : 'pic136.jpg'}, {image : 'pic137.jpg'}, {image : 'pic138.jpg'}, {image : 'pic139.jpg'}, 
						{image : 'pic140.jpg'}, {image : 'pic141.jpg'}, {image : 'pic142.jpg'}, {image : 'pic143.jpg'}, {image : 'pic144.jpg'}, {image : 'pic145.jpg'}, {image : 'pic146.jpg'}, {image : 'pic147.jpg'}, {image : 'pic148.jpg'}, {image : 'pic149.jpg'}, 
						{image : 'pic150.jpg'}, {image : 'pic151.jpg'}, {image : 'pic152.jpg'}, {image : 'pic153.jpg'}, {image : 'pic154.jpg'}, {image : 'pic155.jpg'}, {image : 'pic156.jpg'}, {image : 'pic157.jpg'}, {image : 'pic158.jpg'}, {image : 'pic159.jpg'}, 
						{image : 'pic160.jpg'}, {image : 'pic161.jpg'}, {image : 'pic162.jpg'}, {image : 'pic163.jpg'}, {image : 'pic164.jpg'}, {image : 'pic165.jpg'}, {image : 'pic166.jpg'}, {image : 'pic167.jpg'}, {image : 'pic168.jpg'}, {image : 'pic169.jpg'}, 
						{image : 'pic170.jpg'}, {image : 'pic171.jpg'}, {image : 'pic172.jpg'}, {image : 'pic173.jpg'}, {image : 'pic174.jpg'}, {image : 'pic175.jpg'}, {image : 'pic176.jpg'}, {image : 'pic177.jpg'}, {image : 'pic178.jpg'}, {image : 'pic179.jpg'}, 
						{image : 'pic180.jpg'}, {image : 'pic181.jpg'}, {image : 'pic182.jpg'}, {image : 'pic183.jpg'}, {image : 'pic184.jpg'}, {image : 'pic185.jpg'}, {image : 'pic186.jpg'}, {image : 'pic187.jpg'}, {image : 'pic188.jpg'}, {image : 'pic189.jpg'}, 
						{image : 'pic190.jpg'}, {image : 'pic191.jpg'}, {image : 'pic192.jpg'}, {image : 'pic193.jpg'}, {image : 'pic194.jpg'}, {image : 'pic195.jpg'}, {image : 'pic196.jpg'}, {image : 'pic197.jpg'}, {image : 'pic198.jpg'}, {image : 'pic199.jpg'}, 
						{image : 'pic200.jpg'}
					]
				}
			],
			exampleTargetStimulus : 
			{
				nameForLogging : 'exampleTarget', //Will be used in the logging
				sameAsTargets : true //Use the same media array as the first targetCat.
			},
			
			//The fixation stimulus 
			fixationStimulus : {
				css : {color:'#000000', 'font-size':'3em'}, 
				media : {word:'+'}
			}, 
			//The fixation stimulus in the example block
			exampleFixationStimulus : {
				css : {color:'000000', 'font-size':'3em'}, 
				media : {word:'+'}
			}, 
			//The mask stimulus in the example block
			exampleMaskStimulus : {
				css : {color:'000000', 'font-size':'3em'}, 
				media : {image:'ampmaskr.jpg'}
			}, 
			//The mask stimulus 
			maskStimulus : {
				css : {color:'000000', 'font-size':'3em'}, 
				media : {image:'ampmask.jpg'}
			}, 
			
			
			sortingLabel1 : 'Pleasant', //Response is coded as 0. 
			sortingLabel2 : 'Unpleasant',  //Response is coded as 1.
			randomizeLabelSides : false, //IF false, then label1 is on the left, and label2 is on the right.

			//The default font color of text in the task (e.g., for key labels).
			fontColor : '#000000', 

			rightKey : 'i', 
			leftKey : 'e', 
			
			base_url : {//Where are your images at?
				image : '/implicit/common/all/js/pip/piscripts/amp/images/'
			}, 

			trialsInBlock : [40, 40, 40], //Number of trials in each block 
			trialsInExample : 3, //Change to 0 if you don't want an example block
			
			//Duration parameters.
			fixationDuration : -1, //It means that by default we do not use fixation.
			primeDuration : 100, 
			postPrimeDuration : 100, //Duration of blank screen between prime and target.
			targetDuration : 100, //Duration of target presentation.
			ITI : 250, //Duration between trials.
			
			//For the example block (often practice)
			exampleBlock_fixationDuration : -1, 
			exampleBlock_primeDuration : 100, 
			exampleBlock_postPrimeDuration : 100, 
			exampleBlock_targetDuration : 300, 
			
			//Instructions text.
			exampleBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
			'Press the key <B>rightKey</B> if the Chinese symbol is more rightAttribute than average. ' + 
			'Hit the <b>leftKey</b> key if it is more leftAttribute than average.<br/><br/>' + 
			'The items appear and disappear quickly.  ' + 
			'Remember to ignore the item that appears before the Chinese symbol and evaluate only the Chinese symbol.<br/><br/></p>'  + 
			'<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
			'When you are ready to try a few practice responses, hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial">' + 
			'<color="000000">[Round 1 of nBlocks]</p></div>',
			firstBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
			"See how fast it is? Don't worry if you miss some. " + 
			'Go with your gut feelings.<br/><br/>' + 
			'Concentrate on each Chinese symbol and rate it as more rightAttribute than the average Chinese symbol with the <b>rightKey</b> key, ' + 
			'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
			'Evaluate each Chinese symbol and not the item that appears before it. ' + 
			'Those items are sometimes distracting.<br/><br/>' + 
			'<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial">' + 
			'<color="000000">[Round 2 of nBlocks]</p></div>',
			middleBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
			'Continue to another round of this task. ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on the Chinese symbol and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' + 
			'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
			'Evaluate each Chinese symbol and not the item that appears before it. ' + 
			'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' + 
			'<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial">' + 
			'<color="000000">[Round blockNum of nBlocks]</p></div>',
			lastBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
			'Ready for the FINAL round? ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on the Chinese symbol and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' + 
			'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
			'Evaluate each Chinese symbol and not the item that appears before it. ' + 
			'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' + 
			'<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial">' + 
			'<color="000000">[Round blockNum of nBlocks]</p></div>',
			endText: '<div><p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial"><color="FFFFFF">'+
			'You have completed the task<br/><br/>Press "space" to continue to next task.</p></div>', 
			
			//The feedback messages:
			//The task will save a "feedback" variable that details the number of each type of responses after primes of each category. 
			//And also "result" that will construct a preference message, based on those numbers.
			//In the text you provide below, CATEGORYA, and CATEGORYB will be replaced with the names of the relevant categories.
			fb_att2WithCatA_att1withCatB : 'Your data suggest an automatic preference of CATEGORYA over CATEGORYB.',
			fb_equal_CatAvsCatB : 'Your data suggest no preference between CATEGORYA and CATEGORYB.'
		};

		// extend the current object with the default
		_.defaults(piCurrent, options, ampObj);
		piCurrent.nBlocks = piCurrent.trialsInBlock.length;
		if (piCurrent.trialsInExample > 0)
		{
			piCurrent.nBlocks++;
		}

		//Set the size of the screen
		API.addSettings('canvas',piCurrent.canvas);
		// from where to take the images
		//the source of the images
		API.addSettings('base_url',piCurrent.base_url);

		API.addGlobal({
			deadlineDuration:piCurrent.deadlineDuration
		});

		var rightSortingLabel = piCurrent.sortingLabel1; 
		var leftSortingLabel = piCurrent.sortingLabel2; 
		if (piCurrent.randomizeLabelSides && Math.random() < 0.5)
		{
			rightSortingLabel = piCurrent.sortingLabel2;
			leftSortingLabel = piCurrent.sortingLabel1;
		}
		
		var layout = [
				{location:{left:2,top:2},media:{word:'key: '+ piCurrent.leftKey.toUpperCase()}, css:{color:piCurrent.fontColor,'font-size':'1em'}},
				{location:{right:2,top:2},media:{word:'key: ' + piCurrent.rightKey.toUpperCase()},  css:{color:piCurrent.fontColor,'font-size':'1em'}},
				{location:{left:2,top:5},media:{word:leftSortingLabel}, css:{color:piCurrent.targetStimulusCSS.color,'font-size':'2em'}},
				{location:{right:2,top:5},media:{word:rightSortingLabel},  css:{color:piCurrent.targetStimulusCSS.color,'font-size':'2em'}}
			];
			
		API.addTrialSets('basicSort', 
		{
			deepTemplate: ['interactions'],
			data : {
				fixationDuration: piCurrent.fixationDuration, 
				postFixationDuration: piCurrent.postFixationDuration, 
				primeDuration: piCurrent.primeDuration, 
				postPrimeDuration: piCurrent.postPrimeDuration, 
				targetDuration: piCurrent.targetDuration, 
				ITI: piCurrent.ITI, 
				condition: 'basic', 
				useFixation : (piCurrent.fixationDuration > 0),
				block:0
			},
			layout: layout,
			input: [
				{handle:'skip1',on:'keypressed', key:27} //hit esc-enter to skip blocks
			],
			//Set what to do.
			interactions: [
				{
					conditions: [{type:'begin'}, 
					{type:'trialEquals',property:'useFixation', value:true}], // show fixation
					actions: [
						{type:'showStim',handle:'fixationStim'}, // show fixation
						{type:'trigger',handle:'showPrime',duration:'<%=trialData.fixationDuration%>'} //until prime
					]
				},
				{
					conditions: [{type:'begin'}, 
					{type:'trialEquals',property:'useFixation', value:false}], //No fixation, show prime
					actions: [
						{type:'trigger',handle:'showPrime'} //Call the actions of showing primes
					]
				},
				{
					conditions: [{type:'inputEquals',value:'showPrime'}], // prime display duration finished
					actions: [
						{type:'hideStim',handle:'All'}, // hide the previous stimuli
						{type:'showStim',handle:'primeStim'}, // show the prime stimulus
						{type:'trigger',handle:'primeOut',duration:'<%=trialData.primeDuration%>'} 
					]
				},
				{
					conditions: [{type:'inputEquals',value:'primeOut'}], // prime display duration finished
					actions: [
						{type:'hideStim',handle:'primeStim'}, // hide the prime stimulus
						{type:'trigger',handle:'blankOut', duration:'<%=trialData.postPrimeDuration%>'} 
					]
				},
				{
					conditions: [{type:'inputEquals',value:'blankOut'}], // after blank screen
					actions: [
						{type:'showStim',handle:'targetStim'}, // and show the target stimulus
						// reset timer so that latency is measured from this point in time
						{type:'resetTimer'},
						//Add keyboard input
						{type:'setInput',input:{handle:leftSortingLabel,on: 'keypressed', key:piCurrent.leftKey}},
						{type:'setInput',input:{handle:rightSortingLabel,on: 'keypressed', key:piCurrent.rightKey}},
						//Deadline for the display of the target
						{type:'trigger',handle:'targetOut',duration:'<%=trialData.targetDuration%>'}
					]
				},
				{
					conditions: [{type:'inputEquals',value:'targetOut'}], // display duration has passed
					actions: [
						{type:'hideStim',handle:'targetStim'}, // hide the target stimulus
						{type:'showStim',handle:'maskStim'} // show the mask screen. 
						//We keep on waiting for a response
					]
				},

				// skip block -> if you press 'b' after pressing 'y'.
				{
					conditions: [{type:'inputEquals',value:'skip1'}],
					actions: [
						{type:'setInput',input:{handle:'skip2', on:'enter'}} // allow skipping if next key is enter.
					]
				},
				// skip block -> if you press 'b' after pressing 'y'.
				{
					conditions: [{type:'inputEquals',value:'skip2'}],
					actions: [
						{type:'goto', destination: 'nextWhere', properties: {blockStart:true}},
						{type:'endTrial'}
					]
				},

				{//What to do upon response
				//the  proposition: dont remove the mask upon timeout, wait until reaction
					conditions: [{type:'inputEquals',value:piCurrent.sortingLabel2}], //responded with category1 (e.g., pleasant)
					actions: [
						{type:'setTrialAttr',setter:{score:'1'}}, //there is no right and wrong response in the AMP, so we code category1 as 1, and category2 as 0.
						{type:'hideStim',handle:'All'}, //Hide all stimuli
						{type:'removeInput', handle:'All'}, //only one response is possible
						//The player sends the value of score to the server, when you call the 'log' action
						{type:'log'}, // here we call the log action. This is because we want to record the latency of this input (the latency of the response)
						{type:'setInput',input:{handle:'endTrial',on:'timeout',duration:'<%=trialData.ITI%>'}}//end the trial 250ms after the response
					]
				},
				{
					conditions: [{type:'inputEquals',value:piCurrent.sortingLabel1}], //responded with category1 (e.g., unpleasant).
					actions: [
						{type:'setTrialAttr',setter:{score:'0'}}, //there is no right and wrong response in the AMP, so we code category1 as 1, and category2 as 0.
						{type:'hideStim', handle:'All'},
						{type:'removeInput',handle:'All'}, //only one response is possible
						{type:'log'}, //Time to log the trial
						{type:'setInput',input:{handle:'endTrial',on:'timeout',duration:'<%=trialData.ITI%>'}}
					]
				},
				{
					conditions: [{type:'inputEquals',value:'endTrial'}], //What to do when endTrial is called.
					actions: [{type:'endTrial'}]
				}
			]
		});

		/*
		*Add all the relevant trial sets.
		*/
		//The example trial
		var exTargetStimName = 'exTargetStim';
		if (piCurrent.exampleTargetStimulus.sameAsTargets)
		{
			exTargetStimName = piCurrent.targetCats[0].nameForLogging;
		}
		API.addTrialSets('exampleSort', 
		{
			inherit : {set:'basicSort'},
			data : {
				fixationDuration:piCurrent.exampleBlock_fixationDuration, 
				primeDuration:piCurrent.exampleBlock_primeDuration, 
				postPrimeDuration:piCurrent.exampleBlock_postPrimeDuration, 
				targetDuration:piCurrent.exampleBlock_targetDuration, 
				ITI:piCurrent.ITI, 
				useFixation : (piCurrent.exampleBlock_fixationDuration > 0)
			}, 
			stimuli : [
				{inherit:'exFixationStim'}, {inherit:'exMaskStim'}, 
				{inherit:{set:'exPrimeStim', type:'exRandom'}}, 
				{inherit:{set:exTargetStimName, type:'exRandom'}}
			]
		});
		
		//A trial for each prime-category combination.
		var iPrimeCat, iTargetCat, targetName, primeName;
		var allTrials = [];
		for (iPrimeCat = 0; iPrimeCat < piCurrent.primeCats.length; iPrimeCat++)
		{
			primeName = piCurrent.primeCats[iPrimeCat].nameForLogging;
			for (iTargetCat = 0; iTargetCat < piCurrent.targetCats.length; iTargetCat++)
			{
				targetName = piCurrent.targetCats[iTargetCat].nameForLogging;
				API.addTrialSets(primeName+targetName, 
				{
					inherit : {set:'basicSort'},
					data : {
						fixationDuration:piCurrent.fixationDuration, 
						primeDuration:piCurrent.primeDuration, 
						postPrimeDuration:piCurrent.postPrimeDuration, 
						targetDuration:piCurrent.targetDuration, 
						ITI:piCurrent.ITI, 
						condition:primeName
					},
					stimuli : [
						{inherit:'fixationStim'}, {inherit:'maskStim'}, 
						{inherit:primeName}, {inherit:targetName}
					]
				});
				allTrials.push({inherit:primeName+targetName});
			}
		}
		//Create a trial set which is an array with all the possible trials. 
		//In the blocks, we can then inherit from this set exRandomly.
		API.addTrialSets('allTrials', allTrials);
	
		//Define the basic instructions trial
		API.addTrialSets('inst',{
			data: {score:0, block:0, condition:'instructions'},
			layout: layout,
			input: [
				{handle:'space',on:'space'} //Will handle a SPACEBAR response
			],
			interactions: [
				{ // begin trial
					conditions: [{type:'begin'}],
					actions: [{type:'showStim',handle:'All'}] //Show the instructions, later use to show the user feedback
				},
				{
					conditions: [{type:'inputEquals',value:'space'}], //What to do when space is pressed
					actions: [
						{type:'log'}, //Record the time it took participants to continue.
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

		/***
			Create the stimuli
		***/

		API.addStimulusSets({
		// This Default stimulus is inherited by the other stimuli so that we can have a consistent look and change it from one place
			Default: [
				{css:{color:piCurrent.fontColor,'font-size':'2em'}}
			],

			fixationStim : [
				{
					data : {handle:'fixationStim'},
					inherit:'Default',
					nolog:true, //No need to send to the server anything about displaying this stimulus because it happens in all trials.
					media: piCurrent.fixationStimulus.media,
					css: piCurrent.fixationStimulus.css
				}
			],
			exFixationStim : [
				{
					data : {handle:'fixationStim'},
					inherit:'Default',
					nolog:true, //No need to send to the server anything about displaying this stimulus because it happens in all trials.
					media: piCurrent.exampleFixationStimulus.media,
					css: piCurrent.exampleFixationStimulus.css
				}
			],
			maskStim : [
				{
					data : {handle:'maskStim'},
					inherit:'Default',
					nolog:true, //No need to send to the server anything about displaying this stimulus because it happens in all trials.
					media: piCurrent.maskStimulus.media,
					css: piCurrent.maskStimulus.css
				}
			],
			exMaskStim : [// the mask with the : "Rate now"
				{
					inherit:'maskStim',
					media: piCurrent.exampleMaskStimulus.media,
					css: piCurrent.exampleMaskStimulus.css
				}
			],
			exPrimeStim : [
				{
					data : {handle:'primeStim',alias:piCurrent.examplePrimeStimulus.nameForLogging},
					inherit:'Default',
					media: {inherit:{type:'exRandom',set:'exPrimeMedia'}}
				}
			],
			exTargetStim : [
				{
					data : {handle:'targetStim',alias:piCurrent.exampleTargetStimulus.nameForLogging},
					inherit:'Default',
					media: {inherit:{type:'exRandom',set:'exTargetMedia'}}
				}
			],
			dummyForLog : [
				{
					media:{word: ' '}, 
					location:{left:99}, 
					data : {handle:'dummyForLog', alias:'dummyForLog'}
				}
			]
		});
		
		/**
		Add a stimulus for each prime category
		**/
		var stimCSS, catName;
		for (iPrimeCat = 0; iPrimeCat < piCurrent.primeCats.length; iPrimeCat++)
		{
			catName = piCurrent.primeCats[iPrimeCat].nameForLogging;
			//Users can set a css property for each prime category, or opt to use the primeStimulusCSS general property.
			stimCSS = piCurrent.primeStimulusCSS;
			if (piCurrent.primeCats[iPrimeCat].hasOwnProperty('css'))
			{
				stimCSS = piCurrent.primeCats[iPrimeCat].css;
			}
			API.addStimulusSets(catName,
			{
				inherit : 'Default', 
				data : {handle:'primeStim', alias:catName}, 
				css : stimCSS,
				media : {inherit : {set:catName, type:'exRandom'}}
			});
		}
		/**
		Add a stimulus for each target category
		**/
		for (iTargetCat = 0; iTargetCat < piCurrent.targetCats.length; iTargetCat++)
		{
			catName = piCurrent.targetCats[iTargetCat].nameForLogging;
			//Users can set a css property for each prime category, or opt to use the primeStimulusCSS general property.
			stimCSS = piCurrent.targetStimulusCSS;
			if (piCurrent.targetCats[iTargetCat].hasOwnProperty('css'))
			{
				stimCSS = piCurrent.targetCats[iTargetCat].css;
			}
			API.addStimulusSets(catName,
			{
				inherit : 'Default', 
				data : {handle:'targetStim', alias:catName}, 
				css : stimCSS,
				media : {inherit : {set:catName, type:'exRandom'}}
			});
		}
		
		/***
		Create media
		***/
		
		//For the example block
		API.addMediaSets('exPrimeMedia', piCurrent.examplePrimeStimulus.mediaArray);
		if (!piCurrent.exampleTargetStimulus.sameAsTargets)
		{
			API.addMediaSets('exTargetMedia', piCurrent.exampleTargetStimulus.mediaArray);
		}
		//Add media for each prime category
		for (iPrimeCat = 0; iPrimeCat < piCurrent.primeCats.length; iPrimeCat++)
		{
			API.addMediaSets(piCurrent.primeCats[iPrimeCat].nameForLogging,
			piCurrent.primeCats[iPrimeCat].mediaArray);
		}
		//Add media for each target category
		for (iTargetCat = 0; iTargetCat < piCurrent.targetCats.length; iTargetCat++)
		{
			API.addMediaSets(piCurrent.targetCats[iTargetCat].nameForLogging,
			piCurrent.targetCats[iTargetCat].mediaArray);
		}
	
		//helper Function for getting the instructions HTML.
		function fromTemplate(params)
		{//params: template, blockNum.
			var retText = params.template.replace(/leftKey/g, piCurrent.leftKey.toUpperCase());
			retText = retText.replace(/rightKey/g, piCurrent.rightKey.toUpperCase());
			retText = retText.replace(/leftAttribute/g, leftSortingLabel);
			retText = retText.replace(/rightAttribute/g, rightSortingLabel);
			retText = retText.replace(/nBlocks/g, piCurrent.nBlocks);
			retText = retText.replace(/blockNum/g, params.blockNum);
			return retText;
		}

		/***
		The trial sequence
		***/
		var trialSequence = [];
		var blockNum = 1;
		if (piCurrent.trialsInExample > 0)
		{
			//Instructions trial
			trialSequence.push(
				{
					inherit : 'inst', 
					data: {blockStart:true, block:blockNum}, 
					stimuli: [
						{media:{html:fromTemplate({template:piCurrent.exampleBlockInst, blockNum:1})}, nolog:true}, 
						{inherit:'dummyForLog'}
					]
				}
			);
			//example trials
			trialSequence.push(
				{ 
					mixer: 'repeat',// Repeat 3 times the trial.
					times: piCurrent.trialsInExample,
					data : [
						{
							inherit: {set:'exampleSort',type:'exRandom'}, 
							data:{block:blockNum, condition:'example'}
						}
					]
				}
			);
			blockNum++;
		}
		var iBlock, blockInst;
		for (iBlock = 0; iBlock < piCurrent.trialsInBlock.length; iBlock++)
		{
			if (iBlock == 0)
			{
				blockInst = piCurrent.firstBlockInst;
			}
			else if (iBlock == piCurrent.trialsInBlock.length-1)
			{
				blockInst = piCurrent.lastBlockInst;
			}
			else 
			{
				blockInst = piCurrent.middleBlockInst;
			}
			//Instructions trial
			trialSequence.push(
				{
					inherit : 'inst', 
					data: {blockStart:true, block:blockNum}, 
					stimuli: [ {media:{html:fromTemplate({template:blockInst, blockNum:iBlock+2})}, nolog:true}, {inherit:'dummyForLog'}]
				}
			);
			//trials
			trialSequence.push(
				{ 
					mixer: 'repeat',// 
					times: piCurrent.trialsInBlock[iBlock],
					data : [
						{
							inherit: {set:'allTrials', type:'exRandom'}, 
							data:{block:blockNum}
						}
					]
				}
			);
			blockNum++;
		}
		//Final trial
		trialSequence.push(
		{ //End the task
			data: {blockStart:true},
			inherit : "inst",
			stimuli: [
				{//The instructions stimulus
					media:{html:piCurrent.endText,data:{block:blockNum, condition:'end'}}, nolog:true
				}, 
				{//For the logging
					inherit:'dummyForLog'
				}
			]
		});

		API.addSequence(trialSequence); 

		//Helper for creating feedback.
		function replaceCats(inText, catAname, catBname)
		{
			var retText= inText.replace(/CATEGORYA/g, catAname);  
			retText = retText.replace(/CATEGORYB/g, catBname);
			return retText;
		}

		//Helper to determine preference feedback
		function getPreference(inRespObj)
		{
			var preference = "Not enough trials to determine the preference"; 
			
			//Make sure there is a count object for each of the first two primes.
			if (inRespObj[piCurrent.primeCats[0].nameForLogging] 
				&& inRespObj[piCurrent.primeCats[1].nameForLogging])
			{
				var diff = 0;
				if (inRespObj[piCurrent.primeCats[0].nameForLogging][piCurrent.sortingLabel2])
				{//Pleasant count for first prime category
					diff += inRespObj[piCurrent.primeCats[0].nameForLogging][piCurrent.sortingLabel2];
				}
				if (inRespObj[piCurrent.primeCats[0].nameForLogging][piCurrent.sortingLabel1])
				{//Unpleasant count for first prime category
					diff -= inRespObj[piCurrent.primeCats[0].nameForLogging][piCurrent.sortingLabel1];
				}
				if (inRespObj[piCurrent.primeCats[1].nameForLogging][piCurrent.sortingLabel2])
				{//Pleasant count for the second prime category
					diff -= inRespObj[piCurrent.primeCats[1].nameForLogging][piCurrent.sortingLabel2];
				}
				if (inRespObj[piCurrent.primeCats[1].nameForLogging][piCurrent.sortingLabel1])
				{//Unpleasant count for the second prime category
					diff += inRespObj[piCurrent.primeCats[1].nameForLogging][piCurrent.sortingLabel1];
				}

				if (diff > 0)
				{//Preference for the first prime over the second prime
					preference = replaceCats(piCurrent.fb_att2WithCatA_att1withCatB, 
					piCurrent.primeCats[0].nameForFeedback, piCurrent.primeCats[1].nameForFeedback);
				}
				else if (diff < 0)
				{//Preference for the second prime over the first prime
					preference = replaceCats(piCurrent.fb_att2WithCatA_att1withCatB, 
					piCurrent.primeCats[1].nameForFeedback, piCurrent.primeCats[0].nameForFeedback);
				}
				else
				{//No preference
					preference = replaceCats(piCurrent.fb_equal_CatAvsCatB, 
						piCurrent.primeCats[0].nameForFeedback, piCurrent.primeCats[1].nameForFeedback);
				}
			}

			return preference;
		}
		//compute the AMP score, according to the logs.
		function computeAMPScore(scoreArray)
		{
			var responseCountObj = {};

			//For each trial
			_.forEach(scoreArray, function(log){
				var condition = log.data.condition;
				var response = log.responseHandle;
				//If not an example or instructions trial.				
				if (condition != 'example' && condition != 'instructions')
				{
					//Increment the count of the responseHandle of this condition.
					if (!responseCountObj[condition]){
						responseCountObj[condition] = {};
					}
					var conditionObj = responseCountObj[condition];

					if (!conditionObj[response])
					{
						conditionObj[response] = 0;
					}
					conditionObj[response]++;
				}
			});
			
			//Create a dictionary from name-for-logging to name-for-feedback
			var feedbackNames = {};
			for (iPrimeCat = 0; iPrimeCat < piCurrent.primeCats.length; iPrimeCat++)
			{
				feedbackNames[piCurrent.primeCats[iPrimeCat].nameForLogging] = piCurrent.primeCats[iPrimeCat].nameForFeedback;
			}
			//Create the feedback string.
			var feedback = "";
			//Go by all the conditions.
			_.forEach(responseCountObj, function(value, key){
				//For this condition
				feedback += "After " + feedbackNames[key] + ": "; 
				//Go by all the responses to this condition.
				_.forEach(value, function(value, key){
					feedback += value + " of your responses were " + key + "; ";
				});
				feedback += "<br/>";
			});
			
			//Get preference between the first two prime categories, assuming the sortinglabel2 is the pleasant attribute.
			var preference = getPreference(responseCountObj);
			
			return ({feedback:feedback, preference:preference});
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//What to do at the end of the task.
		API.addSettings('hooks',{
			endTask: function(){
				var logs = API.getLogs();//saving the logs
				var feedbackObj = computeAMPScore(logs);
				//Save for the task's session.
				API.addCurrent(feedbackObj);
				//Save to server
				API.save(feedbackObj);
			}
		});
		return API.script;
	}
	return ampExtension;	
});
