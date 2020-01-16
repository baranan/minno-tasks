---
title: Extensions
description: Extension Scripts for Specific Tasks.
---

We created extension scripts to save time in creating a few common reaction-time tasks. An extension script is a Minno script that is activated by another Minno script. 
For instance, this is a Minno script that uses an IAT extension:

```js
define(['https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'], function(iatExtension){
    return iatExtension({
        category1 : {
            name : 'Black People', //Will appear in the data.
            title : {
                media : {word : 'Black People'}, //Name of the category presented in the task.
                css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'bf14_nc.jpg'},
                {image: 'bf23_nc.jpg'},
                {image: 'bm23_nc.jpg'},
                {image: 'bm56_nc.jpg'}
            ]
        },    
        category2 :    {
            name : 'White People', //Will appear in the data.
            title : {
                media : {word : 'White People'}, //Name of the category presented in the task.
                css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'wf2_nc.jpg'},
                {image: 'wf3_nc.jpg'},
                {image: 'wm4_nc.jpg'},
                {image: 'wm6_nc.jpg'}
            ]
        },
        base_url : {//Where are your images at?
            image : '/implicit/user/yba/pimraceiat/images/'
        } 
    });
});
```

That is the whole script. It activates the Minno script at 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js' by calling a function called `iatExtension` with a few parameters that tell the extension what stimuli to use. 

Notice: the script iat7.js might be out of date. To find the most recent version for each implicit measure extension, see the bottom of the page.

Each extension has a large set of parameters that the researcher can change. All these parameters have default values, so there is no need to set all the parameters, only those that you want to change. In fact, one can activate the iat extension without setting any parameters at all, like this:

```js
define(['https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat7.js'], function(iatExtension){
    return iatExtension({});
});
```

However, that script will activate the IAT with default stimuli (Black people/White people, Good words/Bad words, using names and adjectives as items), and probably you want to use your own stimuli. 

To use an extension, create a Minno script (like the one above) and then define it as a 'time' script in piManager, just like you define any other miTime script. For instance, if the name of your script “iatrace.js” that will be the definition of the task:

```js
API.addTasksSet({
    iat : [{
        type: 'time', name: 'iat', scriptUrl: 'iatrace.js'
    }]
});
```

In order to use an extension, you need to know what parameters the extension accepts. The best way to learn what parameters each extension accepts is to browse the extension script. At the beginning of each script, your will see the definition of all the parameters, with comments that explain what the parameter is, and with the parameter’s default value. If you’re fine with the default value, don’t include that parameter in your code. If you want to change the default value, include the parameter in your code and set a different value. 
In addition, you can base your instructions page on a default instructions created for each task.

Here are direct links to the most recent scripts for each of the supported implicit measures:


Measure | Links
------- | -----
IAT | [extension](https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js) &middot; [example how to use](https://implicit.harvard.edu/implicit/user/yba/expimp//iatrace.js) &middot; [instructions text](https://implicit.harvard.edu/implicit/user/yba/expimp//instiat.jst)
AMP | [extension](https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/amp/amp3.js) &middot; [example how to use](https://implicit.harvard.edu/implicit/user/yba/expimp/amprace.js) &middot; [instructions text](https://implicit.harvard.edu/implicit/user/yba/expimp/instamp.jst) 
Evaluative Priming | [extension](https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/ep/ep5.js) &middot; [example how to use](https://implicit.harvard.edu/implicit/user/yba/expimp/eprace.js) &middot; [instructions text](https://implicit.harvard.edu/implicit/user/yba/expimp/instep.jst)
Single-Target IAT | [extension](https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/stiat6.js) &middot; [example how to use](https://implicit.harvard.edu/implicit/user/yba/expimp/stiatblk.js) &middot; [instructions text](https://implicit.harvard.edu/implicit/user/yba/expimp/inststiat.jst)
Brief-IAT | [extension](https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/biat6.js) &middot; [example how to use](https://implicit.harvard.edu/implicit/user/yba/expimp/biatrace.js) &middot; [instructions text](https://implicit.harvard.edu/implicit/user/yba/expimp/instbiat.jst)
SPF | [extension](https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/spf/spf4.js) &middot; [example how to use](https://implicit.harvard.edu/implicit/user/yba/expimp/spfrace.js) &middot; [instructions text](https://implicit.harvard.edu/implicit/user/yba/expimp/instspf.jst)
