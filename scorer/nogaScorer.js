
function scorer_init(scorerObj) {
    scorerObj.computeData = {}; //Will hold the to-be-scored data 
    scorerObj.msg = {}; //Will hold the feedback message
    scorerObj.parcelCalc = {}; //An object that computes the D score

    scorerObj.computeData = new ComputeData();
    scorerObj.msg = new msgMan();
    scorerObj.parcelCalc  = new parcelCalc(scorerObj.msg);

    //The two API functions
    scorerObj.addSettings  = scorer_addSettings;
    scorerObj.computeD = scorer_computeD;
}


// add settings different from default
function scorer_addSettings(scorerObj, type, settingsObj){
    switch (type){
        case 'compute':
            scorerObj.computeData.setComputeObject(settingsObj);
            break;
        case 'message':
            scorerObj.msg.setMsgObject(settingsObj);
            break;
        default:
            throw new Error('SCORER:addSettings: unknown "type" ' + type);
    }
}


/**
 * Calculate the score
 * @return an object that holds the score and an error message
 **/
function scorer_computeD(scorerObj){

    //Get the needed objects from the scorer object
    let computeData = scorerObj.computeData;
    let parcel = scorerObj.parcelCalc;

    try 
    {
        // Copy the data from the input scorer object to our internal object. 
        computeData.setDataArray(scorerObj);
        // Prepare the data for the scoring
        parcel.setParcelObject(computeData);
        // And not we score
        parcel.scoreAll(computeData);
    } catch (error) {
        console.error("computeD: error message: ", error.message)
    }

    // The output, end-result of the scoring is "scoreData"
    const scoreObj = parcel.scoreData;

    if (scoreObj.errorMessage === undefined || scoreObj.errorMessage === null){
        console.log('No error message, so setting a score and feedback message');
        return {
            FBMsg : scorerObj.msg.getScoreMsg(scoreObj.score),
            DScore : scoreObj.score,
            error: false
        };
    }else{
        console.log('The error message will be ', scoreObj.errorMessage);
        return {
            FBMsg : scoreObj.errorMessage,
            DScore : scoreObj.score,
            error: true
        };
    }
}

// A class with all the data and parameters needed for computing the score
class ComputeData{
    constructor() {
        this.dataArray = {};                // The data array or structure the user provides.
        this.AnalyzedVar = 'latency';       // The main variable used for the score computation. Usually will be the latency.
        this.errorVar = 'score';            // The variable that indicates whether there was an error in the response
        this.condVar = '';                  // The name of the variable that will store the variables
        this.cond1VarValues = [];           // An array with the values of the condVar that are considerred "condition 1" in the comparison
        this.cond2VarValues = [];           // An array with the values of the condVar that are considerred "condition 2" in the comparison
        this.parcelVar = '';
        this.parcelValues = [];             // An array with all the possible parcel values
        this.fastRT = 300;                  // Below this reaction time, the latency is considered extremely fast.
        this.maxFastTrialsRate = 0.1;       // Above this % of extremely fast responses within a condition, the participant is considered too fast.
        this.minRT = 400;                   // Below this reaction time, the trial is not included
        this.maxRT = 10000;                 // Above this
        this.maxErrorRate = 1;              // The default 1 means that there is no exclusion by errors.
        this.errorLatency = {use:'latency', penalty:600, useForSTD:true};
    }

    setComputeObject(settingsObj){
        // Loop through the keys of the updateObject
        for (const key in settingsObj) {
            // Check if the key exists in the class
            if (this.hasOwnProperty(key)) {
                // Update the field with the value from the updateObject
                this[key] = settingsObj[key];
            }
        }
    }

    // Copy the trial data into our object, leaving only trials from the to-be-scored conditions
    setDataArray(scorerObj){
        // use the real scorerObj in order to prevent problems with dependencies
        this.dataArray = scorerObj.logs;

        //// Keep only to-be-scored trials. 
        //// To-be-scored trials are trials with a condition value that included either in cond1VarValues or cond2VarValues.

        let filteredDataArray = [];  // Array to store the filtered data
        // Loop through each trial in dataArray
        for (let trial of this.dataArray) {
            // Check if trial's condition is cond1 or cond2
            if(this.cond1VarValues.includes(trial.data.condition) || this.cond2VarValues.includes(trial.data.condition)){
                filteredDataArray.push(trial);
            }
        }
        // Replace the original dataArray with the filtered data
        this.dataArray = filteredDataArray;

        console.log('Data array length: ', this.dataArray.length);
    }

}

// A class to handle the feedback message
class msgMan{

    constructor() {
        this.messages = {
            // These are the defaults and they are supposed to be overridden by the user
            MessageDef: [],
            manyErrors: "There were too many errors made to determine a result.",
            tooFast: "There were too many fast trials to determine a result.",
            notEnough: "There were not enough trials to determine a result."
        };
    }

    setMsgObject(settingsObj){
        // Loop through the keys of the updateObject
        for (const key in settingsObj) {
            // Check if the key exists in the messages object
            if (this.messages.hasOwnProperty(key)) {
                // Update the field with the value from the updateObject
                this.messages[key] = settingsObj[key];
            }
        }
    }

    getScoreMsg(score) {
        const array = this.messages.MessageDef;
        const scoreNum = parseFloat(score);
        let rightMsg = "error: msg was not set";
        let set = false;

        // Find the first element in the array where the score is less than or equal to the cut value
        for (const val of array) {
            const cut = parseFloat(val.cut);
            const msg = val.message;

            if (scoreNum <= cut && !set) {
                rightMsg = msg;
                set = true;
                break; // Exit the loop once a match is found
            }
        }

        // If no match is found, use the last message in the array
        if (!set) {
            const obj = array[array.length - 1];
            rightMsg = obj.message;
        }

        return rightMsg;
    }
}

// A class for computing the D score for each parcel.
class parcelCalc {

    constructor(msgMan) {
        this.parcelArray = [];  // Holds an array of parcel objects
        this.scoreData = {};    // Holds score and error messages
        this.msg = msgMan;
    }

    //Parcel is the basic object that holds the data for each parcel, separated by conditions.
    createParcel(name, cond1VarValues, cond2VarValues) {
        return {
            name: name,
            cond1: {
                cond: cond1VarValues,
                scoredData: []
            },
            cond2: {
                cond: cond2VarValues,
                scoredData: []
            }
        };
    }

    // settingsObj is type ComputeData
    // Method: Void setObjectFields
    // Input: Uses logs from API
    // Output: Sets parcelArray with array of type parcel
    // Description: Init goes over the log and creates an array of object of type Parcel according to
    // the parcelValues array in computeData. Each parcel object holds relevant information regarding the
    // parcel including an array of trials with the relevant parcel name.

    setParcelObject(computeData) {
        // set counters
        let totalScoredTrials = 0;
        let trialsUnder = 0;
        let totalTrials = 0;
        let totalErrorTrials = 0;

        //// Initialize the parcels. (Create a parcel object for each parcel name mentioned in the scoring parameters)
        if (typeof computeData.parcelValues === 'undefined' || computeData.parcelValues.length === 0) {
            // No parcels were defined, so we will create a general parcel, and will compute a score only for that parcel.
            let p = this.createParcel("general", computeData.cond1VarValues, computeData.cond2VarValues);
            this.parcelArray.push(p);
        } else { //Parcels were defined, and we will create them based on their names.
            computeData.parcelValues.forEach((parcelName, index) => {
                let p = this.createParcel(parcelName, computeData.cond1VarValues, computeData.cond2VarValues);
                this.parcelArray[index] = p;
            });
        }

         //// Set scoredData of the two conditions with the to-be-scored trials, 
         //// and count fast, slow, and valid trials
         for (const value of computeData.dataArray) { // Loop through each object in dataArray
            // Find the parcel that matches the current object
            let parcelName = value.data[computeData.parcelVar];
            let parcel = this.parcelArray.find(p => p.name === parcelName);
            if (parcel) {
                const latency = value[computeData.AnalyzedVar];
                if (latency <= computeData.maxRT) { //YBYB: Note that although R's cleanIAT removes >= 10000 latency, Greenwald et al., 2001 removed > 10000, which is what we do here.
                    totalTrials++;
                    if (value.data[computeData.errorVar] === 1) {
                        totalErrorTrials++;
                    }
                    // Add the trial to the parcel if it is valid
                    if (this.addTrialIfValid(parcel, value, computeData)) {
                        totalScoredTrials++;
                    }
                } 
                if (latency < computeData.fastRT) 
                {
                    trialsUnder++;
                }
            }
        }
        
        //// Make sure that the data are good for scoring.
        
        if (totalTrials < 1)
        {
            this.scoreData.errorMessage = this.msg.messages['notEnough'];
            throw new Error('Not enough trials in this task.');
        }

        if (totalScoredTrials < 4) // For two conditions, we need a minimum of 2 trials within each condition. So, let's than 4 is definitely not enough.
        {
            this.scoreData.errorMessage = this.msg.messages['notEnough'];
            throw new Error('Not enough to-be-scored trials in this task.');
        }

        //Update the error message component, if there are too many errors.
        console.log('totalErrorTrials=' + totalErrorTrials + ' totalTrials=' + totalTrials + ' computeData.maxErrorRate='+ computeData.maxErrorRate);
        if (totalErrorTrials / totalTrials > computeData.maxErrorRate) {
            this.scoreData.errorMessage = this.msg.messages['manyErrors'];
            //YBYB: There will be an error message, but we will still try to compute a D score.
            //throw new Error('too many errors in the to-be-scored trials.');
        }

        // Check if the rate of fast trials is too high
        console.log('trialsUnder=' + trialsUnder + ' totalScoredTrials=' + totalScoredTrials + ' computeData.maxFastTrialsRate='+ computeData.maxFastTrialsRate);
        if ((trialsUnder / totalScoredTrials) > computeData.maxFastTrialsRate) {
            this.scoreData.errorMessage = this.msg.messages['tooFast'];
            //YBYB: There will be an error message, but we will still try to compute a D score.
            //throw new Error('too many fast trials in a parcel.');
        }
    }

    /* Function: Void addTrialIfValid.
        Input: parcel object, trial object from the log, and the compute object.
        Output: Pushes the trial to the parcel based on information from errorLatency. Returns true/false.
        Description: Helper method to apply errorLatency logic. If set to 'latency' trials which are error
        would be added to the parcel trial array. if set to false trials that are error would not be added,
        if set to panelty error trials will be added and later panelized.
    */

    addTrialIfValid(p, value, computeData) {
        let currCond = value.data.condition;
        
        // Score correct-response trials, and perhaps also error-response trials (if errorLatency is set to 'latency' or 'penalty')
        
        if (value[computeData.AnalyzedVar] < computeData.minRT)
        {//Too fast
            return false;
        } else if (value.data[computeData.errorVar] === 0 || 
            computeData.errorLatency.use === 'latency' || 
            computeData.errorLatency.use === 'penalty') {
            // Check if it matches any of the relevant conditions
            if (p.cond1.cond.includes(currCond)) {
                p.cond1.scoredData.push(value);
            } else if (p.cond2.cond.includes(currCond)) {                                
                p.cond2.scoredData.push(value);
            } else {
                console.log('This trial condition is not included in any of the relevant conditions: ' + currCond);
            }
            return true;
        } else if (computeData.errorLatency.use === 'false' && value.data[computeData.errorVar] === 1) {
            return false;
        } else {
            //print error because this unexpected 
            console.log('Error: unexpected errorLatency parameter=' + computeData.errorLatency.use + " or error value=" + value.data[computeData.errorVar]);
        }
    }

    // calcMean
    // Input: array of trials
    // Output: mean of the array
    // Description: Helper method to calculate the mean of the array of trials.
    // It is used to calculate the mean of the analyzed variable for each condition.
    calcMean(trials, computeData) {
        return trials.reduce((sum, trial) => sum + trial[computeData.AnalyzedVar], 0) / trials.length;
    }

    // calcSD
    // Input: array of trials
    // Output: standard deviation of the array
    // Description: Helper method to calculate the standard deviation of the array of trials.
    // It is used to calculate the standard deviation.
    calcSD(trials, computeData) {
        let mean = this.calcMean(trials, computeData);
        return Math.sqrt(trials.reduce((sum, trial) => {
            let diff = trial[computeData.AnalyzedVar] - mean;
            return sum + diff * diff;
        }, 0) / (trials.length - 1));
    }

    // calcCorrectMeans
    // Input: parcel object
    // Output: mean of each condition
    // Description: Helper method to compute the mean of each condition.
    // It is used to calculate the mean of the correct-response trials for each condition.
    calcCorrectMeans(parcel, computeData) {
        let conditions = [parcel.cond1, parcel.cond2];
        for (const currCond of conditions) {
            if (!currCond.correctData) {
                console.log('calCorrectMeans: there was no correctData.');
                return false;
            }
            let condTrials = currCond.correctData;
            if (condTrials.length === 0) 
            {
                console.log('calCorrectMeans: not enough valid trials.');
                return false;
            }
            currCond.correctTrialsMean = this.calcMean(condTrials, computeData);
            console.log('correctTrialsMean for ', currCond.cond, currCond.correctTrialsMean);
        }
    }

    // calcPooledSD
    // Input: parcel object
    // Output: pooled standard deviation of the corrected data, across all conditions
    // Description: Helper method to compute the pooled standard deviation of the corrected data.
    calcPooledSD(parcel, computeData) {
        let conditions = [parcel.cond1, parcel.cond2];
        let relevantTrials = [];
        // The relevant trials are all the to-be-scored trials in the parcel, excluding error-response trials if useForSTD is false.
        for (const currCond of conditions) {
            if (computeData.errorLatency.useForSTD === false) {
                relevantTrials = relevantTrials.concat(currCond.correctData);
            }
            else if (computeData.errorLatency.useForSTD === true) {
                relevantTrials = relevantTrials.concat(currCond.correctedData);
            }
        }
        console.log('calcPooledSD: relevantTrials', relevantTrials);
        return this.calcSD(relevantTrials, computeData);
    }

    // calcCorrectedMeans
    // Input: parcel object
    // Output: mean of each condition
    // Description: Helper method to compute the mean of each condition.
    // It is used to calculate the mean of all the to-be-scored trials for each condition, after the correction of the error-response trials.
    calcCorrectedMeans(parcel, computeData) {
        let conditions = [parcel.cond1, parcel.cond2];
        for (const currCond of conditions) {
            if (!currCond.correctedData || currCond.correctedData.length === 0) {
                throw new Error('calcCorrectedMeans: no correctedData for one of the conditions');
            }

            let condTrials = currCond.correctedData;
            currCond.correctedTrialsMean = this.calcMean(condTrials, computeData);
            console.log('correctedTrialsMean for ', currCond.cond, currCond.correctedTrialsMean);
        }
    }

    // setCorrectData
    // Input: parcel object
    // Output: parcel object with valid data
    // Description: Helper method to set the correct-response trials for each condition.
    setCorrectData(parcel, computeData) {
        let conditions = [parcel.cond1, parcel.cond2];
        for (const currCond of conditions) {
            if (!currCond.scoredData || currCond.scoredData.length === 0) {
                throw new Error("setCorrectData: scoredData is missing for one of the conditions in this parcel");
            }
            let condTrials = currCond.scoredData;
            currCond.correctData = condTrials.filter(trial =>
                trial.data.score === 0
            );
            if (currCond.correctData.length === 0)
            {
                throw new Error("setCorrectData: No correct-response trials for one of the conditions in this parcel");
            }
            console.log('correctData for ', currCond, currCond.correctData);
        }
    }

    // setCorrectedData
    // Input: parcel object
    // Output: parcel object with corrected data
    // Description: Helper method to set the corrected data for each condition.
    // Note: corrected data = trial with the to-be-scored latency. The latency of error-response trials depends on the scoring parameters.
    setCorrectedData(parcel, computeData) {
        let conditions = [parcel.cond1, parcel.cond2];
        for (const currCond of conditions) {
            if (computeData.errorLatency.use === 'false') {
                // If we don't use latency of error trials, then the corrected data is the correct trials data
                if (!currCond.correctData || currCond.correctData.length === 0) {
                    throw new Error("setCorrectedData: correctData is missing for one of the conditions in this parcel");
                }
                currCond.correctedData = currCond.correctData;
            }
            else if (computeData.errorLatency.use === 'latency') {
                // "latency" means we use the latency of error-trials.
                if (!currCond.scoredData || currCond.scoredData.length === 0) {
                    throw new Error("setCorrectedData: scoredData is missing for one of the conditions in this parcel");
                }
                currCond.correctedData = currCond.scoredData;
            }
            else if (computeData.errorLatency.use === 'penalty') {
                // "penalty" means that error trials' latency is the mean of the valid trials + penalty
                if (!currCond.scoredData || currCond.scoredData.length === 0) {
                    throw new Error("setCorrectedData: scoredData is missing for one of the conditions in this parcel");
                }
                
                let condTrials = currCond.scoredData;
                
                if (!currCond.correctTrialsMean)
                {
                    throw new Error("setCorrectedData: no correctTrialsMean for at least one of the conditions");   
                }
                currCond.correctedData = condTrials.map(trial => {
                    let correctedTrial = {...trial}; 
                    if (trial.data.score === 1) { 
                        //Replace the latency of each error-response trials
                        correctedTrial[computeData.AnalyzedVar] = currCond.correctTrialsMean + computeData.errorLatency.penalty;
                    }
                    return correctedTrial;
                });
            }
        }
        console.log('correctedData for ', parcel.cond1.cond, parcel.cond1.correctedData);
    }

    // Score one parcel
    scoreParcel(parcel, computeData){

        // Set correct data (trials with correct response), within each condition
        this.setCorrectData(parcel, computeData);
        // Compute the mean of the correct trials, within each condition (sometimes used for correcting error trials)
        this.calcCorrectMeans(parcel, computeData)
        // Set the corrected data (the error-response trials may be included with corrected lateny, if the user asked for them)
        this.setCorrectedData(parcel, computeData);
        // Compute the mean of the corrected trials, within each condition.
        this.calcCorrectedMeans(parcel, computeData);
        
        // Compute pooledSD for the parcel
        let pooledSD = this.calcPooledSD(parcel, computeData);

        if (isNaN(pooledSD) || pooledSD === 0) {
            this.scoreData.errorMessage = this.msg.messages['notEnough'];
            throw new Error('scoreParcel: not enough trials for computing pooledSD');
        }
        console.log('pooledSD', pooledSD);

        const diff = parcel.cond2.correctedTrialsMean - parcel.cond1.correctedTrialsMean;
        console.log('diff', diff);

        // divide diff by pooled SD
        const parcelDScore = diff / pooledSD;
        console.log('parcelDScore', parcelDScore);

        return(parcelDScore)
    }

    //Score all the parcels and the overall score is their mean.
    scoreAll(computeData){
        let dScores = [];

        for (let parcel of this.parcelArray) {
            try 
            {
                dScores.push(this.scoreParcel(parcel, computeData));
            }
            catch (error) { //We'll try to score all the parcels, even if there are errors in some of them.
                console.error("scoreAll. Error in parcel " + parcel.name + ", error message:", error.message);
            }
        }

        // calc final D-score by averaging the D-scores across all parcels
        const validScores = dScores.filter(score => !isNaN(score));  // Filter out NaN values
        if (validScores.length > 0)
        {
            const finalDScore =  validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
            this.scoreData.score = finalDScore.toFixed(2);
        }
    }

}


