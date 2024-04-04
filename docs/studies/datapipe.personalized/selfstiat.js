define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/stiat6.js'], function(APIConstructor, stiatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return stiatExtension({
        category : {
            name : 'Self', //Will appear in the data.
            title : {
                media : {word : 'Self'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            media : [ //Stimuli content as Minno's media objects
                {word: global.personitems.questions.birthmonth.response},
				{word: global.personitems.questions.letter.response},
				{word: global.personitems.questions.birthyear.response},
				{word: global.personitems.questions.eyecolor.response}     
            ],
            //Stimulus css (style)
            css : {color:'#31940F','font-size':'2.3em'}
        },    
        attribute1 : {
            name : 'Bad words',
            title : {
                media : {word : 'Bad words'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            media : [ //Stimuli content as Minno's media objects
                {word: global.negWords[0]},
                {word: global.negWords[1]},
                {word: global.negWords[2]},
                {word: global.negWords[3]},
                {word: global.negWords[4]},
                {word: global.negWords[5]},
                {word: global.negWords[6]},
                {word: global.negWords[7]}
            ],
            //Stimulus css
            css : {color:'#0000FF','font-size':'2.3em'}
        },
        attribute2 : {
            name : 'Good words',
            title : {
                media : {word : 'Good words'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            media : [ //Stimuli content as Minno's media objects
                {word: global.posWords[0]},
                {word: global.posWords[1]},
                {word: global.posWords[2]},
                {word: global.posWords[3]},
                {word: global.posWords[4]},
                {word: global.posWords[5]},
                {word: global.posWords[6]},
                {word: global.posWords[7]}
            ],
            //Stimulus css
            css : {color:'#0000FF','font-size':'2.3em'}
        },
        base_url : {//Where are your images at?
            image : global.baseURL
        }
    });
});

