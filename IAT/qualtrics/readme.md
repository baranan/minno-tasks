# Project Implicit's IAT script for Qualtrics

In this directory, you can find scripts that would help you run an IAT from [Qualtrics](https://www.qualtrics.com/), 
with all the IATs used in Project Implicit's [demonstration site](https://implicit.harvard.edu/implicit/takeatest.html). 

Note that Qualtrics is not a free service. If you have an account in Qualtrics and it is convenient for you to run your studies on that website, 
you can use our scripts to add an IAT to your study. If you do not have a Qualtrics account, but you are confident with computers, 
you can try to install Project Implicit's [Minno Suite](https://minnojs.github.io/docsite/minnosuitedashboard/), including ar server. 
That will allow you to create and run your own web studies. 

A full guide how to use the IAT scripts in this folder in your own Qualtrics study can be found in [this blog post](https://minnojs.github.io/minnojs-blog/qualtrics-iat/).

You can copy the files in this directory to your own directory or use them directly from here 
(e.g., calling the url `https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/demoRace0005.js` directly from Qualtrics, 
as explained in the [blog post](https://minnojs.github.io/minnojs-blog/qualtrics-iat/)).

Here, we will try to give you some information about each of the IATs implemented in this directory:

|File Name| Description|
|----------|-----------|
|`demoRace0005.js` | Project Implicit's (in)famous Race IAT with the categories `Black people`/`White people` and the attributes `Good`/`Bad` (0005 is the version we're using at 2020).|
|`demogenderscience0002.js` | Project Implicit's gender-science stereotype IAT with the categories `Male`/`Female` and `Science`/`Liberal Arts`.|
|`demosexuality0002.js` | Project Implicit's sexual stigma IAT with the categories `Gay people`/`Straight people` and `Good`/`Bad`. For each participant, we randomly choose whether the Gay category would refer to women or men, or both|
|`exampleQIAT.js` | A slight modified version of the Race IAT (different attribute words) that serves as an example how to use Minno's IAT on Qualtrics.|
|`exampleQIATage.js` | Project Implicit's `Old people`/`Young people`, `Good`/`Bad` IAT.|
|`exampleQIATarab.js` | Project Implicit's `Arab Muslims`/`Other People`, `Good`/`Bad` IAT.|
|`exampleQIATasianamer.js` | Project Implicit's `Asian American`/`European American`, `Foreign`/`American` IAT.|
|`exampleQIATdisability.js` | Project Implicit's `Disabled Persons`/`Abled Persons`, `Good`/`Bad` IAT.|
|`exampleQIATgendercareer.js` | Project Implicit's `Career`/`Family`, `Male`/`Female` gender stereotype IAT.|
|`exampleQIATnativeamer.js` | Project Implicit's `Native American`/`White American`, `Foreign`/`American` IAT.|
|`exampleQIATpresident1.js` | Project Implicit's IAT that compared Obama to a few recent presidents. The other recent president is selected randomly for each participant from a set of a few former presidents.|
|`exampleQIATpresident2.js` | Project Implicit's IAT that compares Trump to a few recent presidents. The other recent president is selected randomly for each participant from a set of a few former presidents.|
|`exampleQIATreligion.js` | Project Implicit's IAT that compares Christian to one of the other religions, chosen randomly for each participant from a set of a few religions.|
|`skinIATexample.js` | Project Implicit's `Dark Skinned People`/`Light Skinned People`, `Bad`/`Good` IAT. The photos are selected randomly from one of two sets of dark/light skinned people.|
|`weaponsIATexample.js` | Project Implicit's `Black Americans`/`White Americans`, `Weapons`/`Harmless Objects` stereotype IAT.|
|`weightIATexample.js` | Project Implicit's `Fat people`/`Thin people`, `Bad words`/`Good words` stereotype IAT.|

A couple of notes: 
* In the evaluative (Good/Bad) IATs, for each participant, we randomly choose eight positive and eight negative attribute words from a sets of 48 positive and 48 negative words. In our internal tests, we did not find evidence that any of these words is more effective than the others.
* Most of the evaluative IATs use the attributes `Good` and `Bad`. However, I (Yoav) recommend using `Good words`/`Bad words` to make it easier for the participants to understand that these are separate categories from the other two categories (A White person is not a `Good word` or a `Bad word`)

