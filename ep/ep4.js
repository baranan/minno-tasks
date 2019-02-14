define(['managerAPI'], function(Manager){

	var API = new Manager();
	
	API.addSettings('skip', true);
	API.setName('mgr');

    var css = API.shuffle(['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11', 'm12', 'm13', 'm14']).slice(0, 7);
	var uspos = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5', 'pos6', 'pos7', 'pos8', 'pos9', 'pos10', 'pos11', 'pos12', 'pos13', 'pos14'];
	var usneg = ['neg1', 'neg2', 'neg3', 'neg4', 'neg5', 'neg6', 'neg7', 'neg8', 'neg9', 'neg10', 'neg11', 'neg12', 'neg13', 'neg14'];
	var posWrds = ['Love', 'Cheer', 'Pleasure', 'Cherish', 'Delight', 'Enjoy', 'Heaven'];
	var negWrds = ['Abuse', 'Grief', 'Poison', 'Sadness', 'Pain', 'Disaster', 'Hate'];
	var posbvs = API.shuffle([
          'kept his promise and returned what he\'d borrowed promptly',
          'brought fresh bagels to everyone at work',
          'bought a blanket and hot meal to a homeless person',
          'helped an elderly man who dropped some packages',
          'mailed back an expansive item that was delivered to him by mistake',
          'worked overtime for no extra pay in order to do a good job',
          'offered his place in the line to an elderly person',
          'recycled all his old books to save trees and reduce pollution',
          'donated his old furnitures to a homeless shelter',
          'took his younger brothers to a movie',
          'worked overtime for no extra pay in order to do a good job',
          'threw a surprise party for a friend']);
    var negbvs = API.shuffle([
          'called in sick for work when he was well',
          'criticized his colleagues for no good reason',
          'cut the line to buy tickets',
          'dented the fender of a parked car and didn\'t leave his name',
          'disturbed his neighbors by playing loud music at night',
          'drove through a yellow-red light at a potentially dangerous intersection',
          'embarrassed a friend by playing a nasty prank on him',
          'got drunk and insulted everybody at the cocktail party',
          'insulted his assistant at work last week',
          'smoked on a crowded bus',
          'whispered during a movie even though he knew it disturbed others',
          'yelled at his parents over the phone'
        ]);

    var choiceCond = API.shuffle(['slow', 'fast'])[0];
    var commit = API.shuffle(['commit', 'no-commit'])[0];

    API.addGlobal({
        cspos:css.slice(0,2), csneg:css.slice(2,4),
        csfiller:css.slice(4,7),
        mins:15,
        commit:commit, 
        uspos:uspos, usneg:usneg, 
        posWrds:posWrds, negWrds:negWrds, 
        posbvs:posbvs, negbvs:negbvs, 
        choiceCond:choiceCond,
        mediaURL: '/implicit/user/yba/choicepair5/images/'
    });
    
    var global = API.getGlobal();	
    //Novel stimuli to serve as practice stimuli in the questionnaire.

    API.save({
        cspos1:global.cspos[0], cspos2:global.cspos[1],
        csneg1:global.csneg[0], csneg2:global.csneg[1], 
        csfiller1:global.csfiller[0], csfiller2:global.csfiller[1], 
        csfiller3:global.csfiller[2], 
        commit:commit, 
        choiceCond:global.choiceCond
    });

    var preload = [];
    var iImage;
    for (iImage=1; iImage<css.length; iImage++)
    {
        preload.push(global.mediaURL + css[iImage] + '.jpg');
    }
    for (iImage=0; iImage<uspos.length; iImage++)
    {
        preload.push(global.mediaURL + uspos[iImage] + '.jpg');
        preload.push(global.mediaURL + usneg[iImage] + '.jpg');
    }
    /*No AMP in this study
    for (iImage=1; iImage<=200; iImage++)
    {
        preload.push(global.mediaURL + 'pic' + iImage + '.jpg');
    }*/

    
	API.addSettings('preloadImages', preload);

	API.addTasksSet(
	{
		instructions :  
		[{
			type:'message', buttonText:'Continue', piTemplate:true
		}], 
		welcome : 
		[{
			inherit:'instructions', name:'welcome', templateUrl: 'welcome.jst', title:'Welcome', 
			piTemplate:true, header:'Welcome'
		}],
		consent : [{ 
			type: 'quest', name: 'consent', scriptUrl: 'consent.js', 
			header:'Informed consent agreement', title:'Informed consent agreement'
		}], 
		commit : [{ 
			type: 'quest', name: 'commit', scriptUrl: 'commit.js', 
			header:'Before we start', title:'agreement'
		}], 
		
        redirectpage : [{ type: 'message', name: 'redirectpage', templateUrl: 'redirectpage.jst', piTemplate: true, buttonText: '<b>Continue</b>'}],
        //this redirects participants back into the pool.
        redirect: [{ type:'redirect', url: 'https://implicit.harvard.edu/implicit/Assign' }], 

		realstart :
		[{
			inherit:'instructions', name:'realstart', templateUrl: 'realstart.jst', title:'Study',
			header:"Introduction"
		}],
		instchoicepair :
		[{
			inherit:'instructions', name:'instchoicepair', templateUrl: 'instchoicepair.jst', title:'Study',
			header:"Instructions"
		}],
		choicepair :
		[{
		    type: 'time', 
		    //type:'pip', version:'0.3',
		    name: 'choicepair', scriptUrl: 'choicepair.js'
		}],
		instiatlike :
		[{
			inherit:'instructions', name:'instiatlike', templateUrl: 'instiatlike.jst', title:'Study',
			header:"Instructions"
		}],
		iatlike :
		[{
		    type: 'time', 
		    //type:'pip', version:'0.3',
		    name: 'iatlike', scriptUrl: 'iatlike.js'
		}],
		next : 
		[{
			inherit:'instructions', name:'next', templateUrl: 'next.jst', title:'Continue', 
			piTemplate:true, header:'Continue'
		}],
		bvs : 
		[{
			inherit:'instructions', name:'bvs', templateUrl: 'bvs.jst', title:'About the men', 
			piTemplate:true, header:'About the men'
		}],
		instchoose : 
		[{
			inherit:'instructions', name:'instchoose', templateUrl: 'instchoose.jst', title:'Questionnaire', 
			piTemplate:true, header:'Questionnaire'
		}],
		choose : 
		[{
			type: 'time', name: 'choose', scriptUrl: 'choose.js'
		}],
		instep :
		[{
			inherit:'instructions', name:'instep', templateUrl: 'instep.jst', title:'Study',
			header:"Instructions"
		}],
		ep :
		[{
		    type: 'time', 
		    //type:'pip', version:'0.3',
		    name: 'ep', scriptUrl: 'ep.js'
		}],
		debriefing:
		[{
			type:'message', name:'lastpage', templateUrl: 'debriefing.jst', piTemplate:'debrief', last:true
		}]
	});

	API.addSequence([
	    {inherit: 'welcome'},
        {inherit: 'consent'},
        {
            mixer: 'branch',// if participants choose "I decline", they are taken to a transition page telling them they are being redirected
            conditions: [
                function(){ return piGlobal.consent.questions.userconsent.response === false;} 
            ],
            data: [
                {inherit: 'redirectpage'},
                {inherit: 'redirect'}
            ]
        },
        {
            mixer: 'branch',
            conditions : [{compare: 'global.commit', to: 'commit'}], 
            data : 
            [
                {inherit:'commit'}
            ]
        },
        {inherit: 'realstart'},

		{inherit:'realstart'},
		
		{inherit:'instiatlike'},
		{inherit:'iatlike'},

		{inherit:'instchoicepair'},
		{inherit:'choicepair'},
		
		{inherit:'next'},
		{inherit:'bvs'},

		{inherit:'instchoose'},
		{inherit:'choose'},
		{inherit:'instep'},
		{inherit:'ep'},

		{inherit:'debriefing'}
	]);

	return API.script;
});
