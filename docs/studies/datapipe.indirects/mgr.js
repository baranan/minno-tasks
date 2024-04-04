define(['managerAPI',
		'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'], function(Manager){


	//You can use the commented-out code to get parameters from the URL.
	//const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString);
    //const pt = urlParams.get('pt');

	var API    = new Manager();
	init_data_pipe(API, 'y745jBRhfi0B',  {file_type:'csv'});	

    API.setName('mgr');
    API.addSettings('skip',true);

    API.addGlobal({
        //YBYB: change when copying back to the correct folder
        mediaURL: './images/',
        //Select randomly what attribute words to see. 
        //Based on Axt, Feng, & Bar-Anan (2021).
        posWords : API.shuffle([
            'Love', 'Cheer', 'Friend', 'Pleasure',
            'Adore', 'Cheerful', 'Friendship', 'Joyful', 
            'Smiling','Cherish', 'Excellent', 'Glad', 
            'Joyous', 'Spectacular', 'Appealing', 'Delight', 
            'Excitement', 'Laughing', 'Attractive','Delightful', 
            'Fabulous', 'Glorious', 'Pleasing', 'Beautiful', 
            'Fantastic', 'Happy', 'Lovely', 'Terrific', 
            'Celebrate', 'Enjoy', 'Magnificent', 'Triumph'
        ]), 
        negWords : API.shuffle([
            'Abuse', 'Grief', 'Poison', 'Sadness', 
            'Pain', 'Despise', 'Failure', 'Nasty', 
            'Angry', 'Detest', 'Horrible', 'Negative', 
            'Ugly', 'Dirty', 'Gross', 'Evil', 
            'Rotten','Annoy', 'Disaster', 'Horrific',  
            'Scorn', 'Awful', 'Disgust', 'Hate', 
            'Humiliate', 'Selfish', 'Tragic', 'Bothersome', 
            'Hatred', 'Hurtful', 'Sickening', 'Yucky'
        ])
    });
    
    var global = API.getGlobal();
    
    ///////////////////
    ////Preload all the photos in all the tasks
    
    var url = global.mediaURL;
    
    //The instructions images
    var preload = [url+'amp2.jpg', url+'ampchair.jpg', url+'amplamp.jpg', url+'ampmask.jpg', url+'ampmaskr.jpg', url+'ampumbrella.jpg', 
    url+'blacks.jpg', url+'whites.jpg', url+'biat.jpg', url+'yf1.jpg', url+'yf4.jpg', url+'yf5.jpg', url+'ym2.jpg', url+'ym3.jpg', url+'ym5.jpg', 
    url+'iat.jpg'];
    
    //Keith Payne's race stimuli for the AMP
    var i = 0;
    for (i = 1; i < 10; i++)
    {
        preload.push(url + 'b0'+i+'.jpg');
        preload.push(url + 'w0'+i+'.jpg');
    }
    for (i=10; i<=12; i++)
    {
        preload.push(url + 'b'+i+'.jpg');
        preload.push(url + 'w'+i+'.jpg');
        
    }
    
    //The race stimuli for other measures.
    for (i=1; i<=6; i++)
    {
        preload.push(url + 'black'+i+'.jpg');
    }
    for (i = 1; i <= 8; i++)
    {
        preload.push(url + 'neg'+i+'.jpg');
        preload.push(url + 'pos'+i+'.jpg');
    }
    
    //The AMP target stimuli
    for (i = 1; i <= 200; i++)
    {
        preload.push(url + 'pic'+i+'.jpg');
    }

	API.addSettings('preloadImages', preload);


    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Continue'
        }],

        instamp: [{
            inherit: 'instructions',
            name: 'instamp',
            templateUrl: 'instamp.jst',
            title: 'Speeded judgment task',
            piTemplate: true,
            header: 'Speeded judgment task'
        }],
        instiat: [{
            inherit: 'instructions',
            name: 'instiat',
            templateUrl: 'instiat.jst',
            title: 'Implicit Association Test',
            piTemplate: true,
            header: 'Implicit Association Test'
        }],
        instbiat: [{
            inherit: 'instructions',
            name: 'instbiat',
            templateUrl: 'instbiat.jst',
            title: 'Implicit Association Test',
            piTemplate: true,
            header: 'Implicit Association Test'
        }],
        instspf: [{
            inherit: 'instructions',
            name: 'instspf',
            templateUrl: 'instspf.jst',
            title: 'The four corners task',
            piTemplate: true,
            header: 'The four corners task'
        }],
        inststiat: [{
            inherit: 'instructions',
            name: 'inststiat',
            templateUrl: 'inststiat.jst',
            title: 'Implicit Association Test',
            piTemplate: true,
            header: 'Implicit Association Test'
        }],
        instep: [{
            inherit: 'instructions',
            name: 'instep',
            templateUrl: 'instep.jst',
            title: 'Sorting task',
            piTemplate: true,
            header: 'Sorting task'
        }],

        choose: [{
            type:'quest',
            name: 'choose',
            scriptUrl: 'choose.js'
        }],
        iatrace: [{
            type:'time',
            name: 'iatrace',
            scriptUrl: 'iatrace.js'
        }],
        biatrace: [{
            type:'time',
            name: 'biatrace',
            scriptUrl: 'biatrace.js'
        }],
        mciatrace: [{
            type:'time',
            name: 'mciatrace',
            scriptUrl: 'mciatrace.js'
        }],
        spfrace: [{
            type:'time',
            name: 'spfrace',
            scriptUrl: 'spfrace.js'
        }],
        stiatblk: [{
            type:'time',
            name: 'stiatblk',
            scriptUrl: 'stiatblk.js'
        }],
        eprace: [{
            type:'time',
            name: 'eprace',
            scriptUrl: 'eprace.js'
        }],
        ampiaps: [{
            type:'time',
            name: 'ampiaps',
            scriptUrl: 'ampiaps.js'
        }],
        amprace: [{
            type:'time',
            name: 'amprace',
            scriptUrl: 'amprace.js'
        }],
        amprace7: [{
            type:'time',
            name: 'amprace7',
            scriptUrl: 'amprace7.js'
        }],
        
        intro: [{
            inherit: 'instructions',
            name: 'intro',
            templateUrl: 'intro.jst',
            title: 'Intro',
            header: 'Welcome'
        }],

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst',
            title: 'End',
            //Uncomment the following if you want to end the study here.
            //last:true, 
            header: 'You have completed the study'
        }], 
        
        //Use if you want to redirect the participants elsewhere at the end of the study
        redirect:
        [{ 
			//Replace with any URL you need to put at the end of your study, or just remove this task from the sequence below
            type:'redirect', name:'redirecting', url: 'https://www.google.com/search' 
        }],
		
		//This task waits until the data are sent to the server.
        uploading: uploading_task({header: 'just a moment', body:'Please wait, sending data... '})
    });

    API.addSequence([
        {inherit: 'intro'},

        {inherit:'choose'},
        {
            mixer:'multiBranch', 
            branches :
            [
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'amprace'}],
                    data:[{inherit:'instamp'}, {inherit:'amprace'}]
                },
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'amprace7'}],
                    data:[{inherit:'instamp'}, {inherit:'amprace7'}]
                },
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'ampiaps'}],
                    data:[{inherit:'instamp'}, {inherit:'ampiaps'}]
                },
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'iatrace'}],
                    data:[{inherit:'instiat'}, {inherit:'iatrace'}]
                },
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'spfrace'}],
                    data:[{inherit:'instspf'}, {inherit:'spfrace'}]
                },
                {
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'stiatblk'}],
                    data:[{inherit:'inststiat'}, {inherit:'stiatblk'}]
                },
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'biatrace'}],
                    data:[{inherit:'instbiat'}, {inherit:'biatrace'}]
                },
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'mciatrace'}],
                    data:[{inherit:'instbiat'}, {inherit:'mciatrace'}]
                },
                { 
                    conditions:[{compare: 'global.choose.questions.choice.response', to: 'eprace'}],
                    data:[{inherit:'instep'}, {inherit:'eprace'}]
                }
            ]
        },

		{inherit: 'uploading'},
        {inherit: 'lastpage'},
        {inherit: 'redirect'}
    ]);

    return API.script;
});
