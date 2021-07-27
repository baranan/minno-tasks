define(['https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat10.js'], function(iatExtension){

    return iatExtension({
        category1 : {
            name : 'מזרחים', //Will appear in the data.
            title : {
                media : {word : 'שמות משפחה מזרחים'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: 'חג\'ג\''},
                {word: 'מועלם'},
                {word: 'אוחיון'},
                {word: 'ג\'רבי'},
                {word: 'סמוחה'}
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 :    {
            name : 'אשכנזים', //Will appear in the data.
            title : {
                media : {word : 'שמות משפחה אשכנזים'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: 'לבקוביץ\''},
                {word: 'גליקשטיין'},
                {word: 'בלומפלד'},
                {word: 'רוזנסקי'},
                {word: 'ברגסון'}
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
        attribute1 : {
            name : 'רע',
            title : {
                media : {word : 'מילים שליליות'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: 'כאב'},
                {word: 'כשלון'},
                {word: 'מגעיל'},
                {word: 'רשע'},
                {word: 'נורא'},
                {word: 'בחילה'},
                {word: 'גרועה'},
                {word: 'רוע'}

            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        attribute2 : {
            name : 'טוב',
            title : {
                media : {word : 'מילים חיוביות'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: 'הנאה'},
                {word: 'עונג'},
                {word: 'נפלא'},
                {word: 'אהבה'},
                {word: 'אושר'},
                {word: 'נהדרת'},
                {word: 'שמחה'},
                {word: 'צחוק'}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        
        finalText : 'לחצו על מקש הרווח בכדי להמשיך למטלה הבאה', 			
	    
	shortData: true,

        leftKeyText : 'מקש "E"', 
        rightKeyText : 'מקש "I"', 
        orText : 'או',			
        instAttributePractice: '<div style="font-size:20px; text-align:center;">' +
            '<p><u> חלק blockNum מתוך nBlocks </u></p>' +
			'<p style="vertical-align:bottom; margin-right:10px;">' +
            'הקישו באצבע שמאל על מקש <b>E</b> ' + 
            'עבור פריטים ששייכים לקטגוריה <font color="#0000ff">leftAttribute</font><br/>'+
            'הקישו באצבע ימין על מקש <b>I</b> '+ 
            'עבור פריטים ששייכים לקטגוריה <font color="#0000ff">rightAttribute</font><br/>'+
            'אם תבצעו טעות, <font color="#ff0000"><b>X</b></font> אדום יופיע<br/> '+
			'לחצו על המקש האחר כדי להמשיך<br/>' +
			'<u>השיבו מהר ככל האפשר אך היו מדויקים</u></p>'+
			'<p>לחצו על מקש הרווח כאשר אתם מוכנים להתחיל</p>'+
            '</div>',			

        instCategoriesPractice: '<div style="font-size:20px; text-align:center;">' +
            '<p><u> חלק blockNum מתוך nBlocks </u><br/><br/></p>' +
			'<p style="vertical-align:bottom; margin-right:10px;">' +
            'הקישו באצבע שמאל על מקש <b>E</b> ' + 
            'עבור פריטים ששייכים לקטגוריה <font color="#336600">leftCategory</font><br/>'+
            'הקישו באצבע ימין על מקש <b>I</b> ' + 
            'עבור פריטים ששייכים לקטגוריה <font color="#336600">rightCategory</font><br/>'+
            'אם תבצעו טעות, <font color="#ff0000"><b>X</b></font> אדום יופיע<br/> '+
			'לחצו על המקש האחר כדי להמשיך<br/>' +
			'<u>השיבו מהר ככל האפשר אך היו מדויקים</u><br/><br/></p>'+
			'<p align="center">לחצו על מקש הרווח כאשר אתם מוכנים להתחיל</font></p></div>'			,			

        instFirstCombined : '<div style="font-size:20px; text-align:center;">' +
            '<p><u> חלק blockNum מתוך nBlocks </u></p>' +
			'<p style="vertical-align:bottom; margin-right:10px;">' +
            'הקישו באצבע שמאל על מקש <b>E</b> '+ 
            'עבור פריטים ששייכים לקטגוריה <font color="#0000ff">leftAttribute</font> ' +
            'או עבור פריטים ששייכים לקטגוריה <font color="#336600">leftCategory</font><br/>'+
            'הקישו באצבע ימין על מקש <b>I</b> ' + 
            'עבור פריטים ששייכים לקטגוריה <font color="#0000ff">rightAttribute</font> '+
            'או עבור פריטים ששייכים לקטגוריה <font color="#336600">rightCategory</font><br/>'+
			'כל פריט מתאים רק לקטגוריה אחת<br/><br/>' +
            'אם תבצעו טעות, <font color="#ff0000"><b>X</b></font> אדום יופיע<br/>'+
			'לחצו על המקש האחר כדי להמשיך<br/>' +
			'<u>השיבו מהר ככל האפשר אך היו מדויקים</u><br/><br/></p>'+
			'<p align="center">לחצו על מקש הרווח כאשר אתם מוכנים להתחיל</font></p></div>',			
		
        instSecondCombined : '<div style="font-size:20px; text-align:center;">' +
            '<p><u> חלק blockNum מתוך nBlocks </u></p>' +
			'<p style="vertical-align:bottom; margin-right:10px;">' +
            'הקישו באצבע שמאל על מקש <b>E</b> '+ 
            'עבור פריטים ששייכים לקטגוריה <font color="#0000ff">leftAttribute</font> '+
            'או עבור פריטים ששייכים לקטגוריה <font color="#336600">leftCategory</font><br/>'+
            'הקישו באצבע ימין על מקש <b>I</b> '+ 
            'עבור פריטים ששייכים לקטגוריה <font color="#0000ff">rightAttribute</font> ' +
            'או עבור פריטים ששייכים לקטגוריה <font color="#336600">rightCategory</font><br/>'+
			'כל פריט מתאים רק לקטגוריה אחת<br/><br/>' +
            'אם תבצעו טעות, <font color="#ff0000"><b>X</b></font> אדום יופיע<br/>'+
			'לחצו על המקש האחר כדי להמשיך<br/>' +
			'<u>השיבו מהר ככל האפשר אך היו מדויקים</u><br/><br/></p>'+
			'<p align="center">לחצו על מקש הרווח כאשר אתם מוכנים להתחיל</font></p></div>',
	
        instSwitchCategories : '<div style="font-size:20px; text-align:center;">' +
            '<p><u> חלק blockNum מתוך nBlocks </u><p>' +
			'<p style="vertical-align:bottom; margin-right:10px;">' +
			'<b>שימו לב! הקטגוריות החליפו מיקום</b><br/>' +
            'הקישו באצבע שמאל על מקש <b>E</b> '+ 
            'עבור פריטים ששייכים לקטגוריה <font color="#336600">leftCategory</font><br/>'+
            'הקישו באצבע ימין על מקש <b>I</b> '+ 
            'עבור פריטים ששייכים לקטגוריה <font color="#336600">rightCategory</font><br/>'+
			'<u>השיבו מהר ככל האפשר אך היו מדויקים</u><br/><br/></p>'+
			'<p>לחצו על מקש הרווח כאשר אתם מוכנים להתחיל</p></div>',

        remindErrorText : '<p align="center" style="font-size:"0.6em"; font-family:arial">' +
		'אם תעשו טעות, יופיע <font color="#ff0000"><b>X</b></font> אדום. ' +
		'הקישו על המקש השני כדי להמשיך.<p/>',
			
        fb_strong_Att1WithCatA_Att2WithCatB : 'התוצאות מעידות על העדפה אוטומטית חזקה לcategoryB על פני categoryA',
        fb_moderate_Att1WithCatA_Att2WithCatB : 'התוצאות מעידות על העדפה אוטומטית בינונית לcategoryB על פני categoryA',
        fb_slight_Att1WithCatA_Att2WithCatB : 'התוצאות מעידות על העדפה אוטומטית קלה לcategoryB על פני categoryA',
        fb_equal_CatAvsCatB : 'התוצאות שלך לא מצביעות על העדפה אוטומטית בין categoryA לcategoryB',

		//Error messages in the feedback
        manyErrors: 'אי-אפשר לחשב העדפה מהתוצאות כי טעית לעיתים קרובות',
        tooFast: 'אי-אפשר לחשב העדפה מהתוצאות כי השבת מהר מדי בתכיפות גבוהה',
        notEnough: 'אי-אפשר לחשב העדפה מהתוצאות כי לא השבת נכון מספיק פעמים.'
    });

});
