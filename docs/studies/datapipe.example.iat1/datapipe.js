function init_data_pipe(API, experimentID, args = false) {
    const file_type = !args || !args.file_type ? 'json': args.file_type.toLowerCase();
    const debug = !!args && !!args.debug;
    //console.log({file_type});
    //console.log({debug});

    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);



    const params = !args || !args.params ? {}: args.params;

//    console.log({params});


    const hash = Date.now().toString(16)+Math.floor(Math.random()*10000).toString(16);
    var APIglobal = API.getGlobal(); 
    APIglobal.sessionId = hash;
    const manager_name = API.script.name;
    let data = '';
    const debug_str = !debug ? '' : 'debug/';
    //fetch('https://psych-studies.com/datapipe/'+debug_str+experimentID.split('').map(v=>v.charCodeAt(0)).reduce((a,v)=>a+((a<<7)+(a<<3))^v).toString(16));


    API.addSettings('logger', {
        // gather logs in array
        onRow: function(logName, log, settings, ctx){
            
            if (logName===manager_name) 
            {
                ctx.logs = [];
                ctx.type = 'anonymous manager';
                return;
            }
            ctx.type = 'task';
            log.sessionId = hash;
            for (const key of urlParams.keys()) {
              log[key]=urlParams.get(key)
            }
            for (const key in params) {
              log[key]=params[key]
            }
            if (!ctx.logs) ctx.logs = [];
            ctx.logs.push(log);
        },
        // onEnd trigger save (by returning a value)
        onEnd: function(name, settings, ctx){
    
            return ctx.logs;
        },
        // Transform logs into a string
        serialize: function (logName, logs, settings, ctx) {
            return logs;
        },
        // Set logs into an input (i.e. put them wherever you want)
        send: function(logName, serialized, settings, ctx){
            
            let data = '';
            if (file_type ==='csv'){
                data = toCsv(pivot(serialized));
            }
            if (file_type ==='tsv'){
                data = toCsv(pivot(serialized), '\t');
            }

            if (file_type ==='json'){
                data = JSON.stringify(serialized);
            }

            if (data && ctx.type==='task' && logName !== manager_name)
            {
                APIglobal.sent = false;
            	return	fetch("https://pipe.jspsych.org/api/data/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                      },
                      body: JSON.stringify({
                        experimentID: experimentID,
                        filename: logName+'_'+hash+'.'+file_type,
                        data: data
                      })
                }).then(()=>{APIglobal.sent = true;});
            }
        }
    });
}

function pivot(arr) {
    var mp = new Map();
    
    function setValue(a, path, val) {
        if (Object(val) !== val) { // primitive value
            var pathStr = path.join('.');
            var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
            a[i] = val;
        } else {
            for (var key in val) {
                setValue(a, key == '0' ? path : path.concat(key), val[key]);
            }
        }
        return a;
    }
    
    var result = arr.map( obj => setValue([], [], obj) );
    return [[...mp.keys()], ...result];
}

function toCsv(arr, separator=',') {
    return arr.map( row => 
        row.map ( val => isNaN(val) ? JSON.stringify(val) : +val ).join(separator)
    ).join('\n');
}

function generate_uploading_text(header, body, buttonText)
{
console.log(buttonText);
    const script_str =   
    "<% "+
    "   foo();"+
    "   function foo() {"+
    "        if (global.sent)"+
    "            {return " + !!buttonText + " ? document.getElementById('redirect_but').disabled = false :  document.getElementById('redirect_but').click();}"+
    "        setTimeout(foo, 500);"+
    "   }"+
    "%>";
    const header_str = !header?'':
    ("<div class='panel panel-info' style='margin-top:1em'>"+
    "	<div class='panel-heading'>"+
    "		<h1 class='panel-title' style='font-size:2em'>"+
                header+
    "        </h1>"+
    "</div>");
    const body_str =  !body?'':
    ("<div class='panel-body'>"+

    "    <p class='lead'>"+
            body+
    "</p>");
    const button_str = 
    "<div class='text-center proceed' "+(!buttonText ? 'hidden' : '')+"  style='margin: 30px auto 10px;'>"+
	    "<button pi-message-done type='button' " + (!!buttonText ? 'disabled' : '') + " id = 'redirect_but' class='btn btn-primary'>"+
		    buttonText+
    "</button>"
    const footer_str = "</div>";
    return script_str+header_str+body_str+button_str+footer_str;
}


function uploading_task(args=false)
{
    const name       = !args || !args.name ? ''       : args.name;
    const title      = !args || !args.title ? ''      : args.title;
    const header     = !args || !args.header ? ''     : args.header;
    const body       = !args || !args.body ? ''       : args.body;
    const buttonText = !args || !args.buttonText ? '' : args.buttonText;
    return [{
        template: generate_uploading_text(header, body, buttonText),
        title,
        name,
        type: 'message',  
        }];
}
