define(['managerAPI', 'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@0.*/datapipe.min.js'], function(Manager) {

    let API = new Manager();

    API.setName('mgr');
    API.addSettings('skip',true);
	init_data_pipe(API, 'YOURDATAPIPETOKEN', 'csv');


    API.addTasksSet({
        choose: [{
            type: 'quest',
            name: 'choose',
            scriptUrl: 'choose.js'
        }],

        age: [{
            type: 'time',
            name: 'age',
            scriptUrl: 'age.js'
        }],
        arab: [{
            type: 'time',
            name: 'arab',
            scriptUrl: 'arab.js'
        }],
        asian: [{
            type: 'time',
            name: 'asian',
            scriptUrl: 'asian.js'
        }],
        disability: [{
            type: 'time',
            name: 'disability',
            scriptUrl: 'disability.js'
        }],
        nativee: [{
            type: 'time',
            name: 'nativee',
            scriptUrl: 'native.js'
        }],
        genderscience: [{
            type: 'time',
            name: 'genderscience',
            scriptUrl: 'genderscience.js'
        }],
        sexuality: [{
            type: 'time',
            name: 'sexuality',
            scriptUrl: 'sexuality.js'
        }],
        weight: [{
            type: 'time',
            name: 'weight',
            scriptUrl: 'weight.js'
        }],
	hispanic: [{
            type: 'time',
            name: 'hispanic',
            scriptUrl: 'hispanic.js'
        }],
        race: [{
            type: 'time',
            name: 'race',
            scriptUrl: 'race.js'
        }]
    });

    API.addSequence([
	    {
	        mixer:'repeat',
	        times:10, 
	        data :
	        [
	            {inherit:'choose'},
	            {
	                mixer:'multiBranch', 
	                branches :
	                [
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'age'}],
	                        data:[{inherit:'age'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'arab'}],
	                        data:[{inherit:'arab'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'asian'}],
	                        data:[{inherit:'asian'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'disability'}],
	                        data:[{inherit:'disability'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'genderscience'}],
	                        data:[{inherit:'genderscience'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'native'}],
	                        data:[{inherit:'nativee'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'race'}],
	                        data:[{inherit:'race'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'sexuality'}],
	                        data:[{inherit:'sexuality'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'hispanic'}],
	                        data:[{inherit:'hispanic'}]
	                    },
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'weight'}],
	                        data:[{inherit:'weight'}]
	                    }
	                ]
	            }
	       ]
	    }
    ]);

    return API.script;
});
