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
		{ id : "music" , group : 1 , details : "https://design.penpot.app/#/view/f336a94c-01dc-8157-8004-9b2475b55328?page-id=f336a94c-01dc-8157-8004-9b2475b55329&section=interactions&index=0&share-id=f336a94c-01dc-8157-8004-9b24f0aad2d5" } ,
		{ id : "urban geography" , group 2 } ,
		{ id : "transnational social issues" , group 2 } ,
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
		{ source : "urban geography" , target : "culture" , value : 1 } ,
		{ source : "transnational social issues" , target : "culture" , value : 1 } ,
		/* add links here */

	]
}
