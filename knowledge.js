var knowledge = {
	nodes : [ 
		{ id : "Math" , group : 1 } ,
		{ id : "Science" , group : 1 } ,
		{ id : "Computer Science" , group : 1 } ,
		{ id : "Natural Language Processing" , group : 1 } ,
		{ id : "Image Generation" , group : 1 } ,
		{ id : "Large Language Model" , group : 1 } ,
		{ id : "Art" , group : 2 } ,
		{ id : "Programming" , group : 1 } ,
		{ id : "Biology" , group : 1 } ,
		{ id : "Chemistry" , group : 1 } ,
		{ id : "Physics" , group : 1 } ,
		{ id : "Culture" , group : 2 } ,
		{ id : "Language" , group : 2 } ,
		{ id : "English" , group : 2 } ,
	] ,
	links : [
		{ source : "Science" , target : "Math" , value : 1 } ,
		{ source : "Math" , target : "Computer Science" , value : 1 } ,
		{ source : "Computer Science" , target : "Natural Language Processing" , value : 1 } ,
		{ source : "Art" , target : "Image Generation" , value : 1 } ,
		{ source : "Natural Language Processing" , target : "Image Generation" , value : 1 } ,
		{ source : "Natural Language Processing" , target : "Large Language Model" , value : 1 } ,
		{ source : "Computer Science" , target : "Programming" , value : 1 } ,
		{ source : "Science" , target : "Biology" , value : 1 } ,
		{ source : "Science" , target : "Chemistry" , value : 1 } ,
		{ source : "Science" , target : "Physics" , value : 1 } ,
		{ source : "Culture" , target : "Art" , value : 1 } ,
		{ source : "Culture" , target : "Language" , value : 1 } ,
		{ source : "Language" , target : "English" , value : 1 } ,

	]
}
