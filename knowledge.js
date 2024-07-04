var knowledge = {
	nodes : [ 
		{ id : "math" , group : 1 } ,
		{ id : "science" , group : 1 } ,
		{ id : "computer science" , group : 1 } ,
		{ id : "natural language processing" , group : 1 } ,
		{ id : "image generation" , group : 1 } ,
		{ id : "large language model" , group : 1 } ,
		{ id : "art" , group : 2 } ,
		{ id : "programming" , group : 1 } ,
		{ id : "biology" , group : 1 } ,
		{ id : "chemistry" , group : 1 } ,
		{ id : "physics" , group : 1 } ,
		{ id : "culture" , group : 2 } ,
		{ id : "language" , group : 2 } ,
		{ id : "english" , group : 2 } ,
		{ id : "music" , group : 1 , details : "undefined" } ,
		/* add nodes here */
	] ,
	links : [
		{ source : "science" , target : "math" , value : 1 } ,
		{ source : "math" , target : "computer science" , value : 1 } ,
		{ source : "computer science" , target : "natural language processing" , value : 1 } ,
		{ source : "art" , target : "image generation" , value : 1 } ,
		{ source : "natural language processing" , target : "image generation" , value : 1 } ,
		{ source : "natural language processing" , target : "large language model" , value : 1 } ,
		{ source : "computer science" , target : "programming" , value : 1 } ,
		{ source : "science" , target : "biology" , value : 1 } ,
		{ source : "science" , target : "chemistry" , value : 1 } ,
		{ source : "science" , target : "physics" , value : 1 } ,
		{ source : "culture" , target : "art" , value : 1 } ,
		{ source : "culture" , target : "language" , value : 1 } ,
		{ source : "language" , target : "english" , value : 1 } ,
		{ source : "art" , target : "music" , value : 1 } ,
		/* add links here */

	]
}
