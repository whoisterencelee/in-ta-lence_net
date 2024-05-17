self.addEventListener('install', function(e) {
	self.skipWaiting()  // update service worker immediately not waiting for tabs to close
	e.waitUntil(
		caches.open(location.host).then(function(cache) {
			return 
			return cache.addAll([ '/' , 'index.html' ]);
		})
	   );
});

self.addEventListener('fetch', function(event) { // needed for home screen installation https://developers.google.com/web/fundamentals/app-install-banners/
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
//			console.log("cache match for "+event.request.url)
			return response || fetch(event.request);
		})
	);
});

// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
var dbschemas = { 
	inbox : { version : 1 , keyPath : "n" , autoIncrement : true , indices : [ 'time' ] } 
}
var db = {}
function openDb( dbname , func ) {
	console.log("openDb ...")
	var req = indexedDB.open( dbname , dbschemas[ dbname ].version )
	req.onsuccess = function (evt) {
		// Equal to: db = req.result;
		db[ dbname ] = this.result;
		console.log("openDb DONE");
		if( func ) func()
	}
	req.onerror = function (evt) {
		console.error("openDb:", evt.target.errorCode);
	}
	req.onupgradeneeded = function (evt) {
		console.log("openDb.onupgradeneeded");
		var objstore = evt.currentTarget.result.createObjectStore(
				dbname , dbschemas[ dbname ] 
				//dbname , { keyPath : dbschemas[ dbname ].keyPath } );
				//dbname , { keyPath: 'id', autoIncrement: true });
		)
		if( Array.isArray( dbschemas[ dbname ].indices ) ) dbschemas[ dbname ].indices.forEach( index => objstore.createIndex( index , index , { unique: false }) )
		// unique = false allow insert of same key
	}
}

function store( dbname , data , func = ( stored ) => console.log( "stored " + JSON.stringify( stored ) ) ){
	try{
	if( !db[ dbname ] ) openDb( dbname , () => store( dbname , data , func ) )
	else{
		db[ dbname ].transaction( dbname , 'readwrite' ).objectStore( dbname ).add( data ).onsuccess = ( evt ) => {
			data[ dbschemas[ dbname ].keyPath ] = evt.target.result  // save the index into the returned obj
			func( data )
			}
	} // end of else
	} catch( e ){
		// TODO need to handle full storage
		console.log( e + " : problem storing : " + JSON.stringify( data ) )
		func( data )  // forgiving if cannot store still move on
	}
}
// var test = { time : new Date() }; store( "inbox" , test )

function read( dbname , index = db[ dbname ].keyPath , key , func = ( event ) => console.log( event.target.result ) ){
	if( !db[ dbname ] ) openDb( dbname , () => read( dbname , index , key , func ) )
	else if( index === null ) db[ dbname ].transaction( dbname , 'readonly' ).objectStore( dbname ).get( key ).onsuccess = func
	else db[ dbname ].transaction( dbname , 'readonly' ).objectStore( dbname ).index( index ).get( key ).onsuccess = func
}
// read( "inbox" , null , 1 ) // autoincrement starts at 1

function range( dbname , index = db[ dbname ].keyPath , lower , upper , func = ( event ) => console.log( event.target.result.value ) ){
	if( !db[ dbname ] ) return openDb( dbname , () => range( dbname , index , lower , upper , func ) )
	if( upper < lower ){  // descending order
		var temp = upper
		upper = lower
		lower = temp
		var prev = "prev"
	}
	db[ dbname ].transaction( dbname ).objectStore( dbname ).index( index ).openCursor( IDBKeyRange.bound( lower , upper , true , true ) , prev ).onsuccess = func
}
// range( "inbox" , "time" , new Date().setDate( new Date().getDate() - 14 ) , new Date() , ( event ) => {
//	var cursor = event.target.result
//	if( cursor ){ console.log( cursor.value ); cursor.continue() }
//	else console.log( "end of cursor" )
// })


self.addEventListener( 'push' , ( event ) => {
	let data = event.data.json()
	//let title = ( event.data && event.data.text() ) || "Message received"
	let note = {
		title : data.title ,
		icon : "icon.png" ,
		body : data.message || "message received" ,
		tag : "pwa" ,
		requireInteraction : true ,
	}

	note.data = {}
	if( data.url ) note.data.url = data.url
	if( data.pathname ) note.data.pathname = data.pathname

	data.time ? note.time = new Date( data.time ) : note.time = new Date()

	// save message to inbox
	note.read = false
	store( "inbox" , note )
	event.waitUntil(  // prevent serviceworker from stopping until this promise resolves
		self.registration.showNotification( note.title || "notification received" , note )
	)
})

// https://stackoverflow.com/questions/38713685/how-can-i-initiate-a-pwa-progressive-webapp-open-from-a-click-on-a-push-notifi
self.addEventListener( 'notificationclick' , ( event ) => {
	event.notification.close()
	var note = event.notification.data
	// TODO change read status and save
	//if( !note.url ) note.url = new URL('./', location).href // use if don't have note.url and want to open the app on click
	if( note.url ){
		event.waitUntil( clients.matchAll({
			type: 'window'
		}).then( ( clientList ) => {
			for (var i = 0; i < clientList.length; i++) {
				var client = clientList[i]
				if (client.url == note.url && 'focus' in client) return client.focus()
			}
			if (clients.openWindow) return clients.openWindow( note.url ).then( ( client ) => client.focus() )
		} ) )
	}
} ) // notificationclick
