define(['questAPI'], function(Quest){
	var API = new Quest();
	
    /**
    Settings
    **/
	API.addQuestionsSet('dropd', 
	{
	    type: 'dropdown',
	    autoSubmit:false,
	    required: true
	});
	
    /**
	Pages
	**/
	API.addPagesSet('basicPage',{
		noSubmit:false, 
		v1style: 2,
		decline: false,
		questions: [
	    {
	        inherit: 'dropd',
	        name: 'eyecolor',
	        stem: 'Please choose which eye-color you have:',
	        answers: ['Blue-eyed', 'Green-eyed', 'Gray-eyed', 'Brown-eyed', 'Black-eyed', 'Hazel-Eyed']
	    },
	    {
	        inherit: 'dropd',
	        name: 'birthyear',
	        stem: 'Please choose your year of birth:',
	        answers: [2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920]
	    },
	    {
	        inherit: 'dropd',
	        name: 'birthmonth',
	        stem: 'Please choose your birth month:',
	        answers: ["January", "February", "March", "April", "May", "June", "July","August","September","October", "November", "December"]
	    },
	    {
	        inherit: 'dropd',
	        name: 'letter',
	        stem: 'Please choose the first letter of your first name:',
	        answers: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	    }]
	});
	
	// ### Sequence
	API.addSequence(
	[
	    {inherit:'basicPage'} 
    ]);
    
	/**
	Return the script to piquest's god, or something of that sort.
	**/
	return API.script;
});





